const fs = require("fs");

function isObject (obj) {
  return obj.toString() === '[object Object]';
}

function isArray (arr) {
  return Array.isArray(arr);
}

class LanguageBus {
  /**
   * 
   * @param {String} origin_path - 源语言包(基本是中文包)
   * @param encode - 默认编码方式(fs模块read/write用)
   * @param spaces - JSON保存缩进
   */
  constructor ({origin_path, encode = 'utf-8', spaces = '  '}) {
    this.encode = encode;
    this.spaces = spaces;
    // this.origin_path = origin_path;
    this.origin = this.readFile(origin_path);
    this.target = null;
  }

  /**
   * 返回目标文件拓展后的JSON字符串
   * @param {Function} transfer - 装换函数(目前只支持同步函数，待扩展)
   */
  extendJSONStr (target_path, transfer) {
    const [origin, spaces] = [this.origin, this.spaces];
    let str = '{\r' + spaces;
    let target = this.readFile(target_path);
    
    for (let k in target) {
      str += `"${k}": "${target[k]}",\r${spaces}`;
    }

    for (let k in origin) {
      let val = origin[k];
      if (transfer) val = transfer(val);
      if (!target[k]) {
        str += `"${k}": "${val}",\r${spaces}`;
      }
    }

    str = str.slice(0, -2-spaces.length) + '\r}';
    return str;
  }

  readFile (path, encode = this.encode) {
    console.log('path: ' + path);
    return JSON.parse(fs.readFileSync(path, encode));
  }

  /**
   * 将传入的指定路径文件按照new的时候传入的文件进行extend
   * 
   * @param {Array[Object|String] | String} paths [参数为对象|数组|字符串]
   *                                              - 比如 [{path: 'japanese.json'}, 'franch.json'] 或 'franch.json' 或 {path: 'franch.json'}
   * @param {String} encode [编码方式]
   */
  writeFiles (paths, encode = this.encode) {
    if (!isArray(paths)) {
      this.writeFiles([paths]);
      return;
    }
    paths.forEach(path => {
      let _path = path;
      if (!isObject(_path)) {
        _path = {path: path}
      }

      let str = this.extendJSONStr(_path.path, _path.transfer);
      fs.writeFileSync(_path.path, str, encode);
    });
  }
}

module.exports = LanguageBus;