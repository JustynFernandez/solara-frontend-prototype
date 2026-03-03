import React, { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MobileBottomNav from "@/components/ui/MobileBottomNav";
import PageBackground from "@/components/ui/PageBackground";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { useEcoMode } from "@/hooks/useEcoMode";
import { useKonamiCode } from "@/hooks/useKonamiCode";
import { useCommandPalette } from "@/hooks/useCommandPalette";
import CommandPalette from "@/components/ui/CommandPalette";
import AppRoutes from "@/app/AppRoutes";
import EcoModeBadge from "@/app/EcoModeBadge";
import { navItems } from "@/app/navItems";

const AppShell = () => {
  const { ecoModeEnabled } = useEcoMode();
  const [solarModeActive, setSolarModeActive] = useState(false);
  const { open: commandPaletteOpen, setOpen: setCommandPaletteOpen, openPalette } = useCommandPalette();

  const handleKonamiCode = useCallback(() => {
    setSolarModeActive(true);
    toast.success("Solar Mode Activated!", {
      description: "You found the secret! Enjoy the extra sunshine.",
      duration: 4000,
    });
    setTimeout(() => setSolarModeActive(false), 10000);
  }, []);

  useKonamiCode(handleKonamiCode);

  useEffect(() => {
    const root = document.documentElement;
    if (ecoModeEnabled) {
      root.setAttribute("data-perf", "low");
    } else {
      root.removeAttribute("data-perf");
    }
  }, [ecoModeEnabled]);

  return (
    <div className={`relative isolate min-h-screen bg-transparent text-slate-900 transition-colors duration-500 dark:text-slate-100 ${solarModeActive ? "solar-mode-active" : ""}`}>
      <PageBackground />

      <Toaster
        position="top-center"
        toastOptions={{
          className: "!bg-white/95 !border-solara-blue/20 !shadow-lg dark:!bg-slate-900/95 dark:!border-white/10",
        }}
      />

      {solarModeActive && (
        <div
          className="pointer-events-none fixed inset-0 z-50 animate-pulse bg-gradient-to-b from-solara-gold/10 via-transparent to-solara-gold/5"
          aria-hidden="true"
        />
      )}

      <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      <Navbar navItems={navItems} onSearchClick={openPalette} />
      <main className="pb-16 md:pb-0">
        <AppRoutes />
      </main>
      <div className="solara-floating-controls fixed bottom-4 right-4 flex flex-col items-end gap-2">
        <EcoModeBadge />
        <ThemeToggle />
      </div>
      <Footer navItems={navItems} />
      <MobileBottomNav />
    </div>
  );
};

export default AppShell;

