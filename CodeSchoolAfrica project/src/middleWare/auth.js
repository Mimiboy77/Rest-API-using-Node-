const auth = async (req, res, next) => {
    const userId = req.session.userId;
  if (userId) {
    next();
  } else {
    res.status(400).json("user not authorizs");
  }
}
module.exports = auth;