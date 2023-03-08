import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = User.findById(id);
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const {id} = req.params;
        const user = User.findById(id);
        !user && res.status(404).json("User not found");
        const friends = await Promise.all(
            user.friends.map((friendId) => {
                User.findById(friendId);
            })
        );
        const formattedFriends = friends.map((friend) => {
            return {
                id: friend._id, fisrtName: friend.firstName, lastName: friend.lastName
                , picturePath: friend.picturePath, occupation: friend.occupation, location: friend.location
            };
        });
        res.status(200).json(formattedFriends);

    } catch (e) {
        res.status(404).json({error: e.message});
    }
}
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const formattedUsers = users.map((user) => {
            return {
                id: user._id, fisrtName: user.firstName, lastName: user.lastName
                , picturePath: user.picturePath, occupation: user.occupation, location: user.location
            };
        });
        res.status(200).json(formattedUsers);
    } catch (e) {
        res.status(404).json({error: e.message});
    }
}
export const addRemoveFriend = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        !user && res.status(404).json("User not found");
        const friend = await User.findById(friendId);
        !friend && res.status(404).json("Friend not found");
        const isFriend = user.friends.includes(friendId);
        if (isFriend) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
}