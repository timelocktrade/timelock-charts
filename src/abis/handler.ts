export const handlerAbi = [
  {
    type: 'constructor',
    inputs: [
      {name: '_factory', type: 'address', internalType: 'address'},
      {name: '_swapRouter', type: 'address', internalType: 'address'},
      {
        name: '_premiumAsset',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'DEFAULT_ADMIN_ROLE',
    inputs: [],
    outputs: [{name: '', type: 'bytes32', internalType: 'bytes32'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'addLiquidity',
    inputs: [
      {
        name: 'params',
        type: 'tuple',
        internalType: 'struct LiquidityManager.AddLiquidityParams',
        components: [
          {name: 'token0', type: 'address', internalType: 'address'},
          {name: 'token1', type: 'address', internalType: 'address'},
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {
            name: 'recipient',
            type: 'address',
            internalType: 'address',
          },
          {name: 'tickLower', type: 'int24', internalType: 'int24'},
          {name: 'tickUpper', type: 'int24', internalType: 'int24'},
          {
            name: 'amount0Desired',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount1Desired',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount0Min',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'amount1Min',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    outputs: [
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
      {name: 'amount0', type: 'uint256', internalType: 'uint256'},
      {name: 'amount1', type: 'uint256', internalType: 'uint256'},
      {
        name: 'pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'allowance',
    inputs: [
      {name: '', type: 'address', internalType: 'address'},
      {name: '', type: 'address', internalType: 'address'},
      {name: '', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'approve',
    inputs: [
      {name: 'spender', type: 'address', internalType: 'address'},
      {name: 'id', type: 'uint256', internalType: 'uint256'},
      {name: 'amount', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'balanceOf',
    inputs: [
      {name: '', type: 'address', internalType: 'address'},
      {name: '', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'burnPositionHandler',
    inputs: [
      {name: 'context', type: 'address', internalType: 'address'},
      {
        name: '_burnPositionData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'convertToAssets',
    inputs: [
      {name: 'shares', type: 'uint128', internalType: 'uint128'},
      {name: 'tokenId', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: '', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'convertToShares',
    inputs: [
      {name: 'assets', type: 'uint128', internalType: 'uint128'},
      {name: 'tokenId', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: '', type: 'uint128', internalType: 'uint128'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'defaultHookSwitch',
    inputs: [],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'donateToPosition',
    inputs: [{name: '_donateData', type: 'bytes', internalType: 'bytes'}],
    outputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'emergencyPause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'emergencyUnpause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'factory',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'contract IUniswapV3Factory',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'forceWithdrawUniswapV3LiquidityAndToken',
    inputs: [
      {
        name: 'pool',
        type: 'address',
        internalType: 'contract IUniswapV3Pool',
      },
      {name: 'tickLower', type: 'int24', internalType: 'int24'},
      {name: 'tickUpper', type: 'int24', internalType: 'int24'},
      {name: 'liquidity', type: 'uint128', internalType: 'uint128'},
      {name: 'token', type: 'address', internalType: 'address'},
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getHandlerIdentifier',
    inputs: [{name: '_data', type: 'bytes', internalType: 'bytes'}],
    outputs: [
      {
        name: 'handlerIdentifierId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getRoleAdmin',
    inputs: [{name: 'role', type: 'bytes32', internalType: 'bytes32'}],
    outputs: [{name: '', type: 'bytes32', internalType: 'bytes32'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTokenIdData',
    inputs: [{name: 'tokenId', type: 'uint256', internalType: 'uint256'}],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType:
          'struct UniswapV3SingleTickLiquidityHandlerV2.TokenIdInfo',
        components: [
          {
            name: 'totalLiquidity',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'totalSupply',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'liquidityUsed',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'feeGrowthInside0LastX128',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'feeGrowthInside1LastX128',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'tokensOwed0',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'tokensOwed1',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'totalPremium',
            type: 'uint256',
            internalType: 'uint256',
          },
          {name: 'token0', type: 'address', internalType: 'address'},
          {name: 'token1', type: 'address', internalType: 'address'},
          {name: 'fee', type: 'uint24', internalType: 'uint24'},
          {
            name: 'totalPremiumReceived',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'globalHookSwitch',
    inputs: [],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'grantRole',
    inputs: [
      {name: 'role', type: 'bytes32', internalType: 'bytes32'},
      {name: 'account', type: 'address', internalType: 'address'},
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'hasRole',
    inputs: [
      {name: 'role', type: 'bytes32', internalType: 'bytes32'},
      {name: 'account', type: 'address', internalType: 'address'},
    ],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'hookSwitch',
    inputs: [{name: '', type: 'address', internalType: 'address'}],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isHookAllowed',
    inputs: [{name: 'hook', type: 'address', internalType: 'address'}],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isOperator',
    inputs: [
      {name: '', type: 'address', internalType: 'address'},
      {name: '', type: 'address', internalType: 'address'},
    ],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'mintPositionHandler',
    inputs: [
      {name: 'context', type: 'address', internalType: 'address'},
      {
        name: '_mintPositionData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [{name: 'sharesMinted', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'paused',
    inputs: [],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'premiumAsset',
    inputs: [],
    outputs: [{name: '', type: 'address', internalType: 'address'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'removePremium',
    inputs: [
      {name: 'context', type: 'address', internalType: 'address'},
      {
        name: '_burnPositionData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'premiumClaimed',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'renounceRole',
    inputs: [
      {name: 'role', type: 'bytes32', internalType: 'bytes32'},
      {name: 'account', type: 'address', internalType: 'address'},
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeRole',
    inputs: [
      {name: 'role', type: 'bytes32', internalType: 'bytes32'},
      {name: 'account', type: 'address', internalType: 'address'},
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setOperator',
    inputs: [
      {name: 'operator', type: 'address', internalType: 'address'},
      {name: 'approved', type: 'bool', internalType: 'bool'},
    ],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'supportsInterface',
    inputs: [{name: 'interfaceId', type: 'bytes4', internalType: 'bytes4'}],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenIds',
    inputs: [{name: '', type: 'uint256', internalType: 'uint256'}],
    outputs: [
      {
        name: 'totalLiquidity',
        type: 'uint128',
        internalType: 'uint128',
      },
      {name: 'totalSupply', type: 'uint128', internalType: 'uint128'},
      {
        name: 'liquidityUsed',
        type: 'uint128',
        internalType: 'uint128',
      },
      {
        name: 'feeGrowthInside0LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'feeGrowthInside1LastX128',
        type: 'uint256',
        internalType: 'uint256',
      },
      {name: 'tokensOwed0', type: 'uint128', internalType: 'uint128'},
      {name: 'tokensOwed1', type: 'uint128', internalType: 'uint128'},
      {
        name: 'totalPremium',
        type: 'uint256',
        internalType: 'uint256',
      },
      {name: 'token0', type: 'address', internalType: 'address'},
      {name: 'token1', type: 'address', internalType: 'address'},
      {name: 'fee', type: 'uint24', internalType: 'uint24'},
      {
        name: 'totalPremiumReceived',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokenToPullForDonate',
    inputs: [],
    outputs: [{name: '', type: 'address', internalType: 'address'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokensToPullForMint',
    inputs: [
      {
        name: '_mintPositionData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {name: '', type: 'address[]', internalType: 'address[]'},
      {name: '', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'tokensToPullForUnUse',
    inputs: [
      {
        name: '_unusePositionData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {name: '', type: 'address[]', internalType: 'address[]'},
      {name: '', type: 'uint256[]', internalType: 'uint256[]'},
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transfer',
    inputs: [
      {name: 'receiver', type: 'address', internalType: 'address'},
      {name: 'id', type: 'uint256', internalType: 'uint256'},
      {name: 'amount', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferFrom',
    inputs: [
      {name: 'sender', type: 'address', internalType: 'address'},
      {name: 'receiver', type: 'address', internalType: 'address'},
      {name: 'id', type: 'uint256', internalType: 'uint256'},
      {name: 'amount', type: 'uint256', internalType: 'uint256'},
    ],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'uniswapV3MintCallback',
    inputs: [
      {name: 'amount0Owed', type: 'uint256', internalType: 'uint256'},
      {name: 'amount1Owed', type: 'uint256', internalType: 'uint256'},
      {name: 'data', type: 'bytes', internalType: 'bytes'},
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'unusePositionHandler',
    inputs: [
      {
        name: '_unusePositionData',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {name: '', type: 'uint256[]', internalType: 'uint256[]'},
      {name: '', type: 'uint256', internalType: 'uint256'},
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateHookUsage',
    inputs: [
      {name: 'globalAllowed', type: 'bool', internalType: 'bool'},
      {name: 'defaultAllowed', type: 'bool', internalType: 'bool'},
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateHookUse',
    inputs: [
      {name: 'hook', type: 'address', internalType: 'address'},
      {name: 'allowed', type: 'bool', internalType: 'bool'},
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateWhitelistedApps',
    inputs: [
      {name: '_app', type: 'address', internalType: 'address'},
      {name: '_status', type: 'bool', internalType: 'bool'},
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'usePositionHandler',
    inputs: [
      {
        name: '_usePositionHandler',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {name: '', type: 'address[]', internalType: 'address[]'},
      {name: '', type: 'uint256[]', internalType: 'uint256[]'},
      {name: '', type: 'uint256', internalType: 'uint256'},
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'userPremiumInfo',
    inputs: [
      {name: '', type: 'uint256', internalType: 'uint256'},
      {name: '', type: 'address', internalType: 'address'},
    ],
    outputs: [{name: 'premiumPaid', type: 'uint256', internalType: 'uint256'}],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'whitelistedApps',
    inputs: [{name: '', type: 'address', internalType: 'address'}],
    outputs: [{name: '', type: 'bool', internalType: 'bool'}],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'Approval',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'spender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogBurnedPosition',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'liquidityBurned',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
      {
        name: 'pool',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'hook',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'user',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'tickLower',
        type: 'int24',
        indexed: false,
        internalType: 'int24',
      },
      {
        name: 'tickUpper',
        type: 'int24',
        indexed: false,
        internalType: 'int24',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogDonation',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'premiumAmountEarned',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogFeeCompound',
    inputs: [
      {
        name: 'handler',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'pool',
        type: 'address',
        indexed: false,
        internalType: 'contract IUniswapV3Pool',
      },
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'tickLower',
        type: 'int24',
        indexed: false,
        internalType: 'int24',
      },
      {
        name: 'tickUpper',
        type: 'int24',
        indexed: false,
        internalType: 'int24',
      },
      {
        name: 'liquidity',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogMintedPosition',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'liquidityMinted',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
      {
        name: 'pool',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'hook',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'user',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'tickLower',
        type: 'int24',
        indexed: false,
        internalType: 'int24',
      },
      {
        name: 'tickUpper',
        type: 'int24',
        indexed: false,
        internalType: 'int24',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogPremiumCollected',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'user',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogUnusePosition',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'liquidityUnused',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogUpdateGlobalHookUse',
    inputs: [
      {
        name: 'globalAllowed',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
      {
        name: 'defaultAllowed',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogUpdateHookUse',
    inputs: [
      {
        name: 'hook',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'allowed',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogUpdateWhitelistedApp',
    inputs: [
      {
        name: '_app',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: '_status',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'LogUsePosition',
    inputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'liquidityUsed',
        type: 'uint128',
        indexed: false,
        internalType: 'uint128',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OperatorSet',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'operator',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'approved',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Paused',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleAdminChanged',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'previousAdminRole',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'newAdminRole',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleGranted',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'account',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleRevoked',
    inputs: [
      {
        name: 'role',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'account',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'sender',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Transfer',
    inputs: [
      {
        name: 'caller',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: 'from',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'to',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'id',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Unpaused',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {type: 'error', name: 'T', inputs: []},
  {
    type: 'error',
    name: 'UniswapV3SingleTickLiquidityHandlerV2__InRangeLP',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UniswapV3SingleTickLiquidityHandlerV2__InsufficientLiquidity',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UniswapV3SingleTickLiquidityHandlerV2__NotWhitelisted',
    inputs: [],
  },
] as const;
