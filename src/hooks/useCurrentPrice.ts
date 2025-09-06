import {useEffect, useState} from 'react';
import type {Address} from 'viem';
import type {PoolContract} from '~/lib/contracts';
import type {Amount} from '~/lib/numberUtils';
import {getPriceAtTick} from '~/lib/uniswap';
import {useCurrentTick} from './useCurrentTick';

export const useCurrentPrice = (pool: Address | PoolContract) => {
  const [currentPrice, setCurrentPrice] = useState<Amount>();
  const currentTick = useCurrentTick(pool);

  useEffect(() => {
    const fetchCurrentPrice = async () => {
      if (!currentTick.exact) return;
      const price = await getPriceAtTick(pool, currentTick.exact);
      setCurrentPrice(price);
    };
    void fetchCurrentPrice();
  }, [pool, currentTick.exact]);

  return {currentPrice, currentTick};
};
