// 必包提权漏洞
const obj = (() => {
  const inner = {
    a: 1,
    b: 2,
  };
  return {
    get(key) {
      return inner[key];
    },
  };
})();
console.log(obj.get('a')); // 1

// 问题：怎么能在不改变上面代码的情况下，修改inner对象

Object.defineProperty(Object.prototype, 'hack', {
  get() {
    return this;
  },
});
console.log(obj.get('hack')); // { a: 1, b: 2 } 访问到必包内部变量了！！！

// 如何避免?  使用Object.create(null)创建对象
