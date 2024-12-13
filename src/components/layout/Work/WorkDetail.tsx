import { WorkCardProps } from "./WorkCard";
import { ProjectContent } from "../Projects/ProjectContent";
import { useTranslation } from "react-i18next";

/**
 * 
 * @param {WorkCardProps | null} props.work - the content of the work for the modal 
 * @returns 
 */
export const WorkDetail = ({
  work,
}: {
  work?: WorkCardProps | null;
}) => {

  const {t} = useTranslation();

  if(!work) return null;
  return (
      <div className="flex flex-col h-full">
      <section className="flex flex-col lg:flex-row justify-between items-center gap-3">
        <div className="flex flex-col items-center lg:items-start w-full">
          <h3 className="whitespace-nowrap">{work.company}</h3>
          <p className="text-sm">{t("works." + work.id + ".role")}</p>
        </div>
      </section>
      <ProjectContent id={work.id} stack={work.technos} features={work.features} />
      </div>
  );
};
