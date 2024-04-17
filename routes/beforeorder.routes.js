const express = require("express");
const router = express.Router();

var Controller = require('../controller/BeforeOrderController');
// var Auth = require('../core/Auth');
/* GET users listing. */
router.post('/',Controller.create);
router.get('/',Controller.getList);
router.get('/details/:id',Controller.details);
router.post('/changeStatus/:id',Controller.changeStatus);
router.post('/coverToOrder/:id',Controller.convertToOrder);

module.exports = router;
