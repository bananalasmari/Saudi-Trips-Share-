// All our Article related routes will go here in this file
const express = require("express");
const router = express.Router(); // Package 
const moment = require('moment');
const multer = require('multer'); // Uploading images
var methodOverride = require('method-override');

// Use method override
router.use(methodOverride('_method'));

// Import Model
const User = require("../models/User");



router.get('/user/profile', (req, res) => {
    console.log(req.user._id)
    User.findById(req.user._id)
        .then(user => {
            res.render("user/profile", { user, moment });
        })
        .catch(err => {
            console.log(err);   
        });
        //res.redirect("/");
    });

module.exports = router;