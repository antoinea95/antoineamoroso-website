import { Title } from "../../text/Title"
import { Picture } from "./Picture"

export const MainTitle = () => {

    return (
        <div className="flex items-center gap-52">
          <Title
            headingLevel="h1"
            content="ANTOINE"
            fontSize="text-6xl"
            strokeWidth="stroke-[20px]"
          />
          <Picture />
          <Title
            headingLevel="h1"
            content="AMOROSO"
            fontSize="text-6xl"
            strokeWidth="stroke-[20px]"
          />
        </div>
    )
}