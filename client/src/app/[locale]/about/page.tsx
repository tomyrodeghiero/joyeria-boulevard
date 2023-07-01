import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import { ABOUT_01, ABOUT_02 } from "@/utils/constants";
import React from "react";

const Page = () => {
  return (
    <main className="flex min-h-screen flex-col py-14 px-16">
      <Navbar />
      <div className="flex flex-col text-black py-8 lg:py-20 lg:px-40">
        <h1 className="text-2xl text-center">About us</h1>
        <h2 className="text-[1.1rem] text-center mt-4 mb-10">
          Who we are and why we do what we do!
        </h2>
        <p>
          Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
          sollicitudin ante a, gravida arcu. Nam fringilla molestie velit, eget
          pellentesque risus scelerisque a. Nam ac urna maximus, tempor magna
          et, placerat urna. Curabitur eu magna enim. Proin placerat tortor
          lacus, ac sodales lectus placerat quis.
        </p>
        <h3 className="text-2xl mt-8 mb-5">Top Trends</h3>
        <img
          className="object-cover w-full rounded-lg h-full"
          src={ABOUT_01}
          alt="About 01"
        />
        <p className="mt-8 mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
          consequat sed eu felis.
        </p>
        <div className="ml-4">
          <li>consectetur adipiscing elit. Aliquam placerat</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
        </div>
        <h3 className="text-2xl mt-8 mb-5">Actuality</h3>
        <img
          className="object-cover w-full rounded-lg h-full"
          src={ABOUT_02}
          alt="About 02"
        />
        <p className="mt-8 mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
          consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio,
          in molestie diam bibendu.
        </p>
      </div>
      <WhatsApp />
      <Footer />
    </main>
  );
};

export default Page;
