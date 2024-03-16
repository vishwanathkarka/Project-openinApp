const express = require("express")
const router = express.Router()
const {createTask,updateTask,getTasks,deleteTask } = require("../controllers/Task")
const {authenticateToken} = require("../middleware/User")

router.route("/createTask").post(authenticateToken, createTask);
router.route("/updateTask/:id").put(authenticateToken, updateTask)
router.route("/getTasks").get(authenticateToken, getTasks)
router.route("/deleteTask/:id").delete(authenticateToken,deleteTask)
module.exports = router;
