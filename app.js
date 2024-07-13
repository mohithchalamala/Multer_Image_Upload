//storage - storagae is a object which contains all the info related to storage of img, where image is stored, name of file etc..
//destination - This destination stores or contains where we ginna store file
//filename - here we are adding date to the original file name so that other file names dont mismatch
const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express();
app.set('view engine','ejs')

app.listen(3000)

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'Images')
    },
    filename:(req,file,callback)=>{
        console.log(file)
        callback(null,Date.now() + path.extname(file.originalname))
    }                     
})

const multer_upload = multer({
    storage:storage             
})

app.get('/upload',(req,res)=>{
    res.render('upload')
})
//the multer acts as a middlewear or intermidiate between path i.e(/upload) and req,res.
//before entering into funtion the multer will make sure to upload the image
app.post('/upload',multer_upload.single('image'),(req,res)=>{       
    res.send('Image Uploaded')
})