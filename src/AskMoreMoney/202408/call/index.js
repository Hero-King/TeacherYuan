const r = console.log.call.call.call.call.call.call.apply((a) => a, [1, 2]);
// => ((a) => a).call(1,2)
console.log(r); // 2
