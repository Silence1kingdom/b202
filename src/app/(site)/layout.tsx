import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFab from "@/components/WhatsAppFab";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
      <WhatsAppFab />
    </SmoothScroll>
  );
}
