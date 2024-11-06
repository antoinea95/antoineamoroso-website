import { useEffect, useState } from "react";
import { useAppContext } from "../../../hooks/useAppContext";

export const HeroPicture = () => {
  const { heroPictureRef, setHeroPictureDimension } = useAppContext();
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["./assets/big-head.png", "./assets/big-head-2.png"];

  useEffect(() => {
    const updateWidth = () => {
      if (heroPictureRef && heroPictureRef.current) {
        setHeroPictureDimension({
          width: heroPictureRef.current.offsetWidth,
          height: heroPictureRef.current.offsetHeight,
        });
      }
    };

    // Initial width setup
    updateWidth();

    // Update width on resize
    window.addEventListener("resize", updateWidth);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", updateWidth);
  }, [heroPictureRef, setHeroPictureDimension]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length); // Changer d'image
    }, 900); // Change d'image toutes les 2 secondes

    // Nettoyage de l'intervalle sur démontage
    return () => clearInterval(interval);
  }, [images.length]);

  return (
      <div className="fixed z-30 top-[15vh] sm:top-[10vh] lg:top-1/2 lg:-translate-y-1/2 left-[48%] -translate-x-1/2" ref={heroPictureRef} style={{
        width: "clamp(280px, 28vw, 550px)",
      }}>
      <img
        src={images[currentImage]}
        className="drop-shadow-custom object-cover w-full h-full"
        style={{ opacity: 1 }}
      />

      </div>
  );
};
