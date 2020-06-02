'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    cpf:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    senha:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('User',schema);