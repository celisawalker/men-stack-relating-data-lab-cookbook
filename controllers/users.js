const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get("/users", async (req, res) => {
    const allUsers = await User.find({});
    console.log(allUsers);
    res.render("users/index.ejs", {users: allUsers})
})

router.get("/:userId/pantry", async (req, res) => {
    const user = await User.findById(req.params.userId);
    //console.log(user);
    res.render("foods/index.ejs", {
        pantry: user.pantry
    })
})

module.exports = router;