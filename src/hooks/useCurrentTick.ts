import {useEffect, useState} from 'react';
import type {Address} from 'viem';
import type {PoolContract} from '~/lib/contracts';
import {getCurrentTick} from '~/lib/uniswap';

export const useCurrentTick = (pool?: Address | PoolContract) => {
  const [currentTick, setCurrentTick] = useState<{
    rounded?: number;
    exact?: number;
  }>();

  useEffect(() => {
    const fetchCurrentTick = async () => {
      if (!pool) return;
      const currentTick = await getCurrentTick(pool);
      setCurrentTick(currentTick);
    };
    void fetchCurrentTick();
  }, [pool]);

  return currentTick || {};
};
