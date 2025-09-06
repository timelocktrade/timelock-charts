import {useEffect, useState} from 'react';
import type {Address} from 'viem';
import type {PoolContract} from '~/lib/contracts';
import type {TokenData} from '~/lib/tokens';
import {getPoolTokensData} from '~/lib/uniswap';

export const usePoolData = (pool?: Address | PoolContract) => {
  const [data, setData] = useState<{tokens: [TokenData, TokenData]}>();

  useEffect(() => {
    const fetchPoolData = async () => {
      if (!pool) return;
      const tokenData = await getPoolTokensData(pool);
      setData({tokens: tokenData});
    };
    void fetchPoolData();
  }, [pool]);

  return data;
};
