import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import projectsData from "../../../projects.json";
import { WorkTimeline } from "./WorkTimeline";

export const Work = () => {
  const works = projectsData.works;
  const education = projectsData.education;

  return (
    <Section>
      <div
        className="space-y-10 relative flex flex-col"
        id="work"
      >
        <section className="flex flex-col lg:flex-row items-center gap-10">
          <Title content="Work" headingLevel="h2" />
          <WorkTimeline items={works} />
        </section>
        <section className="flex flex-col lg:flex-row items-center gap-10">
          <Title content="Education" headingLevel="h2" />
          <WorkTimeline items={education} />
        </section>
     
        </div>
    </Section>
  );
};
