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
  const [productStock, setProductStock] = useState<any>(1);
  const [secondaryImages, setSecondaryImages] = useState<any[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isOnSale, setIsOnSale] = useState<any>(false);
  const [discount, setDiscount] = useState<any>(0);
  const [category, setCategory] = useState<any>("");

  const handleSecondaryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files) {
      const filesArray: Array<any> = Array.from(e.target.files);

      setSecondaryImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = filesArray[0];
        return updatedImages;
      });

      const fileURL = URL.createObjectURL(filesArray[0]);

      setPreviewImages((prevImages) => {
        const updatedPreviews = [...prevImages];
        updatedPreviews[index] = fileURL;
        return updatedPreviews;
      });

      URL.revokeObjectURL(filesArray[0]);
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

          <div className="w-full flex gap-4">
            <div className="w-1/2">
              <TextInput
                id="product-price"
                value={productPrice}
                setValue={setProductPrice}
                type="number"
                label="Precio"
              />
            </div>

            <div className="w-1/2">
              <div className="relative border-b w-full mb-8">
                <div className="flex gap-2 items-center">
                  <p className="font-medium mb-2 text-[0.95rem]">Descuento</p>
                  {/* <input
                    id="isOnSale"
                    type="checkbox"
                    checked={isOnSale}
                    onChange={(e) => setIsOnSale(e.target.checked)}
                  /> */}
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
            </div>
          </div>

          <TextInput
            id="product-brief-description"
            value={productBriefDescription}
            setValue={setProductBriefDescription}
            type="textarea"
            label="Introducción al Producto"
            ai
            productName={productName}
          />

          <TextInput
            id="product-description"
            value={productDescription}
            setValue={setProductDescription}
            type="textarea"
            label="Descripción"
            ai
          />
        </form>

        <form onSubmit={handleSubmit} className="w-full md:w-1/2">
          <div className="my-8">
            <FilterDropdown
              options={CATEGORIES}
              onFilter={setCategory}
              label={category || "Categoría del producto"}
            />
          </div>

          <div className="formGroup">
            <label htmlFor="productImage">Imágenes del Producto</label>

            <div onSubmit={handleSubmit} className="flex gap-2 w-full">
              <div className="grid col-span-2 md:col-span-2">
                <label
                  htmlFor="productImage"
                  className="w-64 h-64rounded border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
                >
                  {typeof window !== "undefined" &&
                  mainImageUrl instanceof window.File ? (
                    <img
                      src={URL.createObjectURL(mainImageUrl)}
                      alt="Product Main"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <>
                      <p className="text-gray-500 text-sm mt-2">
                        Seleccionar Imagen Principal
                      </p>
                    </>
                  )}
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
                </label>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-2 w-full">
                {previewImages.map((previewImage, index: number) => (
                  <label
                    key={index}
                    htmlFor={`secondaryImage-${index}`}
                    className="w-full h-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Product Secondary"
                        className="object-cover rounded"
                      />
                    ) : (
                      <>
                        <p className="text-gray-500 text-sm mt-2">
                          Imagen Secundaria
                        </p>
                      </>
                    )}
                    <input
                      id={`secondaryImage-${index}`}
                      type="file"
                      onChange={(e) => handleSecondaryImagesChange(e, index)}
                      className="hidden"
                    />
                  </label>
                ))}
                <label
                  htmlFor={`secondaryImage-${previewImages.length}`}
                  className="w-24 h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                >
                  <p className="text-gray-500 text-sm mt-2 text-center">
                    Imagen Secundaria
                  </p>
                  <input
                    id={`secondaryImage-${previewImages.length}`}
                    type="file"
                    onChange={(e) =>
                      handleSecondaryImagesChange(e, previewImages.length)
                    }
                    className="hidden"
                  />
                </label>
              </div>
            </div>
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
