export const MAIN_PRODUCTS = [
  {
    id: 1,
    name: "Producto 1",
    image: "/assets/data/carrousel/carrousel-01.jpeg",
  },
  {
    id: 2,
    name: "Producto 2",
    image: "/assets/data/carrousel/carrousel-02.jpeg",
  },
  {
    id: 3,
    name: "Producto 3",
    image: "/assets/data/carrousel/carrousel-03.jpeg",
  },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Reloj Citizen AN817059E",
    image: "/assets/data/product-01.png",
    price: 35,
  },
  {
    id: 2,
    name: "Reloj Línea Rose",
    image: "/assets/data/product-02.png",
    price: 25,
  },
  {
    id: 3,
    name: "Anillo Plata - Avant Swarovski",
    image: "/assets/data/product-03.png",
    price: 30,
  },
  {
    id: 4,
    name: "Anillo Plata 825",
    image: "/assets/data/product-04.png",
    price: 30,
  },
  {
    id: 5,
    name: "Dije Cristal con Piedra Natural",
    image: "/assets/data/product-05.png",
    price: 19,
  },
  {
    id: 6,
    name: "Aros Abridores Oro 18K",
    image: "/assets/data/product-06.png",
    price: 42,
  },
  {
    id: 7,
    name: "Reloj Citizen AN817059E",
    image: "/assets/data/product-01.png",
    price: 35,
  },
  {
    id: 8,
    name: "Reloj Citizen AN817059E",
    image: "/assets/data/product-01.png",
    price: 35,
  },
  {
    id: 9,
    name: "Reloj Citizen AN817059E",
    image: "/assets/data/product-01.png",
    price: 35,
  },
];

////////////////////////////////////////////////////////////////////////
type Product = {
  id: string;
  images: string[];
  title: string;
  price: number;
  description: string;
};

export const PRODUCT = {
  id: "1",
  images: [
    "/assets/data/product-01.png",
    "/assets/data/product-02.png",
    "/assets/data/product-03.png",
    "/assets/data/product-04.png",
  ],
  name: "Reloj Línea Rose",
  price: 99.99,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. ",
  category: "Relojes",
  additionalInfo:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis consequat sed eu felis. ",
};
