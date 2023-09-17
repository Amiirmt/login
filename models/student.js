const mongoose = require('mongoose')
const express = require('express');
const Logger = require('nodemon/lib/utils/log');


const schema = mongoose.Schema;

const Student = new schema({

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
        }]
    },
    uploadexam: {
        items: [{
            exam: {
                type: schema.Types.ObjectId,
                ref: 'Exam'
            },
            name: {
                type: String
            },
            fileuploaded: {
                type:String
            }
        }]
    },
    cart:{
        items:[{
            pakage:{
                type:Object,
                ref :'Pakage'
            }
            }
        ]
    }
});

Student.methods.addco = function(x) {
    const index = this.courses.items.findIndex(cp => {
        return cp.courseid.toString() === x.toString();
    });
    const update = [...this.courses.items];
    update.push({
        courseid: x,
        name: x.name
    })
    const updated = {
        items: {...update._doc}
    };
    this.courses = updated;


    this.save();
}

Student.methods.addcart = function(x) {
    const index = this.cart.items.findIndex(cp => {
        return cp.pakage._id.toString() === x._id.toString();
    });
    const update = [...this.cart.items];
    update.push({
        pakage: {...x},
        
    })
    const updated = {
        items: update
    };
    this.cart =updated;

    this.save();
    

}



module.exports = mongoose.model('Student', Student);