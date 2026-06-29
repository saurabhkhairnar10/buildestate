import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import CompletedProjects from "@/components/sections/CompletedProjects";
import OngoingProjects from "@/components/sections/OngoingProjects";
import UpcomingProjects from "@/components/sections/UpcomingProjects";
import Contact from "@/components/sections/Contact";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* <Navbar /> */}
      <Hero />
      <Stats />
      <CompletedProjects />
      <OngoingProjects />
      <UpcomingProjects />
      <Testimonials />
      <Contact />
    </main>
  );
}
