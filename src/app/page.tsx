import {Activity, TrendingUp} from 'lucide-react';
import {LiquidityChart} from '~/components/LiquidityChart';
import {Badge} from '~/components/ui/badge';
import {Separator} from '~/components/ui/separator';
import {ThemeToggle} from '~/components/theme-toggle';
import {poolContracts} from '~/lib/contracts';

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto p-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                Timelock Analytics
              </h1>
              <p className="text-muted-foreground text-lg">
                Real-time liquidity distribution monitoring
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Activity className="w-3 h-3" />
              Monad Testnet
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3" />
              {poolContracts.length} Active Pools
            </Badge>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Charts Section */}
        <div className="space-y-8">
          {poolContracts.map(({address}) => (
            <div key={address} className="relative">
              <LiquidityChart pool={address} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center text-muted-foreground text-sm">
            <p>Timelock Charts - Built with Next.js, Recharts & shadcn/ui</p>
          </div>
        </div>
      </div>
    </div>
  );
}
