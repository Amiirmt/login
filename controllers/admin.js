const express = require('express');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Course = require('../models/course');
const Pakage = require('../models/pakage');
const Exam = require('../models/exam');
const multer = require('multer');
var upload = multer({dest:'./uploads/'});
const fs= require('fs');
const path = require('path');
const { log } = require('console');
const { name } = require('ejs');
const Logger = require('nodemon/lib/utils/log');


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
            if (teachdoc) {
            console.log('this is exist');
            return res.redirect("/login");
            }
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
                res.status(200).json({
                  user:teachdoc
                })
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

exports.getpakage = async(req,res,next)=>{
    try{

        const pakage  = await Pakage.find({});
        if(!pakage){
            const error = new Error("not found");
            error.statusCode = 402;
            console.log(error);
            throw error; 
        }
        res.status(200).json({
            massage: 'ypur pakage',
            pakage:pakage
        })

    }
    catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
} 

exports.addpakage = async(req, res,next) => {
   try{
    const name = req.body.namepakage;
    const teacher = req.body.teachername;
    const price = req.body.price;
    const file = req.file

    const result = await Pakage.findOne({
        file:file.path,
    })
    for(var i in result) {
        if(result[i].file){
            const error = new Error("this file is exist")
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }
    }
   
    const pakage = new Pakage({
        name:name,
        teacher:teacher,
        price:price,
        file:file.path
    })

    await pakage.save();
    res.status(200).json({
        massage : 'success save pakage',
        pakage : pakage
    })
   }catch(err){
    if(!err.statusCode){
        err.status=500;
       }
       next(err);
   }
}

exports.updatepakage = async(req,res,next)=>{
    try{
        const name = req.body.namepakage;
        const teacher = req.body.teachername;
        const price = req.body.price;
        const file = req.file
    
        const pakage = await Pakage.findById(req.params.pakageid)
        if(!pakage){
            const error = new Error("this file not found")
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }
        if(file.path !== pakage.file){
            await clearfile(pakage.file);
            pakage.file = file.path;
         }
        
            pakage.name=name
            pakage.teacher=teacher
            pakage.price=price
                    
         await pakage.save();
        res.status(200).json({
            massage : 'success save pakage',
            pakage : pakage
        })
       }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
       }
}


const clearfile=async(file) => {

    file= path.join(__dirname,'..',file);

    if(await fs.existsSync(file)){

       await fs.unlinkSync(file,(err)=>{
            throw err;
        });
        console.log('file cleared');
    }
    else{
        console.log('file not found');
    }


}

exports.deletepakage = async(req,res,next)=>{
    try{
       
        const pakage = await Pakage.findById(req.params.pakageid)

        if(!pakage){
            const error = new Error("not found")
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }
        clearfile(pakage.file)
        await Pakage.deleteOne({_id: req.params.pakageid});
        
        res.status(200).json({
            massage: 'file is deleted',
           
        })
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
}


exports.getorder = async(req,res,next)=>{

    try{
       
       
        const students = await Student.find({});

        let orders = [];
        
        let std = [];

        for(let student of students ){
            
                result = {...student._doc}
                delete result.courses
                delete result.cart
                delete result.uploadexam
                delete result.password
                std.push(result); 
                orders.push(student.cart);
           
        }
        
        res.status(200).json({
            massage: 'orders',
            student : std,
            orders:orders

        })
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }

}

exports.getteacher = async(req,res,next)=>{

    try{
       
        const teacher = await Teacher.find({});
        if(!teacher){
            const error = new Error("not teacher found")
            error.statusCode = 402;
            console.log(error);
            throw error; 
        }
       
        res.status(200).json({
            massage: 'all teacher',
            teacher:teacher
        })
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
}

exports.addteacher = async(req,res,next)=>{

    try{
       
        const teachername = req.body.name;
        const teacher_namekarbary = req.body.namekarbary;
        const teacher_password= req.body.password;
        const teacher_courses = req.body.course;
        
        const teach = await Teacher.findOne({
            name:teachername
        })
        if(teach){
            const error = new Error("this teacher is exist")
            error.statusCode = 402;
            console.log(error);
            throw error; 
        }
        
        
        const teacher = new Teacher({
            name:teachername,
            namekarbary:teacher_namekarbary,
            password:teacher_password,
        })
        let courses=[];

        for(var item of teacher_courses.split(',')){
            //console.log(item);
            let res = await Course.find({
                name:item
            })
           
            courses.push(res[0]._id)
        }
        for(var i in courses){
             await teacher.addco(courses[i].toString());
         
        }
        
        res.status(200).json({
            massage: 'added',
            teacher:teacher
        })
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
}

exports.updeteteacher=async(req,res,next)=>{
    try{
       
        const teacherid = req.params.userid;
        const name = req.body.name;
        const namekarbary = req.body.namekarbary;
        const password = req.body.password;
        const courses = req.body.course;
        const teacher = await Teacher.findById(teacherid);

        if(!teacher){
            const error = new Error("not teacher found")
            error.statusCode = 402;
            console.log(error);
            throw error; 
        }
       
        if(name){
            teacher.name=name;
            
        }
        if(namekarbary){
            teacher.namekarbary=namekarbary;
           

        }
        if(password){
            teacher.password=password;
          

        }
        if(courses){
            let course=[];
           
            teacher.courses.items=[];
           
            for(var item of courses.split(',')){

                let res = await Course.find({
                    name:item
                })
                course.push(res[0]._id)
            }
            for(var i in course){
                await teacher.updateco(course[i].toString());
         
            }
        }    
        await teacher.save();   
        res.status(200).json({
            massage: 'updated',
            teacher:teacher
        })
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
}


exports.deleteteacher = async(req,res,next)=>{

    try{
       
        const teacherid = req.body.teacher
        const teacher = await Teacher.findById(teacherid);
        if(!teacher){
            const error = new Error("not teacher found")
            error.statusCode = 402;
            console.log(error);
            throw error; 
        }
        await Teacher.deleteOne(teacher._id);
        
        res.status(200).json({
            massage: 'updated',
            teacher:await Teacher.find({})
        })
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }

}

exports.getcourse = async(req,res,next)=>{
   
    try{
       
        const course = await Course.find({});
        if(!course){

          const error = new Error("not courses found")
            error.statusCode = 402;
            console.log(error);
            throw error;
        }
        res.status(200).json({
            massage:'corses accept',
            course:course
        })
        
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
}


exports.addcourse = async(req,res,next)=>{

    try{
       
        const name = req.body.name;
        const course = await Course.findOne({
            name:name
        })
        if(course){

          const error = new Error("this courses exist")
            error.statusCode = 402;
            console.log(error);
            throw error;
        }
        const co = new Course({
            name :name
        })
        await co.save()

        res.status(200).json({
            massage:'corses accept',
            course:co
        })
        
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
}

exports.deletecorse = async(req,res,next)=>{

    try{
       
        const courseid = req.body.course;
        const course = await Course.findById(courseid)
        if(!course){

          const error = new Error("not courses found")
            error.statusCode = 402;
            console.log(error);
            throw error;
        }
        
        await Course.deleteOne(course._id);

        res.status(200).json({
            massage:'deleted ',
            courses:await Course.find({})
        })
        
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
}





