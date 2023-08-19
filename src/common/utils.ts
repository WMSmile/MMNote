export function hello(){

}

/**
 * 生成n位数字字母混合字符串
 * @param n 长度
 * @returns  string
 */
export function generateMixed(n: number) {
    var chars = ['0','1','2','3','4','5','6','7','8','9',
                'A','B','C','D','E','F','G','H','I','J','K','L','M',
                'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
    for(var i = 0; i < n ; i++) {
       var id = Math.floor(Math.random()*36);
       res += chars[id];
    }
    return res;
  }
   