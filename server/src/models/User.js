import mongoose from "mongoose";

const userSchema = mongoose.Schema(
        {
            firstName: {
                type: String,
                required: true,
                trim: true,
                min: 3,
                max: 20
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
                min: 3,
                max: 20
            },
            email: {
                type: String,
                required: true,
                trim: true,
                unique: true,
                lowercase: true
            },
            password: {
                type: String,
                required: true,
                min: 6
            },
            picturePath: {
                type: String,
                default: "https://res.cloudinary.com/dzqkqzjxw/image/upload/v1621361008/Profil",
            },
            friends: {
                type: Array,
                default: []
            },
            location: String,
            impressions: Number,
            viewedProfile: Number,
            occupation: String,
        },
        { timestamps: true }

    );

const User = mongoose.model("User", userSchema);
export default User;