
/**
 * 等待指定的时间/等待指定表达式成立
 * 如果未指定等待条件则立刻执行
 * 注: 此实现在 nodejs 10- 会存在宏任务与微任务的问题，切记 async-await 本质上还是 Promise 的语法糖，实际上并非真正的同步函数！！！即便在浏览器，也不要依赖于这种特性。
 * @param param 等待时间/等待条件
 * @returns Promise 对象
 */
function wait(param) {
  return new Promise(resolve => {
    if (typeof param === 'number') {
      setTimeout(resolve, param)
    } else if (typeof param === 'function') {
      const timer = setInterval(() => {
        if (param()) {
          clearInterval(timer)
          resolve()
        }
      }, 100)
    } else {
      resolve()
    }
  })
}

/**
 * 将一个异步函数包装为具有时序的异步函数
 * 注: 该函数会按照调用顺序依次返回结果，后面的调用的结果需要等待前面的，所以如果不关心过时的结果，请使用 {@link switchMap} 函数
 * @param fn 一个普通的异步函数
 * @returns 包装后的函数
 */
function mergeMap(fn) {
  // 当前执行的异步操作 id
  let id = 0
  // 所执行的异步操作 id 列表
  const ids = new Set()
  return new Proxy(fn, {
    async apply(_, _this, args) {
      const prom =  Reflect.apply(_, _this, args)
      const temp = id
      ids.add(temp)
      id++
      await wait(() => !ids.has(temp - 1))
      ids.delete(temp)
      // console.log( prom )
      return await prom
    },
  })
}

;(async () => {
  // 模拟一个异步请求，接受参数并返回它，然后等待指定的时间
  async function get(ms) {
    await wait(ms)
    return ms
  }
  const fn = mergeMap(get)
  let last = 0
  let sum = 0
  await Promise.all([
    fn(30).then(res => {
      last = res
      sum += res
    }),
    fn(20).then(res => {
      last = res
      sum += res
    }),
    fn(10).then(res => {
      last = res
      sum += res
    }),
  ])
  console.log(last)
  // 实际上确实执行了 3 次，结果也确实为 3 次调用参数之和
  console.log(sum)
})()