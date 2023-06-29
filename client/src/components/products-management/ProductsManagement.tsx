"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ProductsManagement = () => {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState<any>(null);
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [secondaryImages, setSecondaryImages] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("authenticated")) {
      router.push("/my-account");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    }
  };

  const handleSecondaryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      setSecondaryImages(Array.from(e.target.files));

      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // Free memory when ever this component is unmounted
      setPreviewImages((prevImages) => prevImages.concat(fileArray));

      Array.from(e.target.files).map((file) =>
        URL.revokeObjectURL(file as any)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("images", mainImageUrl);
    secondaryImages.forEach((image) => formData.append("images", image));
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
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="productName">Product Name:</label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            id="productPrice"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
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
        <div className="formGroup">
          <label htmlFor="secondaryImages">Product Secondary Images:</label>
          <input
            id="secondaryImages"
            type="file"
            multiple
            onChange={handleSecondaryImagesChange}
            required
          />
          {previewImages.length > 0 && (
            <div>
              {previewImages.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Preview"
                  style={{ width: "100px" }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="productCategory">Product Category:</label>
          <input
            id="productCategory"
            type="text"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="productStock">Product Stock:</label>
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
        <div className="productCard" key={product._id}>
          <div className="productImage">
            <img src={product.mainImageUrl} alt={product.name} />
          </div>
          <div className="productInfo">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
          </div>
          <div className="productActions">
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

export default ProductsManagement;
