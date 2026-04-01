import { useState } from "react";
import { parseRepoInput, fetchRepoData } from "./lib/github";
import Header from "./components/Header";
import RepoInput from "./components/RepoInput";
import ThemeSelector from "./components/ThemeSelector";
import CardPreview from "./components/CardPreview";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  const handleSubmit = async (input) => {
    const parsed = parseRepoInput(input);
    if (!parsed) {
      setError("올바른 형식이 아닙니다. owner/repo 형태로 입력해주세요.");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const repoData = await fetchRepoData(parsed.owner, parsed.repo);
      setData(repoData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-10 px-4 py-16">
      <Header />

      <div className="flex flex-col items-center gap-6 w-full">
        <RepoInput onSubmit={handleSubmit} loading={loading} />
        <ThemeSelector current={theme} onChange={setTheme} />
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm max-w-xl">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      {data && <CardPreview data={data} theme={theme} />}

      {/* Footer */}
      <footer className="mt-auto pt-8 text-center text-text-secondary text-sm">
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/Dev-2A"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
          >
            Dev-2A
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
