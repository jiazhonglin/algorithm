let schedule = [{
  start: '9:30',
  end: '10:30'
}, {
  start: '9:00',
  end: '10:30'
}, {
  start: '9:00',
  end: '11:30'
}, {
  start: '10:30',
  end: '12:00'
}, {
  start: '10:00',
  end: '12:00'
}, ]

// function bestSchedule(schedule) {
//   schedule = transform(schedule)
//   let dp = Array(7).fill(0)
//   let result = Array(7).fill(Array(7))
//   for (let i = 1; i < 7; i++) {
//     if (schedule[i]) {
//       for (let s of schedule[i]) {
//         let a = Math.max(dp[i - 1], s.length + dp[s.start], dp[i])
//         if (a !== dp[i]) {
//           if (s.length + dp[s.start] > dp[i - 1]) {
//             let a = result[s.start].concat([s])
//             result[i] =a
//           } else {
//             result[i] = result[i - 1]
//           }
//         }
//         dp[i] = a
//       }
//     } else {
//       result[i] = result[i - 1]
//       dp[i] = dp[i - 1]
//     }
//   }
//   console.log(result)
//   console.log(dp[6])
// }

// function transform(schedules) {
//   let result = {}
//   for (let s of schedules) {
//     let start = (s.start.split(':')[0] - 9) * 2 + (s.start.split(':')[1] === '30' ? 1 : 0)
//     let end = (s.end.split(':')[0] - 9) * 2 + (s.end.split(':')[1] === '30' ? 1 : 0)
//     let length = end - start
//     result[end] = result[end] || []
//     result[end].push({
//       start,
//       length
//     })
//   }
//   return result
// }
// bestSchedule(schedule)




function bestSchedule(schedule) {
  //拿到最大的end和最小的start
  //初始化dp
  // {时间：{最大时长，最优解}}
  // 循环dp 状态转移  
  //输出dp最后的值
  let startTime = '9:00'
  let endTime = '12:00'
  let dp = calcuDurationDp(startTime, endTime)
  let newSchedule = {}
  let pre = 0
  let preResult = []
  for (let s of schedule) {
    newSchedule[s.end] = newSchedule[s.end] ? newSchedule[s.end].concat([s]) : [s]
  }
  for (let a of Object.keys(dp)) {
    if (newSchedule[a]) {
      for (let b of newSchedule[a]) {
        let length = calcuDurationByLesson(b.start, b.end)
        let max = Math.max(pre, dp[b.start].num + length, dp[a].num)
        if (max !== dp[a].num) {
          if (max == pre) {
            dp[a].result = preResult
          } else {
            dp[a].result =dp[b.start].result.concat([b])
          }
        }
        dp[a].num = max
      }
      preResult = dp[a].result
      pre = dp[a].num
    }
    dp[a].num = pre
    dp[a].result = preResult
  }
  console.log(dp)
}

function calcuDurationByLesson(startTime, endTime) {
  let num = 0
  while (startTime != endTime) {
    let arr = startTime.split(':')
    if (arr[1] == "30") {
      arr[0]++
      arr[1] = '00'
    } else {
      arr[1] = '30'
    }
    num++
    startTime = arr.join(':')
  }
  return num
}

function calcuDurationDp(startTime, endTime) {
  let dp = {}
  while (startTime != endTime) {
    dp[startTime] = {
      num: 0,
      result: []
    }
    let arr = startTime.split(':')
    if (arr[1] == "30") {
      arr[0]++
      arr[1] = '00'
    } else {
      arr[1] = '30'
    }
    startTime = arr.join(':')
  }
  dp[endTime] = {
    num: 0,
    result: []
  }
  return dp
}
bestSchedule(schedule)