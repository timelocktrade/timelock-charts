import {useEffect, useState} from 'react';
import type {Address} from 'viem';
import type {TokenData} from '~/lib/tokens';
import {getPoolTokensData} from '~/lib/uniswap';

export const usePoolData = (poolAddress?: Address) => {
  const [data, setData] = useState<{tokens: [TokenData, TokenData]}>();

  useEffect(() => {
    const fetchPoolData = async () => {
      const tokenData = await getPoolTokensData(poolAddress);
      setData({tokens: tokenData});
    };
    void fetchPoolData();
  }, []);

  return data;
};
