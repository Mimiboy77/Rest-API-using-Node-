const express = require("express");
const auth = require("../middleWare/auth");
// import all controllers
const {
  createEvent,
  updateEvent,
  event,
} = require("../controller/eventController");

const eventRouter = express.Router();

// Add eventRouter
eventRouter.get("/", auth, event);
// eventRouter.get('/', SessionController.store);
eventRouter.post("/createEvent", auth, createEvent);
eventRouter.put("/updateEvent", auth, updateEvent);
// eventRouter.delete('/', SessionController.store);

module.exports = eventRouter;
