const express = require('express');
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const path = require('path');
const { log } = require('console');
const { name } = require('ejs');
const teacher = require('../models/teacher');

exports.getdashboard = (req, res) => {

    console.log(req.params.userid);

    Teacher.findOne({ _id: req.params.userid }).then(teachdoc => {

        if (teachdoc) {

            console.log(teachdoc.namekarbary);
            const teacher = teachdoc.namekarbary;

            res.render('dashboard', {
                path: '/dashbord',
                pagetitle: ' داشبورد ' + teacher + '',
                user: teacher
            });
        }
        Student.findOne({ _id: req.params.userid }).then(studoc => {

            if (studoc) {

                console.log(studoc.namekarbary);
                const student = studoc.namekarbary;

                res.render('dashboard', {
                    path: '/dashbord',
                    pagetitle: ' داشبورد ' + student + '',
                    user: student
                });
            }

        })

    })
}