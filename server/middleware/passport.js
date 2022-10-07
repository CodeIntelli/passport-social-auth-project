import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import GithubStrategy from "passport-github2";
import GitlabStartegy from "passport-gitlab2";
import userModels from "../models/userModels"
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITLAB_CLIENT_ID,
    GITLAB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
} from "../config";

const passportSetup = passport.use(new GoogleStrategy.Strategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        const userData = new userModels({
            googleId: profile.id,
            email: null || "null",
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profilePhoto: profile.photos[0].value,
            password: profile.id,
            source: "google",
            googleVerified: true
        })
        await userData.save();

        return done(null, profile)
    }
));

const githubSetup = passport.use(new GithubStrategy.Strategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        const userData = new userModels({
            googleId: profile.id,
            firstName: profile.displayName,
            lastName: profile.username,
            profilePhoto: profile.photos[0].value,
            password: profile.id,
            source: profile.provider,
            googleVerified: true
        })
        await userData.save();
        return done(null, profile)
    }
))

const gitlabSetup = passport.use(new GitlabStartegy.Strategy({
    clientID: GITLAB_CLIENT_ID,
    clientSecret: GITLAB_CLIENT_SECRET,
    callbackURL: "/auth/gitlab/callback",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        const userData = new userModels({
            googleId: profile.id,
            firstName: profile.username,
            lastName: profile.displayName,
            email: profile.emails[0].value,
            profilePhoto: profile.profileUrl,
            password: profile.id,
            source: profile.provider,
            googleVerified: true
        })
        await userData.save();
        return done(null, profile)
    }
))

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})


export { passportSetup, githubSetup, gitlabSetup };