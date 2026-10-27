const jwt = require("jsonwebtoken");
const Users = require("../models/user");

const SignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await Users.create({
      username,
      email,
      password,
    });
    res.status(200).json("User created successfully");
  } catch (error) {
    res.status(404).json("Error Please Try Again");
  }
};

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.password !== password) {
      return res.status(404).json("Invalid password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password: _pass, ...userData } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        success: true,
        message: "User signed in successfully",
        token,
        user: userData,
      });
  } catch (error) {
    res.status(404).json("Error Please Try Again");
  }
};

module.exports = {
  SignUp,
  SignIn,
};
