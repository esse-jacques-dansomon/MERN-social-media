import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
    try {
        const { userId, desc, picturePath } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description: desc,
            picturePath : picturePath,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = Post.findById(postId);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    }catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const getFeedsPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    }catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
}


export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    }catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const likePost = async (req, res) => {
    try {
      const { userId, id } = req.body;
        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: "User not found" });

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        const isLiked = post.likes.get(userId);

        if (isLiked) {
            await post.likes.delete(userId);
        }else {
            await post.likes.set(userId, user.firstName + " " + user.lastName);
        }
       const updatePost = await post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }

       );
        res.status(200).json(updatePost);
    }catch (e) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

