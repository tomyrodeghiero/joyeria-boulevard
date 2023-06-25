"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Page = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState<any>(null);
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
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
    formData.append("image", mainImageUrl);
    formData.append("category", productCategory);
    formData.append("stock", productStock);

    const response = await fetch("/api/add-product", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Reset the form
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setMainImageUrl(null);
      setProductCategory("");
      setProductStock("");
      fetchProducts();
      alert("Product added successfully");
    } else {
      alert("Failed to add product");
    }
  };

  const handleDelete = async (productId: string) => {
    const response = await fetch(`/api/delete-product/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchProducts();
      alert("Product deleted successfully");
    } else {
      console.log("productId", productId);
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
              setMainImageUrl(e.target.files && e.target.files[0])
            }
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productCategory">Product Category:</label>
          <input
            id="productCategory"
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="productStock">Product Stock:</label>{" "}
          <input
            id="productStock"
            type="number"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>

      <h2>Products</h2>
      {products.map((product) => (
        <div className={styles.productCard} key={product._id}>
          <div className={styles.productImage}>
            <img src={product.mainImageUrl} alt={product.name} />
          </div>
          <div className={styles.productInfo}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
          <div className={styles.productActions}>
            <Link
              key={product._id}
              className="flex flex-col text-left"
              href={`/my-account/admin/edit-product/${product._id}`}
            >
              <button>Edit Button</button>
            </Link>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
