import { useState } from "react";
import { parseRepoInput, fetchRepoData } from "./lib/github";
import Header from "./components/Header";
import RepoInput from "./components/RepoInput";
import ThemeSelector from "./components/ThemeSelector";
import CardPreview from "./components/CardPreview";
import MarkdownCopy from "./components/MarkdownCopy";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSkeleton from "./components/LoadingSkeleton";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("dark");

  const handleSubmit = async (input) => {
    const parsed = parseRepoInput(input);
    if (!parsed) {
      setError(
        "올바른 형식이 아닙니다. owner/repo 또는 GitHub URL을 입력해주세요.",
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const repoData = await fetchRepoData(parsed.owner, parsed.repo);
      setData(repoData);
    } catch (err) {
      setError(err.message);
      setData(null);
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
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}

      {loading && <LoadingSkeleton />}

      {data && !loading && (
        <div className="flex flex-col items-center gap-8">
          <CardPreview data={data} theme={theme} />
          <MarkdownCopy data={data} theme={theme} />
        </div>
      )}

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
