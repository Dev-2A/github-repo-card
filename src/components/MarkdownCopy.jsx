import { useMemo } from "react";
import useCopyToClipboard from "../hooks/useCopyToClipboard";

const BASE_URL = "https://github-repo-card.vercel.app";

export default function MarkdownCopy({ data, theme }) {
  const { copied: copiedMd, copy: copyMd } = useCopyToClipboard();
  const { copied: copiedHtml, copy: copyHtml } = useCopyToClipboard();
  const { copied: copiedUrl, copy: copyUrl } = useCopyToClipboard();

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({ repo: data.fullName });
    if (theme !== "dark") params.set("theme", theme);
    return `${BASE_URL}/api/card?${params.toString()}`;
  }, [data.fullName, theme]);

  const markdownSnippet = `![${data.fullName} card](${apiUrl})`;
  const htmlSnippet = `<img src="${apiUrl}" alt="${data.fullName} card" width="600" />`;

  return (
    <div className="w-full max-w-xl flex flex-col gap-3">
      <label className="text-text-secondary text-sm">README에 삽입</label>

      {/* Markdown */}
      <div className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs">Markdown</span>
        <div className="flex gap-2">
          <code className="flex-1 px-3 py-2.5 rounded-lg bg-bg-input border border-border text-text text-sm font-mono overflow-x-auto whitespace-nowrap">
            {markdownSnippet}
          </code>
          <button
            onClick={() => copyMd(markdownSnippet)}
            className="px-4 py-2.5 rounded-lg bg-bg-card border border-border text-text-secondary text-sm hover:border-accent-blue cursor-pointer transition-colors shrink-0"
          >
            {copiedMd ? (
              <span className="text-accent-green flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                복사됨
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                복사
              </span>
            )}
          </button>
        </div>
      </div>

      {/* HTML */}
      <div className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs">HTML</span>
        <div className="flex gap-2">
          <code className="flex-1 px-3 py-2.5 rounded-lg bg-bg-input border border-border text-text text-sm font-mono overflow-x-auto whitespace-nowrap">
            {htmlSnippet}
          </code>
          <button
            onClick={() => copyHtml(htmlSnippet)}
            className="px-4 py-2.5 rounded-lg bg-bg-card border border-border text-text-secondary text-sm hover:border-accent-blue cursor-pointer transition-colors shrink-0"
          >
            {copiedHtml ? (
              <span className="text-accent-green flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                복사됨
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                복사
              </span>
            )}
          </button>
        </div>
      </div>

      {/* URL Only */}
      <div className="flex flex-col gap-1.5">
        <span className="text-text-secondary text-xs">이미지 URL</span>
        <div className="flex gap-2">
          <code className="flex-1 px-3 py-2.5 rounded-lg bg-bg-input border border-border text-text text-sm font-mono overflow-x-auto whitespace-nowrap">
            {apiUrl}
          </code>
          <button
            onClick={() => copyUrl(apiUrl)}
            className="px-4 py-2.5 rounded-lg bg-bg-card border border-border text-text-secondary text-sm hover:border-accent-blue cursor-pointer transition-colors shrink-0"
          >
            {copiedUrl ? (
              <span className="text-accent-green flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                복사됨
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                복사
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
