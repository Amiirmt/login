const express = require('express');
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const Course = require('../models/course');
const Exam = require('../models/exam');
const path = require('path');
const fs= require('fs');
const multer = require('multer');
var upload = multer({dest:'./uploads/'})
const { log, error } = require('console');
const { name } = require('ejs');

exports.getdashboard = async(req, res) => {

    //console.log(req.params.userid);

    Teacher.findById({ _id: req.params.userid }).then(async teachdoc => {

        if (teachdoc) {
            
            // const updateUser = async(req, res) => {
            //     try {
            //         const { userid } = req.params;
            //         const user = await Teacher.findByIdAndUpdate({ _id: userid });
            //         //console.log(user.courses.items);
            //         const courses = user.courses.items;

            //         // Create an array to store the rendered results
            //         const renderedResults = [];

            //         for (const course of courses) {
            //             renderedResults.push({
            //                 path: '/dashboard',
            //                 pagetitle: `داشبورد ${user.namekarbary}`,
            //                 user: user.namekarbary,
            //                 name: course.name
            //             });
            //         }
            //         //console.log(user);
            //         // Render all the results at once
            //         res.render('dashboard', {
            //             path: '/dashboard',
            //             pagetitle: `داشبورد ${user.namekarbary}`,
            //             user: user,
            //             courses: renderedResults
            //         });
            //     } catch (error) {
            //         // Handle any errors
            //         console.error(error);
            //     }

            // };
    const updateUser = async(req, res) => {
    try {
        const { userid } = req.params;
        const user = await Teacher.findByIdAndUpdate({ _id: userid });

        // Extract courses
        const courses = user.courses.items;

        // Transform the course list
        const transformedResults = courses.map(course => ({
          
            user: user.namekarbary,
            name: course.name
        }));
       
        res.status(200).json({
            user: user.namekarbary,
            courses: transformedResults
        });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: 'Server error' });  
    }
};
            updateUser(req, res);
        }
    });


    Student.findOne({ _id: req.params.userid }).then(studoc => {

        if (studoc) {

            // const updateUser = async(req, res) => {
            //     try {
            //         const { userid } = req.params;
            //         const user = await Student.findByIdAndUpdate({ _id: userid });
            //         //console.log(user.courses.items);
            //         const courses = user.courses.items;

            //         // Create an array to store the rendered results
            //         const renderedResults = [];

            //         for (const course of courses) {
            //             renderedResults.push({
            //                 path: '/dashboard',
            //                 pagetitle: `داشبورد ${user.namekarbary}`,
            //                 user: user.namekarbary,
            //                 name: course.name
            //             });
            //         }
            //         //console.log(user);
            //         // Render all the results at once
            //         res.render('dashboard', {
            //             path: '/dashboard',
            //             pagetitle: `داشبورد ${user.namekarbary}`,
            //             user: user,
            //             courses: renderedResults
            //         });
            //     } catch (error) {
            //         // Handle any errors
            //         console.error(error);
            //     }

            // };
            // // Call the function

            const updateUser = async(req, res) => {
                try {
                    const { userid } = req.params;
                    const user = await Student.findByIdAndUpdate({ _id: userid });
            
                    // Extract courses
                    const courses = user.courses.items;
                    // Transform the course list
                    const transformedResults = courses.map(course => ({
                      
                        user: user.namekarbary,
                        name: course.name
                    }));
                   
                    res.status(200).json({
                        user: user.namekarbary,
                        courses: transformedResults
                    });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: 'Server error' });  
                }
            };
                        updateUser(req, res);
        }      

    });

}

exports.createexam = async(req,res,next) => {

    const nameexam = req.body.nameexam;
    const time = req.body.time;
    const file = req.file; 
    
    try{
        //const cp = await Exam.findOne({$or: [{nameexam: nameexam}, {file: file.path}]});
       // console.log(cp);

       const cp = await Exam.findOne({ file: file.path});
        if(cp){
            const error = new Error("this file is exit")
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }       
        const exam = new Exam({

            nameexam: nameexam,
            time : time,
            file:file.path
        }) 
        exam.save();
        const result =  await Exam.find({});
        console.log(result);
        res.status(200).json({
            massage:'create in databse',
            exams:result
        });

    }catch(err){
       if(!err.statusCode){
        error.status=500;
       }
       next(err);
    }
}


