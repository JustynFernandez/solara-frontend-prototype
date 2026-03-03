import React from "react";
import ConfiguratorShell from "../components/configurator/ConfiguratorShell";
import ConfiguratorCanvas from "../components/configurator/ConfiguratorCanvas";
import ConfiguratorControls from "../components/configurator/ConfiguratorControls";
import ConfiguratorPanel from "../components/configurator/ConfiguratorPanel";

const SolarConfigurator: React.FC = () => {
  return (
    <ConfiguratorShell>
      <div className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-72">
          <ConfiguratorControls />
        </aside>

        <main className="flex min-h-[400px] flex-1 overflow-hidden rounded-2xl border border-white/60 bg-white/50 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5 lg:min-h-0">
          <ConfiguratorCanvas />
        </main>

        <aside className="w-full shrink-0 lg:w-80">
          <ConfiguratorPanel />
        </aside>
      </div>

      <footer className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>
          Drag to rotate view • Scroll to zoom • Use controls to configure your solar setup
        </p>
      </footer>
    </ConfiguratorShell>
  );
};

export default SolarConfigurator;
