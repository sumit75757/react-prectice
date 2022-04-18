const usermodels = require('../models/user');
const mongoos = require('mongoose');
const multer = require('multer');
const storage = multer.diskStorage({
 
  destination: (req,file,cb) => {
    cb(null,'./uplode/');
  },
  filename:  (req,file,cb) => {
    cb(null,new Date().toISOString().replace(/:/g, '-') +'-'+ file.originalname);
  }
})

const fileFilter =  (req,file,cb)=>{
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'  ) {
    cb(null,true);
  } else {
    cb(null,false);
  }
}

const uplode = multer({storage:storage,limits:{
  fieldSize:1024 * 1024 *   5
},
  fileFilter:fileFilter
});
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

exports.postUser = uplode.single('userImage') , (req, res) => {
    console.log(req.file);
    const user = new usermodels({
      _id: new mongoos.Types.ObjectId(),
      userName: req.body.userName,
      phone: req.body.phone,
      email: req.body.email,
      gender:req.body.gender, 
      userImage: '/uplode/'+ req.file.filename,
      date: Date(Date.now())
    });
    user.save()
      .then(result => {
          res.status(201).json(result)

      }).catch(err=>  {
        res.status(500).json(err.errors)
      });
  
  }

exports.getUser = (req, res) => {
  console.log(req.query.username);
  const id = req.query.username;
  if(id != null && id !== ""&&id != undefined){
    usermodels.find({userName: id}).exec().then(result => {
      if (result) {
        res.status(200).json(result)
        console.log("fasdfasdfsa",result)
      } else {
        res.status(404).json({
          code: "404",
          massage: "Not Found"
        })
        console.log(result)
      }
    }).catch(err => {
      res.status(500).json(err.errors)
    });
  }
  
    usermodels.find()
      .select('userName phone email gender date userImage data')
      .exec()
      .then(result => {
        if (result) { 
          res.status(200).json({
            response:{
              count: result.length,
              request :'GEt',
              respons:'succses',
  
            } ,
            data: result.map(data=>{
              return {
                _id:data._id,
                username: data.userName,
                phone: data.phone,
                email:data.email,
                userImage:data.userImage,
                data:data.array,
                date:data.date
              }
            })
          });
        } else {
          res.status(404).json(
            result
          );
        }
      })
      .catch(err => {
        res.status(404).send(err.errors);
      });
  }
  exports.getuserById =  (req, res) => {
    const id = req.params.userId;
    usermodels.findById(id).exec().then(result => {
      if (result) {
        res.status(200).json(result)
        console.log(result)
      } else {
        res.status(404).json({
          code: "404",
          massage: "Not Found"
        })
        console.log(result)
      }
    }).catch(err => {
      res.status(500).json(err.errors)
    });
  }
  exports.updateUser = (req, res) => {
    console.log("adasd",req.body);
    const id = req.params.userId;
    const data = {
      userName: req.body.userName,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
      userImage: '/uplode/' + req.file.filename,
      date: Date(Date.now())
    }
    usermodels.findOneAndUpdate({
      _id: id
    }, {
      $set: data
    }).exec().then(result => {
    console.log("fadfas",data);

      if (result) {
        res.status(200).json(result)
        console.log(result)
      } else {
        res.status(404).json({
          code: "404",
          massage: "Not Found"
        })
        console.log(result)
      }
    }).catch(err => {
      res.status(500).json(err.errors)
    });
  }
  let userImages = false
  exports.deletuser = (req, res) => {
    const id = req.params.userId;
    let path ;
    usermodels.remove({
      _id: id
    }).exec().then(result => {
      res.status(200).json(result)
      console.log(result)
      userImages=true
    }).catch(err => {
      res.status(500).json(err.errors)
    });
    if (userImages == true) {
      usermodels.findById(id).exec().then(res=>{
        path = res.userImage
        try{
          unlinkAsync("."+res.userImage)
        }catch(err){
          console.log(err);
        }
      })
    }
  };




 