const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 并发请求
 * @param {Function[]} reqList 并发请求
 * @param {number} maxNum 最大并发数
 */
function concurRequest(reqList: Function[], maxNum: number) {
  return new Promise((resolve) => {
    const result: any[] = [];
    let nextIndex = 0;
    let completed = 0;
    function request() {
      const cb = reqList[nextIndex];
      const index = nextIndex;

      cb()
        .then((res: any) => {
          result[index] = res;
          if (nextIndex < reqList.length) {
            request();
          }
        })
        .finally(() => {
          completed++;
          if (completed === reqList.length) {
            resolve(result);
          }
        });
      nextIndex++;
    }
    for (let i = 0; i < Math.min(reqList.length, maxNum); i++) {
      request();
    }
  });
}

const reqList = [];
for (let i = 0; i < 10; i++) {
  reqList.push(async function () {
    console.log(`start request ${i}`);
    await sleep((Math.random() + 2) * 1000);
    console.log(`end request ${i}`);
    return 20 - i;
  });
}

concurRequest(reqList, 3).then(console.log);
