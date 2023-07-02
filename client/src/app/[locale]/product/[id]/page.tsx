"use client";

import { Carousel } from "react-responsive-carousel";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { PRODUCTS } from "@/data/products";
import {
  CONTACT_ICON,
  FACEBOOK,
  HEARTH_ICON,
  INSTAGRAM,
  STARS,
  TWITTER,
} from "@/utils/constants";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import { formatPriceARS } from "@/utils/function";
import { FormatText } from "@/utils/components/FormatText";
import { useCart } from "@/context/CartContext";

export default function Page({ params }: { params: { id: string } }) {
  const mainImageRef = useRef<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<any>("description");
  const [productID, setProductID] = useState<any>();

  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [additionalInfoOpen, setAdditionalInfoOpen] = useState(false);

  const carouselRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;

        // Si hemos llegado al final del carrusel, volvemos al principio
        if (
          carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 10); // Velocidad de desplazamiento, ajústala a tu gusto

    // Limpieza al desmontar
    return () => clearInterval(interval);
  }, []); // Dependencias vacías para que solo se ejecute una vez

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
      console.log("productDB: ", productDB);

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

  const { addToCart } = useCart();

  return (
    <main className="flex min-h-screen flex-col lg:py-14 lg:px-16 px-4 py-5 animate-fade-in">
      <Navbar />

      {/* Carousel on Mobile */}
      <div className="block md:hidden">
        <Carousel
          className="mt-4"
          showThumbs={false}
          emulateTouch={true}
          showArrows={false}
          showStatus={false}
        >
          <div>
            <img
              src={productID.mainImageUrl}
              alt="main-product-image"
              className="h-full rounded-lg"
            />
          </div>
          {productID.secondaryImageUrls.map((image: any, index: string) => (
            <div key={index}>
              <img
                src={image}
                alt={`product-image-${index}`}
                className="h-full rounded-lg"
              />
            </div>
          ))}
        </Carousel>
        <h1 className="text-2xl mt-5 mb-2">{productID?.name}</h1>
        <h2 className="text-yellow-800 mb-5">
          {formatPriceARS(productID.price)}
        </h2>

        <button
          onClick={() =>
            addToCart(
              productID._id,
              productID.name,
              productID.price,
              productID.mainImageUrl,
              quantity
            )
          }
          className="bg-white hover:bg-black hover:text-white w-full border py-2 h-11 text-[0.85rem] font-medium px-10 border-black rounded uppercase"
        >
          Añadir al carrito
        </button>

        <FormatText
          text={productID.briefDescription}
          className="text-gray-700 my-7"
        />

        <div className="border-y border-gray-400 text-[1.1rem]">
          <div
            onClick={() => setDescriptionOpen(!descriptionOpen)}
            className="cursor-pointer"
          >
            <h2 className="py-4 px-2">Descripción</h2>
            {descriptionOpen && (
              <FormatText
                text={productID.description}
                className="text-gray-700 mb-3"
              />
            )}
          </div>
          <div
            onClick={() => setAdditionalInfoOpen(!additionalInfoOpen)}
            className="cursor-pointer"
          >
            <h2 className="py-4 px-2">Información adicional</h2>
            {additionalInfoOpen && (
              <FormatText
                text={productID?.additionalInformation}
                className="text-gray-700 py-5"
              />
            )}
          </div>
        </div>
      </div>

      {/* Original layout on Desktop */}
      <div className="hidden md:flex justify-between gap-4 my-8 lg:max-h-[70vh] relative">
        <div className="flex flex-col space-y-4 hide-scrollbar scroll-container">
          {productID.secondaryImageUrls.map((image: any, index: string) => (
            <img
              key={index}
              src={image}
              alt={`product-image-${index}`}
              className="rounded-lg w-32"
            />
          ))}
        </div>
        <div className="md:w-[40%]">
          <img
            src={productID.mainImageUrl}
            alt="main-product-image"
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="md:w-[45%] pl-4">
          <h1 className="text-2xl mb-5">{productID?.name}</h1>
          <h2 className="text-xl text-yellow-800 mb-14">
            {formatPriceARS(productID.price)}
          </h2>
          <img src={STARS} alt="Stars" className="w-28 mb-4" />
          <FormatText
            text={productID.briefDescription}
            className="text-gray-700"
          />
          <div className="flex items-center my-12 justify-start gap-4">
            <div className="flex w-24 h-12 text-gray-700 justify-between rounded items-center gap-2 bg-gray-300 p-2">
              <button onClick={decrement} className="px-2">
                -
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button onClick={increment} className="px-2">
                +
              </button>
            </div>
            <button
              onClick={() =>
                addToCart(
                  productID._id,
                  productID.name,
                  productID.price,
                  productID.mainImageUrl,
                  quantity
                )
              }
              className="bg-white hover:bg-black hover:text-white w-full border py-2 h-11 text-[0.85rem] font-medium px-10 border-black rounded uppercase"
            >
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
          <h2 className="mt-14 text-[0.95rem]">
            Categoría: &nbsp;
            <span className="text-gray-700">{productID.category}</span>
          </h2>
        </div>
      </div>

      <div className="border-b hidden lg:flex border-gray-300">
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
        <div className="lg:py-10">
          <FormatText
            text={productID.description}
            className="text-gray-700 mb-3 hidden lg:flex"
          />
        </div>
      )}
      {activeTab === "additionalInfo" && (
        <div className="lg:py-10">
          <FormatText
            text={productID?.additionalInformation}
            className="text-gray-700 py-5 hidden lg:flex"
          />
        </div>
      )}
      <h3 className="mt-10 text-2xl font-normal">Artículos similares</h3>
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll gap-8 hide-scrollbar my-6"
      >
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
