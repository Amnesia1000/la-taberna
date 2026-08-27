"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useEffect, useState } from "react";

interface CardData {
  id: number;
  top: number;
  isLeft: boolean;
  baseRotate: number;
  exitRotate: number;
  imageIndex: number;
}

function ParallaxCard({ card, scrollY }: { card: CardData; scrollY: MotionValue<number> }) {
  // Cuando el scroll se acerca a la posición 'top' de esta carta, la carta se mueve hacia afuera
  // Empieza a moverse 600px antes de llegar y termina 600px después
  const startY = card.top - 800;
  const endY = card.top + 800;

  const moveX = useTransform(
    scrollY,
    [startY, card.top, endY],
    [0, card.isLeft ? -200 : 200, card.isLeft ? -500 : 500] // Salen un poco más lejos
  );

  const rotate = useTransform(
    scrollY,
    [startY, endY],
    [card.baseRotate, card.exitRotate]
  );

  const opacity = useTransform(
    scrollY,
    [startY, card.top, endY],
    [0, 0.7, 0]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: card.isLeft ? "10%" : "auto",
        right: !card.isLeft ? "10%" : "auto",
        x: moveX,
        rotate: rotate,
        opacity: opacity,
      }}
      className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 rounded-xl overflow-hidden shadow-2xl shadow-purple-900/40 border border-white/10"
    >
      <img 
        src={`/parallax/card-${card.imageIndex}.png`} 
        alt="Decoración" 
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl md:text-6xl bg-gradient-to-br from-purple-800 to-black">${['🃏', '🎲', '♟️'][card.imageIndex - 1]}</div>`;
        }}
      />
    </motion.div>
  );
}

export function FloatingCards() {
  const { scrollY } = useScroll();
  const [cards, setCards] = useState<CardData[]>([]);

  useEffect(() => {
    // Generar 30 cartas esparcidas a lo largo del alto total real del contenedor
    const generated = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: 0, 
      isLeft: Math.random() > 0.5, // Totalmente aleatorio de qué lado salen
      baseRotate: Math.random() * 60 - 30, // Rotación inicial aleatoria
      exitRotate: (Math.random() * 360 - 180), // Rotación final totalmente aleatoria (puede dar varias vueltas o girar al revés)
      imageIndex: (Math.floor(Math.random() * 3)) + 1,
    }));
    setCards(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {cards.map((card, i) => {
        const topPercent = 2 + (i * (96 / cards.length)) + (Math.random() * 2 - 1);
        
        return (
          <div key={card.id} style={{ position: 'absolute', top: `${topPercent}%`, left: 0, right: 0, height: 0 }}>
            <ParallaxCard card={{ ...card, top: typeof window !== 'undefined' ? (document.documentElement.scrollHeight * (topPercent/100)) : 1000 }} scrollY={scrollY} />
          </div>
        );
      })}
    </div>
  );
}
