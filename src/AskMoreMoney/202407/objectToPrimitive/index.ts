// @ts-nocheck
// js中的强制类型转换： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#%E5%BC%BA%E5%88%B6%E7%B1%BB%E5%9E%8B%E8%BD%AC%E6%8D%A2
console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
console.log([1, 2] + [3, 4]); // "1,23,4"
console.log([1, 2] + {}); // "1,2[object Object]"
console.log([1, 2] + 3); // "1,23"
console.log([1, 2] + true); // "1,2true"
console.log([1, 2] + false); // "1,2false"
console.log([1, 2] + null); // "1,2null"
console.log([1, 2] + undefined); // "1,2undefined"
console.log([1, 2] + 0); // "1,20"
console.log([1, 2] + ''); // "1,2"

const obj = {
  [Symbol.toPrimitive]: function (hint) {
    return hint === 'string' ? 'hello' : 123;
  },
};
console.log([] + obj, 12 + obj); // "123" 135
