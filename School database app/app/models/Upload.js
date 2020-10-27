'use strict';


const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const UploadSchema = new Schema({
    
    relatedId : {type: Schema.ObjectId},
    type: {type:String},
    filename: {type: String},
    originalname: {type: String},
    size: {type:Number},
    createdAt: {type: Date, default:Date.now}
});


UploadSchema.path('relatedId').required(true, 'Article title cannot be blank');
UploadSchema.path('filename').required(true, 'Article body cannot be blank');
UploadSchema.path('originalname').required(true, 'Article body cannot be blank');
UploadSchema.path('size').required(true, 'Article body cannot be blank');

mongoose.model("Photo_Upload", UploadSchema);
