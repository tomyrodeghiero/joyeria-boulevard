const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  mainImageUrl: { type: String, required: true },
  secondaryImageUrls: [{ type: String }],
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  sku: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Product", productSchema);
