const mongoose = require('mongoose')
const express = require('express');
const { Schema } = require('mongoose');
const Teacher = require('../models/teacher');

const schema = mongoose.Schema;

const exam = new schema({

    nameexam: {
        type: String
    },
    creator:{
        type : Object,
        ref:'Teacher'
    },
    time: {
        type: String,
    },
    file: {
        type:String
    }

});

module.exports = mongoose.model('Exam', exam);