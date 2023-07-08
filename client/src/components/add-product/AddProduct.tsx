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
      <div className="md:flex lg:pt-8">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 pr-4">
          <TextInput
            id="product-name"
            value={productName}
            setValue={setProductName}
            label="Nombre del Producto"
          />

          <div className="mt-6 mb-8">
            <FilterDropdown
              options={CATEGORIES}
              onFilter={setCategory}
              label={category || "Categoría del producto"}
            />
          </div>

          <div className="w-full flex gap-4">
            <div className="w-1/3">
              <TextInput
                id="product-price"
                value={productPrice}
                setValue={setProductPrice}
                type="number"
                label="Precio"
              />
            </div>

            <div className="w-1/3">
              <TextInput
                id="product-stock"
                value={productStock}
                setValue={setProductStock}
                type="number"
                label="Cantidad de Stock"
              />
            </div>

            {/* <div className="w-1/3">
              <div className="relative border-b w-full mb-8">
                <div className="flex gap-2 items-center">
                  <p className="font-medium mb-2 text-[0.95rem]">Descuento</p>
                  <input
                    id="isOnSale"
                    type="checkbox"
                    checked={isOnSale}
                    onChange={(e) => setIsOnSale(e.target.checked)}
                  />
                </div>
                <input
                  className={`py-2 px-3 w-full focus:outline-none rounded border border-gray-300 focus:border-blue-500`}
                  id="isOnSale"
                  type="number"
                  value={discount}
                  onChange={setDiscount}
                  required
                />
              </div>
            </div> */}
          </div>

          <TextInput
            id="product-brief-description"
            value={productBriefDescription}
            setValue={setProductBriefDescription}
            type="textarea"
            label="Introducción al Producto"
          />

          <TextInput
            id="product-description"
            value={productDescription}
            setValue={setProductDescription}
            type="textarea"
            label="Descripción"
          />
        </form>

        <form onSubmit={handleSubmit} className="w-full md:w-1/2 pl-4">
          <div className="formGroup">
            <label htmlFor="productImage">Imágenes del Producto</label>

            <div className="flex gap-4 mt-1">
              <div className="formGroup">
                <label
                  htmlFor="productImage"
                  className="bg-white border py-2 text-[0.85rem] font-medium px-4 border-black rounded uppercase cursor-pointer"
                >
                  Imagen principal
                </label>
                <input
                  id="productImage"
                  type="file"
                  onChange={(e: any) => {
                    if (e.target.files.length > 0) {
                      setMainImageUrl(e.target.files[0]);
                    }
                  }}
                  required
                  className="hidden"
                />
              </div>

              <div className="formGroup">
                <label
                  htmlFor="secondaryImages"
                  className="bg-white border py-2 text-[0.85rem] font-medium px-4 border-black rounded uppercase cursor-pointer"
                >
                  Imágenes adicionales
                </label>
                <input
                  id="secondaryImages"
                  type="file"
                  multiple
                  onChange={handleSecondaryImagesChange}
                  required
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 my-8">
            {typeof window !== "undefined" &&
              mainImageUrl instanceof window.File && (
                <img
                  src={URL.createObjectURL(mainImageUrl)}
                  alt="Product Main"
                  className="w-1/3 h-auto"
                />
              )}

            {previewImages.length > 0 && (
              <div className="w-full flex flex-wrap gap-4">
                {previewImages.map((url, i) => (
                  <img key={i} src={url} alt="Preview" className="w-24 h-24" />
                ))}
              </div>
            )}
          </div>

          {/* <TextInput
            id="product-addtional-information"
            value={additionalInformation}
            setValue={setAdditionalInformation}
            type="textarea"
            label="Información Adicional"
          /> */}
        </form>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-black text-[0.95rem] rounded py-3 w-full lg:px-48 lg:w-auto uppercase text-center text-white"
          onClick={handleSubmit}
          type="submit"
        >
          Añadir Producto
        </button>
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
