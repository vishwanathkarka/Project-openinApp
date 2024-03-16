const express = require("express")
const router = express.Router()
const {createSubTask,getSubTask,updateSubTask,deleteSubTask} = require("../controllers/SubTask")
const {authenticateToken} = require("../middleware/User")

router.route("/subtask/create/:taskId").post(createSubTask)
router.route("/getsubtask").get(authenticateToken,getSubTask)
router.route("/subtask/update/:id").put(updateSubTask)
router.route("/subtask/delete/:id").delete(deleteSubTask)

module.exports = router;