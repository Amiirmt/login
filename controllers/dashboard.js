const express = require('express');
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const Course = require('../models/course')
const path = require('path');
const { log, error } = require('console');
const { name } = require('ejs');

exports.getdashboard = async(req, res) => {

    //console.log(req.params.userid);

    Teacher.findById({ _id: req.params.userid }).then(async teachdoc => {

        if (teachdoc) {
            const updateUser = async(req, res) => {
                try {
                    const { userid } = req.params;
                    const user = await Teacher.findByIdAndUpdate({ _id: userid });
                    //console.log(user.courses.items);
                    const courses = user.courses.items;

                    // Create an array to store the rendered results
                    const renderedResults = [];

                    for (const course of courses) {
                        renderedResults.push({
                            path: '/dashboard',
                            pagetitle: `داشبورد ${user.namekarbary}`,
                            user: user.namekarbary,
                            name: course.name
                        });
                    }
                    //console.log(user);
                    // Render all the results at once
                    res.render('dashboard', {
                        path: '/dashboard',
                        pagetitle: `داشبورد ${user.namekarbary}`,
                        user: user,
                        courses: renderedResults
                    });
                } catch (error) {
                    // Handle any errors
                    console.error(error);
                }

            };
            // Call the function

            updateUser(req, res);
        }
    });




    Student.findOne({ _id: req.params.userid }).then(studoc => {

        if (studoc) {

            const updateUser = async(req, res) => {
                try {
                    const { userid } = req.params;
                    const user = await Student.findByIdAndUpdate({ _id: userid });
                    //console.log(user.courses.items);
                    const courses = user.courses.items;

                    // Create an array to store the rendered results
                    const renderedResults = [];

                    for (const course of courses) {
                        renderedResults.push({
                            path: '/dashboard',
                            pagetitle: `داشبورد ${user.namekarbary}`,
                            user: user.namekarbary,
                            name: course.name
                        });
                    }
                    //console.log(user);
                    // Render all the results at once
                    res.render('dashboard', {
                        path: '/dashboard',
                        pagetitle: `داشبورد ${user.namekarbary}`,
                        user: user,
                        courses: renderedResults
                    });
                } catch (error) {
                    // Handle any errors
                    console.error(error);
                }

            };
            // Call the function

            updateUser(req, res);
        }

    });
}