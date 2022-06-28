import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const router = express.Router();

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("Your email was not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Your password is wrong");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//EDIT
router.post("/profile/edit", async (req, res) => {
  const id = req.body._id;
  console.log("ID: ", id);

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
  console.log("EDited User: ",editUser)

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`Your profile was not found`);

    await User.findByIdAndUpdate(id, editUser, { new: true });
    console.log("saved");
  } catch (err) {
    console.log(err);
  }
});

export default router;
