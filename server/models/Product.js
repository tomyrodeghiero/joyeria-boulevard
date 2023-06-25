const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  mainImageUrl: { type: String, required: true },
  secondaryImageUrls: [{ type: String }],
  category: { type: String, required: false },
  stock: { type: Number, required: false },
});

module.exports = mongoose.model("Product", productSchema);
