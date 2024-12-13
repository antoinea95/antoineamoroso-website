import { About } from "../components/layout/About/About";
import { Contact } from "../components/layout/Contact/Contact";
import { Hero } from "../components/layout/Hero/Hero";
import { Project } from "../components/layout/Projects/Project";
import { Skills } from "../components/layout/Skills/Skills";
import {Work} from "../components/layout/Work/Work";

export const HomePage = () => {
  return (
    <section className="space-y-32">
      <Hero />
      <About />
      <Skills />
      <Project />
      <Work />
      <Contact />
    </section>
  );
};
