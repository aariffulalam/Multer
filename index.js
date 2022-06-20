const express = require('express');
const app = express();
const path = require('path')

const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"./images")
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now()+"--"+file.originalname)
    }
})

const upload = multer({storage:fileStorageEngine})

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})

app.post("/single", upload.single("image"),(req, res)=>{
    console.log(req.file)
    res.send("Single file uploaded.")
})

app.post("/multiple", upload.array("images"), (req,res)=>{
    console.log(req.files)
    res.send("multiple files uploaded")
})

app.listen(3000,()=>{
    console.log("i am listing at port 3000")
})