var activityController = require('./config/activity');
var Activity = require('./models/Activity');

module.exports = function(app,passport){

	//home
	app.get('/',function(req,res){
		res.render('index')
	});

	//get activities
// 	app.get('/activity', function(req,res){
// 	// res.render('activity');
// 	Activity.find(function(err,Activity){
// 		if(err)
// 			console.log(err);
// 		else
// 			//res.json(activity);
	
// });

	//get activity result
	app.get('/activity_result',function(req,res){
		res.render('activity_result');
	});

	//get login form
	app.get('/login',function(req,res){
		res.render('login',{message:req.flash('loginMessage')})
	});

	//get the signup form
	app.get('/signup' ,function(req,res){
		res.render('signup',{message: req.flash('singupMessage')});
	});


	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    

     //process the login form
	 app.post('/login',passport.authenticate('local-login',{
      	successRedirect : '/profile',
      	failureRedirect : '/login',
      	failureFlash : true //allow failure flash message 
      	//(failure messages are as written in the login method in passport.js file)
      }));

	 //get profile
	 app.get('/profile',function(req,res){
	 	res.render('profile');
	 })


	 //logout
	app.get('/logout', function(req,res){
		req.logout();
		res.redirect('/');
	});

};

function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/')
}