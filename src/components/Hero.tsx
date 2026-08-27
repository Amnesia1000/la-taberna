"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-6 sm:py-32 lg:px-8 bg-black">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611996575749-79a3a250f563?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent"></div>
      
      {/* Elementos Flotantes Decorativos en el Hero */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] md:left-[20%] text-6xl md:text-8xl opacity-80 z-10 drop-shadow-2xl"
      >
        🎲
      </motion.div>
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -15, 10, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[20%] right-[10%] md:right-[20%] text-6xl md:text-8xl opacity-80 z-10 drop-shadow-2xl text-purple-500"
      >
        ♟️
      </motion.div>
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }} 
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[30%] right-[5%] md:right-[15%] text-5xl md:text-7xl opacity-50 z-10 drop-shadow-2xl"
      >
        🃏
      </motion.div>

      <div className="mx-auto max-w-2xl text-center relative z-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-black tracking-tight text-white sm:text-7xl drop-shadow-lg"
        >
          Tu próxima gran <span className="text-purple-500">aventura</span> comienza en la mesa
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg leading-8 text-gray-300"
        >
          Alquila los mejores juegos de mesa para tus reuniones, fiestas o tardes en familia. 
          Descubre nuestro catálogo y reserva el tuyo con un solo clic.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-x-6"
        >
          <a
            href="#catalogo"
            className="rounded-full bg-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all hover:scale-105"
          >
            Ver Catálogo
          </a>
        </motion.div>
      </div>
    </section>
  );
}
