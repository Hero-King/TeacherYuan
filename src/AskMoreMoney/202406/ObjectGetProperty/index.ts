const obj: Record<string, any>= {};

// 两种方式的区别到底是什么??
obj.name = 'João'; // [[GET]](obj, 'name', obj); 最后一个参数为this指向
obj['name'] = 'Maria'; // [[GET]])(obj, name是Symbol ? name : String(name), obj)

let test = {
  toString() {
    return 'aaa';
  },
};

// @ts-ignore
test[test] = 'xxx';

console.log(test); // { aaa: 'xxx' }

export {};
