import { About } from "../components/layout/About/About";
import { Hero } from "../components/layout/Hero/Hero";
import { Project } from "../components/layout/Projects/Project";
import {Work} from "../components/layout/Work/Work";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Project />
      <Work />
    </>
  );
};
