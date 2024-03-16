const mongoose = require("mongoose");
const Task = require("../models/Task");
const BigPromise = require("../middleware/Bigpromise");
const SubTask = require("../models/SubTask")
const CustomError = require("../util/customError");
// const cookieToken = require("../util/cookieToken");

exports.createSubTask = BigPromise(async (req, res, next) => {
    const { status } = req.body;
    const {taskId} = req.params
    
     const task = await Task.findById({_id:taskId});
    if (status === undefined || !Number.isInteger(status) || status < 0 || status > 1) {
      throw new CustomError("Invalid status for subtask", 400);
    }
    if (!task) {
        throw new CustomError("Task not found", 404);
    }
    const createdSubTask = await SubTask.create({task_id:taskId,status,created_at:Date.now()})
    res.status(200).json({
        success:true,
        createdSubTask
       })
})


exports.getSubTask = async (req, res, next) => {
        const { task_id } = req.query;
        console.log(req.user.id);
        const filter = { user_id: req.user.id };
        const taskData = await Task.findOne(filter);
        if (!taskData) {
            throw new CustomError("Task not found", 400);
        }
        const taskId = taskData._id;
        console.log(taskId);
        if (task_id) {
            filter.task_id = taskId;
        }
        const subtasks = await SubTask.find({ task_id: taskId });
        res.status(200).json(subtasks);
};


exports.updateSubTask = BigPromise(async(req,res,next)=>{
    const { status } = req.body;
    const {id} = req.params
    if (status === undefined || !Number.isInteger(status) || status < 0 || status > 1) {
        throw new CustomError("Invalid status for subtask", 400);
      }
    const subtask = await SubTask.findOneAndUpdate(
        { _id: id},
        { status ,updated_at:Date.now() },
        { new: true }
      );
      if (!subtask) {
        throw new CustomError("Subtask not found", 404);
      }  
      res.status(200).json({
          success:true,
          subtask
         })  
})


exports.deleteSubTask = BigPromise(async(req,res,next)=>{
    const{id} = req.params
    const subtask = await SubTask.findOneAndUpdate(
        { _id: id },
        { deleted_at: Date.now() },
        { new: true }
      );
      if (!subtask) {
        throw new CustomError("Subtask not found", 404);
      }
      res.status(200).json({
        success:true,
        subtask
       })
})




