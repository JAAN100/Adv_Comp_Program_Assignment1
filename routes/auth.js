const express = require("express");
const router = express.Router();
const { SignUp, SignIn } = require("../controllers/auth.controllers");

router.post("/signUp", SignUp);
router.post("/signIn", SignIn);

module.exports = router;
