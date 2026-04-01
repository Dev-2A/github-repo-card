import { useState } from "react";

export default function RepoInput({ onSubmit, loading }) {
  const [input, setInput] = useState("Dev-2A/bookshelf-log");

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input.trim());
    }
  };

  return (
    <div className="w-full max-w-xl px-4 sm:px-0">
      <label className="block text-text-secondary text-sm mb-2">
        GitHub 레포지토리
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="owner/repo 또는 GitHub URL"
          className="flex-1 px-4 py-3 rounded-lg bg-bg-input border border-border text-text placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue transition-colors"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary-light disabled:opacity-50 cursor-pointer transition-colors"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              로딩
            </span>
          ) : (
            "생성"
          )}
        </button>
      </div>
    </div>
  );
}
