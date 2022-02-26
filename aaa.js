// 题目：对一个只包含正整数的数组执行函数，使得数组中的值延迟对应的时间后输出
//例如[2,1,3,2]依次延后输出

//方法一：直接用next作为回调递归执行
function workByNext(arr) {
  next(0)
  function next(i) {
    let value = arr[i]

    if (value) {
      setTimeout(() => {
        console.log(value)
        next(i + 1)
      }, value * 1000)
    }
  }
}

// workByNext([1, 1, 1, 1])
// workByNext([2,1,3,2])
// workByNext([1,2,3,4,5])

// 方法二：用generator模拟await
function workByGen(arr) {
  function* gen() {
    for (let a of arr) {
      yield a
    }
  }

  function co(gen) {
    let g = gen()

    function next() {
      let result = g.next()
      if (!result.done) {
        setTimeout(() => {
          console.log(result.value)
          next()
        }, result.value * 1000)
      }
    }
    next()
  }
  co(gen)
}
// workByGen([1, 1, 1, 1])
// workByGen([2,1,3,2])
// workByGen([1,2,3,4,5])

// 方法三：promise+await
function workByPro(arr) {
  async function execPro() {
    let proArr = arr.map(function (a) {
      return function () {
        return new Promise(function (res, rej) {
          setTimeout(() => {
            console.log(a)
            res()
          }, a * 1000)
        })
      }
    })
    for (let p of proArr) {
      await p()
    }
  }
  execPro().then()
}
// workByPro([1, 1, 1, 1])
// workByPro([2,1,3,2])
// workByPro([1,2,3,4,5])