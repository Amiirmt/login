const mongoose = require('mongoose')
const express = require('express');

const schema = mongoose.Schema;

const User = new schema({

    name: {
        type: String
    },
    namekarbary: {
        type: String
    },
    password: {
        type: String
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


module.exports = mongoose.model('User', User);