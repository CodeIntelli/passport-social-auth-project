import dotenv from "dotenv"
dotenv.config({ path: "./.env" });
// All Config.env Variables will be called here. This will be create just because you dont have to need call all time process.env.variables. Many time this will not working For that reason this will benifical.
export const {
    PORT,
    DB_URL,
    DEBUG_MODE,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITLAB_CLIENT_ID,
    GITLAB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    CALLBACK_URL,
} = process.env;
