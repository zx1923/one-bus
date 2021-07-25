
function _is(obj: any, type: string): boolean {
  return getTypeOf(obj) === type;
}

/**
 * 获取数据类型
 * 
 * @param obj 
 * @returns string 
 */
function getTypeOf(obj: any): string {
  let type = Object.prototype.toString.call(obj);
  return type.replace(/\[object\s|\]/g, '');
}

/**
 * 是否为 function
 * 
 * @param obj 被检测值
 * @returns true/false
 */
function isFunction(obj: any): boolean {
  return _is(obj, 'Function');
}

/**
 * 是否为字符串
 * 
 * @param obj 被检测对象
 */
function isString(obj: any): boolean {
  return _is(obj, 'String');
}

export {
  getTypeOf,
  isFunction,
  isString,
};