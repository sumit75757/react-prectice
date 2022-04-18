const express = require('express');
const route = express();
const mongoos = require('mongoose');
const usermodels = require('../models/user');
const multer = require('multer');
const authchak = require('../Middleware/chack-auth')
const getUser = require('../controler/user')
const storage = multer.diskStorage({
  
    destination: (req, file, cb) => {
        cb(null, './uplode/');
    },
    filename: (req, file, cb) => {
      
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const uplode = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

////////////////////////get User ////////////////////////////////////
route.get('/',authchak, getUser.getUser);

// route.get('/byname', getUser.getuesername);
////////////////////////post User ////////////////////////////////////
// uplode.single('userImage'),
route.post('/',uplode.single('userImage'), (req, res) => {
    // console.log(req);
    console.log(req.file);

    console.log(JSON.stringify(req.body.data));
     let data = JSON.parse(req.body.data)
    const user = new usermodels({
        _id: new mongoos.Types.ObjectId(),
        userName: req.body.userName,
        phone: req.body.phone,
        email: req.body.email,
        gender: req.body.gender,
        userImage: '/uplode/' + req.file.filename,
        date: Date(Date.now()),
        data: data 
    });
    
    user.save()
        .then(result => {
            res.status(201).json(result)
        }).catch(err => {
            // res.status(500).json(err.errors)
            console.log("dfasdfaSDFASDFA",err);
        });

});
////////////////////////get User by id ////////////////////////////////////
route.get('/:userId', authchak, getUser.getuserById);
////////////////////////PUt(update) User ////////////////////////////////////
route.put('/:userId', authchak,uplode.single('userImage'),(req, res) => {
    console.log("adasd",req.file);
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
    })
});
////////////////////////remove   User ////////////////////////////////////

route.delete('/:userId', authchak, getUser.deletuser);
route.get('/:username', authchak, getUser.getUser);


module.exports = route;