import {useEffect, useState} from 'react';
import {listPositions, type LiquidityPosition} from '~/lib/timelock';

export const useLiquidityPositions = (owner?: string) => {
  const [positions, setPositions] = useState<LiquidityPosition[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const res = await listPositions(owner);

      setPositions(res);
    };
    void fetchPositions();
  }, [owner]);

  return positions;
};
