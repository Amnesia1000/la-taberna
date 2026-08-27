"use client";

import { useState } from "react";
import { Game } from "@prisma/client";
import { addGame, updateGame, deleteGame } from "@/app/actions";
import { Trash2, Edit2, X } from "lucide-react";

export function GamesManager({ games }: { games: Game[] }) {
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingGame) {
      formData.append("id", editingGame.id);
      await updateGame(formData);
      setEditingGame(null);
    } else {
      await addGame(formData);
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div>
      <div className="bg-black/20 rounded-xl p-6 border border-white/5 mb-8 relative">
        {editingGame && (
          <button 
            onClick={() => setEditingGame(null)} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full"
            title="Cancelar edición"
          >
            <X size={16} />
          </button>
        )}
        <h2 className="text-lg font-semibold mb-4 text-purple-400">
          {editingGame ? "Editando Juego" : "Agregar Nuevo Juego"}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" defaultValue={editingGame?.name} placeholder="Nombre" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2" />
          <input name="category" defaultValue={editingGame?.category} placeholder="Categoría (ej. Party, Estrategia)" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2" />
          <input name="price" defaultValue={editingGame?.price} type="number" step="0.01" placeholder="Precio ($) ej: 5000" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2" />
          <input name="playtime" defaultValue={editingGame?.playtime} type="number" placeholder="Tiempo de juego (min)" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2" />
          <div className="flex gap-4">
            <input name="minPlayers" defaultValue={editingGame?.minPlayers} type="number" placeholder="Min Jugadores" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2 w-full" />
            <input name="maxPlayers" defaultValue={editingGame?.maxPlayers} type="number" placeholder="Max Jugadores" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2 w-full" />
          </div>
          <input name="minAge" defaultValue={editingGame?.minAge} type="number" placeholder="Edad Mínima" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2" />
          
          <div className="md:col-span-2 bg-black/30 p-4 rounded-lg border border-white/5 space-y-3">
            <label className="text-sm text-gray-400 font-medium">Imagen del Juego (Subir un archivo O pegar una URL)</label>
            <div className="flex flex-col md:flex-row gap-4">
              <input name="imageFile" type="file" accept="image/*" className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2 w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20" />
              <div className="flex items-center justify-center text-gray-500">ó</div>
              <input name="imageUrl" defaultValue={editingGame?.image.startsWith("http") ? editingGame.image : ""} placeholder="URL de la Imagen (https://...)" className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2 w-full" />
            </div>
            {editingGame && editingGame.image && (
              <p className="text-xs text-gray-500">Imagen actual: {editingGame.image}</p>
            )}
          </div>
          
          <textarea name="description" defaultValue={editingGame?.description} placeholder="Descripción" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2 md:col-span-2 min-h-[100px]"></textarea>
          
          <button type="submit" className={`font-bold py-3 px-4 rounded-lg md:col-span-2 transition-colors ${editingGame ? 'bg-orange-600 hover:bg-orange-500 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white'}`}>
            {editingGame ? "Guardar Cambios" : "Agregar Juego"}
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {games.map(game => (
          <div key={game.id} className="bg-neutral-900 border border-white/5 p-4 rounded-xl flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <img src={game.image} alt={game.name} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h3 className="font-bold text-lg">{game.name}</h3>
                <p className="text-sm text-gray-400">{game.category} - ${game.price}/día base</p>
              </div>
            </div>
            <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => {
                  setEditingGame(game);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                className="text-orange-400 hover:text-orange-300 p-3 bg-orange-400/10 rounded-xl transition-colors"
                title="Editar"
              >
                <Edit2 size={18} />
              </button>
              <form action={async () => {
                if(confirm("¿Seguro que quieres borrar este juego?")) {
                  await deleteGame(game.id);
                }
              }}>
                <button type="submit" className="text-red-400 hover:text-red-300 p-3 bg-red-400/10 rounded-xl transition-colors" title="Borrar">
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
