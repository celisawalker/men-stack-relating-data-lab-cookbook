const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET /users/:userId/foods
router.get("/", async (req, res) => {
    try{
        const currentUser = await User.findById(req.session.user._id)
        console.log(req.params);
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

//GET users/:userId/foods/:itemId
router.get("/:itemId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = currentUser.pantry.id(req.params.itemId);
        res.render("foods/show.ejs", {
            pantry: item
        })
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

//GET users/:userId/foods/:itemId/edit
router.get("/:itemId/edit", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = currentUser.pantry.id(req.params.itemId);
        res.render("foods/edit.ejs", {
            pantry: item
        })
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

//update route
router.put("/:itemId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = currentUser.pantry.id(req.params.itemId);
        item.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods/${req.params.itemId}`);
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
})


// DELETE to /users/:userId/foods/:itemId
router.delete("/:itemId", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.pantry.id(req.params.itemId).deleteOne();
        res.redirect("/")

        await currentUser.save();
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

module.exports = router;
