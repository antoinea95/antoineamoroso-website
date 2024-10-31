import { useState, useEffect } from "react";
import { Section } from "../../container/Section";
import { Picture } from "./Picture";
import { SubTitle } from "./SubTitle";
import { Title } from "../../text/Title";

export const Hero = () => {
  const [pictureWidth, setPictureWidth] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  // Effect to listen for window resize and set screen size state
  useEffect(() => {
    const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Section>
      <div className="flex items-center justify-center flex-col relative h-full">
        <Picture setPictureWidth={setPictureWidth} />
        <div>
          <div
            className="flex items-center justify-center pb-1"
            style={{
              gap: isLargeScreen ? `calc(${pictureWidth - 15}px - 7vw)` : "0",
            }}
          >
            <Title
              headingLevel="h1"
              content="ANTOINE"
              fontSize="text-[8vw]"
              strokeWidth="stroke-[10px] md:stroke-[20px] 2xl:stroke-[25px]"
            />
            <Title
              headingLevel="h1"
              content="AMOROSO"
              fontSize="text-[8vw]"
              strokeWidth="stroke-[10px] md:stroke-[20px] 2xl:stroke-[25px]"
            />
          </div>
          <SubTitle />
        </div>
      </div>
    </Section>
  );
};
