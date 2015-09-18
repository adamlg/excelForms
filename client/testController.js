angular.module('liveTester',[])
.controller('codeCtrl', function($scope){
	// $scope.code="function add(a,b){return a+b}"

	$scope.runTests = function(){
		try { window.eval($scope.code) } catch(e) { return }

		var testCtrl = $scope.$$nextSibling
		testCtrl.tests.forEach(testCtrl.update)
	}

	$scope.checkCode = function(keypress){
		if(keypress.which===10 && keypress.ctrlKey) $scope.runTests()
	}

})
.controller('testCtrl', function($scope){

	$scope.tests=[{code:'',result:'Your test\'s result will be shown here.', status:'tomato'}]

	$scope.newTest = function(item) {
		var place = $scope.tests.indexOf(item)+1
		$scope.tests = $scope.tests.slice(0,place).concat({code:'',result:'Your test\'s result will be shown here.', status:'tomato'},$scope.tests.slice(place))
	}

	$scope.removeTest=function(item) {
		var place = $scope.tests.indexOf(item)
		$scope.tests.splice(place,1)
	}

	$scope.result = function(test){
		try { eval(test.code) } catch(e) { 
			test.status='tomato' 
			return 'Error: '+e.message 
		}
		var testedItem = test.code.replace(/\s+/g,'').split(/[=<>]+/)[0]

		if(eval(test.code) === true) {
			test.status='lightgreen'
			return 'True'
		} else {
			test.status='tomato'
			return 'False!  '+testedItem+' is equal to '+eval(testedItem)
		}
	}

	$scope.update = function(test){
		test.result=$scope.result(test)
	}

	$scope.enterCheck = function(keycode,test){if(keycode===13) $scope.update(test)}

})