const mongoose = require("mongoose");

const connectDB = () =>{
    mongoose
    .connect(process.env.MongoUrl)
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = connectDB;