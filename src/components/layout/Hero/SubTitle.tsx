import { RoundLink } from "../../cta/RoundLink"
import { Title } from "../../text/Title"
import { SiGithub, SiLinkedin } from "react-icons/si";

export const SubTitle = () => {

    return (
        <div className="flex justify-between items-start flex-nowrap px-2 w-full">
        <div className="-space-x-2 flex-nowrap flex">
            <RoundLink url="https://www.linkedin.com/in/antoine-amoroso-developpeur-web/" icon={SiLinkedin} content="LinkedIn" />
            <RoundLink url="https://github.com/antoinea95" icon={SiGithub} content="Github" />
        </div>
        <Title
            headingLevel="p"
            content="front-end developer"
            fontSize="text-lg md:text-2xl"
            strokeWidth="stroke-[8px]"
          />

        </div>
    )
}