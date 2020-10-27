'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema   = require('mongoose').Schema;

const StudentSchema = new Schema({
    group_number: {type: Number},
	comments : {type: String, default: '', trim: true},
	photo: { type : Schema.ObjectId, ref: 'Photo_Upload'},
	createdAt: {type: Date, default: Date.now}
});


StudentSchema.statics = {

	load: function (_id, cb) {
		this.findOne({_id})
		    .populate('photo')
		    .exec(function (err, stud) {
			    cb(stud)
		    });
	},


	list: function (cb) {
		this.find({}).sort({createdAt: -1}).populate('photo').lean().exec(function (err, stud) {

			cb(stud)
		});
	},
}

StudentSchema.path('group_number').required(true, 'group_number required');
StudentSchema.path('comments').required(true, 'name required');


const Comment = mongoose.model('Comment_Section', StudentSchema);
module.exports = Comment;
