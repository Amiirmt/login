const mongoose = require('mongoose')
const express = require('express');
const { Schema } = require('mongoose');

const schema = mongoose.Schema;

const exam = new schema({

    nameexam: {
        type: String
    },
    time: {
        type: String,
    },
    file: {
        type:String
    }

});

module.exports = mongoose.model('Exam', exam);