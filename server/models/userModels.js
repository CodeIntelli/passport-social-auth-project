import mongoose from "mongoose";
import jwt from "jsonwebtoken";
// import { JWT_SECRET, JWT_EXPIRE } from "../config"
const UserSchema = new mongoose.Schema({
    email: { null: true, type: String },
    firstName: String,
    lastName: String,
    profilePhoto: String,
    password: String,
    source: { type: String, required: [true, "source not specified"] },
    lastVisited: { type: Date, default: new Date() },
    googleVerified: { type: Boolean, default: false },
    googleId: { type: String },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, expires: 1200 },
});

// // JWT TOKEN
// UserSchema.methods.getJWTToken = function () {
//     return jwt.sign({ id: this._id }, JWT_SECRET, {
//         expiresIn: JWT_EXPIRE,
//     });
// };

const userModels = mongoose.model("user", UserSchema);

export default userModels;
