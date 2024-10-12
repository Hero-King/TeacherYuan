/*
 * @Author: HeroKing-hack 838774057@qq.com
 * @Date: 2024-10-11 20:30:36
 * @LastEditors: HeroKing-hack 838774057@qq.com
 * @LastEditTime: 2024-10-11 20:54:30
 * @FilePath: /TeacherYuan/src/AskMoreMoney/202405/bitOperateHandleAuth/index.ts
 * @Description: 位运算处理用户权限
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
const auth1 = 0b1
const auth2 = 0b10
const auth3 = 0b100
const auth4 = 0b1000


// 判断权限 与运算之后还是自身说明存在权限
export const hasAuth = (auth: number, targetAuth: number) => {
  return (auth & targetAuth) === targetAuth
}

// 切换权限 异或运算
export const switchAuth = (auth: number, targetAuth: number) => {
    return auth ^ targetAuth
}