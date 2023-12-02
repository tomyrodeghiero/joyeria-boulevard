import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Navbar from "@/components/navbar/Navbar";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import Footer from "@/components/footer/Footer";
import GoogleMaps from "@/components/google-maps";

export const metadata = {
  title: "Joyería Boulevard",
  description:
    "Con más de 30 años en Río Cuarto, Joyería Boulevard se destaca por su excelencia en joyería fina. Descubre piezas únicas y atesoradas en el corazón de Córdoba.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <main className="main-container flex min-h-screen flex-col lg:py-10 lg:px-16 px-4 py-5 bg-white">
            <Navbar />
            {children}
            <WhatsApp />
            <GoogleMaps />
            <Footer />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
