const express = require('express');
const route = express();
const mongoos = require('mongoose');
const multer = require('multer');
const feed = require('../controler/post')
const authchak = require('../Middleware/chack-auth')

const postModle = require('../models/posts.model');

const storage = multer.diskStorage({
  
    destination: (req, file, cb) => {
        cb(null, './feeds/');
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


route.get('/',authchak, feed.getFeed);
route.post('/',authchak, uplode.single('feedpost'), (req, res) => {
    console.log(req.file);
    const post = new postModle({
        _id: new mongoos.Types.ObjectId(),
        username: req.body.username,
        caption: req.body.caption,
        feedpost: '/feeds/'+ req.file.filename,
        userId: req.body.userId,
        date: Date(Date.now())
    });
    post.save()
        .then(result => {
            res.status(201).json(result)

        }).catch(err => {
            res.status(500).json(err.errors)
        });
});
route.delete('/',authchak, feed.deletpost);
route.options('/',authchak,(req, res) => {
    res.status(200).json(result)
});


module.exports = route;



