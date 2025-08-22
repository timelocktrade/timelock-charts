import {
  type Address,
  createPublicClient,
  createWalletClient,
  getContract,
  http,
} from 'viem';
import {monadTestnet} from 'viem/chains';
import {privateKeyToAccount} from 'viem/accounts';

import {config} from '~/config';

import {handlerAbi} from '~/abis/handler';
import {positionManagerAbi} from '~/abis/positionManager';
import {uniswapV3PoolAbi} from '~/abis/uniswapV3Pool';
import {erc20Abi} from '~/abis/erc20';
import {uniswapMathLensAbi} from '~/abis/uniswapMathLens';
import {swapRouterAbi} from '~/abis/swapRouter';

export const account = config.privateKey
  ? privateKeyToAccount(config.privateKey)
  : undefined;

export const viemClient = account
  ? createWalletClient({
      account,
      chain: monadTestnet,
      transport: http(config.rpcUrl),
    })
  : createPublicClient({chain: monadTestnet, transport: http(config.rpcUrl)});

export const handlerContract = getContract({
  abi: handlerAbi,
  address: config.handlerAddress,
  client: viemClient,
});

export const positionManagerContract = getContract({
  abi: positionManagerAbi,
  address: config.positionManagerAddress,
  client: viemClient,
});

export const primePoolContract = getContract({
  abi: uniswapV3PoolAbi,
  address: config.primePoolAddress,
  client: viemClient,
});

export const uniswapMathLensContract = getContract({
  abi: uniswapMathLensAbi,
  address: config.uniswapMathLensAddress,
  client: viemClient,
});

export const swapRouterContract = config.swapRouterAddress
  ? getContract({
      abi: swapRouterAbi,
      address: config.swapRouterAddress,
      client: viemClient,
    })
  : undefined;

export const uniswapPool = (address: Address) =>
  getContract({abi: uniswapV3PoolAbi, address, client: viemClient});

export const erc20 = (address: Address) =>
  getContract({abi: erc20Abi, address, client: viemClient});
