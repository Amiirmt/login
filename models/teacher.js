const mongoose = require('mongoose')
const express = require('express');

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

Teacher.methods.addco = function(x) {
    const index = this.courses.items.findIndex(async cp => {
        return cp.courseid.toString() === x.toString();
    });
    const updatee = [...this.courses.items];
    const update = [];
    //console.log(x);
    updatee.push({
        courseid: x,
        name: x.name
    })
    const updated = {
        items: updatee,
    };
    this.courses = updated;

    this.save();
}
module.exports = mongoose.model('Teacher', Teacher);