const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller.js");
const verifyToken = require("../middleware/auth.middleware");

router.post("/", verifyToken, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", verifyToken, updateCourse);
router.delete("/:id", verifyToken, deleteCourse);

module.exports = router;
