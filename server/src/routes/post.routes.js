import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {
    getPost,
    getFeedsPosts,
    getUserPosts,
    likePost
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/",  authMiddleware, getFeedsPosts);
router.get("/:id", authMiddleware, getPost);
router.get("/user/:id", authMiddleware, getUserPosts);
router.put("/like/:id/:userId", authMiddleware, likePost);

export default router;