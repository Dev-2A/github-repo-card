import { useState } from "react";
import { parseRepoInput, fetchRepoData } from "./lib/github";

function App() {
  const [input, setInput] = useState("Dev-2A/bookshelf-log");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold text-accent-blue">
        🃏 GitHub Repo Card Generator
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="owner/repo"
          className="px-4 py-2 rounded-lg bg-bg-input border border-border text-text w-80"
        />
        <button
          onClick={handleFetch}
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light disabled:opacity-50 cursor-pointer"
        >
          {loading ? "로딩..." : "조회"}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {data && (
        <pre className="bg-bg-card border border-border rounded-lg p-4 text-sm text-text-secondary max-w-xl overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
