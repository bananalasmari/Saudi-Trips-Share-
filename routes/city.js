const express = require('express')
const router = express.Router()
const City = require('../models/City')
const isLoggedIn=require("../helper/isLoggedin")

// all instractor
router.get('city/index', (req, res) => {
    Instractor.find()
        .then(cities => {
            res.render('city/index', { cities })
        })
        .catch(err => res.send(err))

})

// add instractor page 
router.get('/city/add', (req, res) => {

    res.render('city/add')
})

router.post('/city/add', (req, res) => {

    let newCity = new City(req.body)

    newCity.save()
        .then(() => res.redirect('/manage'))
        .catch(err => res.send(err))
})

//show one instractor
router.get('/city/:id', (req, res) => {


    City.findById(req.params.id).populate('posts')
        .then(city => {
            console.log(city)
            res.render('city/show', { city })
        })

})



module.exports = router;