export const uniswapMathLensAbi = [
  {
    type: 'function',
    name: 'batchGetAmount0ForLiquidity',
    inputs: [
      {
        name: 'sqrtRatioAX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'liquidity',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    outputs: [{name: 'amounts0', type: 'uint256[]', internalType: 'uint256[]'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetAmount0ForLiquidityTicks',
    inputs: [
      {name: 'tickA', type: 'int24[]', internalType: 'int24[]'},
      {name: 'tickB', type: 'int24[]', internalType: 'int24[]'},
      {
        name: 'liquidity',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    outputs: [{name: 'amounts0', type: 'uint256[]', internalType: 'uint256[]'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetAmount1ForLiquidity',
    inputs: [
      {
        name: 'sqrtRatioAX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'liquidity',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    outputs: [{name: 'amounts1', type: 'uint256[]', internalType: 'uint256[]'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetAmount1ForLiquidityTicks',
    inputs: [
      {name: 'tickA', type: 'int24[]', internalType: 'int24[]'},
      {name: 'tickB', type: 'int24[]', internalType: 'int24[]'},
      {
        name: 'liquidity',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    outputs: [{name: 'amounts1', type: 'uint256[]', internalType: 'uint256[]'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetAmountsForLiquidity',
    inputs: [
      {
        name: 'sqrtRatioX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'sqrtRatioAX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'liquidity',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    outputs: [
      {
        name: 'amounts0',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {name: 'amounts1', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetAmountsForLiquidityTicks',
    inputs: [
      {name: 'tick', type: 'int24[]', internalType: 'int24[]'},
      {name: 'tickA', type: 'int24[]', internalType: 'int24[]'},
      {name: 'tickB', type: 'int24[]', internalType: 'int24[]'},
      {
        name: 'liquidity',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    outputs: [
      {
        name: 'amounts0',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {name: 'amounts1', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetLiquidityForAmount0',
    inputs: [
      {
        name: 'sqrtRatioAX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {name: 'amount0', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    outputs: [
      {
        name: 'liquidities',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetLiquidityForAmount0Ticks',
    inputs: [
      {name: 'tickA', type: 'int24[]', internalType: 'int24[]'},
      {name: 'tickB', type: 'int24[]', internalType: 'int24[]'},
      {name: 'amount0', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    outputs: [
      {
        name: 'liquidities',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetLiquidityForAmount1',
    inputs: [
      {
        name: 'sqrtRatioAX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {name: 'amount1', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    outputs: [
      {
        name: 'liquidities',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetLiquidityForAmount1Ticks',
    inputs: [
      {name: 'tickA', type: 'int24[]', internalType: 'int24[]'},
      {name: 'tickB', type: 'int24[]', internalType: 'int24[]'},
      {name: 'amount1', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    outputs: [
      {
        name: 'liquidities',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetLiquidityForAmounts',
    inputs: [
      {
        name: 'sqrtRatioX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'sqrtRatioAX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160[]',
        internalType: 'uint160[]',
      },
      {name: 'amount0', type: 'uint256[]', internalType: 'uint256[]'},
      {name: 'amount1', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    outputs: [
      {
        name: 'liquidities',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetLiquidityForAmountsTicks',
    inputs: [
      {name: 'tick', type: 'int24[]', internalType: 'int24[]'},
      {name: 'tickA', type: 'int24[]', internalType: 'int24[]'},
      {name: 'tickB', type: 'int24[]', internalType: 'int24[]'},
      {name: 'amount0', type: 'uint256[]', internalType: 'uint256[]'},
      {name: 'amount1', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    outputs: [
      {
        name: 'liquidities',
        type: 'uint128[]',
        internalType: 'uint128[]',
      },
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'batchGetPriceAtTick',
    inputs: [{name: 'ticks', type: 'int24[]', internalType: 'int24[]'}],
    outputs: [{name: 'prices', type: 'uint256[]', internalType: 'uint256[]'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getAmount0ForLiquidity',
    inputs: [
      {
        name: 'sqrtRatioAX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
    ],
    outputs: [{name: 'amount0', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getAmount0ForLiquidityTicks',
    inputs: [
      {name: 'tickA', type: 'int24', internalType: 'int24'},
      {name: 'tickB', type: 'int24', internalType: 'int24'},
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
    ],
    outputs: [{name: 'amount0', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getAmount1ForLiquidity',
    inputs: [
      {
        name: 'sqrtRatioAX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
    ],
    outputs: [{name: 'amount1', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getAmount1ForLiquidityTicks',
    inputs: [
      {name: 'tickA', type: 'int24', internalType: 'int24'},
      {name: 'tickB', type: 'int24', internalType: 'int24'},
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
    ],
    outputs: [{name: 'amount1', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getAmountsForLiquidity',
    inputs: [
      {
        name: 'sqrtRatioX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {
        name: 'sqrtRatioAX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
    ],
    outputs: [
      {name: 'amount0', type: 'uint256', internalType: 'uint256'},
      {name: 'amount1', type: 'uint256', internalType: 'uint256'},
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getAmountsForLiquidityTicks',
    inputs: [
      {name: 'tick', type: 'int24', internalType: 'int24'},
      {name: 'tickA', type: 'int24', internalType: 'int24'},
      {name: 'tickB', type: 'int24', internalType: 'int24'},
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
    ],
    outputs: [
      {name: 'amount0', type: 'uint256', internalType: 'uint256'},
      {name: 'amount1', type: 'uint256', internalType: 'uint256'},
    ],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getLiquidityForAmount0',
    inputs: [
      {
        name: 'sqrtRatioAX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {name: 'amount0', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getLiquidityForAmount0Ticks',
    inputs: [
      {name: 'tickA', type: 'int24', internalType: 'int24'},
      {name: 'tickB', type: 'int24', internalType: 'int24'},
      {name: 'amount0', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getLiquidityForAmount1',
    inputs: [
      {
        name: 'sqrtRatioAX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {name: 'amount1', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getLiquidityForAmount1Ticks',
    inputs: [
      {name: 'tickA', type: 'int24', internalType: 'int24'},
      {name: 'tickB', type: 'int24', internalType: 'int24'},
      {name: 'amount1', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getLiquidityForAmounts',
    inputs: [
      {
        name: 'sqrtRatioX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {
        name: 'sqrtRatioAX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {
        name: 'sqrtRatioBX96',
        type: 'uint160',
        internalType: 'uint160',
      },
      {name: 'amount0', type: 'uint256', internalType: 'uint256'},
      {name: 'amount1', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getLiquidityForAmountsTicks',
    inputs: [
      {name: 'tick', type: 'int24', internalType: 'int24'},
      {name: 'tickA', type: 'int24', internalType: 'int24'},
      {name: 'tickB', type: 'int24', internalType: 'int24'},
      {name: 'amount0', type: 'uint256', internalType: 'uint256'},
      {name: 'amount1', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: 'liquidity', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'getPriceAtTick',
    inputs: [{name: 'tick', type: 'int24', internalType: 'int24'}],
    outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'pure',
  },
] as const;
