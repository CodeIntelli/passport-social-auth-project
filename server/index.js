import session from "express-session";
import express from "express"
import cors from "cors"
import { passportSetup, githubSetup, gitlabSetup } from "./middleware/passport";
import { SocialRout } from "./routes/"
import "./database/index";
import { PORT } from "./config"
import passport from "passport";
const app = express();

app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

app.use("/auth", SocialRout)

app.listen(PORT, () => {
    console.log(`server is running ${PORT}`)
})