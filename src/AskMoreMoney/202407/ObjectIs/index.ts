// Object.is() 确定两个值是否为相同值。

/**
 * 判断两个值是否相同；等价于Object.is()
 * @param x
 * @param y
 * @returns boolean
 */
const hasChanged = (x: unknown, y: unknown) => {
  if (x === y) {
    // +0 === -0 但是+0 和 -0表现不一样，认为不相等
    return x === 0 && 1 / x !== 1 / (y as number);
  } else {
    // Nan === Nan 为false；但是表现一致，认为相等
    return x === x || y === y;
  }
};
