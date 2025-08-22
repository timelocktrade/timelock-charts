import type {Address, Hex} from 'viem';
import {z} from 'zod';

const ZHex = z
  .string()
  .regex(/^0x[0-9a-fA-F]+$/, 'Must be a valid hex string')
  .transform(val => val as Hex);

const ZAddress = z
  .string()
  .regex(
    /^0x[a-fA-F0-9]{40}$/,
    'Must be a valid Ethereum address starting with 0x',
  )
  .transform(val => val as Address);

const configSchema = z.object({
  rpcUrl: z.string().min(1, 'RPC URL is required'),
  ponderEndpoint: z.string().min(1, 'Ponder endpoint is required'),
  primePoolAddress: ZAddress,
  handlerAddress: ZAddress,
  positionManagerAddress: ZAddress,
  uniswapMathLensAddress: ZAddress,
  swapRouterAddress: ZAddress.optional(),
  privateKey: ZHex.optional(),
});

export const config = configSchema.parse({
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'http://localhost:8545',
  ponderEndpoint:
    process.env.NEXT_PUBLIC_PONDER_ENDPOINT || 'http://localhost:42069',
  primePoolAddress: process.env.NEXT_PUBLIC_PRIME_POOL_ADDRESS,
  handlerAddress: process.env.NEXT_PUBLIC_HANDLER_ADDRESS,
  positionManagerAddress: process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS,
  uniswapMathLensAddress: process.env.NEXT_PUBLIC_UNISWAP_MATH_LENS_ADDRESS,
  swapRouterAddress: process.env.NEXT_PUBLIC_SWAP_ROUTER_ADDRESS,
  privateKey: process.env.PRIVATE_KEY,
});
