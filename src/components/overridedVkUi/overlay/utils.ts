export const createIterator = (prefix: string) => {
  let currentId = 1;
  return () => `${prefix}-${currentId++}`;
};
