import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="page-enter">
      <Hero />
      <Services />
      <Work />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  );
}
