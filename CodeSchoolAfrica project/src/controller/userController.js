const eventModel = require("../model/eventModel");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.registerUser = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    // this is to check if Email has been used before
    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      throw new Error("Email already in use");
    }
    // this is to check if UserName has been taken
    const checkUsername = await userModel.findOne({ userName });
    if (checkUsername) {
      throw new Error("userName already choose");
    }
    // Password Length must be 8 character long
    if (password.length < 8) {
      throw new Error("passwor nmust at least be 8 charater long");
    }
    // to harsh password
    const hashPassword = await bcrypt.hash(password, 10);
    // to save User to the dataBase
    const user = await userModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashPassword,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
};
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("please enter: Username and password");
    }
    const checkEmail = await userModel.findOne({ email });
    if (!checkEmail) {
      throw new Error("invalid cridentials");
    }
    const comparePassword = await bcrypt.compare(password, checkEmail.password);
    if (!comparePassword) {
      throw new Error("invalid cridentials P");
    }
    req.session.userId = checkEmail.id; // this can be written : req.session.userId = user.id // checkemail;;
    const BookerId = req.session.userId;
    const event = await eventModel.find({ BookerId });
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json(error.message);
    console.log(error);
  }
};
module.exports.logOut = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).json(err);
      console.log(err);
    } else {
      res.status(200).json("logout sucessfully");
    }
  });
};
