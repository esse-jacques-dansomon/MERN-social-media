import express from "express";
import {
    getUser,
    getUserFriends,
    getUsers,
    addRemoveFriend,
} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",  authMiddleware, getUsers);
router.get("/:id", authMiddleware, getUser);
router.get("/:id/friends", authMiddleware, getUserFriends);
router.put("/:id/addRemoveFriend", authMiddleware,  addRemoveFriend);

export default router;