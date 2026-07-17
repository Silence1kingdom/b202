import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import { getProjects, getServices, getProcessSteps, getTestimonials, getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, services, processSteps, testimonials, stats] = await Promise.all([
    getProjects(),
    getServices(),
    getProcessSteps(),
    getTestimonials(),
    getStats(),
  ]);

  return (
    <main className="page-enter">
      <Hero stats={stats} />
      <Services services={services} />
      <Work projects={projects} />
      <Process processSteps={processSteps} />
      <Testimonials testimonials={testimonials} />
      <section className="border-t border-white/[0.06] py-24 md:py-28">
        <div className="container-x">
          <div className="mb-12 text-center">
            <span className="section-label">أسئلة شائعة</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tightest md:text-4xl">
              عندك سؤال؟ <span className="text-accent">إحنا جاوبنا</span>
            </h2>
          </div>
          <Faq />
        </div>
      </section>
      <Contact />
    </main>
  );
}
