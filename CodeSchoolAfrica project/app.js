const express = require("express");
const connectDB = require("./src/config/db");
const userRouter = require("./src/routes/userRouter");
const env = require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const eventRouter = require("./src/routes/eventRouter");
// express app
const app = express();
//middlewares
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60 * 60 * 1000 * 24 * 3, //3 days
      httpOnly: true,
      secure: false,
      sameSite: null,
    },
    store: MongoStore.create({
      mongoUrl: process.env.mongoUrl,
    }),
  })
);
app.use(express.json());
// function for connection to Database(MONGODB)
connectDB();
// Routers
app.use("/event", eventRouter);
app.use("/user", userRouter);
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`connected to port ${process.env.PORT}`);
});
