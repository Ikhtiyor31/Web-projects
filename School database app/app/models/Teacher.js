const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    teacher: {
        type:String, required:true},
    surname: {
        type:String, required:true},
    name: {
        type:String, required:true},
    teacher_id: {
        type:String, required:true},
    password: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    }
});

const Teacher = mongoose.model("new_teachers", TeacherSchema);
console.log('new_teachers model created');
module.exports = Teacher;