import { hasAuth, switchAuth } from './index';

test('判断权限', () => {
  expect(hasAuth(0b111001, 0b1)).toBe(true);
  expect(hasAuth(0b111001, 0b10)).toBe(false);
});

test('切换权限', () => {
  expect(switchAuth(0b111001, 0b1)).toBe(0b111000); // 去除权限
  expect(switchAuth(0b111001, 0b100)).toBe(0b111101); // 添加权限
  expect(switchAuth(0b111101, 0b100)).toBe(0b111001);
});