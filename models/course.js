const mongoose = require('mongoose')
const express = require('express');
const { Schema } = require('mongoose');
const Teacher = require('./teacher')

const schema = mongoose.Schema;

const Course = new schema({

    name: {
        type: String
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    }

})

Course.methods.findco = async function() {
    console.log(Course);
    //console.log(d.courses.items);
    const dd = d.courses.items;
    for (var res in dd) {
        const name = await Course.find({ _id: dd[res].courseid })
        console.log(name);
    }
}


module.exports = mongoose.model('Course', Course);