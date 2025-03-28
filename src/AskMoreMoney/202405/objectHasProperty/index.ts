/*
 * @Author: HeroKing-hack 838774057@qq.com
 * @Date: 2024-10-07 12:45:25
 * @LastEditors: HeroKing-hack 838774057@qq.com
 * @LastEditTime: 2024-10-07 15:42:29
 * @FilePath: /TeacherYuan/src/AskMoreMoney/202405/objectHasProperty/index.ts
 * @Description: 对象是否存在某个属性判断
 * @Summary:
 * in 运算符 ==> 会检查对象及其原型链中是否存在该属性
 * hasOwnProperty 方法 ==> 只检查对象本身是否拥有该属性, 不检查是否可枚举
 * Object.keys() ==> 只返回对象自身的可枚举属性
 * Object.getOwnPropertyNames() ==> 返回对象自身的所有属性，包括不可枚举属性
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

// 原始函数形式构造器 Object.keys不获取原型上属性
function Test() {}
Test.prototype.aa = 'aa';

// @ts-ignore
const test = new Test();
test.bb = 0;
Object.defineProperty(test, 'cc', {
  value: 'cc',
  enumerable: false,
});

function getOwnProperty(obj: any) {
  for (const key in obj) {
    console.log('for in 遍历出来的key:', key);
  }
  console.log('====object.keys(obj)====', Object.keys(obj));
  console.log(
    'Object.getOwnPropertyNames(obj):',
    Object.getOwnPropertyNames(obj),
  );
  console.log('Reflect.ownKeys(obj)', Reflect.ownKeys(obj));
  console.log(
    "Object.prototype.hasOwnProperty.call(obj, 'cc')",
    Object.prototype.hasOwnProperty.call(obj, 'cc'),
  );
}

getOwnProperty(test);
