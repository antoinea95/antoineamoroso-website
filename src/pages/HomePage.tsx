import { About } from "../components/layout/About/About";
import { Contact } from "../components/layout/Contact/Contact";
import { Hero } from "../components/layout/Hero/Hero";
import { Project } from "../components/layout/Projects/Project";
import {Work} from "../components/layout/Work/Work";

export const HomePage = () => {
  return (
    <section className="space-y-48">
      <Hero />
      <About />
      <Project />
      <Work />
      <Contact />
    </section>
  );
};
