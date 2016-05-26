var arr = [[1, 2, 3], [4], [5, 6], [7, 8, 9, 0]]
function combition(arr, num, temporary, result) {
	num = !num ? 0 : num
	temporary = !temporary ? [] : temporary
	result = !result ? [] : result
	if (temporary.length == arr.length) {
		result.push(temporary.slice(0))

		return false
	}
	for (var i = 0; i < arr[num].length; i++) {
		temporary.push(arr[num][i])
		num++;
		combition(arr, num, temporary, result)
		temporary.pop();
		num--;
	}
	return result
}
console.log(combition(arr), combition(arr).length)

