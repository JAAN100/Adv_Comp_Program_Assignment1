const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controllers");
const verifyToken = require("../middleware/auth.middleware");

router.post("/", verifyToken, createCategory);
router.get("/", getCategories);
router.put("/:id", verifyToken, updateCategory);
router.delete("/:id", verifyToken, deleteCategory);

module.exports = router;
