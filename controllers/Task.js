const mongoose = require("mongoose");
const Task = require("../models/Task");
const SubTask = require("../models/SubTask")
const BigPromise = require("../middleware/Bigpromise");
const CustomError = require("../util/customError");
// const cookieToken = require("../util/cookieToken");



exports.createTask = BigPromise(async (req, res, next) => {
    const {title,description,due_date,status} = req.body;

    if(!title || !description || !due_date || !status){
        throw new CustomError("Data is required", 400);
    }
  
    const createdTask = await Task.create({
        title,
        description,
        due_date,
        user_id: req.user.id,
        created_at:Date.now()
      });

      res.status(200).json({
        success: true,
        createdTask
      });
    
});

exports.updateTask = BigPromise(async(req,res,next) => {
    const {id}  = req.params;
    const { due_date, status } = req.body;
    const updates = {};
    if (due_date) updates.due_date = due_date;
    if (status) updates.status = status;
    updates.updated_at = Date.now()
   const UpdatedTask = await Task.findOneAndUpdate({_id:id,user_id: req.user.id},updates,{ new: true })
   if (!UpdatedTask) {
    throw new CustomError("Task not found", 404);
  }
   res.status(200).json({
    success:true,
    UpdatedTask
   })
})


exports.getTasks = BigPromise(async(req,res,next)=>{
    let { page = 1, limit = 10, priority, due_date } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const filter = { user_id: req.user.id };
    if (priority) filter.priority = priority;
    if (due_date) filter.due_date = due_date;
    const tasks = await Task.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ due_date: 'asc' }); 
    res.status(200).json({
        success:true,
        tasks
       })
})


exports.deleteTask = BigPromise(async(req,res,next)=>{
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user_id: req.user.id },
        { deleted_at: Date.now() },
        { new: true }
      );
      if (!task) {
        throw new CustomError("Task not found", 404);
      }
      await SubTask.updateMany({ task_id: task._id }, { deleted_at: Date.now() });
      res.status(200).json({
        success:true,
        task
       })

})

