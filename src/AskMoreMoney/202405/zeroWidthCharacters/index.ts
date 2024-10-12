/*
 * @Author: HeroKing-hack 838774057@qq.com
 * @Date: 2024-10-07 13:15:25
 * @LastEditors: HeroKing-hack 838774057@qq.com
 * @LastEditTime: 2024-10-07 15:42:47
 * @FilePath: /TeacherYuan/src/AskMoreMoney/202405/zeroWidthCharacters/index.ts
 * @Description: 理解零宽字符
 * @Summary: 零宽字符（Zero-width characters）是指在文本中占用零宽度的字符，在视觉上不可见，但在处理文本时却能起到某些特定的作用; 主要有 \u200B \u200C \u200D \u200E \u200F \uFEFF
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
// 定义零宽字符
const zeroWidthSpace = '\u200B'; // 零宽空格

// 创建一个包含零宽字符的字符串
let originalString = 'Hello' + zeroWidthSpace + 'World';

// 打印原始字符串
console.log('原始字符串:', originalString); // 可见的内容是 "HelloWorld"

// 检测零宽字符
if (originalString.includes(zeroWidthSpace)) {
  console.log('字符串中包含零宽空格。');
}

// 移除零宽字符
let cleanedString = originalString.replace(zeroWidthSpace, '');
console.log('移除零宽空格后的字符串:', cleanedString); // 输出 "HelloWorld"
