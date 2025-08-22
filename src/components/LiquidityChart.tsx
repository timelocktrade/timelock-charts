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
import {useCurrentPrice} from '~/hooks/useCurrentPrice';
import {useCurrentTick} from '~/hooks/useCurrentTick';
import {usePoolData} from '~/hooks/usePoolData';
import {type Amount, scaledAdd, scaledDiv} from '~/lib/numberUtils';

import type {LiquidityPosition} from '~/lib/timelock';
import {batchGetPriceAtTick} from '~/lib/uniswap';

interface LiquidityChartProps {
  positions: LiquidityPosition[];
  currentTick?: number;
}

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

      const prices = await batchGetPriceAtTick(ticks);
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
    let totalAmount0 = positions[0].amount0;
    let totalAmount1 = positions[0].amount1;
    let totalUsedAmount0 = positions[0].usedAmount0;
    let totalUsedAmount1 = positions[0].usedAmount1;

    for (let i = 1; i < positions.length; i++) {
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

export function LiquidityChart({positions}: LiquidityChartProps) {
  const currentTick = useCurrentTick();
  const currentPrice = useCurrentPrice();

  const poolData = usePoolData();
  const priceData = usePriceData(positions);

  const {totalAmount0, totalAmount1, totalUsedAmount0, totalUsedAmount1} =
    useTVL(positions);

  const chartData = useChartData(positions, priceData, currentTick.rounded);

  if (chartData.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-gray-400">
        No liquidity positions to display
      </div>
    );
  }

  const getBarColor = (tick: number) => {
    if (currentTick.rounded === undefined) return '#6666a8';
    if (tick === currentTick.rounded) return '#cc4444';
    if (tick < currentTick.rounded) return '#6666a8';
    if (tick > currentTick.rounded) return '#cc6666';
  };

  const token0Label = poolData?.tokens[0].symbol || 'Token0';
  const token1Label = poolData?.tokens[1].symbol || 'Token1';

  return (
    <div className="w-full">
      <div className="my-8 rounded-lg space-y-2">
        <div className="text-md font-medium text-gray-400">
          Current Price: {currentPrice?.unscaled.toFixed(2)} {token1Label}/{token0Label}
        </div>
        <div className="text-md font-medium text-gray-400">
          Current Tick: {currentTick.exact?.toFixed(2)}
        </div>
      </div>
      <div className="my-8 rounded-lg space-y-2">
        <div className="text-md font-medium text-gray-400">
          TVL: {totalAmount0?.unscaled.toFixed(2)} {token0Label},{' '}
          {totalAmount1?.unscaled.toFixed(2)} {token1Label}
        </div>
        <div className="text-md font-medium text-gray-400">
          Borrowed: {totalUsedAmount0?.unscaled.toPrecision(2)} {token0Label},{' '}
          {totalUsedAmount1?.unscaled.toPrecision(2)} {token1Label}
        </div>
      </div>

      {/* Color Legend */}
      <div className="flex items-center gap-6 my-8 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="flex flex-col w-4 h-4">
            <div className="w-4 h-2 bg-[#6666a8] opacity-30 rounded-t"></div>
            <div className="w-4 h-2 bg-[#6666a8] rounded-b"></div>
          </div>
          <span className="text-sm font-medium text-gray-400">
            {token1Label} (Top: Used, Bottom: Available)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col w-4 h-4">
            <div className="w-4 h-2 bg-[#cc6666] opacity-30 rounded-t"></div>
            <div className="w-4 h-2 bg-[#cc6666] rounded-b"></div>
          </div>
          <span className="text-sm font-medium text-gray-400">
            {token0Label} (Top: Borrowed, Bottom: Available)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <div className="w-0.5 h-1.75 mb-0.5 bg-[#ff4444] border-dotted border-1 border-[#ff4444]"></div>
            <div className="w-0.5 h-1.75 bg-[#ff4444] border-dotted border-1 border-[#ff4444]"></div>
          </div>
          <span className="text-sm font-medium text-gray-400">
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
            />
            <YAxis tickFormatter={formatLiquidity} />
            <Tooltip
              formatter={(value: number, name: string) => {
                let displayName = '';
                if (name === 'usedLiquidity') displayName = 'Borrowed Liquidity';
                else if (name === 'availableLiquidity')
                  displayName = 'Available Liquidity';
                else if (name === 'totalLiquidity')
                  displayName = 'Total Liquidity';

                return [formatLiquidity(value), displayName];
              }}
              labelFormatter={(tick: number) => {
                const entry = chartData.find(d => d.tick === tick);
                const priceText =
                  'Price: ' + (entry?.price?.toFixed(2) || 'N/A');

                const amount0Text = entry?.amount0.unscaled
                  ? `| ${token0Label}: ${formatAmount(entry.amount0.unscaled)}`
                  : '';

                const amount1Text = entry?.amount1.unscaled
                  ? `| ${token1Label}: ${formatAmount(entry.amount1.unscaled)}`
                  : '';

                return `Tick: ${tick} ${amount0Text} ${amount1Text} | ${priceText}`;
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
            <Bar dataKey="usedLiquidity" stackId="liquidity" strokeWidth={0.5}>
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
    </div>
  );
}
