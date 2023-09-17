const mongoose = require('mongoose')
const express = require('express');
const { Schema } = require('mongoose');

const schema = mongoose.Schema;

const pakage = new schema({

    name: {
        type: String
    },
    teacher:{
        type: String
    },
    price:{
        type: String
    },
    file:{
        type: String
    }

})



module.exports = mongoose.model('Pakage', pakage);