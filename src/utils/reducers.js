export const reduceTotal = (sales) => {
  const total = sales.map((s) => Number(s.total)).reduce((a, b) => a + b,0);
  return total;
};
