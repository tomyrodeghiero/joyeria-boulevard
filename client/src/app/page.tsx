"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import Introduction from "@/components/intro/Intro";
import Navbar from "@/components/navbar/Navbar";
import TrendingProducts from "@/components/trending-products/TrendingProducts";
import WhatsApp from "@/components/whatsaap/WhatsApp";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [fadeInComplete, setFadeInComplete] = useState(false);
  const mainRef = useRef<any>(null);

  useEffect(() => {
    if (introComplete) {
      gsap.to(".intro", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          setFadeInComplete(true);
          gsap.fromTo(
            mainRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.in" }
          );
        },
      });
    }
  }, [introComplete]);

  if (!fadeInComplete) {
    return <Introduction setIntroComplete={setIntroComplete} />;
  }

  return (
    <main
      ref={mainRef}
      className="flex min-h-screen flex-col lg:py-14 lg:px-16 px-4 py-5 animate-fade-in"
    >
      <Navbar />
      <Hero />
      <TrendingProducts />
      <WhatsApp />
      <Footer />
    </main>
  );
}
