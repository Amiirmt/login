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

exports.postcart = async(req,res,next)=>{

    const pakage = await Pakage.findById(req.body.pakageid)
 
    const user = await Student.findById(req.params.userid)

    const result = await Pakage.findById(pakage);

    try{
        if(!user){
            const error = new Error("not user found")
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }
        user.addcart(pakage);
        //console.log(user.cart.items[0]);
        res.status(200).json({
            massage : 'success in cart',
            user:user
        })

    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }


}