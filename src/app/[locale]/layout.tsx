import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider } from "next-intl";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import WhatsApp from "@/components/whatsaap/WhatsApp";
import Footer from "@/components/footer/Footer";
import SearchBar from "@/components/search-bar/SearchBar";
import GoogleMaps from "@/components/google-maps";

export const metadata = {
  title: "Joyería Boulevard",
  description:
    "Con más de 30 años en Río Cuarto, Joyería Boulevard se destaca por su excelencia en joyería fina. Descubre piezas únicas y atesoradas en el corazón de Córdoba.",
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ["en", "es"].map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CartProvider>
            <main className="main-container flex min-h-screen flex-col lg:py-10 lg:px-16 px-4 py-5 bg-white">
              <Navbar />
              <SearchBar />
              {children}
              <WhatsApp />
              <GoogleMaps />
              <Footer />
            </main>
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
