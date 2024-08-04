const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const generateTokenAndSetCookie = require("../utils/generateToken");
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }
    generateTokenAndSetCookie(user._id, res);
    return res.status(201).json({
      userName: user.userName,
      fullName: user.fullName,
      password: user.password,
    });
  } catch (error) {
    console.log("error message : ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "logged out successfuly" });
  } catch (error) {
    console.log("error message", error.message);
    res.status(500).json({message:"internal server error"});
      }

    
};
const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ error: "password and confirm password does not match" });
      return;
    }
    ////   Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.findOne({ userName });
    if (user) {
      res.status(400).json({ error: "user already exists" });
      return;
    }

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
        password: newUser.password,
      });
    } else {
      res.status(400).json({ error: "invalid user info" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = { signup, login, logout };
