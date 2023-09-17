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
const pakage = require('../models/pakage');
const { removeAllListeners } = require('process');

exports.gethome = async(req,res,next)=>{
    try{
       
        const tcount = await Teacher.count();

        const scount = await Student.count();

        const ecount = await Exam.count();
                        
        res.status(200).json({
            massage1: 'count teachers',
            Teacher:tcount,
            massage2: 'count students',
            Student:scount,
            massage3: 'count exams',
            Exam:ecount

        })
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }

}