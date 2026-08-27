import Link from "next/link";
import { Gamepad2, Users, LayoutDashboard } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-neutral-900 rounded-2xl border border-white/5 p-4 sticky top-24">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-4">Admin Panel</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/admin/games" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-gray-200">
              <Gamepad2 size={20} className="text-purple-400" />
              Catálogo
            </Link>
            <Link href="/admin/rentals" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-gray-200">
              <Users size={20} className="text-blue-400" />
              Alquileres
            </Link>
          </nav>
        </div>
      </aside>
      <main className="flex-1 bg-neutral-900/50 rounded-2xl border border-white/5 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
