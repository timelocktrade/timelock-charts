import {useEffect, useState} from 'react';
import {listAllPositions, type LiquidityPosition} from '~/lib/timelock';

export const useLiquidityPositions = () => {
  const [positions, setPositions] = useState<LiquidityPosition[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const res = await listAllPositions();

      setPositions(res);
    };
    void fetchPositions();
  }, []);

  return positions;
};
