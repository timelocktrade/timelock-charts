import {LiquidityChart} from '~/components/LiquidityChart';
import {poolContracts} from '~/lib/contracts';

export default function Home() {
  return (
    <div className="p-12">
      <h2 className="text-xl font-bold mb-6">
        Timelock Liquidity Distribution (testnet)
      </h2>

      {poolContracts.map(({address}) => (
        <div className="py-12 border-y" key={address}>
          <LiquidityChart pool={address} />
        </div>
      ))}
    </div>
  );
}
