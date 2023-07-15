const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
} = require("../../controllers/userController");

router.route("/").get(getAllUsers);

// router.route("/:id").get(getUserById).delete(deleteUser);

module.exports = router;
