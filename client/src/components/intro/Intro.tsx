"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Intro = ({ setIntroComplete }: any) => {
  let introRef = useRef<any>(null);
  let titleRef = useRef<any>(null);
  let paragraphRef = useRef<any>(null);

  useEffect(() => {
    const titleChars = titleRef.current.innerText.split("");
    titleRef.current.innerText = "";
    titleChars.forEach((char: any, i: number) => {
      titleRef.current.innerHTML += `<span class="inline-block mx-1">${char}</span>`;
    });

    const paragraphWords = paragraphRef.current.innerText.split(" ");
    paragraphRef.current.innerText = "";
    paragraphWords.forEach((word: any, i: number) => {
      paragraphRef.current.innerHTML += `<span class="inline-block mr-1">${word}</span>`;
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          gsap.to(introRef.current, {
            opacity: 0,
            duration: 1, // Duración del desvanecimiento
            onComplete: () => setIntroComplete(true),
          });
        }, 5000); // La animación durará 5 segundos
      },
    });
    tl.from(titleRef.current.children, {
      opacity: 0,
      ease: "power3.out",
      duration: 0.5,
      stagger: 0.1,
    });
    tl.from(
      paragraphRef.current.children,
      {
        opacity: 0,
        ease: "power3.out",
        duration: 1,
        stagger: 0.1,
      },
      "-=1"
    );
  }, [setIntroComplete]);

  return (
    <div
      ref={introRef}
      style={{
        placeContent: "center",
        height: "100vh",
        background: "#000",
        fontFamily: "EB Garamond, serif",
        color: "#fff",
      }}
      className="grid justify-center items-center bg-black h-screen w-screen text-white"
    >
      <h1
        ref={titleRef}
        style={{ fontSize: "3em", textAlign: "center", fontWeight: 600 }}
      >
        Joyería Boulevard ⌚
      </h1>
      <p ref={paragraphRef} style={{ maxWidth: "600px", fontSize: "1.25em" }}>
        Descubre una colección única de joyas y relojes. Cada pieza es una obra
        de arte que realza tu estilo. ✨
      </p>
    </div>
  );
};

export default Intro;
