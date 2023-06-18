"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { PRODUCT as productID, PRODUCTS } from "@/data/products";
import {
  CONTACT_ICON,
  FACEBOOK,
  HEARTH_ICON,
  INSTAGRAM,
  STARS,
  TWITTER,
} from "@/utils/constants";
import WhatsApp from "@/components/whatsaap/WhatsApp";

export default function Page({ params }: { params: { id: string } }) {
  const mainImageRef = useRef<any>(null);
  const [height, setHeight] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [productID, setProductID] = useState<any>();

  // Function to fetch products
  async function getProductID(): Promise<any> {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`/api/product/${params.id}`, requestOptions);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (
        !response.headers.get("Content-Type")?.includes("application/json")
      ) {
        throw new Error(
          `Invalid content type. Expected application/json but received ${response.headers.get(
            "Content-Type"
          )}`
        );
      }

      const productDB = await response.json();

      // set the ordered chat history instead of setting it
      setProductID(productDB);
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  }

  useEffect(() => {
    getProductID();
  }, []);

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => quantity > 1 && setQuantity(quantity - 1);

  if (!mainImageRef || !productID) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col py-14 px-16">
      <Navbar />
      <div className="flex justify-between gap-8 my-8 relative">
        <div
          className="w-[12.5%] flex flex-col space-y-4 hide-scrollbar"
          style={{ maxHeight: `${height}px`, overflowY: "auto" }}
        >
          {productID.secondaryImageUrls.map((image: any, index: string) => (
            <img key={index} src={image} alt={`product-image-${index}`} />
          ))}
        </div>
        <div className="w-[43.5%]">
          <img
            ref={mainImageRef}
            src={productID.mainImageUrl}
            alt="main-product-image"
            className="w-full h-auto"
            onLoad={() => setHeight(mainImageRef.current.offsetHeight)}
          />
        </div>
        <div className="w-[43.5%] pl-4" style={{ maxHeight: `${height}px` }}>
          <h1 className="text-2xl mb-3">{productID?.name}</h1>
          <h2 className="text-xl text-yellow-800 mb-14">${productID.price}</h2>
          <img src={STARS} alt="Stars" className="w-28 mb-4" />
          <p className="text-gray-700">{productID.description}</p>
          <div className="flex items-center my-12 justify-start gap-4">
            <div className="flex w-1/5 h-11 text-gray-700 justify-between rounded items-center gap-2 bg-gray-300 p-2">
              <button onClick={decrement} className="px-2">
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button onClick={increment} className="px-2">
                +
              </button>
            </div>
            <button className="bg-white w-full border py-2 h-11 text-[0.85rem] font-medium px-10 border-black rounded uppercase">
              Añadir al carrito
            </button>
          </div>
          <div className="flex items-center">
            <img src={HEARTH_ICON} alt="Hearth" className="h-4 mr-7" />
            <span className="text-gray-400 mr-7">|</span>
            <div className="flex justify-center gap-6">
              <img src={CONTACT_ICON} alt="Contact" className="h-4" />
              <img src={FACEBOOK} alt="Facebook" className="h-4" />
              <img src={INSTAGRAM} alt="Instagram" className="w-4" />
              <img src={TWITTER} alt="Twitter" className="w-4" />
            </div>
          </div>
          <h2 className="bottom-0 text-[0.95rem] absolute">
            Categoría: &nbsp;
            <span className="text-gray-700">{productID.category}</span>
          </h2>
        </div>
      </div>

      <div className="flex border-b border-gray-300">
        <button
          className={`px-12 py-5 ${
            activeTab === "description"
              ? "border-b-2 border-black"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Descripción
        </button>
        <button
          className={`px-12 py-5 ${
            activeTab === "additionalInfo"
              ? "border-b-2 border-black"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("additionalInfo")}
        >
          Información adicional
        </button>
      </div>
      {activeTab === "description" && (
        <p className="text-gray-700 py-10">{productID?.description}</p>
      )}
      {activeTab === "additionalInfo" && (
        <p className="text-gray-700 py-10">{productID?.additionalInfo}</p>
      )}

      <h3 className="mt-10 text-2xl font-normal">Artículos similares</h3>
      <div className="flex overflow-x-scroll gap-8 hide-scrollbar my-6">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="min-w-[200px]">
            <img
              src={product.image}
              alt={product?.name}
              className="object-contain"
            />
            <h4 className="mt-4 w-full truncate">{product?.name}</h4>
            <p className="text-yellow-800 mt-1">${product.price}</p>
          </div>
        ))}
      </div>
      <WhatsApp />
      <Footer />
    </main>
  );
}
