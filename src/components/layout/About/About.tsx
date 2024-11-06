import { Section } from "../../container/Section";

export const About = () => {
  return (
    <Section>
      <div className="w-[90%] min-h-[520px] h-full flex items-center justify-center m-auto">
        <p>
          A <span>passionate developer</span> with nearly two years of
          experience, I am deeply drawn to front-end development, combining my
          love for graphic design with my technical skills. My expertise
          primarily focuses on <span>React</span> but I also explore
          technologies such as <span>Typescript</span>, Gsap and Next.js to
          deliver innovative and high-performing solutions. Each project
          represents an exciting challenge that I approach with enthusiasm and{" "}
          <span>creativity.</span>
        </p>
      </div>
    </Section>
  );
};
