export const declension = (
  count: number,
  one: string,
  some: string,
  many: string
) => {
  const mod100 = count % 100;
  const mod10 = count % 10;

  if (mod100 >= 5 && mod100 <= 20) {
    return many;
  }

  if (mod10 === 1) {
    return one;
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return some;
  }

  return many;
};
