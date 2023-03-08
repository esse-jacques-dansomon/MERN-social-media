import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from 'url';
import {register} from './src/controllers/auth.controller.js';
import {createPost} from './src/controllers/post.controller.js';
import authRoutes from './src/routes/auth.routes.js';
import userRoutes from './src/routes/user.routes.js';
import postRoutes from './src/routes/post.routes.js';



/*CONFIGURATIONS*/

const __filename = fileURLToPath(import.meta.url) //get the current file path
const __dirname = path.dirname(__filename); //get the current directory path
dotenv.config(); //load the .env file

//create the express app
const app = express();

//use the express app to parse json data from the request body
app.use(express.json());
//use the helmet package to secure the app by setting various HTTP headers
app.use(helmet());
//use the helmet package to secure the app by setting various HTTP headers
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
//use the morgan package to log HTTP requests
app.use(morgan("common"));
//use the body-parser package to parse the request body
app.use(bodyParser.json({limit: "30mb", extended: true}));
//use the body-parser package to parse the request body
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
//use the cors package to allow cross-origin requests
app.use(cors());
//use the express app to serve static files from the public folder
app.use("/static", express.static(path.join(__dirname, 'public/assets')));


//FILE STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");

    }, filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});


/*ROUTES WITH POSTS*/
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", upload.single("picture"), createPost);

/*ROUTES SET UP*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


// DB CONNECTION
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
    // fake data
    // User.insertMany(users);
    // Post.insertMany(posts);
    console.log("Connected to MongoDB");
}).catch((error) => console.log(error.message));