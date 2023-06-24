"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

const Page = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/products`);
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("image", productImage);

    const response = await fetch(`${process.env.BACKEND_URL}/api/products`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Reset the form
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductImage(null);
      fetchProducts();
      alert("Product added successfully");
    } else {
      alert("Failed to add product");
    }
  };

  const handleDelete = async (productId: string) => {
    const response = await fetch(
      `http://localhost:5000/api/product/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      fetchProducts();
      alert("Product deleted successfully");
    } else {
      alert("Failed to delete product");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="productName">Product Name:</label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productPrice">Product Price:</label>
          <input
            id="productPrice"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productImage">Product Image:</label>
          <input
            id="productImage"
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductImage(e.target.files && e.target.files[0])
            }
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      <h2>Products</h2>
      {products.map((product) => (
        <div className={styles.productCard} key={product._id}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
          <div className={styles.productActions}>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
