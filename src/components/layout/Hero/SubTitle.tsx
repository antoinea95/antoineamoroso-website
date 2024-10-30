import { RoundLink } from "../../cta/RoundLink"
import { Title } from "../../text/Title"

export const SubTitle = () => {

    return (
        <div className="flex justify-between items-start">
        <div className="-space-x-4 pt-2">
            <RoundLink url="https://www.linkedin.com/in/antoine-amoroso-developpeur-web/" src="./assets/linkedin.png" content="LinkedIn" />
            <RoundLink url="https://github.com/antoinea95" src="./assets/github.png" content="Github" />
        </div>
        <Title
            headingLevel="p"
            content="front-end developer"
            fontSize="text-2xl"
            strokeWidth="stroke-[8px]"
          />

        </div>
    )
}