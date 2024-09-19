import { equals, distinctArray } from './index';

test('equals number', () => {
  expect(equals(1, 1)).toBe(true);
  expect(equals(1, 2)).toBe(false);
});

test('equals Object', () => {
  expect(equals({}, {})).toBe(true);
  expect(equals({ a: 1, b: 2 }, { b: 2 })).toBe(false);
  expect(equals({ b: 2 }, { a: 1, b: 2 })).toBe(false);
  expect(equals({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
});

test('distinctArray', () => {
  expect(distinctArray()).toEqual([
    { a: 1, b: 2 },
    { a: 1, b: 2, c: { a: 1, b: 2 } },
  ]);
});
