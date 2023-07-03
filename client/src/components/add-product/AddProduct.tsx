"use client";

import React, { useState } from "react";
import { FilterDropdown } from "../filter-dropdown/FilterDropdown";
import { ToastContainer, toast } from "react-toastify";
import { TextInput } from "../text-input/TextInput";
import { CATEGORIES } from "@/utils/constants";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBriefDescription, setProductBriefDescription] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState<any>([]);
  const [productStock, setProductStock] = useState("");
  const [secondaryImages, setSecondaryImages] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isOnSale, setIsOnSale] = useState<any>(false);
  const [discount, setDiscount] = useState<any>(0);
  const [category, setCategory] = useState<any>("");

  const handleSecondaryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      setSecondaryImages((prevImages) => prevImages.concat(filesArray));

      const fileURLArray = filesArray.map((file) => URL.createObjectURL(file));

      // Free memory when ever this component is unmounted
      setPreviewImages((prevImages) => prevImages.concat(fileURLArray));

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
    formData.append("briefDescription", productBriefDescription);
    formData.append("description", productDescription);
    formData.append("additionalInformation", additionalInformation);
    formData.append("category", category);
    formData.append("isOnSale", isOnSale);
    formData.append("discount", discount);
    formData.append("stock", productStock);

    const allImages = [mainImageUrl, ...secondaryImages];

    allImages.forEach((image) => {
      if (image) {
        formData.append("images", image, image.name);
      }
    });

    const response = await fetch("/api/add-product", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Reset the form
      setProductName("");
      setProductPrice("");
      setProductDescription("");
      setProductStock("");

      toast.success("El producto ha sido añadido.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      alert("Failed to add product");
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <TextInput
            id="product-name"
            value={productName}
            setValue={setProductName}
            placeholder="Nombre del prodcto"
          />
          <TextInput
            id="product-price"
            value={productPrice}
            setValue={setProductPrice}
            placeholder="Precio"
            type="number"
          />

          <TextInput
            id="product-brief-description"
            value={productBriefDescription}
            setValue={setProductBriefDescription}
            placeholder="Introducción al producto"
            type="textarea"
          />

          <TextInput
            id="product-description"
            value={productDescription}
            setValue={setProductDescription}
            placeholder="Descripción del producto"
            type="textarea"
          />

          <TextInput
            id="product-addtional-information"
            value={additionalInformation}
            setValue={setAdditionalInformation}
            placeholder="Información Adicional (Opcional)"
            type="textarea"
          />

          <div className="formGroup">
            <label htmlFor="productImage">Product Image</label>
            <input
              id="productImage"
              type="file"
              onChange={(e: any) => setMainImageUrl(e.target.files[0])}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="secondaryImages">Product Secondary Images</label>
            <input
              id="secondaryImages"
              type="file"
              multiple
              onChange={handleSecondaryImagesChange}
              required
            />
            {previewImages.length > 0 && (
              <div className="flex gap-4 mt-4">
                {previewImages.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Preview"
                    className="rounded"
                    style={{ width: "100px" }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mb-8 mt-8">
            <FilterDropdown
              options={CATEGORIES}
              onFilter={setCategory}
              label={category || "Categoría del producto"}
            />
          </div>

          <TextInput
            id="product-stock"
            value={productStock}
            setValue={setProductStock}
            placeholder="Stock del producto"
            type="number"
          />

          <div className="flex items-center gap-3">
            <label htmlFor="isOnSale">Is On Sale</label>
            <input
              id="isOnSale"
              type="checkbox"
              checked={isOnSale}
              onChange={(e) => setIsOnSale(e.target.checked)}
            />
          </div>

          {isOnSale && (
            <div className="mt-4">
              <TextInput
                id="discount"
                value={discount}
                setValue={setDiscount}
                placeholder="Discount"
                type="number"
              />
            </div>
          )}

          <div className="flex justify-center mt-14">
            <button
              className="bg-black text-[0.9rem] rounded py-3 w-full lg:px-52 lg:w-auto uppercase text-center text-white"
              onClick={handleSubmit}
              type="submit"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AddProduct;
