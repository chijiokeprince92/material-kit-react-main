import User from "../models/User.js";
import express from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const router = express.Router();

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//EDIT
router.post("/profile/edit", async (req, res) => {
  const id = req.body._id;

  const editUser = new User({
    username: req.body.username,
    email: req.body.email,
    desc: req.body.desc,
    city: req.body.city,
    course: req.body.course,
    nationality: req.body.nationality,
    facebook: req.body.facebook,
    twitter: req.body.twitter,
    instagram: req.body.instagram,
    mobile: req.body.mobile,
    _id: id,
  });

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Your profile was not found`);

    await User.findByIdAndUpdate(id, editUser, { new: true });
    console.log("saved");
  } catch (err) {
    console.log(err);
  }
});

//Update Image
router.post("/profileimage/edit", async (req, res) => {
  const id = req.body.id;

  const editPhoto = new User({
    profilePicture: req.body.profilePicture,
    _id: id,
  });

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Your profile was not found`);

    await User.findByIdAndUpdate(id, editPhoto, { new: true });
    console.log("saved");
  } catch (err) {
    console.log(err);
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get people a user follows
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET people following a user
router.get("/followers/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const follower = await Promise.all(
      user.followers.map((followerId) => {
        return User.findById(followerId);
      })
    );
    let followersList = [];
    follower.map((follow) => {
      const { _id, username, profilePicture } = follow;
      followersList.push({ _id, username, profilePicture });
    });
    res.status(200).json(followersList)
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

export default router;