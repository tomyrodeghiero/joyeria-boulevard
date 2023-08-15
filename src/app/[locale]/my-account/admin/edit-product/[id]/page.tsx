"use client";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product when the component mounts
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await fetch(`/api/product/${params.id}`);
    const data = await response.json();
    setProduct(data);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const updatedProduct = {
      // Include the updated fields here
    };

    const response = await fetch(`/api/edit-product/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    if (response.ok) {
      alert("Product updated successfully");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <main className="flex min-h-screen flex-col lg:py-10 lg:px-16 px-4 py-5 bg-white">
      <h2>Edit Product</h2>
      <p>{params.id}</p>
      {product && (
        <form onSubmit={handleSubmit}>
          {/* Include fields for the product information here, pre-filled with the current product information */}
        </form>
      )}
    </main>
  );
}
