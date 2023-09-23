const mongoose = require('mongoose')
const express = require('express');
const Course = require('../models/course');
const Logger = require('nodemon/lib/utils/log');

const schema = mongoose.Schema;

const Teacher = new schema({

    name: {
        type: String
    },
    namekarbary: {
        type: String
    },
    password: {
        type: String
    },
    type: {
        type: String
    },
    courses: {
        items: [{
            courseid: {
                type: schema.Types.ObjectId,
                ref: 'Course'
            },
            name: {
                type: String
            }
        }],

    }
});

Teacher.methods.addco = async function(x) {
    // const index = this.courses.items.findIndex(async cp => {
    //     return cp.courseid.toString() === x.toString();
    // });
    
    const name = await Course.findById(x);
    
    const updatee =[...this.courses.items];
     updatee.push({
        courseid: x,
        name: name.name
    })
    // const updated = {
    //     items: updatee,
    // };
    this.courses = { items: updatee };
    this.save();
}
Teacher.methods.updateco = async function(x) {
    // const index = this.courses.items.findIndex(async cp => {
    //     return cp.courseid.toString() === x.toString();
    // });
    
    const name = await Course.findById(x);
    
    const updatee =[...this.courses.items];
     updatee.push({
        courseid: x,
        name: name.name
    })
    // const updated = {
    //     items: updatee,
    // };
    this.courses = { items: updatee };
    //this.save();
}
module.exports = mongoose.model('Teacher', Teacher);