export type Amount = {scaled: bigint; unscaled: number; decimals: number};

export const unscaleAmount = (scaled: bigint, decimals: number): Amount => ({
  scaled,
  unscaled: Number(scaled) / 10 ** decimals,
  decimals,
});

export const scaledDiv = (amount: Amount, divisor: bigint | number): Amount =>
  unscaleAmount(amount.scaled / BigInt(divisor), amount.decimals);

export const scaledAdd = (amount1: Amount, amount2: Amount): Amount => {
  if (amount1.scaled === 0n) return amount2;
  if (amount2.scaled === 0n) return amount1;

  if (amount1.decimals !== amount2.decimals) {
    throw new Error('Amounts must have the same decimals');
  }
  return unscaleAmount(amount1.scaled + amount2.scaled, amount1.decimals);
};

export const zero = unscaleAmount(BigInt(0), 0);
