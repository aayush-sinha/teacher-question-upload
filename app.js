const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();
const Ques = require("./models/ques");
app.use(express.static("public"));
app.set("view engine", "ejs");
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname);
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
app.use(express.static('public'))

app.post('/upload', upload.array('avatar'), (req, res) => {
    Ques.create({
        name: req.body.name,
        sub: req.body.sub,
        sem: req.body.sem,
        file: req.files[0].filename
      });
      console.log(req.files)
    return res.json({ status: 'OK', uploaded: req.files.length });
});
app.get('/',(req,res)=>
res.render("index"))
app.get('/c/:id', (req, res) => res.download('uploads/'+req.params.id))



const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server running on  ${PORT}`));