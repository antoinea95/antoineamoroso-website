import { useAppContext } from "../../../hooks/useAppContext";
import { Title } from "../../text/Title";
import { Link } from "react-router-dom";

export const ProjectCard = ({ projectName }: { projectName: string }) => {

  const {setScrollY} = useAppContext();
  return (
    <Link
      to={`/${projectName}`}
      className={`w-full flex-1 overflow-hidden relative flex flex-col p-3 border-4 border-white shadow-custom rounded-xl`}
      onClick={() => setScrollY(window.scrollY)}
    >
      <Title content={projectName} headingLevel="h3" />
    </Link>
  );
};
