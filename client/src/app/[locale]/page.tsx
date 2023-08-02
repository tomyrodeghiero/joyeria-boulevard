"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Introduction from "@/components/introduction/Introduction";
import Navbar from "@/components/navbar/Navbar";
import TrendingProducts from "@/components/trending-products/TrendingProducts";
import WhatsApp from "@/components/whatsaap/WhatsApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col lg:py-10 lg:px-16 px-4 py-5 bg-white">
      <Navbar />
      <TrendingProducts />
      <WhatsApp />
      <Footer />
    </main>
  );
}
