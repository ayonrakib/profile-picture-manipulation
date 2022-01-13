var http = require('http');
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser());
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
require('./db')
var User = require('./model/User')
const multer = require('multer');
app.use(express.json());
var cors = require('cors');
app.use(cors());
const crypto = require('crypto')
app.use(express.static('public'))

const router = express.Router();
var fs = require('fs');
const { normalize } = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './temp-images/')
    },
    filename: function (req, file, cb) {
      var fileName = file.originalname.slice(0,file.originalname.indexOf("."));
      var randomString = crypto.randomBytes(20).toString('hex');
      console.log("random string is: ",randomString)
      req.body.name = fileName+"-"+randomString+".png"
      cb(null, req.body.name)
    }
  })

const upload = multer({ storage: storage })


function renameProfilePicture(req){
  fs.rename(`./temp-images/${req.body.name}`,`./images/${req.body.session}.png`, function(error, data){
    if(error){
      console.log("error in renaming: ",error)
    }
  })
  return req.body.session;
}


app.get('/', (req, res) => {
  res.send('Hi!')
})

app.get('/show-modal-text', (req, res) => {
  console.log("came in show-modal-text url");
  res.send({
    data: "http://localhost:9000/images/456.png"
  })
})

app.post('/save-profile-picture', upload.single('profilePic'), (req, res,next) => {
  // console.log(JSON.stringify(req.cookies))
    console.log("the file name with which the file was saved in save-profile-picture url is: ",req.body.name)
    var imageName =  renameProfilePicture(req);
    var profilePictureHTML = `<div>
                                <img src = "/${imageName}.png"/>
                              </div>`
    res.send({
      data: "http://localhost:4000/" + req.body.name,
      profilePictureData: profilePictureHTML
    });
    res.end()
})

app.get('/add-user', async (req, res)=>{
  const user = new User({
    firstName: "Rakib",
    lastName: "Ayon"
  });
  try {
    const newUser = await user.save();
    res.send(newUser)
  } catch (error) {
    console.log("error while adding user: ",error)
  }
  // res.send("arrived in add user url!")
})

app.post('/delete-user',findUserWithId, async (req,res) => {
  console.log("user id at delete-user url is: ",req.body.id);
  if((res.user === null) || (res.user === undefined)){
    res.send({
      data: false,
      error: 1000,
      errorMessage: "User could not be deleted!"
    })
  }
  else{
    deleteUser(res);
  }
  

})

async function findUserWithId(req, res, next){
  try{
    var user = await User.findOne({
      _id:req.body.id
    });
    // console.log("user with the id in delete user middleware is: ",user.id)
  }
  catch(error){
    console.error(error)
  }
  res.user = user;
  console.log("user in the findUserWithId method is: ",res.user)
  next();
}

async function deleteUser(res){
  if(res.user === null){
    res.send({
      data: false,
      error: {
        errorCode: 1000,
        errorMessage: "User could not be deleted!"
      }
    })
  }
try {
  await res.user.remove();
} catch (error) {
  console.error(error)
}
  res.send({
    data: true,
    error: ""
  })
}

app.listen(9000, () => console.log('Server ready'))