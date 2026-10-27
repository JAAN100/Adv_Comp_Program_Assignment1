const { Schema, model } = require("mongoose");

const courseSchema = Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    duration: { type: String, trim: true }, // e.g. "6 weeks"
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "mern-estates",
      required: true,
    },
  },
  { timestamps: true },
);

const Course = model("course", courseSchema);

module.exports = Course;
