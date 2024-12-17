import { useTranslation } from "react-i18next";

/**
 * `NavLink` is a component that renders a navigational link with a decorative SVG stroke behind the text. 
 * The stroke appears with a hover effect for a more engaging visual design.
 *
 * @param {Object} props - The properties for the NavLink component.
 * @param {string} props.name - The text to be displayed for the link.
 * 
 * @returns A JSX element containing an anchor (`<a>`) with a hoverable SVG stroke effect.
 */
export const NavLink = ({ name }: { name: string }) => {
  const {t} = useTranslation();
  const translateName = t("sectionTitles." + name);
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Empêche le comportement par défaut
    const targetId = name.toLowerCase();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Hauteur de la navbar (ajustez en fonction de votre design)
      const navbarHeight = document.querySelector('#navbar')?.clientHeight || 0;
      const targetPosition = targetElement.offsetTop - navbarHeight;

      // Défilement avec un effet lisse
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <a
      href={`#${translateName.toLowerCase()}`}
      onClick={handleClick}
      className="relative group font-light text-tertiary z-30 hover:underline px-2 whitespace-nowrap"
      aria-label={translateName}
      data-after={translateName}
    >
      {translateName}
    </a>
  );
};