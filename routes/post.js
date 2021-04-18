// All our Article related routes will go here in this file
const express = require("express");
const router = express.Router(); // Package 
const moment = require('moment');
const multer = require('multer'); // Uploading images
var methodOverride = require('method-override');
const isLoggedIn = require("../helper/isLoggedIn");

// Use method override
router.use(methodOverride('_method'));

// Import Model
const Post = require("../models/Post");

// 1- FORM: Grab the form data from the form 
router.use(express.urlencoded({extended: true}));

//define storage for the images
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, '../uploads/images/');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });

  //upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 300 * 200 * 3,
    },
  });




// HTTP GET - Load an Post Form
router.get("/post/add", isLoggedIn,(req, res) => {
    res.render("post/add");
})

// 2- FORM:  HTTP POST - To post the Post
// HTTP POST - To add post 
// HTTP POST - To add post
router.post("/post/add", isLoggedIn,upload.single('img'), async(req, res) => {
    let post = new Post(req.body);
    // Save the data to the database
    post.save()
    .then(() => {
        res.redirect("/post/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("ERROR!!!");
    })
})


// HTTP GET - Post Index
router.get("/post/index", (req, res) => {
    // Find all Post
    Post.find()
    .then(post => {
        res.render("post/index", {post, moment});
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;