exports.updateexam=async(req,res,next)=>{

    const idexam = req.body.idexam; 
    const nameexam = req.body.nameexam;
    const time = req.body.time;
    const file = req.file; 

    try{
       
        const exam = await Exam.findOne({_id:idexam})

        if(!exam){
            const error = new Error("not found")
            error.statusCode = 404;
            console.log(error);
            throw error; 
                
        }
        if(file.path !== exam.file){
           await clearfile(exam.file);
           exam.file = file.path;
        }

        exam.nameexam = nameexam
        exam.time = time
           

        await exam.save()
        res.status(200).json({
            massage: 'updated successfully',
            exam: exam
        })


    }
    
    catch(err){
        if(!err.statusCode){
            error.status=500;
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

exports.deletedexam=async(req,res,next) => {

    try{
        const nameexam = req.body.nameexam;
        const time = req.body.time;
        const file = req.file;     
        const idexam = req.body.idexam; 

        const exam = await Exam.findById(idexam)

        if(!exam){
            const error = new Error("not found")
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }
        clearfile(exam.file)
        await Exam.deleteOne({_id: idexam});
        
        res.status(200).json({
            massage: 'file is deleted',
           
        })
    }catch(err){
        if(!err.statusCode){
            error.status=500;
           }
           next(err);
    }
}


exports.joinexam =async(req,res,next)=>{

    try{
        const nameexam = req.body.nameexam;
        const std = await Student.findById({_id:req.params.userid })
        if(!std){
            const error = new Error("not found")
            error.statusCode = 404;
            console.log(error);
            throw error;     
        }
        const exam = await Exam.find({nameexam: nameexam });
        if(!exam){
            const error = new Error("not exam found")
            error.statusCode = 403;
            console.log(error);
            throw error;
        }
        console.log(exam);
        res.status(200).json({
            massage: 'your exam is now',
            exam: exam
        })
    }catch(err){
        if(!err.statusCode){
            error.status=500;
           }
           next(err);
    }
}

exports.uploadexam = async(req,res,next) => {

    const nameexam = req.body.nameexam;
    const examid = req.body.examid;
    const stdid =req.params.userid;
    const file = req.file; 
    try{
        
        const std = await Student.findById(stdid);
        
        // if(cp){
        //     const error = new Error("this file is exit")
        //     error.statusCode = 404;
        //     console.log(error);
        //     throw error; 
        // } 
        const exam = await Exam.findById(examid);
        if(!exam){
            const error = new Error("not found this exam");
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }
        if(std.uploadexam.items.fileuploaded){
            const error = new Error("one file is uploaded");
            error.statusCode = 404;
            console.log(error);
            throw error; 
        }

        const x = std.uploadexam.items.push({
                exam : exam._id,
                name : nameexam,
                fileuploaded : file.path
        })
        //console.log(std);
         await std.save()
        res.status(200).json({
            massage:'push in databse',
             user:std
        });

    }catch(err){
       if(!err.statusCode){
        error.status=500;
       }
       next(err);
    }
}

exports.updateupload =async (req,res,next)=>{

    const examid = req.body.examid; 
    const file = req.file; 

    try{
       
        const std = await Student.findById(req.params.userid)
        const exam = await Exam.findById(examid);

        if(!std){
            const error = new Error("not found user")
            error.statusCode = 404;
            console.log(error);
            throw error; 
                
        }
        if(!exam){
            const error = new Error("not found exam")
            error.statusCode = 404;
            console.log(error);
            throw error; 
                
        }
        
            for(var i in std.uploadexam.items){
                
                if(std.uploadexam.items[i].exam == examid){
                    clearfile(std.uploadexam.items[i].fileuploaded);
                    std.uploadexam.items[i].fileuploaded = file.path;
                }
                
            }
        await std.save();
         
       
        res.status(200).json({
            massage: 'updated successfully',
            user: std,

        })
    }
    
    catch(err){
        if(!err.statusCode){
            error.status=500;
           }
           next(err);
    }
}