const app = require("./app")
require("dotenv").config();
const connectWithDb = require("./config/Db")
const cronJobs = require("./util/cronJobs")

connectWithDb()
// cronJobs.updatePriority.start()
cronJobs.updatePriority.start()
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT} 🔥`));