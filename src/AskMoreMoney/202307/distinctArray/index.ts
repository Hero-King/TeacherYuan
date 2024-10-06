// 对象数组去重, 只要对象中所有属性相同, 则表示相同的对象
import { isObject } from '@/utils/object/object';

const array = [
  {
    a: 1,
    b: 2,
  },
  {
    b: 2,
    a: 1,
  },
  {
    a: 1,
    b: 2,
    c: {
      a: 1,
      b: 2,
    },
  },
  {
    b: 2,
    a: 1,
    c: {
      b: 2,
      a: 1,
    },
  },
];

export function equals(a: any, b: any) {
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }
  if (a === b) {
    return true;
  }
  const akeys = Object.keys(a);
  const bkeys = Object.keys(b);
  if (akeys.length !== bkeys.length) {
    return false;
  }
  for (const key in a) {
    if (!(key in b)) {
      return false;
    }
    const res = equals(a[key], b[key]);
    if (!res) {
      return false;
    }
  }
  return true;
}

export function distinctArray(arr = array) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (equals(arr[i], arr[j])) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
