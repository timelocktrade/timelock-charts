const promises: {[key: string]: Promise<unknown>} = {};

export const acquire = async (label: string) => {
  let resolve: ((value?: unknown) => void) | null = null;

  const lastPromise = promises[label];
  const newPromise = new Promise(_resolve => {
    resolve = _resolve;
  });

  promises[label] = (async () => {
    lastPromise && (await lastPromise);
    await newPromise;
  })();

  await lastPromise;

  return () => {
    delete promises[label];
    resolve!();
  };
};

export const isAcquired = (label: string): boolean => !!promises[label];

const mutex = {acquire, isAcquired};

export default mutex;
