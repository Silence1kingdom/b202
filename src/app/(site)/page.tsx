import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { getProjects, getServices, getProcessSteps, getTestimonials, getStats } from "@/lib/queries";

export const revalidate = 60;

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
      <Contact />
    </main>
  );
}
