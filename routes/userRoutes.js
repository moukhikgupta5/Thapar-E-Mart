const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const {phone, userId, name, email, age} = req.body;
    // console.log(name);
    console.log(phone);
    console.log(userId);
    try{
        const user_ =  await User.findOne({ userId: userId });
        if(user_){
            console.log('CheckPoint');
            res.redirect('/products/view');
        }else{
            const newUser = await User.create({
                name,
                userId,
                email,
                phone,
                age
            });
            res.redirect('/products/view');
        }
    }catch(err){
        console.log(err);
        res.send('Something went wrong');
    }
});

router.get('/profile', (req, res) => {
    res.render('profile');
})

router.get('/logout', (req, res) => {
    res.render('logout');
})

module.exports = router;