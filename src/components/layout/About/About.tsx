import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Section } from "../../container/Section";
import { Title } from "../../text/Title";
import { SiGmail, SiReact } from "react-icons/si";
import { useGSAP } from "@gsap/react";
import { FiPenTool } from "react-icons/fi";
import {useTranslation } from "react-i18next";
import { IconLink } from "../../cta/IconLink";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const {t} = useTranslation();
  const aboutRef = useRef<HTMLParagraphElement>(null);
  const gsapText = "GSAP";

  useGSAP(() => {
    const gsapLetters = document.querySelector("#gsap-text")?.childNodes;
    const rx = 370;
    const ry = 58;
    const circumference = Math.ceil(
      2 * Math.PI * Math.sqrt((rx ** 2 + ry ** 2) / 2)
    );

    if (gsapLetters) {
      gsap.fromTo(
        gsapLetters,
        { scale: 0 },
        {
          keyframes: {
            scale: [0, 0.3, 0.6, 0.9, 1.2, 1, 1, 1],
            rotate: [5, -5, 5, -5, 5, -5, 0, 0, 0],
          },
          duration: 1,
          stagger: 0.1,
          ease: "steps(6)",
          delay: 0.6,
          repeat: -1,
        }
      );
    }
    gsap.to("#logo-react", {
      rotate: 360,
      duration: 0.8,
      ease: "steps(4)",
      repeat: -1,
      delay: 0.6,
    });

    gsap.to("#pen-tool", {
      keyframes: {
        x: [0, 20, 20, 0],
        y: [0, 0, 20, 20],
      },
      duration: 1.5,
      ease: "steps(8)",
      repeat: -1,
      delay: 0.6,
    });

    gsap.fromTo(
      "#animated-square rect",
      { strokeDasharray: 80, strokeDashoffset: 80 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "steps(8)",
        repeat: -1,
        delay: 0.8,
      }
    );

    gsap.fromTo(
      "#tracing-elipse ellipse",
      { strokeDasharray: circumference, strokeDashoffset: circumference },
      {
        strokeDashoffset: 0,
        duration: 1,
        ease: "steps(8)",
        repeat: -1,
        delay: 0.8,
      }
    );
  });

  useEffect(() => {
    const aboutElement = aboutRef.current;

    if (aboutElement) {
      // Animation du paragraphe (décalée)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top 80%",
          end: "top 20%",
          toggleActions: "restart none none reset",
        },
      });
      tl.fromTo(
        aboutElement,
        { y: 500 },
        {
          keyframes: {
            rotation: [-5, 5, -5, 5, -5, 5, 0], // Balancement
          },
          y: 0, // Monte doucement à sa position
          duration: 1,
          delay: 0.6,
          ease: "steps(5)",
        }
      ).fromTo(
        "#life-text",
        {
          scale: 0,
        },
        {
          keyframes: {
            rotation: [-5, 5, -5, 5, -5, 5, 0], // Balancement
            scale: [0, 0.3, 0.6, 0.9, 1.2, 1],
          },
          duration: 1,
          ease: "steps(5)",
        },
        "<+=0.6"
      );

      return () => {
        tl.kill();
      };
    }
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "top 20%",
        toggleActions: "restart none none reset",
        onLeaveBack: () => {
          infiniteAnimation.pause();
        },
      },
    });

    // Animation principale contrôlée par ScrollTrigger
    tl.fromTo(
      "#flower",
      { y: 30, scale: 0 },
      {
        y: 0,
        keyframes: {
          rotate: [-5, 5, -5, 5, 0],
          scale: [0, 0.3, 0.6, 1.2, 2, 1],
        },
        duration: 0.6,
        delay: 1,
        ease: "steps(6)",
      }
    );

    // Animation infinie séparée (démarrage après la timeline principale)
    const infiniteAnimation = gsap.to("#flower", {
      y: -10,
      rotate: 180,
      duration: 0.8,
      ease: "steps(2)",
      repeat: -1,
      paused: true,
    });

    // Démarrer l'animation infinie à la fin de la timeline
    tl.eventCallback("onComplete", () => {
      infiniteAnimation.play();
    });

    return () => {
      tl.kill(); // Nettoyer la timeline
      infiniteAnimation.kill(); // Nettoyer l'animation infinie
      gsap.killTweensOf("#flower"); // Nettoyer les tweens restants
    };
  }, []);

  return (
    <Section id="about">
      <div className="flex items-center relative">
        <Title titleText="About" headingLevel="h2" trigger="#about" />
        <img
          src="./assets/flower.png"
          className=" w-16 lg:w-20 stroke-two"
          id="flower"
          alt="Illustation of flower in a retro cartoon style"
        />
      </div>

      <div className="overflow-hidden flex items-center justify-center">
        <p
          className="leading-snug font-medium w-full sm:w-[90%] max-w-[1300px] py-3"
          ref={aboutRef}
        >
          {t("texts.intro.part1")} {" "}
          <span className="relative inline-block">
          {t("texts.intro.part2")}
            <svg
              id="tracing-elipse"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 120 120"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[102%] h-[120%]"
            >
              <ellipse
                cx="60"
                cy="60"
                rx="370"
                ry="58"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="stroke-primary"
              />
            </svg>
          </span>{" "}
          {t("texts.intro.part3")}
          <p className="inline-flex relative w-6 h-3/5 mx-1">
            <svg
              id="animated-square"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <rect
                x="0"
                y="0"
                width="20"
                height="20"
                fill="none"
                strokeWidth="2"
                className="stroke-primary"
              />
            </svg>
            <span
              id="pen-tool"
              className="inline-flex items-center justify-center mx-1  absolute -left-0.5 -top-3"
            >
              <FiPenTool size={16} />
            </span>
          </p>
          {t("texts.intro.part4")} <br />
          <br /> {t("texts.intro.part5")}
          <span
            id="logo-react"
            className="
        inline-flex items-center justify-center mx-1 pt-1 translate-y-1"
          >
            <SiReact size={24} />
          </span>
          {t("texts.intro.part6")} {" "}
          <span
            className="inline-flex font-modak uppercase text-4xl leading-6 pt-1 px-1"
            id="gsap-text"
          >
            {gsapText.split("").map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </span>{" "}
          {t("texts.intro.part7")}<br></br>
        </p>
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-2"   id="life-text">
      <p
        className="w-full text-center uppercase font-modak leading-10"
        style={{
          fontSize: "clamp(2.5rem, 4vw, 5rem)",
        }}
      >
        {t("texts.about-end")}
      </p>
      <IconLink url={"mailto:antoineamr95@gmail.com"} icon={SiGmail} content={t("texts.Contact me")} />

      </div>
        
    </Section>
  );
};
