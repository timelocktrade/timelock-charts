'use client';
import React, {useMemo, useEffect, useState} from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import {Address} from 'viem';
import {TrendingUp, DollarSign, Activity, BarChart3} from 'lucide-react';
import {Card, CardContent, CardHeader, CardTitle} from '~/components/ui/card';
import {Badge} from '~/components/ui/badge';

import {useCurrentPrice} from '~/hooks/useCurrentPrice';
import {useLiquidityPositions} from '~/hooks/useLiquidityPositions';
import {usePoolData} from '~/hooks/usePoolData';

import {type Amount, scaledAdd, scaledDiv, zero} from '~/lib/numberUtils';
import type {LiquidityPosition} from '~/lib/timelock';
import {batchGetPriceAtTick} from '~/lib/uniswap';

const formatLiquidity = (value: number | bigint) => {
  value = Number(value);

  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  return value.toFixed(0);
};

const formatAmount = (value: number) => {
  if (value >= 1e9) return `${(value / 1e9).toFixed(3)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(3)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(3)}K`;
  return value.toFixed(6);
};

export const buildTicksMap = (positions: LiquidityPosition[]) => {
  const tickSet = new Set<number>();

  for (const position of positions) {
    const liquidity = parseInt(position.total_liquidity);
    if (liquidity === 0) continue;

    const lowerTick = position.tick_lower!;
    const upperTick = position.tick_upper!;

    for (let tick = lowerTick; tick < upperTick; tick += 10) {
      tickSet.add(tick);
    }
  }
  return {tickSet};
};

const usePriceData = (positions: LiquidityPosition[]) => {
  const [priceData, setPriceData] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    if (!positions || positions.length === 0) {
      setPriceData(new Map());
      return;
    }
    const fetchPrices = async () => {
      const {tickSet} = buildTicksMap(positions);
      const ticks = [...tickSet];

      if (ticks.length === 0) return;

      const prices = await batchGetPriceAtTick(
        ticks,
        positions[0].pool! as Address,
      );
      const priceMap = new Map<number, number>();

      for (const i in ticks) {
        priceMap.set(ticks[i], prices[i].unscaled);
      }
      setPriceData(priceMap);
    };
    void fetchPrices();
  }, [positions]);

  return priceData;
};

const useChartData = (
  positions: LiquidityPosition[],
  priceData: Map<number, number>,
  currentTick?: number,
) => {
  return useMemo(() => {
    if (!positions || positions.length === 0) return [];

    const ticksMap = new Map<
      number,
      {
        totalLiquidity: number;
        usedLiquidity: number;
        amount0: Amount;
        amount1: Amount;
        usedAmount0: Amount;
        usedAmount1: Amount;
      }
    >();

    for (const position of positions) {
      if (position.total_liquidity === '0') continue;

      const lowerTick = position.tick_lower!;
      const upperTick = position.tick_upper!;
      const tickSpacingFactor = (upperTick - lowerTick) / 10;

      const liquidityPerTickSpacing =
        parseInt(position.total_liquidity) / tickSpacingFactor;
      const usedLiquidityPerTickSpacing =
        parseInt(position.used_liquidity) / tickSpacingFactor;

      const amount0PerTickSpacing = scaledDiv(
        position.amount0,
        tickSpacingFactor,
      );
      const amount1PerTickSpacing = scaledDiv(
        position.amount1,
        tickSpacingFactor,
      );
      const usedAmount0PerTickSpacing = scaledDiv(
        position.usedAmount0,
        tickSpacingFactor,
      );
      const usedAmount1PerTickSpacing = scaledDiv(
        position.usedAmount1,
        tickSpacingFactor,
      );

      for (let tick = lowerTick; tick < upperTick; tick += 10) {
        const tickData = ticksMap.get(tick);

        if (tickData) {
          tickData.totalLiquidity =
            tickData.totalLiquidity + liquidityPerTickSpacing;
          tickData.usedLiquidity =
            tickData.usedLiquidity + usedLiquidityPerTickSpacing;

          tickData.amount0 = scaledAdd(tickData.amount0, amount0PerTickSpacing);
          tickData.amount1 = scaledAdd(tickData.amount1, amount1PerTickSpacing);
          tickData.usedAmount0 = scaledAdd(
            tickData.usedAmount0,
            usedAmount0PerTickSpacing,
          );
          tickData.usedAmount1 = scaledAdd(
            tickData.usedAmount1,
            usedAmount1PerTickSpacing,
          );
        } else {
          ticksMap.set(tick, {
            totalLiquidity: liquidityPerTickSpacing,
            usedLiquidity: usedLiquidityPerTickSpacing,
            amount0: amount0PerTickSpacing,
            amount1: amount1PerTickSpacing,
            usedAmount0: usedAmount0PerTickSpacing,
            usedAmount1: usedAmount1PerTickSpacing,
          });
        }
      }
    }
    const data = Array.from(ticksMap.entries())
      .map(([tick, data]) => ({
        tick,
        isAfterCurrentTick:
          currentTick !== undefined ? tick > currentTick : false,
        price: priceData.get(tick),
        availableLiquidity: data.totalLiquidity - data.usedLiquidity,
        usedLiquidity: data.usedLiquidity,
        totalLiquidity: data.totalLiquidity,
        amount0: data.amount0,
        amount1: data.amount1,
        usedAmount0: data.usedAmount0,
        usedAmount1: data.usedAmount1,
      }))
      .sort((a, b) => a.tick - b.tick);

    return data;
  }, [positions, priceData, currentTick]);
};

