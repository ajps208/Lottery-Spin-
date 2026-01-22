import { useEffect, useState } from "react";

import baseBg from "./assets/base.png";
import btn1 from "./assets/btn-1.png";
import btn2 from "./assets/btn-2.png";

import asset1 from "./assets/asset1.png";
import asset2 from "./assets/asset2.png";
import asset3 from "./assets/asset3.png";
import asset4 from "./assets/asset4.png";
import asset5 from "./assets/asset5.png";
import asset6 from "./assets/asset6.png";

import congratsImg from "./assets/congrts.png";
import bgImg from "./assets/bg.png";

/* Number assets */
const assets = [asset1, asset2, asset3, asset4, asset5, asset6];

export default function App() {
  const [spinning, setSpinning] = useState(false);
  const [values, setValues] = useState(assets);
  const [showPrize, setShowPrize] = useState(false);
  const [blink, setBlink] = useState(false);

  /* ---------------- SPIN LOGIC ---------------- */
  const startSpin = () => {
    if (spinning) return;

    setSpinning(true);
    setShowPrize(false);

    // Random spinning animation
    const interval = setInterval(() => {
      setValues(
        Array.from({ length: 6 }, () => {
          const randomIndex = Math.floor(Math.random() * assets.length);
          return assets[randomIndex];
        })
      );
    }, 120);

    // Stop spin and show final result
    setTimeout(() => {
      clearInterval(interval);
      setValues(assets);
      setSpinning(false);
      setShowPrize(true);
    }, 3500);
  };

  /* ---------------- BLINK EFFECT FOR "1st PRIZE" ---------------- */
  useEffect(() => {
    if (!showPrize) return;

    const blinkInterval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, [showPrize]);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-black/5 z-0" />

      {/* ================= MAIN WRAPPER ================= */}
      <div className="relative z-10 min-h-screen flex flex-col text-white">
        {/* ================= CENTER CONTENT ================= */}
        <div
          className="
            flex flex-col items-center justify-center
            min-h-screen px-4 text-center
            sm:justify-start
            sm:pt-28 sm:pb-[260px]
            md:pt-36 md:pb-[300px]
          "
        >
          {/* Congratulations Image */}
          <img
            src={congratsImg}
            alt="Congratulations"
            className="
              w-[270px]
              sm:w-[380px]
              md:w-[500px]
              lg:w-[600px]
              mb-10 sm:mb-14 md:mb-16
              select-none pointer-events-none
            "
          />

          {/* Prize Text */}
          {showPrize && (
            <h2
              className={`
                font-[AspireSCBlackOblique]
                text-xl sm:text-2xl md:text-3xl
                font-extrabold
                mb-4 sm:mb-6
                transition-all duration-300
                ${blink ? "text-green-500" : "text-white"}
              `}
              style={{
                width: "750px",
                maxWidth: "100%",
              }}
            >
              1st Prize
            </h2>
          )}

          {/* ================= NUMBER BOXES ================= */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            {values.map((img, i) => (
              <div
                key={i}
                className={`
                  flex items-center justify-center
                  w-12 h-20
                  sm:w-14 sm:h-24
                  md:w-20 md:h-32

                  rounded-lg
                  border-[3px] border-[#C278F0]
                  bg-[rgba(59,24,86,0.3)]
                  backdrop-blur-[2px]
                  shadow-[0_0_20px_0_#7B30F6]

                  ${spinning ? "animate-spin-slow" : ""}
                `}
              >
                <img
                  src={img}
                  alt={`asset-${i + 1}`}
                  className="w-[80%] h-[80%] object-contain select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ================= BASE + SPIN BUTTON ================= */}
        <div className="fixed bottom-0 left-0 w-full z-20 pointer-events-none">
          <div className="relative w-full">
            {/* Base Image */}
            <img
              src={baseBg}
              alt="Base"
              className="w-full max-h-[45vh] object-contain select-none"
            />

            {/* Spin Button */}
            <button
              onClick={startSpin}
              disabled={spinning}
              className="
                absolute left-1/2
                bottom-[14%] sm:bottom-[16%] md:bottom-[18%]
                -translate-x-1/2
                pointer-events-auto
                transition-transform hover:scale-105
                disabled:opacity-60
              "
            >
              <img
                src={spinning ? btn2 : btn1}
                alt="Spin"
                className="w-28 sm:w-36 md:w-44 select-none"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
