const mongoose = require('mongoose')
const express = require('express');

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
    }


});

//const testt = mongoose.model('User', User);

//async function create() {

//   const test = new testt({

//     name: "amir",
//   namekarbary: "qwe",
// password: "123"


// })

//const vv = await test.save();

//console.log(vv);

//}

//create();

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
        items: update
    };
    this.courses = updated;


    this.save();


}



module.exports = mongoose.model('Student', Student);