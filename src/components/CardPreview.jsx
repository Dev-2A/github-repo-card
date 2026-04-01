import { useState } from "react";
import RepoCard from "./RepoCard";
import { renderCardPNG } from "../lib/render";
import { downloadBlob, downloadSVG } from "../lib/download";

export default function CardPreview({ data, theme }) {
  const [rendering, setRendering] = useState(false);

  const handleDownloadPNG = async () => {
    setRendering(true);
    try {
      const { blob } = await renderCardPNG(data, theme);
      downloadBlob(blob, `${data.fullName.replace("/", "-")}-card.png`);
    } catch (err) {
      alert("PNG 다운로드 실패: " + err.message);
    } finally {
      setRendering(false);
    }
  };

  const handleDownloadSVG = async () => {
    setRendering(true);
    try {
      const { svg } = await renderCardPNG(data, theme);
      downloadSVG(svg, `${data.fullName.replace("/", "-")}-card.svg`);
    } catch (err) {
      alert("SVG 다운로드 실패: " + err.message);
    } finally {
      setRendering(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 카드 미리보기 */}
      <div className="rounded-xl overflow-hidden shadow-2xl">
        <RepoCard data={data} theme={theme} />
      </div>

      {/* 다운로드 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={handleDownloadPNG}
          disabled={rendering}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-green text-bg font-semibold text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer transition-opacity"
        >
          {rendering ? (
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
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
          )}
          PNG 다운로드
        </button>
        <button
          onClick={handleDownloadSVG}
          disabled={rendering}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-bg-card border border-border text-text-secondary text-sm hover:border-accent-blue cursor-pointer transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          SVG 다운로드
        </button>
      </div>
    </div>
  );
}
