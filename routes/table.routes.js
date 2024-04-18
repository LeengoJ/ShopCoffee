const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const tableController = require("../controller/tableController");

router.post("/", protect.authorize("admin"), tableController.CreateTable);
router.get("/:id", protect.authorize("admin"), tableController.GetTableById);
router.get("/", tableController.GetAllTable);
router.post(
  "/updateTable/:id",
  protect.authorize("admin"),
  tableController.UpdateTable
);
router.delete("/:id", protect.authorize("admin"), tableController.DeleteTable);
router.get("/searchByName", tableController.searchByName);
router.post(
  "/updateStatusTables/:id",
  protect.authorize("staff"),
  tableController.updateStatusTable
);

module.exports = router;
