const mongoose = require('mongoose')
const express = require('express');
const { Schema } = require('mongoose');

const schema = mongoose.Schema;

const Pakage = new schema({

    name: {
        type: String
    },
    teacher: {
        type: String,
    },
    price: {
        type: String
    }

});

module.exports = mongoose.model('Pakage', Pakage);