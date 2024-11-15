import { TbCircleArrowUpRightFilled } from "react-icons/tb";
import { IconLink } from "../../cta/IconLink";
import { Techno } from "../../text/Techno";
import { Title } from "../../text/Title";
import { ProjectType } from "../../../pages/ProjectPage";

export const ProjectHeader = ({
  project
}: {
  project: ProjectType
}) => {
  return (
    <header className="flex flex-col lg:flex-row items-center lg:justify-between w-full gap-6">
       <div className="flex">
        <Title content={project.name} headingLevel="h2" />
        <IconLink
          content="View live"
          url={project.url}
          icon={TbCircleArrowUpRightFilled}
        />
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {project.technos.map((techno) => (
          <Techno techno={techno} />
        ))}
      </div>
    </header>
   
  );
};
