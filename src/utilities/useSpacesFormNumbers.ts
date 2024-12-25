export const useSpacesFromNumbers = (val: number | string) => {
  const strVal = val.toString();
  let result = "";

  for (let i = 0; i < strVal.length; i++) {
    // Добавляем пробел между каждыми тремя цифрами, начиная с конца
    if (i > 0 && (strVal.length - i) % 3 === 0) {
      result += " ";
    }
    result += strVal[i];
  }

  return result;
};
