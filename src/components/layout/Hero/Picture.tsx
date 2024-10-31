import {Dispatch, SetStateAction, useEffect, useRef } from "react";

export const Picture = ({
  setPictureWidth,
}: {
  setPictureWidth: Dispatch<SetStateAction<number>>;
}) => {

  const pictureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (pictureRef.current) {
        setPictureWidth(pictureRef.current.offsetWidth);
      }
    };

    // Initial width setup
    updateWidth();

    // Update width on resize
    window.addEventListener("resize", updateWidth);
    
    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, [setPictureWidth]);


  return (
    <div className="w-[60vw] sm:w-[53vw] md:w-[40vw] lg:w-[28vw] xl:w-[23vw]  max-w-[800px] group lg:absolute lg:left-[47.5%] lg:-translate-x-1/2 lg:z-10" ref={pictureRef}>
      <img
        src="./assets/big-head.png"
        className="drop-shadow-custom group-hover:hidden object-cover w-full h-full"
      />
      <img
        src="./assets/big-head-2.png"
        className="drop-shadow-custom hidden group-hover:block"
      />
    </div>
  );
};
