angular.module('liveTester',[])
.controller('codeCtrl', function($scope){
	// $scope.code="function add(a,b){return a+b}"

	$scope.runTests = function(){
		window.eval($scope.code)

		var testCtrl = $scope.$$nextSibling
		testCtrl.tests.forEach(testCtrl.update)
	}

})
.controller('testCtrl', function($scope){

	$scope.tests=[{code:'',result:'Your test\'s result will be shown here.'}]

	$scope.newTest = function(item) {
		var place = $scope.tests.indexOf(item)+1
		$scope.tests = $scope.tests.slice(0,place).concat({code:'',result:'Your test\'s result will be shown here.'},$scope.tests.slice(place))
	}

	$scope.result = function(text){
		try { eval(text) } catch(e) { return 'Error: '+e.message }
		var testedItem = text.replace(/\s+/g,'').split(/[=<>]+/)[0]
		return eval(text) === true ? 'True' : 'False!  '+testedItem+' is equal to '+eval(testedItem)
	}

	$scope.update = function(test){
		test.result=$scope.result(test.code)
	}

	$scope.enterCheck = function(keycode,test){if(keycode===13) $scope.update(test)}

})