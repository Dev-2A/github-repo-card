import { THEMES } from "../lib/themes";

const THEME_PREVIEWS = {
  dark: ["#0d1117", "#161b22", "#58a6ff"],
  light: ["#ffffff", "#f6f8fa", "#0969da"],
  github: ["#0d1117", "#0d1117", "#58a6ff"],
  dracula: ["#282a36", "#282a36", "#bd93f9"],
  nord: ["#2e3440", "#3b4252", "#88c0d0"],
  monokai: ["#272822", "#272822", "#a6e22e"],
};

export default function ThemeSelector({ current, onChange }) {
  return (
    <div className="w-full max-w-xl px-4 sm:px-0">
      <label className="block text-text-secondary text-sm mb-2">테마</label>
      <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2">
        {Object.entries(THEMES).map(([key, value]) => {
          const colors = THEME_PREVIEWS[key] || ["#000", "#111", "#fff"];
          const isActive = current === key;

          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`flex items-center justify-center sm:justify-start gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm cursor-pointer border transition-all ${
                isActive
                  ? "border-accent-blue bg-accent-blue/10 text-accent-blue"
                  : "border-border bg-bg-card text-text-secondary hover:border-accent-blue/50"
              }`}
            >
              <div className="flex gap-0.5">
                {colors.map((c, i) => (
                  <div
                    key={i}
                    style={{ backgroundColor: c }}
                    className="w-3 h-3 rounded-sm"
                  />
                ))}
              </div>
              <span className="hidden sm:inline">{value.name}</span>
              <span className="sm:hidden text-xs">{value.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
