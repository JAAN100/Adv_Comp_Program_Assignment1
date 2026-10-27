const Course = require("../models/courses");
const Category = require("../models/category");

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const handleError = (res, error) => {
  if (error.code === 11000) {
    return res
      .status(409)
      .json({ success: false, message: "Course title already exists" });
  }
  if (error.name === "CastError") {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ success: false, message: error.message });
  }
  return res.status(500).json({ success: false, message: error.message });
};

// POST /api/courses
const createCourse = async (req, res) => {
  try {
    const { title, description, price, duration, level, category, isActive } =
      req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, description and category are required",
      });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const course = await Course.create({
      title,
      slug: slugify(title),
      description,
      price,
      duration,
      level,
      category,
      isActive,
      userRef: req.user.id,
    });

    res.status(201).json({ success: true, data: course });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /api/courses  (optional filter: /api/courses?category=<categoryId>)
const getCourses = async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const courses = await Course.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "category",
      "name slug",
    );

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    handleError(res, error);
  }
};

// PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const { title, description, price, duration, level, category, isActive } =
      req.body;
    const updates = {};

    if (title) {
      updates.title = title;
      updates.slug = slugify(title);
    }
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = price;
    if (duration !== undefined) updates.duration = duration;
    if (level !== undefined) updates.level = level;
    if (isActive !== undefined) updates.isActive = isActive;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
      updates.category = category;
    }

    const course = await Course.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate("category", "name slug");

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
