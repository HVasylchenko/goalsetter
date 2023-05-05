const express = require("express");
const router = express.Router();
const {
  registerUser, loginUser, getMe
} = require("../controllers/usersControllers");

const {protect} = require('../middleware/authMiddleWare')

// router.route("/").get(getGoals).post(setGoal);
// router.route("/:id").put(updateGoal).delete(deleteGoal);

// router.get('/', getGoals)
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
// router.put('/:id',updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router;
