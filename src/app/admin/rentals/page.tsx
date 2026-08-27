import { prisma } from "@/lib/prisma";
import { addRental, returnRental } from "@/app/actions";
import { CheckCircle2, Clock } from "lucide-react";

export default async function AdminRentals() {
  const rentals = await prisma.rental.findMany({ 
    include: { game: true },
    orderBy: { createdAt: "desc" } 
  });
  
  const games = await prisma.game.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestión de Alquileres</h1>
      
      <div className="bg-black/20 rounded-xl p-6 border border-white/5 mb-8">
        <h2 className="text-lg font-semibold mb-4">Registrar Alquiler</h2>
        <form action={addRental} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="gameId" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2">
            <option value="">Selecciona un Juego</option>
            {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <input name="clientName" placeholder="Nombre del Cliente" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2" />
          <input name="clientPhone" placeholder="Teléfono" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2" />
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1 ml-1">Fecha de Devolución Prevista</label>
            <input name="expectedEndDate" type="date" required className="bg-neutral-950 border border-white/10 rounded-lg px-4 py-2" />
          </div>
          
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg md:col-span-2 transition-colors">
            Registrar Alquiler
          </button>
        </form>
      </div>

      <div className="space-y-4">
        {rentals.map(rental => {
          const isLate = rental.status === "ACTIVE" && new Date(rental.expectedEndDate) < new Date();
          const daysLate = isLate ? Math.ceil((new Date().getTime() - new Date(rental.expectedEndDate).getTime()) / (1000 * 3600 * 24)) : 0;

          return (
            <div key={rental.id} className={`bg-neutral-900 border ${isLate ? 'border-red-500/50' : 'border-white/5'} p-4 rounded-xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-lg">{rental.game.name}</h3>
                  {rental.status === "RETURNED" ? (
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 size={12}/> Devuelto</span>
                  ) : isLate ? (
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={12}/> Atrasado ({daysLate} días)</span>
                  ) : (
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Clock size={12}/> Activo</span>
                  )}
                </div>
                <p className="text-sm text-gray-300">Cliente: {rental.clientName} ({rental.clientPhone})</p>
                <p className="text-xs text-gray-500 mt-1">
                  Desde: {new Date(rental.startDate).toLocaleDateString()} | Hasta: {new Date(rental.expectedEndDate).toLocaleDateString()}
                </p>
                {isLate && (
                  <p className="text-xs text-red-400 mt-1 font-semibold">
                    Recargo sugerido: ${(daysLate * rental.game.price).toFixed(2)} (${rental.game.price}/día extra)
                  </p>
                )}
              </div>
              
              {rental.status !== "RETURNED" && (
                <form action={async () => {
                  "use server";
                  await returnRental(rental.id);
                }}>
                  <button type="submit" className="bg-green-600/20 text-green-400 hover:bg-green-600/30 px-4 py-2 rounded-lg text-sm font-bold transition-colors whitespace-nowrap">
                    Marcar Devuelto
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
