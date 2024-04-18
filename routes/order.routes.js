const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");

var Controller = require('../controller/OrderController');
// var Auth = require('../core/Auth');
/* GET users listing. */
router.post('/',protect.authorize("staff"),Controller.create);
router.get('/',protect.authorize("staff"),Controller.getList);
router.get('/details/:id',protect.authorize("staff"),Controller.details);
router.post('/changeStatus/:id',protect.authorize("staff"),Controller.changeStatus);
router.post('/update/:id',protect.authorize("staff"),Controller.update);

module.exports = router;
