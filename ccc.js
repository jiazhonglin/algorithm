//动态规划
let w = [2, 1, 3, 4]
let v = [4, 2, 3, 100]
let tw = 4
let goodNum = 4

function best() {
    let result = Array(tw + 1).fill(0)
    let resultArr = Array(tw + 1).fill([])
    for (let j = 0; j < goodNum; j++) {
        for (let i = tw; i > 0; i--) {
            if (w[j] <= i) {
                if ((v[j] + result[i - w[j]]) > result[i]) {
                    resultArr[i] = resultArr[i - w[j]].concat([j])
                }
                result[i] = Math.max(v[j] + result[i - w[j]], result[i])
            }
        }
        console.log(result)
        console.log(resultArr)
    }
    return result[tw]
}
console.log(best())
