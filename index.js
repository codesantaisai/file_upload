 const express = require('express');
 const app = express();
 const path = require('path');
 const multer = require('multer');



 app.set('views', path.join(__dirname, 'views'));
 app.set('view engine', 'ejs');

 let storage = multer.diskStorage({
     destination: function (req, file, cb) {
         cb(null, 'uploads')
     },
     filename: function (req, file, cb) {
         cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname))

     }

 })
 let  maxSiZe = 2 * 1000 * 1000;
 let upload = multer({
     storage: storage,
     limits: {
         fileSize: maxSiZe
     },
     fileFilter: function (req, file, cb) {
         let filetypes = /jpeg|jpg|png/;
         let mimetype = filetypes.test(file.mimetype);
         let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
         if (mimetype && extname) {
             cb(null, true)
         }else{
            cb("Sorry you can upload only these kind of file types" + filetypes)
        }


     }
 }).single("mypic");
 const user = {
    firstName: 'Tim',
    lastName: 'Cook',
}
 app.get('/',(req,res)=>{
    res.render('signup', {
        user: user
    })
 });

 app.post('/upload',(req,res,next)=>{
    upload(req,res,function(err) {
        if (err) {
            res.send(err)
            
        }else{
            res.send("success image uploaded")
        }
        
    })

 })

app.listen(4000,()=>{
    console.log("server running on port 4000");
});