import {GraphQLClient} from 'graphql-request';
import type {Address} from 'viem';

import {config} from '~/config';
// eslint-disable-next-line n/no-unpublished-import
import {getSdk, type GetPositionsByOwnerQuery} from '~/generated/graphql';
import {handlerContract, type PoolContract} from '~/lib/contracts';
import {batchGetAmountsFromLiquidity} from './uniswap';
import type {Amount} from './numberUtils';

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

export const listPositions = async (pool: Address | PoolContract) => {
  const poolAddress = (
    typeof pool === 'string' ? pool : pool.address
  ).toLowerCase();

  const result = await sdk.GetPositions();
  const raw = result.user_liquidity_positions.items;
  const filtered = raw.filter(p => p.pool?.toLowerCase() === poolAddress);

  const tickLowers = filtered.map(r => r.tick_lower!);
  const tickUppers = filtered.map(r => r.tick_upper!);
  const totalLiquidities = filtered.map(r => BigInt(r.total_liquidity!));
  const usedLiquidities = filtered.map(r => BigInt(r.used_liquidity!));

  const [amounts, usedAmounts] = await Promise.all([
    batchGetAmountsFromLiquidity(
      tickLowers,
      tickUppers,
      totalLiquidities,
      pool,
    ),
    batchGetAmountsFromLiquidity(tickLowers, tickUppers, usedLiquidities, pool),
  ]);

  const positions = filtered.map((r, i) => ({
    ...r,
    amount0: amounts.amounts0[i],
    amount1: amounts.amounts1[i],
    usedAmount0: usedAmounts.amounts0[i],
    usedAmount1: usedAmounts.amounts1[i],
  }));
  return positions;
};
