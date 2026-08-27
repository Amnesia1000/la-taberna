import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Dice6 } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BoardGame Hub - Alquiler de Juegos",
  description: "Alquila y compra los mejores juegos de mesa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-white min-h-screen flex flex-col`}>
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
              <Dice6 className="text-purple-500" />
              BoardGame Hub
            </Link>
            <div className="flex gap-4">
              <Link href="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
                Catálogo
              </Link>
              <Link href="/admin/games" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-white/10 bg-black py-8 mt-12 text-center text-sm text-white/50">
          <p>© {new Date().getFullYear()} BoardGame Hub. Todos los derechos reservados.</p>
        </footer>
      </body>
    </html>
  );
}
