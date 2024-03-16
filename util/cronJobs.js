const cron = require('node-cron');
const Task = require('../models/Task');
const User = require('../models/User');
const Twilio = require('twilio');


const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

 let updatePriority =  cron.schedule('*/1 * * * *', async () => {
  try {
    console.log("-----  update-job running   ----- ")
    // Update tasks based on due_date
    await Task.updateMany(
      { due_date: { $eq: new Date() } },
      { $set: { priority: 0 } }
    );
    await Task.updateMany(
      { due_date: { $gte: new Date(), $lte: new Date(new Date().setDate(new Date().getDate() + 2)) } },
      { $set: { priority: 1 } }
    );
    await Task.updateMany(
      { due_date: { $gte: new Date(new Date().setDate(new Date().getDate() + 3)) } },
      { $set: { priority: 2 } }
    );

  } catch (error) {
    console.error('Error updating task priorities:', error);
  }
}
);

const callingUser =  cron.schedule('*/1 * * * *', async () => {
  try {
    const users = await User.find({ priority: 0 });
    for (const user of users) {
      console.log(" -----     running calling feature in cron job    ----- ")
      const overdueTasks = await Task.find({ user_id: user.id, due_date: { $lt: new Date() } });
      if (overdueTasks.length > 0) {
        await twilioClient.calls.create({
          twiml: '<Response><Say>Your task is overdue. Please check your task list.</Say></Response>',
          to: "+919491609990",
          from: '+13219855188'
        });
        break;
      }
    }
  } catch (error) {
    console.error('Error making Twilio calls:', error);
  }
});

module.exports = {
  updatePriority,
  callingUser
};