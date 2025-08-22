import {GraphQLClient} from 'graphql-request';
import {encodeAbiParameters, parseAbiParameters, zeroAddress} from 'viem';

import {config} from '~/config';
// eslint-disable-next-line n/no-unpublished-import
import {getSdk, type GetPositionsByOwnerQuery} from '~/generated/graphql';
import {handlerContract, positionManagerContract} from '~/lib/contracts';
import type {Amount} from './numberUtils';
import {batchGetAmountsFromLiquidity} from './uniswap';

const client = new GraphQLClient(`${config.ponderEndpoint}/graphql`);
const sdk = getSdk(client);

export const convertToShares = (tokenId: string, liquidity: bigint) => {
  return handlerContract.read.convertToShares([liquidity, BigInt(tokenId)]);
};

export type LiquidityPosition =
  GetPositionsByOwnerQuery['user_liquidity_positions']['items'][0] & {
    amount0: Amount;
    amount1: Amount;
    usedAmount0: Amount;
    usedAmount1: Amount;
  };

export const listAllPositions = async () => {
  const result = await sdk.GetPositions();
  const raw = result.user_liquidity_positions.items;

  const tickLowers = raw.map(r => r.tick_lower!);
  const tickUppers = raw.map(r => r.tick_upper!);
  const totalLiquidities = raw.map(r => BigInt(r.total_liquidity!));
  const usedLiquidities = raw.map(r => BigInt(r.used_liquidity!));

  const [amounts, usedAmounts] = await Promise.all([
    batchGetAmountsFromLiquidity(tickLowers, tickUppers, totalLiquidities),
    batchGetAmountsFromLiquidity(tickLowers, tickUppers, usedLiquidities),
  ]);

  const positions = raw.map((r, i) => ({
    ...r,
    amount0: amounts.amounts0[i],
    amount1: amounts.amounts1[i],
    usedAmount0: usedAmounts.amounts0[i],
    usedAmount1: usedAmounts.amounts1[i],
  }));
  return positions;
  // return raw;
};

export const burnPositionIfPossible = async (position: LiquidityPosition) => {
  const liquidityToBurn =
    BigInt(position.total_liquidity) - BigInt(position.used_liquidity);

  if (liquidityToBurn <= 0n) {
    console.log(`No liquidity to burn for position ${position.token_id}`);
    return;
  }

  const shares = await convertToShares(position.token_id, liquidityToBurn);

  await positionManagerContract.write.burnPosition([
    config.handlerAddress,
    encodeAbiParameters(
      parseAbiParameters(
        'address pool, address hook, int24 tickLower, int24 tickUpper, uint128 shares',
      ),
      [
        position.pool as `0x${string}`,
        zeroAddress,
        position.tick_lower as number,
        position.tick_upper as number,
        shares,
      ],
    ),
  ]);
  console.log(
    `Burned position ${position.token_id} with ${liquidityToBurn} liquidity (${shares} shares)`,
  );
};

export const splitAndMintPositions = async (
  tickLower: number,
  tickUpper: number,
  liquidity: bigint,
) => {
  await positionManagerContract.write.mintPosition([
    config.handlerAddress,
    encodeAbiParameters(
      parseAbiParameters(
        'address pool, address hook, int24 tickLower, int24 tickUpper, uint128 liquidity',
      ),
      [config.primePoolAddress, zeroAddress, tickLower, tickUpper, liquidity],
    ),
  ]);
  console.log(
    `Minted position ${config.primePoolAddress} with ${liquidity} liquidity`,
  );
};
