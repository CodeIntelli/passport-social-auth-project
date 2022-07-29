import express from "express";
import passport from "passport";
import session from "express-session";
const CALLBACK_URL = "http://localhost:3000";
const SocialRout = express.Router();

SocialRout.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));

SocialRout.use(passport.initialize());
SocialRout.use(passport.session());

SocialRout.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
        })
    }
})

SocialRout.get("/login/failed", (req, res) => {
    if (req.user) {
        res.status(401).json({
            success: false,
            message: "failed",
        })
    }

})

SocialRout.route('/logout')
    .get((req, res) => {
        req.logout(function (err) {
            if (err) { return next(err); }
            res.redirect(CALLBACK_URL);
        });
    });
SocialRout.get("/google", passport.authenticate("google", { scope: ["profile"] }))
SocialRout.get("/google/callback", passport.authenticate("google", {
    successRedirect: CALLBACK_URL,
    failureRedirect: "/login/failed"
}))

SocialRout.get("/github", passport.authenticate("github", { scope: ["profile"] }))
SocialRout.get("/github/callback", passport.authenticate("github", {
    successRedirect: CALLBACK_URL,
    failureRedirect: "/login/failed"
}))

SocialRout.get("/gitlab", passport.authenticate("gitlab", { scope: ["api"] }))
SocialRout.get("/gitlab/callback", passport.authenticate("gitlab", {
    successRedirect: CALLBACK_URL,
    failureRedirect: "/login/failed"
}))

export default SocialRout;