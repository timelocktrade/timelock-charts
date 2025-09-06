import {useEffect, useState} from 'react';
import type {Address} from 'viem';
import type {PoolContract} from '~/lib/contracts';
import {listPositions, type LiquidityPosition} from '~/lib/timelock';

export const useLiquidityPositions = (pool: Address | PoolContract) => {
  const [positions, setPositions] = useState<LiquidityPosition[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const res = await listPositions(pool);
      setPositions(res);
    };
    void fetchPositions();
  }, [pool]);

  return positions;
};
