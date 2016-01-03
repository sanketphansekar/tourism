var mongoose = require('mongoose');

var activitySchema = mongoose.Schema({
	activity:{
		name: String,
		status: Boolean
	}
});

module.exports = mongoose.model('Activity', activitySchema);