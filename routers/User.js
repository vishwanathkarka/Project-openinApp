const express = require("express")
const router = express.Router()
const {accountCreate,addCookie} = require("../controllers/User")

router.route("/login").post(accountCreate);
router.route("/addCookie/:id").get(addCookie);

module.exports = router;