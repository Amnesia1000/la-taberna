import { Hero } from "@/components/Hero";
import { GameCatalog } from "@/components/GameCatalog";
import { FloatingCards } from "@/components/FloatingCards";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="relative w-full">
      <FloatingCards />
      <div className="relative z-10">
        <Hero />
        <GameCatalog games={games} />
      </div>
    </div>
  );
}
