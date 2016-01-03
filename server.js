//require npm modules 

var express = require('express'); //runs server
var path = require('path'); //defining path for default directories 
var bodyParser = require('body-parser');
var hbs = require('hbs'); //to set and use html files w/o using .html
var passport = require('passport'); //for user authentication
var session = require('express-session'); //for sessions -- not used--
var morgan = require('morgan'); // to log all get-post methods in console
var cookieParser = require('cookie-parser'); //handles cookies
var mongoose = require('mongoose'); // to connect to the mongodb database
var flash = require('connect-flash'); // middleware to flash messages


//require controllers
var app = express();


//requiring passport.js file 
require('./config/passport')(passport);


//public folder static karneka
app.use(express.static(path.join(__dirname,'public')));


//mongoose connection
mongoose.connect('mongodb://localhost:1234/tourism'); //mongodb server port 1234 | set it using>> mongodb --port 1234
mongoose.connection.on('error',function(){
	console.error('MongoDB server not connected');
});


//setting up express application
app.use(morgan('dev')); 
app.use(cookieParser()); //handling cookies
app.use(bodyParser());
app.use(flash()); //use connect-flash package
app.set('views', path.join(__dirname, 'public/views')); //setting default views path
app.set('view engine','html'); //setting html as default
app.engine('html',hbs.__express);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
                {
                    extended: true
                }));
 // app.use(express.session({ secret: 'keyboard cat' }));  //not needed 



//settings for passport package
app.use(session({secret: 'yayayhappynewyear'}));
app.use(passport.initialize());
app.use(passport.session()); //passport session initialization 



//load all the routes
require('./routes.js')(app,passport);



//server listening to port 3000
app.listen(3000);