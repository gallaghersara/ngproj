const express = require('express')
const router = express.Router()
const User = require('../models/user_model')
const passport = require('passport');

const keys = require('../config/keys')
const jwt = require('jsonwebtoken');

//Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Faild to register user' })
        } else {
            res.json({ success: true, msg: 'User registered' })
        }
    })
})

//Authenticate
router.post('/authenticate', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            console.log('user not found')  // ------test
            return res.json({ success: false, msg: 'User not found' })
        }
        // ERROR!!!! go in  to : if(isMatch)-----WWWWWWWWWW----!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            // if(!isMatch){  // ------test
            if (isMatch) {
                console.log('token')   // ------test
                const token = jwt.sign({ data: user }, keys.mongodb.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: `Bearer ${token}`,
                    user: {
                        id: user._id,
                        fname: user.fname,
                        lname: user.lname,
                        username: user.username,
                        email: user.email
                    }
                });

            } else {
                console.log('wrong password')   // ------test
                return res.json({ success: false, msg: 'Wrong password' })
            }
        })
    });
})

//Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
})


module.exports = router