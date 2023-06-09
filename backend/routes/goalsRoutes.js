const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalsControllers");

const {protect} = require('../middleware/authMiddleWare')

router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

// router.get('/', getGoals)
// router.post('/', setGoal)
// router.put('/:id',updateGoal)
// router.delete('/:id', deleteGoal)

module.exports = router;
