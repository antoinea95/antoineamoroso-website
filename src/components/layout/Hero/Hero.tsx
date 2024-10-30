import { Section } from "../../container/Section";
import { MainTitle } from "./MainTitle";
import { SubTitle } from "./SubTitle";

/**
 * `Hero` is a component that represents the hero section of a webpage.
 * It showcases a title with a stroke effect and an accompanying image.
 *
 * @returns  A hero section containing styled titles and images,
 *                        wrapped inside a Section component.
 */
export const Hero = () => {
  return (
    <Section>
      <div>
        <MainTitle />
        <SubTitle />
      </div>
    </Section>
  );
};
