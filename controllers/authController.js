import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

/*Register User*/
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});
        !user && res.status(404).json("User not found");
        const validPassword = await bcrypt.compare(password, user.password);
        !validPassword && res.status(400).json("Wrong password");
        const accessToken = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "5d"}
        );
        delete user.password;
        res.status(200).json({ accessToken, user});
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}