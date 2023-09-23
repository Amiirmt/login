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

exports.postcart = async(req,res,next)=>{

    const pakage = await Pakage.findById(req.body.pakage)
 
    const user = await Student.findById(req.body.user)

    try{
        if(!user){
            const error = new Error("not user found")
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }
        user.addcart(pakage);
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


exports.deletecart = async(req,res,next)=>{
    
    const user = await Student.findById(req.body.user);

    const pakageid = req.body.pakage;
    
    try{
        if(!user){
            const error = new Error("not user found")
            error.statusCode = 402;
            console.log(error);
            throw error; 
        }
        for(var i = 0; i < user.cart.items.length; i++){
            if(user.cart.items[i].pakage._id.toString() === pakageid){
                user.cart.items.splice(i, 1);
                i--;
            }
        }
        await user.save();
        res.status(200).json({
            massage: 'file is deleted',
            cart:user.cart.items
        })
    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }

}


exports.getmyshopping= async(req,res,next)=>{
    
    try{

        const studentid = req.body.user
        const student = await Student.findById(studentid)

        if(!student){
            const error = new Error("not this user found")
            error.statusCode = 402;
            console.log(error);
            throw error; 
        }
        
        
        res.status(200).json({
            message: 'your shopping',
            cart : student.cart.items,
        });

    }catch(err){
        if(!err.statusCode){
            err.status=500;
           }
           next(err);
    }
    
}
