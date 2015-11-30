angular.module('liveTester',[])
.directive('formItem', [
	'$compile',
	function($compile) {

		var group = $('.elements')

		return {
			restrict: 'E',
			templateUrl: 'testTemplate.html', 
			link: function(scope, elem, attrs) {
				scope.initial = 'initial' in attrs;

				scope.children = []

				scope.$watchGroup([
						function() {return scope.children.reduce(function(total,item) {return total + +item.percentage},0)},
						function() {return scope.children.length > 0}
					],
					function(vals) {
						if(!vals[1]) return;
						if(vals[0] < 100) console.log('less than 100',vals[0]);
						if(vals[0] > 100) console.log('more than 100',vals[0]);
					}
				)

				scope.actualElement = elem
				if( !('root' in attrs) ) {
					$(elem).css({
						'left':'15px',
						'position':'relative'
					});
				}

				scope.percentage = 0
				scope.$watchGroup(['$parent.dollars','percentage'], function(){
					scope.dollars = scope.$parent ? scope.percentage * scope.$parent.dollars : 0
				})

				//eventually, move this functionality into a single button at the top of the form
				scope.newElem = function() {
					var newItem = $('<form-item root></form-item>')
					group.append(newItem)
					$compile(newItem)(scope.$new(true))
				}

				scope.newChild = function() {
					var newItem = $('<form-item></form-item>')
					elem.append(newItem)
					$compile(newItem)(scope.$new(true))
					scope.children.push(newItem.scope())
				}

				scope.removeElem = function() {
					elem.remove();
					scope.$destroy()
				}

			}
		}
	}
])

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