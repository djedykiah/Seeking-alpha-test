export const resolveAfter = <T>(value: T, delay: number): Promise<T> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), delay);
  });
