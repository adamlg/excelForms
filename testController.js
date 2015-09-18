angular.module('liveTester',[])
.controller('codeCtrl', function($scope){
	$scope.code="function add(a,b){return a+b}"

	$scope.runTests = function(){
		// console.log($scope.code)
		window.eval($scope.code)
		// console.log(add(1,2))
	}



})
.controller('testCtrl', function($scope){

	console.log('testCtrl')
	$scope.tests=[{code:''}]

	$scope.newTest = function() {$scope.tests.push({code:''})}

	$scope.result = function(text){
		var testedItem = text.replace(/\s+/g,'').split(/[=<>]+/)[0]
		return eval(text) === true ? 'True' : 'False!  '+testedItem+' is equal to '+eval(testedItem)
	}


})