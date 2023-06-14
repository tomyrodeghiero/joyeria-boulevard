import Footer from "@/components/footer/Footer";
import Hero from "@/components/hero/Hero";
import LatestTrends from "@/components/latest-trends/LatestTrends";
import Navbar from "@/components/navbar/Navbar";
import WhatsApp from "@/components/whatsaap/WhatsApp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col py-14 px-16">
      <Navbar />
      <Hero />
      <LatestTrends />
      <WhatsApp />
      <Footer />
    </main>
  );
}
