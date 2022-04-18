const auth = require('../models/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express');
const route = express();
const mongoos = require('mongoose');
// const multer = require('multer');

route.post('/singup', (req, res, next) => {
    auth.find({
        email: req.body.email
    }).exec().then(
        result => {
            console.log(result);
            if (result.length >= 1) {
                return res.status(409).json({
                    code: '409',
                    message: 'user exist',
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hase) => {

                    if (err) {
                        return res.status(500).json({
                            code: '500',
                            message: err,
                        })
                    } else {
                        console.log(hase);

                        const data = new auth({
                            _id: new mongoos.Types.ObjectId(),
                            username: req.body.username,
                            email: req.body.email,
                            password: hase
                        })
                        data.save().then(result => {
                            bcrypt.compare(req.body.password, hase, (err, logUSer) => {
                                console.log(logUSer);
                                if (err) {
                                    return err.status(401).json({
                                        message: 'Anauthorais user'
                                    })
                                }
                                if (logUSer) {

                                    const token = jwt.sign({
                                            email: req.body.email,
                                            // userId: data._id
                                        },
                                        'fasfguh9h$%@EWRGW$^YQ#Q#$TGv0', {
                                            expiresIn: "7d"
                                        }
                                    )
                                    const resData = {
                                        response: {
                                            user: true,
                                            request: 'User Login',
                                            respons: 'succses',
                                        },
                                        useData: {
                                            email: req.body.email,
                                            userId: data.id
                                        },
                                        token: token,
                                        logInTime: Date(Date.now)
                                    }

                                    return res.status(200).send(resData)
                                }
                                return res.status(401).json({
                                    message: 'unauthorais user'
                                })
                            })
                            // console.log(result);
                        }).catch(
                            err => {
                                console.log(err);
                            }
                        )

                    }
                })

            }
        }
    )



});


route.post('/singin', (req, res, next) => {
    auth.find({
        email: req.body.email
    }).exec().then(
        result => {
            console.log(result);
            if (result.length < 1) {
                return res.status(401).json({
                    message: 'Anauthorais user'
                })
            }
            bcrypt.compare(req.body.password, result[0].password, (err, logUSer) => {
                if (err) {
                    return err.status(401).json({
                        message: 'Anauthorais user'
                    })
                }
                if (logUSer) {
                    const token = jwt.sign({
                            email: result[0].email,
                            userId: result[0]._id
                        },
                        'fasfguh9h$%@EWRGW$^YQ#Q#$TGv0', {
                            expiresIn: "7d"
                        }
                    )
                    result.forEach(element => {
                        data = {
                            response: {
                                user: true,
                                request: 'User Login',
                                respons: 'succses',
                            },
                            useData: element,
                            token: token,
                            logInTime: Date(Date.now)
                        }
                    });
                    return res.status(200).send(data)
                }
                return res.status(401).json({
                    message: 'unauthorais user'
                })
            })


        })



});


route.get('/singup', (req, res, next) => {
    users.find()
        // .select('userName phone email gender date userImage')
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
                            email: data.email,
                            password: data.password,
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
});
route.delete('/singup/:usersId', (req, res) => {
    const id = req.params.usersId;
    users.remove({
        _id: id
    }).exec().then(result => {
        res.status(200).json(result)
        console.log(result)
    }).catch(err => {
        res.status(500).json(err.errors)
    });
});


module.exports = route;