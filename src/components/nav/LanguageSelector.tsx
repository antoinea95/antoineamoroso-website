import { useTranslation } from "react-i18next";
import { GrLanguage } from "react-icons/gr";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const changeLanguage = () => {
    i18n.changeLanguage(language === "fr" ? "en" : "fr"); // Change la langue
  };

  return (
      <button onClick={() => changeLanguage()} className="absolute -top-4 lg:right-0 lg:top-4 flex items-center gap-2 font-bold hover:scale-110 transition-transform">
        <GrLanguage />
        {language === "fr" || language ===  "fr-FR" ? "EN" : "FR"}
      </button>
  );
};

export default LanguageSelector;