const useTVL = (positions: LiquidityPosition[]) => {
  return useMemo(() => {
    let totalAmount0 = zero;
    let totalAmount1 = zero;
    let totalUsedAmount0 = zero;
    let totalUsedAmount1 = zero;

    for (let i = 0; i < positions.length; i++) {
      const {amount0, amount1, usedAmount0, usedAmount1} = positions[i];

      totalAmount0 = scaledAdd(totalAmount0, amount0);
      totalAmount1 = scaledAdd(totalAmount1, amount1);
      totalUsedAmount0 = scaledAdd(totalUsedAmount0, usedAmount0);
      totalUsedAmount1 = scaledAdd(totalUsedAmount1, usedAmount1);
    }
    return {
      totalAmount0,
      totalAmount1,
      totalUsedAmount0,
      totalUsedAmount1,
    };
  }, [positions]);
};

interface LiquidityChartProps {
  pool: Address;
}

export function LiquidityChart({pool}: LiquidityChartProps) {
  const positions = useLiquidityPositions(pool);
  const {currentPrice, currentTick} = useCurrentPrice(pool);

  const poolData = usePoolData(pool);
  const priceData = usePriceData(positions);

  const {totalAmount0, totalAmount1, totalUsedAmount0, totalUsedAmount1} =
    useTVL(positions);

  const chartData = useChartData(positions, priceData, currentTick.rounded);

  const getBarColor = (tick: number) => {
    if (currentTick.rounded === undefined) return '#6666a8';
    if (tick === currentTick.rounded) return '#cc4444';
    if (tick < currentTick.rounded) return '#6666a8';
    if (tick > currentTick.rounded) return '#cc6666';
  };

  const token0Label = poolData?.tokens[0].symbol || 'Token0';
  const token1Label = poolData?.tokens[1].symbol || 'Token1';

  return (
    <div className="w-full space-y-6">
      {/* Pool Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {poolData ? `${token0Label}/${token1Label}` : 'Loading Pool...'}
            </h2>
            <p className="text-muted-foreground text-sm font-mono">{pool}</p>
          </div>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Activity className="w-3 h-3" />
          Active
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-0">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              TVL
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm space-y-1">
              <div className="font-semibold">
                {totalAmount0?.unscaled.toFixed(2)} {token0Label}
              </div>
              <div className="font-semibold">
                {totalAmount1?.unscaled.toFixed(2)} {token1Label}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Borrowed
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm space-y-1">
              <div className="font-semibold">
                {totalUsedAmount0?.unscaled.toPrecision(2)} {token0Label}
              </div>
              <div className="font-semibold">
                {totalUsedAmount1?.unscaled.toPrecision(2)} {token1Label}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Current Price
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold">
              {currentPrice?.unscaled.toFixed(2)} {token1Label}/{token0Label}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Current Tick
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold">
              {currentTick.exact?.toFixed(2) || 'N/A'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Container */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">
            Liquidity Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-6 pb-6">
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-4 h-4">
                <div className="w-4 h-2 bg-blue-500 opacity-30 rounded-t"></div>
                <div className="w-4 h-2 bg-blue-500 rounded-b"></div>
              </div>
              <span className="text-sm font-medium text-foreground">
                {token1Label} (Top: Borrowed, Bottom: Available)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col w-4 h-4">
                <div className="w-4 h-2 bg-slate-500 opacity-30 rounded-t"></div>
                <div className="w-4 h-2 bg-slate-500 rounded-b"></div>
              </div>
              <span className="text-sm font-medium text-foreground">
                {token0Label} (Top: Borrowed, Bottom: Available)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-red-500 border-dashed border-red-500"></div>
              <span className="text-sm font-medium text-foreground">
                Current Tick
              </span>
            </div>
          </div>
          <div className="w-full h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
                barCategoryGap={0.61}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="tick"
                  type="number"
                  scale="linear"
                  domain={['dataMin', 'dataMax']}
                  fontSize={12}
                />
                <YAxis tickFormatter={formatLiquidity} fontSize={12} />
                <Tooltip
                  formatter={() => undefined}
                  labelFormatter={(tick: number) => {
                    const entry = chartData.find(d => d.tick === tick)!;

                    const amount0Text = entry?.amount0.unscaled
                      ? formatAmount(entry.amount0.unscaled)
                      : '0';

                    const amount1Text = entry?.amount1.unscaled
                      ? formatAmount(entry.amount1.unscaled)
                      : '0';

                    const usedAmount0Text = entry?.usedAmount0.unscaled
                      ? formatAmount(entry.usedAmount0.unscaled)
                      : '0';

                    const usedAmount1Text = entry?.usedAmount1.unscaled
                      ? formatAmount(entry.usedAmount1.unscaled)
                      : '0';

                    return (
                      <div className="space-y-4 min-w-80 bg-gradient-to-br from-background to-muted/50 rounded-lg shadow-sm border p-3">
                        <div className="flex items-center justify-between pb-3 border-b border-border">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-muted-foreground">
                                Tick:
                              </span>
                              <Badge
                                variant="secondary"
                                className="font-semibold text-sm"
                              >
                                {tick}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-muted-foreground">
                                Price:
                              </span>
                              <Badge
                                variant="outline"
                                className="font-semibold text-sm"
                              >
                                {entry?.price?.toFixed(4) || 'N/A'}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="bg-primary/5 rounded-lg p-3 border border-primary/20">
                            <div className="flex items-center mb-2">
                              <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                              <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
                                Total Liquidity
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-xs text-muted-foreground mb-1">
                                  Liquidity
                                </div>
                                <div className="font-bold text-foreground text-sm">
                                  {formatLiquidity(entry.totalLiquidity)}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-muted-foreground mb-1">
                                  {token0Label}
                                </div>
                                <div className="font-bold text-foreground text-sm">
                                  {amount0Text}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-muted-foreground mb-1">
                                  {token1Label}
                                </div>
                                <div className="font-bold text-foreground text-sm">
                                  {amount1Text}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                            <div className="flex items-center mb-3">
                              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                              <span className="text-sm font-semibold text-orange-700 dark:text-orange-300 uppercase tracking-wide">
                                Borrowed Liquidity
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">
                                  Liquidity
                                </div>
                                <div className="font-bold text-orange-800 dark:text-orange-200 text-sm">
                                  {formatLiquidity(entry.usedLiquidity)}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">
                                  {token0Label}
                                </div>
                                <div className="font-bold text-orange-800 dark:text-orange-200 text-sm">
                                  {usedAmount0Text}
                                </div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-orange-600 dark:text-orange-400 mb-1">
                                  {token1Label}
                                </div>
                                <div className="font-bold text-orange-800 dark:text-orange-200 text-sm">
                                  {usedAmount1Text}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    color: '#333333',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                  labelStyle={{color: '#333333', fontWeight: '600'}}
                />
                {/* Available liquidity (bottom part of stack) */}
                <Bar
                  dataKey="availableLiquidity"
                  stackId="liquidity"
                  strokeWidth={0.5}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-available-${index}`}
                      fill={getBarColor(entry.tick)}
                      stroke={getBarColor(entry.tick)}
                    />
                  ))}
                </Bar>
                {/* Used liquidity (top part of stack) */}
                <Bar
                  dataKey="usedLiquidity"
                  stackId="liquidity"
                  strokeWidth={0.5}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-used-${index}`}
                      fill={getBarColor(entry.tick)}
                      fillOpacity={0.3}
                      stroke={getBarColor(entry.tick)}
                    />
                  ))}
                </Bar>
                {currentTick !== undefined && (
                  <ReferenceLine
                    x={currentTick.rounded}
                    stroke="#ff4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    label={{value: 'Current Tick', position: 'top'}}
                  />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
