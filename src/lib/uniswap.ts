import {Address} from 'viem';
import {
  erc20,
  PoolContract,
  uniswapMathLensContract,
  uniswapPool,
} from './contracts';
import {type Amount, unscaleAmount} from './numberUtils';
import {getTokenData, type TokenData} from './tokens';
import mutex from './mutex';

export const getCurrentTick = async (pool: Address | PoolContract) => {
  const poolContract = typeof pool === 'string' ? uniswapPool(pool) : pool;
  const tickSpacing = await poolContract.read.tickSpacing();

  const {1: exact} = await poolContract.read.slot0();
  const rounded = Math.floor(exact / tickSpacing) * tickSpacing;
  return {exact, rounded};
};

export const getCurrentSqrtPriceX96 = async (pool: Address | PoolContract) => {
  const poolContract = typeof pool === 'string' ? uniswapPool(pool) : pool;

  const {0: sqrtPriceX96} = await poolContract.read.slot0();
  return sqrtPriceX96;
};

export const getPoolTokens = async (pool: Address | PoolContract) => {
  const poolContract = typeof pool === 'string' ? uniswapPool(pool) : pool;

  const [token0, token1] = await Promise.all([
    poolContract.read.token0(),
    poolContract.read.token1(),
  ]);
  return [erc20(token0), erc20(token1)];
};

export const getPoolTokensData = (() => {
  let cached: [TokenData, TokenData] | undefined = undefined;

  return async (pool: Address | PoolContract) => {
    const poolContract = typeof pool === 'string' ? uniswapPool(pool) : pool;

    const release = await mutex.acquire(
      'getPoolTokensData-' + poolContract.address,
    );
    try {
      if (cached) return cached;

      const [token0, token1] = await Promise.all([
        poolContract.read.token0(),
        poolContract.read.token1(),
      ]);
      const [token0Data, token1Data] = await Promise.all([
        getTokenData(token0),
        getTokenData(token1),
      ]);
      cached = [token0Data, token1Data];
      return cached;
    } finally {
      release();
    }
  };
})();

const unscalePrice = (
  scaled: bigint,
  decimals0: number,
  decimals1: number,
): Amount => ({
  scaled,
  unscaled:
    Number((scaled * 10n ** BigInt(decimals0)) / 10n ** BigInt(decimals1)) /
    1e18,
  decimals: 18 + decimals1 - decimals0,
});

export const getCurrentPrice = async (pool: Address | PoolContract) => {
  const tokens = await getPoolTokensData(pool);

  const currentTick = await getCurrentTick(pool);
  const scaled = await uniswapMathLensContract.read.getPriceAtTick([
    currentTick.exact,
  ]);
  return unscalePrice(scaled, tokens[0].decimals, tokens[1].decimals);
};

export const getPriceAtTick = async (
  tick: number,
  pool: Address | PoolContract,
) => {
  const tokens = await getPoolTokensData(pool);
  const scaled = await uniswapMathLensContract.read.getPriceAtTick([tick]);
  return unscalePrice(scaled, tokens[0].decimals, tokens[1].decimals);
};

export const batchGetPriceAtTick = async (
  ticks: number[],
  pool: Address | PoolContract,
) => {
  const tokens = await getPoolTokensData(pool);

  const scaledList = await uniswapMathLensContract.read.batchGetPriceAtTick([
    ticks,
  ]);
  const result = scaledList.map(scaled =>
    unscalePrice(scaled, tokens[0].decimals, tokens[1].decimals),
  );
  return result;
};

export const getAmountsFromLiquidity = async (
  tickLower: number,
  tickUpper: number,
  liquidity: bigint,
  pool: Address | PoolContract,
) => {
  const currentTick = await getCurrentTick(pool);
  const tokens = await getPoolTokens(pool);

  const decimals = await Promise.all(
    tokens.map(token => token.read.decimals()),
  );
  const amounts =
    await uniswapMathLensContract.read.getAmountsForLiquidityTicks([
      currentTick.exact,
      tickLower,
      tickUpper,
      liquidity,
    ]);
  return amounts.map((scaled, i) => unscaleAmount(scaled, decimals[i]));
};

export const batchGetAmountsFromLiquidity = async (
  tickLower: number[],
  tickUpper: number[],
  liquidity: bigint[],
  pool: Address | PoolContract,
) => {
  const currentTick = await getCurrentTick(pool);
  const tokens = await getPoolTokens(pool);

  const decimals = await Promise.all(
    tokens.map(token => token.read.decimals()),
  );
  const currentTicksArray = new Array(tickLower.length).fill(currentTick.exact);

  const amounts =
    await uniswapMathLensContract.read.batchGetAmountsForLiquidityTicks([
      currentTicksArray,
      tickLower,
      tickUpper,
      liquidity,
    ]);

  let totalAmount0 = 0n;
  let totalAmount1 = 0n;

  const amounts0: Amount[] = [];
  const amounts1: Amount[] = [];

  for (const scaled of amounts[0]) {
    totalAmount0 += scaled;
    amounts0.push(unscaleAmount(scaled, decimals[0]));
  }
  for (const scaled of amounts[1]) {
    totalAmount1 += scaled;
    amounts1.push(unscaleAmount(scaled, decimals[1]));
  }

  return {
    totalAmount0: unscaleAmount(totalAmount0, decimals[0]),
    totalAmount1: unscaleAmount(totalAmount1, decimals[1]),
    amounts0,
    amounts1,
  };
};
