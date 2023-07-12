require("dotenv").config();

const { HfInference } = require("@huggingface/inference");

const HF_ACCESS_TOKEN = "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";
const inference = new HfInference(HF_ACCESS_TOKEN);

const express = require("express");
const morgan = require("morgan");
const paymentRoutes = require("./src/routes/payment.routes.js");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", false);
const Product = require("./models/Product.js");
const bcrypt = require("bcryptjs");
const app = express();
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const AdminUser = require("./models/AdminUser.js");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", process.env.FRONTEND_PUBLIC_URL],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(morgan("dev"));
app.use(paymentRoutes);

mongoose.connect(process.env.DB_HOST);

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET a specific product by id
app.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const uploadMiddleware = multer({ storage });

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const adminUserDoc = await AdminUser.findOne({ username });

    if (!adminUserDoc) {
      return res.status(401).json({ message: "wrong credentials" });
    }

    const passOk = bcrypt.compareSync(password, adminUserDoc.password);

    if (!passOk) {
      return res.status(401).json({ message: "wrong credentials" });
    }

    // logged in
    res.status(200).json({ message: "login success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server error" });
  }
});

app.post("/api/logout", (req, res) => {
  res.cookie("token", "").json("okay");
});

// Add product
app.post(
  "/api/add-product",
  uploadMiddleware.array("images"),
  async (req, res) => {
    try {
      const {
        name,
        price,
        description,
        category,
        stock,
        briefDescription,
        additionalInformation,
        isOnSale,
        discount,
      } = req.body;
      const mainImageUrl = req.files[0].path; // Assuming the first file is the main image
      const secondaryImageUrls = req.files.slice(1).map((file) => file.path); // Rest of the files are secondary images // Rest of the files are secondary images

      const product = new Product({
        name,
        price,
        briefDescription,
        description,
        mainImageUrl,
        additionalInformation,
        secondaryImageUrls,
        category,
        stock,
        isOnSale,
        discount,
      });

      await product.save();
      res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete product
app.delete("/api/delete-product/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Edit product
app.put("/api/edit-product/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  try {
    await Product.findByIdAndUpdate(productId, updatedProduct);
    res.status(200).send("Product updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

// create an api to get all the products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/post-instagram", async (req, res) => {
  const token = process.env.INSTAGRAM_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  const imageUrl = req.body.imageUrl;
  const caption = req.body.caption;

  try {
    const mediaResponse = await fetch(
      `https://graph.facebook.com/v12.0/${userId}/media`,
      {
        method: "POST",
        body: JSON.stringify({
          image_url: imageUrl,
          caption: caption,
          access_token: token,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const mediaResData = await mediaResponse.json();

    const publishResponse = await fetch(
      `https://graph.facebook.com/v12.0/${userId}/media_publish`,
      {
        method: "POST",
        body: JSON.stringify({
          creation_id: mediaResData.id,
          access_token: token,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const publishResData = await publishResponse.json();

    res.status(200).json({
      message: "Publicado en Instagram exitosamente",
      data: publishResData,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Error al intentar publicar en Instagram",
      error: error,
    });
  }
});

app.post("/api/chatbot", async (req, res) => {
  try {
    const { product } = req.body;
    console.log("product", product);

    if (!product) {
      return res.status(400).send("Product is required");
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `Genera una descripción atractiva para un post de Instagram sobre un ${product} con emogis.`,
        },
      ],
    });

    console.log("completion", completion.data);

    res.send(completion.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

// Listen port
app.listen(5000);
console.log("Server listening on port", 5000);
