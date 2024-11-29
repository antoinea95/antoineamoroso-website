import { About } from "../components/layout/About/About";
import { Hero } from "../components/layout/Hero/Hero";
import { Project } from "../components/layout/Projects/Project";
import {Work} from "../components/layout/Work/Work";

export const HomePage = () => {
  return (
    <section className="space-y-40">
      <Hero />
      <About />
      <Project />
      <Work />
    </section>
  );
};
