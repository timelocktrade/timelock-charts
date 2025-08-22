import {Address} from 'viem';
import {erc20} from './contracts';

export type TokenData = Awaited<ReturnType<typeof getTokenData>>;

export const getTokenData = async (tokenAddress: Address) => {
  const contract = erc20(tokenAddress);

  const [name, symbol, decimals] = await Promise.all([
    contract.read.name(),
    contract.read.symbol(),
    contract.read.decimals(),
  ]);
  return {name, symbol, decimals, contract};
};
