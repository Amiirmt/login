const express = require('express');
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const Course = require('../models/course');
const Pakage = require('../models/pakage');
const path = require('path');
const { log } = require('console');
const { name } = require('ejs');

exports.getsignup = (req, res) => {


    res.render('signup', {
        path: '/signup',
        pagetitle: 'ثبت نام'
    });

}

exports.postsignup = async(req, res) => {

    if (req.body.type === 'teacher') {

        const dars = (req.body.co).split(',');

        for (var item in dars) {
            //console.log(dars[item]);

            const codoc = await Course.findOne({ name: dars[item] });
            if (codoc) {
                //console.log('this is exist');
                const coid = codoc._id;
            }
            if (!codoc) {

                const corse = new Course({

                    name: dars[item]

                })
                corse.save().then(async() => {
                    console.log('create in database');

                }).catch(err => {
                    console.log(err);
                })
            }
        }



        Teacher.findOne({ password: req.body.password }).then(async teachdoc => {
            //if (teachdoc) {
            //console.log('this is exist');
            //return res.redirect("/login");
            //}
            const teacher = new Teacher({

                name: req.body.name,
                password: req.body.password,
                namekarbary: req.body.namekarbary,
                type: req.body.type,
            })
            teacher.save()
                .then(() => {
                    res.redirect("/login");
                })
                .then(async() => {

                    for (var res in dars) {

                        const codoc = await Course.findOne({ name: dars[res] });
                        Course.findById(codoc._id).then(cc => {

                            teacher.addco(cc);
                            //console.log(teacher.courses.items);
                        })

                    }
                }).catch(err => {
                    console.log(err);
                })
        })

    }

    if (req.body.type === 'student') {

        const dars = (req.body.co).split(',');

        for (var item in dars) {
            //console.log(dars[item]);

            const codoc = await Course.findOne({ name: dars[item] });
            if (codoc) {
                //console.log('this is exist');
                const coid = codoc._id;
            }
            if (!codoc) {

                const corse = new Course({

                    name: dars[item]

                })
                corse.save().then(async() => {
                    console.log('create in database');

                }).catch(err => {
                    console.log(err);
                })
            }
        }



        Student.findOne({ password: req.body.password }).then(async studoc => {

            //if (studoc) {
            // console.log('this is exist');
            //return res.redirect("/login");
            //}

            const student = new Student({

                name: req.body.name,
                password: req.body.password,
                namekarbary: req.body.namekarbary,
                type: req.body.type,


            })
            student.save().then(() => {
                    res.redirect("/login");
                })
                .then(async() => {

                    for (var res in dars) {

                        const codoc = await Course.findOne({ name: dars[res] });
                        Course.findById(codoc._id).then(cc => {

                            student.addco(cc);
                            //console.log(teacher.courses.items);
                        });
                    }


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
    if (password === '123' & namekarbary === '123') {
        return res.redirect("/admin/addpakage/" + password + "");
    }


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
                //res.redirect("/selectcourse");


            } else {

                console.log("password or namekarbary is incorrect");
                return res.redirect("/signup")

            }
        })
    }
}


exports.getaddpakage = (req, res) => {

    res.render('addpakage', {
        path: '/admin/addpakage',
        pagetitle: 'addpakage'
    })
}



exports.postaddpakage = (req, res) => {
    console.log(req.body);
    Pakage.findOne({
        name: req.body.namepakage,
        teacher: req.body.teacherpakage
    }).then(pakdoc => {
        if (pakdoc) {
            console.log('this pakage is exist');
            return res.redirect('/admin/addpakage/123')
        }
        const pakage = new Pakage({

                name: req.body.namepakage,
                teacher: req.body.teacherpakage,
                price: req.body.price
            })
            /*pakage.save().then(() => {
            console.log('create');
            res.redirect('/admin/addpakage/123');
        }).catch(error => {
            console.log(error);
        })*/
    })
}