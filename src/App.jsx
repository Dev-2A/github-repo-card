import { useState } from "react";
import { parseRepoInput, fetchRepoData } from "./lib/github";
import { THEMES } from "./lib/themes";
import RepoCard from "./components/RepoCard";

function App() {
  const [input, setInput] = useState("Dev-2A/bookshelf-log");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  const handleFetch = async () => {
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
    <div className="min-h-screen flex flex-col items-center gap-8 p-8 pt-16">
      <h1 className="text-3xl font-bold text-accent-blue">
        🃏 GitHub Repo Card Generator
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFetch()}
          placeholder="owner/repo 또는 GitHub URL"
          className="px-4 py-2 rounded-lg bg-bg-input border border-border text-text w-80"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light disabled:opacity-50 cursor-pointer"
        >
          {loading ? "로딩..." : "생성"}
        </button>
      </div>

      {/* 테마 선택 */}
      <div className="flex gap-2">
        {Object.entries(THEMES).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`px-4 py-1.5 rounded-full text-sm cursor-pointer border ${
              theme === key
                ? "bg-primary text-white border-primary"
                : "bg-bg-card text-text-secondary border-border hover:border-accent-blue"
            }`}
          >
            {value.name}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {data && <RepoCard data={data} theme={theme} />}
    </div>
  );
}

export default App;
