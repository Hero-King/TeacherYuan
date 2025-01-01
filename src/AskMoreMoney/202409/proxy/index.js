// 实现一个add 使得下面成立

const add = createProxy();

function createProxy(val = 0) {
  return new Proxy(
    {},
    {
      get(target, propKey) {
        if (propKey === Symbol.toPrimitive) {
          return () => val;
        } else {
          return createProxy(val + Number(propKey));
        }
      },
    },
  );
}

const r1 = add[1][2][3] + 4; // 期望结果10
const r2 = add[10][20] + 30; // 期望结果60
console.log(r1, r2);
