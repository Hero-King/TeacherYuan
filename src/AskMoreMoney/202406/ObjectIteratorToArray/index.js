/**
 * const [a, b] = {
  a: 3,
  b: 4,
};
console.log(a,b)    // 3,4
使得上面代码成立
 */

Object.prototype[Symbol.iterator] = function () {
  return Object.values(this)[Symbol.iterator]()
};

const [a, b] = {
  a: 3,
  b: 4,
};

console.log(a, b); // 3,4
