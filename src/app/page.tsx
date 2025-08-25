'use client';
import {useState} from 'react';
import {useLiquidityPositions} from '~/hooks/useLiquidityPositions';
import {LiquidityChart} from '~/components/LiquidityChart';

export default function Home() {
  const [owner, setOwner] = useState<string>();
  const positions = useLiquidityPositions(owner);

  return (
    <div className="p-12">
      <h2 className="text-xl font-bold mb-6">
        Timelock Liquidity Distribution (testnet)
      </h2>

      <input
        type="text"
        placeholder="Filter by Owner Address"
        onInput={e => setOwner(e.currentTarget.value)}
        className="h-8 w-full"
      />

      {positions && positions.length > 0 && (
        <LiquidityChart positions={positions || []} />
      )}
    </div>
  );
}
