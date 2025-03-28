export function isObject(a: any) {
  return typeof a === 'object' && a !== null;
}

export const deepClone = <T>(obj: T, map = new Map()): T => {
  if (obj === null || typeof obj !== 'object') return obj;

  // 检查是否已经克隆过该对象（处理循环引用）
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj) as T;
  }

  // 处理 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj) as T;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const clonedArray: any[] = [];
    map.set(obj, clonedArray); // 将当前数组放入 map 中
    obj.forEach((item) => {
      clonedArray.push(deepClone(item, map));
    });
    return clonedArray as T;
  }

  // 处理普通对象
  const clonedObj: { [key: string]: any } = {};
  map.set(obj, clonedObj); // 将当前对象放入 map 中
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key], map);
    }
  }

  return clonedObj as T;
};

export const deepCloneWidthDepth = <T>(
  obj: T,
  map = new Map(),
  depth = 0,
  maxDepth = Infinity,
): T => {
  if (obj === null || typeof obj !== 'object') return obj;

  // 如果已经超过最大层级，返回空数据
  if (depth > maxDepth) {
    return Array.isArray(obj) ? ([] as T) : ({} as T);
  }

  // 检查是否已经克隆过该对象（处理循环引用）
  if (map.has(obj)) {
    return map.get(obj);
  }

  // 处理 Date 对象
  if (obj instanceof Date) {
    return new Date(obj) as T;
  }

  // 处理 RegExp 对象
  if (obj instanceof RegExp) {
    return new RegExp(obj) as T;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    const clonedArray: any[] = [];
    map.set(obj, clonedArray); // 将当前数组放入 map 中
    obj.forEach((item) => {
      clonedArray.push(deepCloneWidthDepth(item, map, depth + 1, maxDepth));
    });
    return clonedArray as T;
  }

  // 处理普通对象
  const clonedObj: { [key: string]: any } = {};
  map.set(obj, clonedObj); // 将当前对象放入 map 中
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepCloneWidthDepth(
        (obj as { [key: string]: any })[key],
        map,
        depth + 1,
        maxDepth,
      );
    }
  }

  return clonedObj as T;
};

export const deepCloneMy = (object: any) => {
  const _clone = (obj: any, map = new Map()) => {
    if (!isObject(obj)) {
      return obj;
    }
    if (map.has(obj)) {
      return map.get(obj);
    }
    if (obj instanceof Date) {
      return new Date(obj);
    }
    if (obj instanceof RegExp) {
      return new RegExp(obj);
    }
    if (obj instanceof Map) {
      const cloned = new Map();
      map.set(obj, cloned);
      for (const [key, value] of obj) {
        cloned.set(key, _clone(value, map));
      }
      return cloned;
    }
    if (obj instanceof Set) {
      const cloned = new Set();
      map.set(obj, cloned);
      for (const value of obj) {
        cloned.add(_clone(value, map));
      }
      return cloned;
    }
    const cloned = Array.isArray(obj)
      ? []
      : Object.create(Object.getPrototypeOf(obj));
    map.set(obj, cloned);
    Object.keys(obj).forEach((key) => {
      cloned[key] = _clone(obj[key], map);
    });
    return cloned;
  };
  return _clone(object);
};
