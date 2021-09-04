const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('landing');
});


router.get('/about-us', (req, res) => {
    res.render('about-us');
});

router.get('/contact-us', (req, res) => {
    res.render('contact-us');
});


router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;