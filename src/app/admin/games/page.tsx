import { prisma } from "@/lib/prisma";
import { GamesManager } from "./GamesManager";

export default async function AdminGames() {
  const games = await prisma.game.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestión de Catálogo</h1>
      <GamesManager games={games} />
    </div>
  );
}
