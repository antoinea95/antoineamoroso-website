import gsap from "gsap";
import { useEffect, useRef } from "react";
import { PropsWithChildren } from "react";
import { CgClose } from "react-icons/cg";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

type ModalProps = PropsWithChildren & {
  workActive: number | null;
  onClose: () => void;
  handleNext: () => void;
  handlePrev: () => void;
};

export const Modal = ({
  children,
  workActive,
  onClose,
  handleNext,
  handlePrev,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (workActive) {
      gsap.fromTo(
        contentRef.current,
        { scale: 0 },
        {
          keyframes: {
            rotate: [5, -5, 5, -5, 5, 0],
          },
          scale: 1,
          ease: "steps(6)",
          duration: 0.6,
        }
      );
    }
  }, [workActive]);

  if (!workActive) return null;

  return (
    <div
      className={"fixed inset-0 z-50 flex items-center justify-center"}
      ref={modalRef}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute z-50 w-[92vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between">
        <button
          className="text-3xl text-primary"
          onClick={() => {
            handlePrev();
          }}
        >
          <PiArrowLeftBold
            className="drop-shadow-custom overflow-visible"
            stroke="#f1f5f9"
            paintOrder="stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
              strokeWidth: "clamp(2px, 4rem, 50px)",
            }}
          />
        </button>
        <button
          className="text-3xl text-primary"
          onClick={() => {
            handleNext();
          }}
        >
          <PiArrowRightBold
            className="drop-shadow-custom overflow-visible"
            stroke="#f1f5f9"
            paintOrder="stroke"
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{
              strokeWidth: "clamp(2px, 4rem, 50px)",
            }}
          />
        </button>
      </div>
        <div
          ref={contentRef}
          className=" bg-secondary w-[90vw] h-[90vh] p-10 rounded-xl border-4 border-secondary overflow-y-auto overflow-x-hidden relative"
          key={`work-detail-${workActive}`}
          id={`work-${workActive}`}
        >
          <button
            className="absolute right-3 top-3 text-2xl text-primary"
            onClick={onClose}
          >
            <CgClose
              className="drop-shadow-custom overflow-visible"
              stroke="#f1f5f9"
              paintOrder="stroke"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                strokeWidth: "clamp(2px, 3rem, 5px)",
              }}
            />
          </button>
          {children}
        </div>
    </div>
  );
};
