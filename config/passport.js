var LocalStrategy = require('passport-local').Strategy; //requiring strategy for package 'passport-local'
var User = require('../models/User'); //require user model || user model contains user schema


module.exports = function(passport){
	//serializing user
	passport.serializeUser(function(user,done){
		done(null,user.id);
	});
	//deserializing user
	passport.deserializeUser(function(user,done){
		 User.findById(id, function(err, user) {
            done(err, user);
        });
		});

	//signup strategy


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField : 'password',
		passReqToCallback : true
	},

	function(req,email,password,done){
		process.nextTick(function(){ //functionto wait for the response

			User.findOne({'email': email}), 
			function(err,user){
				if(err)
					return done(err);

				if(user){
					return done(null, false , req.flash('signupMessage','email already in use'));
				}else{
					var newUser = new User(); 

					newUser.email = email;
					newUser.password = newUser.generateHash(password); //genearting salt password

					//save the new user
					newUser.save(); 
				}
			}
		})
	}

	));


	//login strategy

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback : true
	},
	function(req,email,password,done){
		User.findOne({'email': email}),
		function(err,user){
			if(err)
				return done(err);
			if(!user){
				return done(null,false,req.flash('loginMessage','User not found'));
			}else if(!user.validPassword(password)){
							return done(null,false,req.flash('loginMessage','password \'t match'));}
							return done(null,user);
				
		}
	}

	));

}