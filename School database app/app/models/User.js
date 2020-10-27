const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    surname: {
        type:String, required:true},
    student_name: {
        type:String, required:true},
    student_id: {
        type:String, required:true},
    password: {
        type:String,
        required: true
    },
    date: {type: Date,
        default:Date.now }
});

UserSchema.statics = {

	list: function (cb) {
		this.find({}).sort({createdAt: -1}).exec(function (err, students) {
			cb(students)
		});
	}


	
}

const User = mongoose.model("User", UserSchema);
console.log('new_student model create');
module.exports = User;