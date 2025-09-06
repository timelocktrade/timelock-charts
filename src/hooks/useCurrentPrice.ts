import {useEffect, useState} from 'react';
import type {Address} from 'viem';
import type {PoolContract} from '~/lib/contracts';
import type {Amount} from '~/lib/numberUtils';
import {getCurrentPrice} from '~/lib/uniswap';

export const useCurrentPrice = (pool: Address | PoolContract) => {
  const [currentPrice, setCurrentPrice] = useState<Amount>();

  useEffect(() => {
    const fetchCurrentPrice = async () => {
      const price = await getCurrentPrice(pool);
      setCurrentPrice(price);
    };
    void fetchCurrentPrice();
  }, [pool]);

  return currentPrice;
};
