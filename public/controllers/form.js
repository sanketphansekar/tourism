

var formController = function formController($scope){

	//to save all form data in an object 
	$scope.formData = {};
	//function to process the form
	$scope.processForm = function(){
		alert('done');
	};
}
var activityController = function activityController($scope){
	scope.activities = [{activity:'bungee jumping',interested:'false'},
						{activity:'rope climbing',interested:'false'},
						{activity:'cart racing',interested:'false'}

	]
}