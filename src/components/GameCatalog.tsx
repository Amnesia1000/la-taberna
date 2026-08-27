"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Clock, Baby, X, MessageCircle } from "lucide-react";
import { Game } from "@prisma/client";

interface Props {
  games: Game[];
}

export function GameCatalog({ games }: Props) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filter, setFilter] = useState("Todos");

  // Obtener categorías únicas
  const categoriesList = Array.from(new Set(games.map(g => g.category)));
  const categories = ["Todos", ...categoriesList];

  const handleRent = (gameName: string) => {
    const phone = "5492612480816"; 
    const text = encodeURIComponent(`¡Hola! Me interesa alquilar el juego: ${gameName}`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  // Agrupar juegos por categoría
  const gamesByCategory = categoriesList.reduce((acc, cat) => {
    acc[cat] = games.filter(g => g.category === cat);
    return acc;
  }, {} as Record<string, Game[]>);

  // Categorías a renderizar según el filtro
  const categoriesToRender = filter === "Todos" ? categoriesList : [filter];

  return (
    <section id="catalogo" className="py-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16">
        <div>
          <h2 className="text-4xl font-bold mb-4">Nuestro Catálogo</h2>
          <p className="text-gray-400 text-lg">Encuentra el juego perfecto para tu grupo.</p>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 mt-6 md:mt-0 max-w-full">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${
                filter === cat 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-20">
        <AnimatePresence>
          {categoriesToRender.map(category => {
            const categoryGames = gamesByCategory[category];
            if (!categoryGames || categoryGames.length === 0) return null;

            return (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 uppercase tracking-wider">
                    {category}
                  </h3>
                  <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent flex-1"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {categoryGames.map((game, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      key={game.id}
                      className="bg-neutral-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-purple-500 transition-all group hover:shadow-xl hover:shadow-purple-900/20"
                      onClick={() => setSelectedGame(game)}
                    >
                      <div className="h-56 overflow-hidden relative">
                        <img 
                          src={game.image} 
                          alt={game.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80"></div>
                      </div>
                      <div className="p-6 relative -mt-6">
                        <h4 className="text-xl font-bold mb-3">{game.name}</h4>
                        <div className="flex gap-4 text-sm text-gray-400 mb-6 flex-wrap">
                          <div className="flex items-center gap-1.5" title="Jugadores">
                            <Users size={16} className="text-purple-400" />
                            <span>{game.minPlayers}-{game.maxPlayers}</span>
                          </div>
                          <div className="flex items-center gap-1.5" title="Tiempo de juego">
                            <Clock size={16} className="text-purple-400" />
                            <span>{game.playtime}'</span>
                          </div>
                          <div className="flex items-center gap-1.5" title="Edad mínima">
                            <Baby size={16} className="text-purple-400" />
                            <span>+{game.minAge}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-white/5 pt-4">
                          <span className="font-bold text-xl text-white">${game.price.toFixed(2)}<span className="text-xs text-gray-500 font-normal"> 1er día</span></span>
                          <span className="text-sm font-bold text-purple-400 group-hover:text-purple-300 flex items-center gap-1">
                            Ver detalles <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedGame && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGame(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
            />
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-neutral-900 border border-white/10 rounded-2xl z-50 overflow-hidden flex flex-col max-h-[90vh] shadow-2xl shadow-purple-900/20"
            >
              <button 
                onClick={() => setSelectedGame(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="h-64 sm:h-96 w-full relative shrink-0">
                <img 
                  src={selectedGame.image} 
                  alt={selectedGame.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/20 to-transparent" />
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-4xl font-black text-white mb-2">{selectedGame.name}</h2>
                  <span className="bg-purple-900/50 text-purple-300 px-4 py-1.5 rounded-full text-sm font-bold border border-purple-500/30">
                    {selectedGame.category}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4 mb-8 text-gray-300 text-sm">
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <Users size={18} className="text-purple-400" />
                    <span className="font-medium">{selectedGame.minPlayers} a {selectedGame.maxPlayers} jugadores</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <Clock size={18} className="text-purple-400" />
                    <span className="font-medium">{selectedGame.playtime} minutos</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                    <Baby size={18} className="text-purple-400" />
                    <span className="font-medium">+{selectedGame.minAge} años</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-xl mb-3 text-purple-100">Sobre el juego</h3>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  {selectedGame.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-auto border-t border-white/10 pt-6 gap-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Precio de alquiler</p>
                    <p className="text-3xl font-bold">${selectedGame.price.toFixed(2)} <span className="text-base font-normal text-gray-400">(1er día)</span></p>
                    <p className="text-sm text-green-400 font-semibold mt-1">+ ${(selectedGame.price * 0.5).toFixed(2)} por cada día adicional</p>
                  </div>
                  
                  <button 
                    onClick={() => handleRent(selectedGame.name)}
                    className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-900/30 w-full sm:w-auto text-lg"
                  >
                    <MessageCircle size={24} />
                    Alquilar por WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
