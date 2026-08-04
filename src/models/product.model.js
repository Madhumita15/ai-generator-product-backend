const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    productName: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    keyFeatures: [
      {
        type: String,
        required: true,
      },
    ],
    targetAudience: {
      type: String,
      required: true,
    },
    aiContent: {
      description: {
        type: String,
      },
      shortDescription: {
        type: String,
      },
      sellingPoints: [
        {
          type: String,
        },
      ],
      seoKeywords: [
        {
          type: String,
        },
      ],
      tagline: {
        type: String,
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
