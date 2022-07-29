import session from "express-session";
import express from "express"
import cors from "cors"
import { passportSetup, githubSetup, gitlabSetup } from "./passport";
import SocialRout from "./routes/auth"
import passport from "passport";
const app = express();

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use("/auth", SocialRout)

app.listen("2020", () => {
    console.log("server is running")
})