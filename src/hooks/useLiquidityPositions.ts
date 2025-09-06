import {useEffect, useState} from 'react';
import type {Address} from 'viem';
import type {PoolContract} from '~/lib/contracts';
import {
  type LiquidityPosition,
  listPositions,
  listPositionsRawForPool,
} from '~/lib/timelock';

export const useLiquidityPositions = (pool: Address | PoolContract) => {
  const [positions, setPositions] = useState<LiquidityPosition[]>([]);

  useEffect(() => {
    const fetchPositionsRaw = async () => {
      if (positions.length > 0) return;
      const raw = await listPositionsRawForPool(pool);
      if (positions.length > 0) return;
      setPositions(raw);
    };
    const fetchPositions = async () => {
      const res = await listPositions(pool);
      setPositions(res);
    };
    void fetchPositionsRaw();
    void fetchPositions();
  }, [pool]);

  return positions;
};
