import {Address} from 'viem';
import {
  account,
  erc20,
  primePoolContract,
  swapRouterContract,
  uniswapMathLensContract,
  uniswapPool,
} from './contracts';
import {type Amount, unscaleAmount} from './numberUtils';
import {getTokenData, type TokenData} from './tokens';

export const getCurrentTick = async (poolAddress?: Address) => {
  const poolContract = poolAddress
    ? uniswapPool(poolAddress)
    : primePoolContract;

  const {1: exact} = await poolContract.read.slot0();
  const rounded = Math.floor((exact - 1) / 10) * 10;
  return {exact, rounded};
};

export const getCurrentSqrtPriceX96 = async (poolAddress?: Address) => {
  const poolContract = poolAddress
    ? uniswapPool(poolAddress)
    : primePoolContract;

  const {0: sqrtPriceX96} = await poolContract.read.slot0();
  return sqrtPriceX96;
};

export const getPoolTokens = async (poolAddress?: Address) => {
  const poolContract = poolAddress
    ? uniswapPool(poolAddress)
    : primePoolContract;

  const [token0, token1] = await Promise.all([
    poolContract.read.token0(),
    poolContract.read.token1(),
  ]);
  return [erc20(token0), erc20(token1)];
};

export const getPoolTokensData = async (poolAddress?: Address) => {
  const poolContract = poolAddress
    ? uniswapPool(poolAddress)
    : primePoolContract;

  const [token0, token1] = await Promise.all([
    poolContract.read.token0(),
    poolContract.read.token1(),
  ]);
  const [token0Data, token1Data] = await Promise.all([
    getTokenData(token0),
    getTokenData(token1),
  ]);
  return [token0Data, token1Data] as [TokenData, TokenData];
};

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

export const getCurrentPrice = async (poolAddress?: Address) => {
  const tokens = await getPoolTokens(poolAddress);

  const decimals = await Promise.all(
    tokens.map(token => token.read.decimals()),
  );
  const currentTick = await getCurrentTick(poolAddress);
  const scaled = await uniswapMathLensContract.read.getPriceAtTick([
    currentTick.exact,
  ]);
  return unscalePrice(scaled, decimals[0], decimals[1]);
};

export const getPriceAtTick = async (tick: number, poolAddress?: Address) => {
  const tokens = await getPoolTokens(poolAddress);

  const decimals = await Promise.all(
    tokens.map(token => token.read.decimals()),
  );
  const scaled = await uniswapMathLensContract.read.getPriceAtTick([tick]);
  return unscalePrice(scaled, decimals[0], decimals[1]);
};

export const batchGetPriceAtTick = async (
  ticks: number[],
  poolAddress?: Address,
) => {
  const tokens = await getPoolTokens(poolAddress);

  const decimals = await Promise.all(
    tokens.map(token => token.read.decimals()),
  );
  const scaledList = await uniswapMathLensContract.read.batchGetPriceAtTick([
    ticks,
  ]);
  const result = scaledList.map(scaled =>
    unscalePrice(scaled, decimals[0], decimals[1]),
  );
  return result;
};

export const getAmountsFromLiquidity = async (
  tickLower: number,
  tickUpper: number,
  liquidity: bigint,
) => {
  const currentTick = await getCurrentTick();
  const tokens = await getPoolTokens();

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
) => {
  const currentTick = await getCurrentTick();
  const tokens = await getPoolTokens();

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

export const getToken0ToSupply = async (
  currentTick: number,
  tickLower: number,
  tickUpper: number,
) => {
  if (!account) {
    throw new Error('Account not connected');
  }
  if (tickUpper >= currentTick) {
    throw new Error('Can only supply token0 in lower than current tick');
  }
  const tokenAddress = await primePoolContract.read.token0();
  const tokenContract = erc20(tokenAddress);

  const balance = await tokenContract.read.balanceOf([account.address]);
  const balanceToSupply = (balance * 9n) / 10n;

  const liquidity =
    await uniswapMathLensContract.read.getLiquidityForAmount0Ticks([
      tickLower,
      tickUpper,
      balanceToSupply,
    ]);

  return liquidity;
};

export const getToken1ToSupply = async (
  currentTick: number,
  tickLower: number,
  tickUpper: number,
) => {
  if (!account) {
    throw new Error('Account not connected');
  }
  if (tickLower <= currentTick) {
    throw new Error('Can only supply token1 in upper than current tick');
  }
  const tokenAddress = await primePoolContract.read.token1();
  const tokenContract = erc20(tokenAddress);

  const balance = await tokenContract.read.balanceOf([account.address]);
  const balanceToSupply = (balance * 9n) / 10n;

  const liquidity =
    await uniswapMathLensContract.read.getLiquidityForAmount1Ticks([
      tickLower,
      tickUpper,
      balanceToSupply,
    ]);

  return liquidity;
};

export const swap = async (
  tokenIn: `0x${string}`,
  tokenOut: `0x${string}`,
  amountIn: bigint,
  amountOutMinimum: bigint,
) => {
  if (!account) {
    throw new Error('Account not connected');
  }
  const fee = await primePoolContract.read.fee();
  const deadline = BigInt(Math.floor(Date.now() / 1000 + 30));
  const sqrtPriceLimitX96 = ((await getCurrentSqrtPriceX96()) * 105n) / 100n;
  const recipient = account.address;

  const res = await swapRouterContract.write.exactInputSingle([
    {
      tokenIn,
      tokenOut,
      fee,
      amountIn,
      amountOutMinimum,
      recipient,
      sqrtPriceLimitX96,
      deadline,
    },
  ]);
  console.log(res);
};
