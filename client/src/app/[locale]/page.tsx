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
  const [loading, setLoading] = useState(true); // New state for loading
  const [introComplete, setIntroComplete] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const mainRef = useRef<any>(null);

  useEffect(() => {
    const introTimestamp = window.localStorage.getItem("introTimestamp");

    if (introTimestamp) {
      const hoursSinceLastIntro =
        (Date.now() - Number(introTimestamp)) / 1000 / 60 / 60;

      if (hoursSinceLastIntro < 3) {
        setIntroComplete(true);
      }
    }

    const timer = setTimeout(() => {
      setIntroComplete(true);
      window.localStorage.setItem("introTimestamp", Date.now().toString());
    }, 7500);

    setLoading(false); // Set loading to false after checking localStorage

    return () => clearTimeout(timer); // cleanup
  }, []);

  // Second useEffect for gsap
  useEffect(() => {
    if (introComplete) {
      gsap.to(".intro", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          gsap.fromTo(
            mainRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.in" }
          );
        },
      });
    }
  }, []);

  // If it's loading, return null or some loading indicator
  if (loading) return null;

  // If not loading, then we can rely on our introComplete and productsLoaded states
  if (!introComplete && !productsLoaded) {
    return <Introduction setIntroComplete={setIntroComplete} />;
  }

  return (
    <main
      ref={mainRef}
      className={`flex min-h-screen flex-col lg:py-14 lg:px-16 px-4 py-5 ${
        introComplete ? "" : "animate-fade-in"
      }`}
    >
      <Navbar />
      <Hero />
      <TrendingProducts setProductsLoaded={setProductsLoaded} />
      <WhatsApp />
      <Footer />
    </main>
  );
}
