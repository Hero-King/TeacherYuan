import { isObject, deepClone, deepCloneWidthDepth } from './object';

describe('isObject test', () => {
  test('number isObject', () => {
    expect(isObject(0)).toBe(false);
  });
  test('null isObject', () => {
    expect(isObject(null)).toBe(false);
  });
  test('empty Object isObject', () => {
    expect(isObject({})).toBe(true);
  });
});

describe('deepClone function', () => {
  // 基本类型
  it('should clone basic types', () => {
    expect(deepClone(123)).toBe(123);
    expect(deepClone('string')).toBe('string');
    expect(deepClone(true)).toBe(true);
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  // Date 对象
  it('should clone Date objects', () => {
    const date = new Date();
    const clonedDate = deepClone(date);
    expect(clonedDate).toEqual(date);
    expect(clonedDate).not.toBe(date); // 不应是同一个引用
  });

  // RegExp 对象
  it('should clone RegExp objects', () => {
    const regex = /test/g;
    const clonedRegex = deepClone(regex);
    expect(clonedRegex).toEqual(regex);
    expect(clonedRegex).not.toBe(regex); // 不应是同一个引用
  });

  // 数组
  it('should clone arrays', () => {
    const arr = [1, 2, { a: 1, b: 2 }, [3, 4]];
    const clonedArr = deepClone(arr);
    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr); // 不应是同一个引用
    expect(clonedArr[2]).not.toBe(arr[2]); // 嵌套对象应该被深度克隆
    expect(clonedArr[3]).not.toBe(arr[3]); // 嵌套数组应该被深度克隆
  });

  // 对象
  it('should clone objects', () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj); // 不应是同一个引用
    expect(clonedObj.b).not.toBe(obj.b); // 嵌套对象应该被深度克隆
    expect(clonedObj.b.d).not.toBe(obj.b.d); // 更深层的嵌套对象也应该被深度克隆
  });

  // 循环引用
  it('should handle circular references', () => {
    const obj: any = { a: 1 };
    obj.self = obj; // 设置循环引用
    const clonedObj = deepClone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj); // 不应是同一个引用
    expect(clonedObj.self).toBe(clonedObj); // 循环引用应该保持不变
  });
});

describe('deepClone with depth control', () => {
  it('should clone objects within the max depth limit', () => {
    const obj = { a: { b: { c: { d: 4 } } } };
    const clonedObj = deepCloneWidthDepth(obj, new Map(), 0, 1); // 最大层级为 2

    expect(clonedObj).toEqual({
      a: {
        b: {},
      },
    }); // 超过层级 2 的对象部分会返回空
  });

  it('should clone arrays within the max depth limit', () => {
    const arr = [1, [2, [3, [4]]]];
    const clonedArr = deepCloneWidthDepth(arr, new Map(), 0, 1); // 最大层级为 2

    expect(clonedArr).toEqual([1, [2, []]]); // 超过层级 2 的数组部分会返回空数组
  });

  it('should return one level object if max depth is 0', () => {
    const obj = { a: { b: { c: 3 } } };
    const clonedObj = deepCloneWidthDepth(obj, new Map(), 0, 0);

    expect(clonedObj).toEqual({ a: {} });
  });

  it('should return one level array if max depth is 0', () => {
    const arr = [1, 2, [3, [4]]];
    const clonedArr = deepCloneWidthDepth(arr, new Map(), 0, 0);

    expect(clonedArr).toEqual([1, 2, []]);
  });

  it('should clone complex objects up to a specified depth', () => {
    const obj = {
      code: 200,
      data: [
        {
          a: { b: { c: 1 } },
          aa: [{ bb: 22, cc: { dd: 0 }, dd: [{ ff: 22 }] }],
        },
      ],
    };
    const clonedObj = deepCloneWidthDepth(obj, new Map(), 0, 2);
    const clonedObj3 = deepCloneWidthDepth(obj, new Map(), 0, 4);

    expect(clonedObj).toEqual({
      code: 200,
      data: [
        {
          a: {},
          aa: [],
        },
      ],
    }); // 超过层级 2 的部分被剪裁为空对象

    expect(clonedObj3).toEqual({
      code: 200,
      data: [
        {
          a: { b: { c: 1 } },
          aa: [{ bb: 22, cc: {}, dd: [] }],
        },
      ],
    });
  });
});
