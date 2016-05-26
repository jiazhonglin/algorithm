//生成系数数组
function array2(m) {
	var arr = [];
	for (var i = -m; i <= 0; i++) {
		arr.push(i);
	};
	for (var i = 1; i <= m; i++) {
		arr.push(i);
	};
	return arr;
};
//console.log(array2(10));



//生成卡片数组
function array(m) {
	var arr = [];
	for (var i = 1; i <= m; i++) {
		arr.push(i);
	}
	return arr;
};
//console.log(array(10));



//生成所有卡片
function rank(arr, num, result, ret) {
	result = result || [];
	ret = ret || [];
	if (result.length == num) {
		ret.push(result.slice(0));

	} else {
		for (var i = 0; i < arr.length; i++) {
			result.push(arr[i]);
			rank(arr, num, result, ret);
			result.pop();
		};
	}
	return ret;
}
//console.log(rank([1,2,3],3))



//找出一个卡片上可以成功的情况
function test(m, n) {
	ran = rank(array(m), n);
	for (var i = 0; i < ran.length; i++) {
		ran[i].push(m);
	}
	coe = rank(array2(m - 1), n + 1);
	var result = 0;
	for (var x = 0; x < ran.length; x++) {
		for (var y = 0; y < coe.length; y++) {
			for (var z = 0; z <= n; z++) {
				result += (ran[x][z] * coe[y][z]);
			}
			if (result == -1) {
				console.log("[" + ran[x] + "]" + "*" + "[" + coe[y] + "]")
			}
			result = 0
		}
	}
};
//test(4, 2)