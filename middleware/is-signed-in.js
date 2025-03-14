const isSignedIn = (req, res, next) => {
    if(req.session.user) return next();
    //if user is signed in, call the next middleware function
    res.redirect("/auth/sign-in");
}

module.exports = isSignedIn;