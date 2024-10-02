const express= require("express");
const router= express.Router();
const taskcontroller = require("../controller/taskcontroller")

router.route("/addtasks").post(taskcontroller.addTask);
router.route("/gettask").get(taskcontroller.getTasks);

module.exports=router         