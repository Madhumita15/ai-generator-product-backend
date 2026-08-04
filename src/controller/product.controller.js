const httpStatusCode = require("../utils/httpStatusCode");
const Product = require("../models/product.model");
const geminiService = require("../services/gemini.service");

class ProductController {
  async generateProduct(req, res) {
    try {
      const { productName, category, brand, keyFeatures, targetAudience } =
        req.body;

      const response = await geminiService.generateProductContent({
        productName,
        category,
        brand,
        keyFeatures,
        targetAudience,
      });

      let result = response.text;
      if (result.startsWith("```")) {
        result = result
          .replace(/^```(json)?\n?/, "")
          .replace(/\n?```$/, "")
          .trim();
      }

      const aiContent = JSON.parse(result);

      const newProduct = new Product({
        productName,
        category,
        brand,
        targetAudience,
        keyFeatures,
        aiContent,
        userId: req.user.id,
      });

      const data = await newProduct.save();

      return res.status(httpStatusCode.CREATE).json({
        status: true,
        message: "Product created successfully!",
        data: data,
      });
    } catch (error) {
      // console.error("Gemini Generation Error:", error);
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async regenerateProduct(req, res) {
    try {
      const { productName, brand, category, targetAudience, keyFeatures } =
        req.body;
      const productId = req.params.id;
      const userId = req.user.id;
      const response = await geminiService.generateProductContent({
        productName,
        category,
        brand,
        keyFeatures,
        targetAudience,
      });

      let result = response.text;
      if (result.startsWith("```")) {
        result = result
          .replace(/^```(json)?\n?/, "")
          .replace(/\n?```$/, "")
          .trim();
      }

      const aiContent = JSON.parse(result);
      const updatedData = await Product.findOneAndUpdate(
        { _id: productId, userId: userId },
        { productName, brand, category, targetAudience, keyFeatures },
        { new: true },
      );
      return res.status(httpStatusCode.OK).json({
        status: true,
        message: "Product updated successfully!",
        data: updatedData,
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async generateCaption(req, res) {
    try {
      const productData = await Product.findOne({
        _id: req.params.id,
        userId: req.user.id,
      });

      if (!productData) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "Product not found",
        });
      }

      const response = await geminiService.generateProductCaption(productData);

      let result = response.text;
      if (result.startsWith("```")) {
        result = result
          .replace(/^```(json)?\n?/, "")
          .replace(/\n?```$/, "")
          .trim();
      }

      const captions = JSON.parse(result);

      return res.status(httpStatusCode.CREATE).json({
        status: true,
        message: "Captions generated successfully.",
        data: captions,
      });
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async productHistory(req, res) {
    try {
      const id = req.user.id;
      const products = await Product.find({ userId: id }).sort({ created: -1 });
      if (!products || products.length === 0) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "Product not found",
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          status: true,
          message: "Product gets successfully!",
          data: products,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async productById(req, res) {
    try {
      const userId = req.user.id;
      const productId = req.params.id;
      const productById = await Product.findOne({
        _id: productId,
        userId: userId,
      });
      if (!productById) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "Product not found",
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          status: true,
          message: "Product gets successfully!",
          data: productById,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async deleteProductById(req, res) {
    try {
      const userId = req.user.id;
      const productId = req.params.id;
      const productById = await Product.findOneAndDelete({
        _id: productId,
        userId: userId,
      });
      if (!productById) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "Product not found",
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          status: true,
          message: "Product deleted successfully!",
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
