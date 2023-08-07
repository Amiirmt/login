const express = require('express');
const User = require('../models/model')
const path = require('path');
const { log } = require('console');
const { name } = require('ejs');

exports.getsignup = (req, res) => {

    res.render('signup', {
        path: '/signup',
        pagetitle: 'ورود'
    });

}


exports.postsignup = (req, res) => {


    User.findOne({ password: req.body.password }).then(userdoc => {

        if (userdoc) {
            return res.redirect("/signup");
        }


        const user = new User({

            name: req.body.name,
            password: req.body.password,
            namekarbary: req.body.namekarbary


        })
        return user.save().then(() => {
            console.log('create');
        }).catch(err => {
            console.log(err);
        })
    })



}


exports.getlogin = (req, res) => {

    res.render('login', {
        path: '/signup',
        pagetitle: 'ورود'
    })

}


exports.postlogin = (req, res) => {

    const namekarbary = req.body.namekarbary;
    const password = req.body.password;

    User.findOne({
        password: password,
        namekarbary: namekarbary

    }).then(userdoc => {

        if (userdoc) {

            console.log("password is correct and welcome");


        } else {

            console.log("password or namekarbary is incorrect");
            return res.redirect("/signup")

        }
    })

}