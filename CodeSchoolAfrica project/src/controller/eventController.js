const eventModel = require("../model/eventModel");
const userModel = require("../model/userModel");
//C
module.exports.createEvent = async (req, res) => {
  const { title, description, ownerName } = req.body;
  const id = req.session.userId;
  try {
    if (!title) {
      throw new Error("title must be include");
    }
    if (!description) {
      throw new Error("description must be include");
    }
    if (!ownerName) {
      throw new Error("ownerName name must be include");
    }
    const user = await userModel.findById(id);
    const event = await eventModel.create({
      title,
      description,
      ownerName,
      BookerId: user.id,
      BookerFirstName: user.firstName,
      BookerLastName: user.lastName,
    });
    res.status(200).json(event);
    console.log(event);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};
//R
module.exports.event = async (req, res) => {
  // const id  = req.params;
  const BookerId = req.session.userId;
  try {
    const event = await eventModel.find({BookerId});
    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};
//U
module.exports.updateEvent = async (req, res) => {
  // params
  const { id } = req.params;
  // the edited data from the  frontend
  const { title, description, ownerName } = req.body;
  try {
    const event = await eventModel.findByIdAndUpdate(
      id,
      { title, description, ownerName },
      { new: true }
    );

    res.status(200).json(event);
  } catch (error) {
    console.log(error.message);
    res.status(400).json(error.message);
  }
};
//D
