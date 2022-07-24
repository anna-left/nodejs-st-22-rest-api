export function getFunctionCompare(key: string) {
  return (element1, element2) => {
    const lowerElement1 = element1[key].toLowerCase();
    const lowerElement2 = element2[key].toLowerCase();
    if (lowerElement1 < lowerElement2) {
      return -1;
    }
    if (lowerElement1 > lowerElement2) {
      return 1;
    }
    return 0;
  };
}
