const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// router logic will go here - will be built later on in the lab

// GET /users/:userId/foods

router.get("/", async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)

        res.render("foods/index.ejs", {pantry: currentUser.pantry});
        //we are now going to pass the current user's pantry items to the index page
    } catch (error){
        console.log(error);
        res.redirect("/");
    }
})

// GET /users/:userId/foods/new
router.get("/new", async (req, res) => {
    res.render("foods/new.ejs");
    // res.send("create a new item")
})

//POST to /users/:userId/foods
router.post("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

//GET users/:userId/foods/:itemId’



module.exports = router;
