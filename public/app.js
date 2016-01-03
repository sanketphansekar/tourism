

//Creating angular app.js and animating

angular.module('formApp',['ngAnimate','ui.router','ngRoute'])

//routes

.config(function($stateProvider,$urlRouterProvider){
	$stateProvider
	//route to show our basic form
	.state('form',{
		url:'/form',
		templateUrl:'views/form.html',//path for html page in the directory
		controller:'formController'
	})

 	// nested states
 	// URL will be nested like (/form/login)

 	//rendering login

 	.state('form.login',{
 		url:'/login',
 		templateUrl:'views/login.html'

 	})

 	//rendering activities

 	.state('form.activity',{
 		url:'/activity',
 		templateUrl:'views/activity.html'
 	})

 	//rendering selected activities 
 	.state('form.activity_result',{
 		url:'/activity_result',
 		templateUrl:'views/activity_result.html'
 	});

	//catch all routes 
 	//send users to the form page

 	$urlRouterProvider.otherwise('/form/login')

})