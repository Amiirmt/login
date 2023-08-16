const express = require('express');
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const path = require('path');
const { log } = require('console');
const { name } = require('ejs');
const teacher = require('../models/teacher');

exports.getsignup = (req, res) => {


    res.render('signup', {
        path: '/signup',
        pagetitle: 'ثبت نام'
    });

}


exports.postsignup = (req, res) => {

    if (req.body.type === 'teacher') {

        Teacher.findOne({ password: req.body.password }).then(teachdoc => {

            if (teachdoc) {
                console.log('this is exist');
            }

            const teacher = new Teacher({

                name: req.body.name,
                password: req.body.password,
                namekarbary: req.body.namekarbary,
                type: req.body.type


            })
            return teacher.save().then(() => {
                console.log('create in database');
                res.redirect("/login")

            }).catch(err => {
                console.log(err);
            })
        })

    }

    if (req.body.type === 'student') {

        Teacher.findOne({ password: req.body.password }).then(studoc => {

            if (studoc) {
                console.log("this is exist");
            }

            const student = new Student({

                name: req.body.name,
                password: req.body.password,
                namekarbary: req.body.namekarbary,
                type: req.body.type


            })
            return student.save().then(() => {
                console.log('create in database');
                res.redirect("/login")
            }).catch(err => {
                console.log(err);
            })
        })

    }


}


exports.getlogin = (req, res) => {

    res.render('login', {
        path: '/login',
        pagetitle: 'ورود'
    })

};


exports.postlogin = (req, res) => {

    const namekarbary = req.body.namekarbary;
    const password = req.body.password;


    if (req.body.type === 'teacher') {

        Teacher.findOne({
            password: password,
            namekarbary: namekarbary

        }).then(teachdoc => {

            if (teachdoc) {

                console.log("password is correct and welcome");
                res.redirect("/dashboard/" + teachdoc._id + "");


            } else {

                console.log("password or namekarbary is incorrect");
                return res.redirect("/signup")

            }
        })
    }
    if (req.body.type === 'student') {

        Student.findOne({
            password: password,
            namekarbary: namekarbary

        }).then(studoc => {

            if (studoc) {

                console.log("password is correct and welcome");
                res.redirect("/dashboard/" + studoc._id + "");


            } else {

                console.log("password or namekarbary is incorrect");
                return res.redirect("/signup")

            }
        })
    }
}