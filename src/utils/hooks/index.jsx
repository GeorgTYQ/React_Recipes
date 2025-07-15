// 导出一个函数useStyle，用于处理样式]
//传入一串class list，用于拆分，并且map
// 导出一个函数，用于获取样式
// 导出一个函数useStyle，接收一个参数styles
export function useStyle(styles){

  // 返回一个函数，接收一个参数className
  return (className) =>{

    // 如果className不存在，则返回
    if(!className) return;

    // 如果className是字符串类型
    if(typeof className === 'string'){

      // 将className按空格分割成数组，遍历数组，如果styles中存在name，则返回styles[name]，否则返回name，最后将数组用空格连接成字符串返回
      return className.split(' ').map(name =>styles[name] || name).join(' ')
    }

    // 如果className是数组类型
    if(Array.isArray(className)){
      // 过滤掉数组中的空值，遍历数组，如果styles中存在name，则返回styles[name]，否则返回name，最后将数组用空格连接成字符串返回
      return className.filter(Boolean).map(name => style[name] || name).join(' ')
    }

    // 如果className是对象类型
    if(typeof className === 'object'){
      // 遍历对象，如果对象的值是true，则返回键值对，最后将键值对用空格连接成字符串返回
      
      return Object.entries(className).filter(([_, condition]) => Boolean(condition)).map(([name]) => styles[name] || name).join(' ')
    }
  }
}