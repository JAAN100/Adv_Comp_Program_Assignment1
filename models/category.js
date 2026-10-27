const { Schema, model } = require("mongoose");

const categorySchema = Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "mern-estates",
      required: true,
    },
  },
  { timestamps: true },
);

const Category = model("category", categorySchema);

module.exports = Category;
