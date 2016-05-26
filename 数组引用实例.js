var arr1 = [];

var arr2 = [1,2,3,4];

arr1.push(arr2);
console.log('first');
console.log(arr1);
console.log('second')
arr2.pop();
console.log(arr1);
console.log('third');
var arr1Copy = arr1.concat();
arr1Copy[0].pop();
console.log(arr1);
http://blog.csdn.net/dyllove98/article/details/9336579