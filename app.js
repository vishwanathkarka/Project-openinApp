const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const userRoute = require("./routers/User")
const TaskRoute = require("./routers/Task")
const SubTask = require("./routers/SubTask")

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())

app.use("/api/v1",userRoute)
app.use("/api/v1",TaskRoute)
app.use("/api/v1",SubTask)

module.exports = app;