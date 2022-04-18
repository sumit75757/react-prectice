const mongoos = require('mongoose');
const post = require('../models/posts.model');
const multer = require('multer');
const express = require('express');
const route = express();
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './post/');
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

exports.postFeed = uplode.single('feedpost'), (req, res) => {
    console.log(req.file);
    const post = new post({
        _id: new mongoos.Types.ObjectId(),
        caption: req.body.caption,
        feedpost: '/post/' + req.file.filename,
        userId: req.body.userId,
        date: Date(Date.now())
    });
    post.save()
        .then(result => {
            res.status(201).json(result)

        }).catch(err => {
            res.status(500).json(err.errors)
        });
}


exports.getFeed = (req, res) => {
 
    post.find()
        // .select('username caption userId feedpost commnet date')
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    response: {
                        count: result.length,
                        request: 'GEt',
                        respons: 'succses',

                    },
                    data: result.map(data => {
                        return {
                            _id: data._id,
                            username: data.username,
                            caption: data.caption,
                            userId: data.userId,
                            feedpost: data.feedpost,
                            commnet: data.commnet,
                            date: data.date
                        }
                    })
                });
            } else {
                res.status(404).json(
                    result
                );
            }
        }).catch(err => {
            console.log(err);
            //  res.status(400).json(err.message)
            // res.status(401).send(err.errors);
        });
       
}
exports.deletpost = (req, res) => {
    const id = req.params.userId;
    let path;
    post.remove({
        _id: id
    }).exec().then(result => {
        res.status(200).json(result)
        console.log(result)
        userImages = true
    }).catch(err => {
        res.status(500).json(err.errors)
    });
    if (userImages == true) {
        post.findById(id).exec().then(res => {
            path = res.userImage
            try {
                unlinkAsync("." + res.userImage)
            } catch (err) {
                console.log(res);
            }
        })
    }
}; 