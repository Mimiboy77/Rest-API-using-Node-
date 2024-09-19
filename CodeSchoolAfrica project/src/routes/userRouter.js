const express = require("express");

// import all controllers
const { registerUser, loginUser, logOut } = require("../controller/userController");

const userRouter = express.Router();

// Add userRouter
userRouter.post("/register", registerUser);
// userRouter.get('/', SessionController.store);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logOut);
// userRouter.delete('/', SessionController.store);

module.exports = userRouter;