//题目：http://poj.org/problem?id=1091
//提示：http://www.cnblogs.com/tekkaman/p/3732098.html
//思路：先求公约数，然后生成组合，求每个组合的公约数是否为1，为1的输出该数组


//求两个数的最大约数
function few(a, b) {
	if (b > a) {
		var d = a;
		a = b;
		b = d;
	}
	var c = (a % b);
    return c == 0 ? b : few(b, c)
}
//console.log(few(100,22))


//求多个数的最大约数
function more(arr) {
	var result = arr[0];
	for (var i = 1; i < arr.length; i++) {
		result = few(result, arr[i])
	}
	return result;
}
//console.log(more([44,78,66666656,8888888,120,45]));


//生成数组
function array(m) {
	var arr = [];
	for (var i = 1; i <= m; i++) {
		arr.push(i);
	}
	return arr;
};
//console.log(array(10));


//生成所有排列
function rank(arr, num, result, ret) {
	if (!result) {
		result = [];
	}
	if (!ret) {
		ret = [];
	}
	if (result.length == num) {
		ret.push(result.slice(0));
	} else {
		for (var i = 0; i < arr.length; i++) {
			result.push(arr[i]);
			rank(arr, num, result, ret);
			result.pop();
		}
	};
	return ret;
}
//console.log(rank([1,2,3],3))


//最后调用各个函数
function hehe(m, n) {
	var arr = array(m);                 //生成数组
	var ran = rank(arr, n);            //生成所有排列
	for (var i = 0; i < ran.length; i++) {
		ran[i].push(m);
	}
	for (var i = 0; i < ran.length; i++) {
		var ret = more(ran[i]);         //来循环每种排列判断其约数是否为1
		if (ret === 1) {
			console.log(ran[i])          //在另存的二维数组中来找出这些符合条件的数组
		}
	}
}
hehe(4, 2)



