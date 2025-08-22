import {useEffect, useState} from 'react';
import {getCurrentTick} from '~/lib/uniswap';

export const useCurrentTick = () => {
  const [currentTick, setCurrentTick] = useState<{
    rounded?: number;
    exact?: number;
  }>();

  useEffect(() => {
    const fetchCurrentTick = async () => {
      const currentTick = await getCurrentTick();
      setCurrentTick(currentTick);
    };
    void fetchCurrentTick();
  }, []);

  return currentTick || {};
};
