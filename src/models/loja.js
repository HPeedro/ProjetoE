'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new  Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    active:{
        type:Boolean,
        default:true
    }
});
module.exports = mongoose.model('Loja',schema);