// 等号运算符运算和转换规则

var a;
function one() {
  let index = 1;
  a = {
    valueOf: function () {
      return index++;
    },
  };
}
one();

// 如何使下面等式成立
if (a == 1 && a == 2 && a == 3) {
  console.log('不可能得等式成立了');
}
