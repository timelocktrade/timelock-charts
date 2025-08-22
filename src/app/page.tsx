'use client';
import {useLiquidityPositions} from '~/hooks/useLiquidityPositions';
import {LiquidityChart} from '~/components/LiquidityChart';

export default function Home() {
  const positions = useLiquidityPositions();

  return (
    <div className="p-12">
      {positions && positions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Timelock Liquidity Distribution (testnet)
          </h2>
          <LiquidityChart positions={positions || []} />
        </div>
      )}
    </div>
  );
}
