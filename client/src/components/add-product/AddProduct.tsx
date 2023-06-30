"use client";
import React, { useState, useEffect } from "react";
import { FilterDropdown } from "../filter-dropdown/FilterDropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TextInput = ({
  id,
  value,
  setValue,
  placeholder,
  type = "text",
}: any) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(value !== "");
  }, [value]);

  const handleTextChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative border-b w-full mb-8">
      <input
        className={`py-2 px-3 w-full focus:outline-none ${
          isActive ? "pt-6" : ""
        }`}
        id={id}
        type={type}
        value={value}
        onChange={handleTextChange}
        required
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-0 transition-all ${
          isActive ? "text-xs text-gray-500" : "mt-2 text-base text-gray-400"
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
};

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productBriefDescription, setProductBriefDescription] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [mainImageUrl, setMainImageUrl] = useState<any>(null);
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");
  const [secondaryImages, setSecondaryImages] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

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
    formData.append("briefDescription", productBriefDescription);
    formData.append("description", productDescription);
    formData.append("additionalInformation", additionalInformation);
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

      toast("⌚ El producto ha sido añadido", {
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
          />

          <TextInput
            id="product-description"
            value={productDescription}
            setValue={setProductDescription}
            placeholder="Descripción del producto"
          />

          <TextInput
            id="product-addtional-information"
            value={additionalInformation}
            setValue={setAdditionalInformation}
            placeholder="Información Adicional (Opcional)"
          />

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

          <div className="mb-8 mt-8">
            <FilterDropdown
              options={["Joyas", "Relojes", "Pulseras"]}
              onFilter={undefined}
              label="Categoría del producto"
            />
          </div>

          <TextInput
            id="product-stock"
            value={productStock}
            setValue={setProductStock}
            placeholder="Stock del producto"
            type="number"
          />

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
