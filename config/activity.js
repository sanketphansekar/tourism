var Activity = require('../models/Activity');

var getActivity = function(req,res){
	// res.render('activity');
	Activity.find(function(err,Activity){
		if(err)
			console.log(err);
		else
			res.json(activity);
	});
}
;
var selectActivity = function(req,res){
	Activity.findOne({ _id : req.params.activity_id },function(err,activity){
		if(err)
			res.send(err);
		else{
			activity.status = true;
			activity.save();
		}
		
	});


};