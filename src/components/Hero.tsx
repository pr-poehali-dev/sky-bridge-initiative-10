import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/40144880-03b0-45bf-831f-2605356bf84f/bucket/22b8618b-1950-4dd6-808e-b484da40af74.jpg"
          alt="НЕЙРОБОГ"
          className="w-full h-full object-cover"
          style={{ objectPosition: "50% 0%" }}
        />
      </motion.div>

      <div className="relative z-10 text-center text-white absolute bottom-16 left-0 right-0">
        <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          НЕЙРОСЕТИ
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto px-6 opacity-90">
          Освой технологии будущего. Практический курс для тех, кто хочет работать с ИИ уже сегодня
        </p>
        <a
          href="https://t.me/OLGA_BOG_174"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block px-8 py-3 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors duration-300"
        >
          Начать обучение
        </a>
      </div>
    </div>
  );
}