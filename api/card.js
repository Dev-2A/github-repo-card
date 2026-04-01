import satori from "satori";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import { fetchRepoData } from "./_lib/github.js";
import { buildCardMarkup } from "./_lib/cardBuilder.js";

const FONT_URLS = {
  regular:
    "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/woff/Pretendard-Regular.woff",
  bold: "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/woff/Pretendard-Bold.woff",
};

let fontCacheRegular = null;
let fontCacheBold = null;
let wasmInitialized = false;

async function loadFonts() {
  const [regular, bold] = await Promise.all([
    fontCacheRegular ||
      fetch(FONT_URLS.regular)
        .then((r) => r.arrayBuffer())
        .then((d) => {
          fontCacheRegular = d;
          return d;
        }),
    fontCacheBold ||
      fetch(FONT_URLS.bold)
        .then((r) => r.arrayBuffer())
        .then((d) => {
          fontCacheBold = d;
          return d;
        }),
  ]);

  return [
    { name: "Pretendard", data: regular, weight: 400, style: "normal" },
    { name: "Pretendard", data: bold, weight: 700, style: "normal" },
  ];
}

async function initResvg() {
  if (wasmInitialized) return;
  try {
    const wasmUrl = "http://unpkg.com/@resvg/resvg-wasm@2.6.2/index_bg.wasm";
    const wasmResponse = await fetch(wasmUrl);
    const wasmBuffer = await wasmResponse.arrayBuffer();
    await initWasm(wasmBuffer);
    wasmInitialized = true;
  } catch (e) {
    if (!e.message?.includes("Already initialized")) {
      throw e;
    }
    wasmInitialized = true;
  }
}

export default async function handler(req, res) {
  try {
    const {
      repo,
      theme = "dark",
      format = "png",
      bg,
      border,
      text,
      accent,
    } = req.query;

    if (!repo) {
      return res
        .status(400)
        .json({ error: "repo 파라미터가 필요합니다. (예: ?repo=owner/name)" });
    }

    const parts = repo.split("/");
    if (parts.length !== 2) {
      return res
        .status(400)
        .json({ error: "repo는 owner/name 형식이어야 합니다." });
    }

    const [owner, repoName] = parts;
    const data = await fetchRepoData(owner, repoName);

    // 커스텀 색상 오버라이드
    const colorOverrides = {};
    if (bg) colorOverrides.cardBg = `#${bg}`;
    if (border) colorOverrides.border = `#${border}`;
    if (text) colorOverrides.text = `#${text}`;
    if (accent) colorOverrides.accent = `#${accent}`;

    const markup = buildCardMarkup(data, theme, colorOverrides);

    const fonts = await loadFonts();

    const svg = await satori(markup, {
      width: 600,
      height: 340,
      fonts,
    });

    if (format === "svg") {
      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
      return res.send(svg);
    }

    // PNG 변환
    await initResvg();
    const resvg = new Resvg(svg, {
      fitTo: { model: "width", value: 1200 },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max_age=3600, s-maxage=3600");
    return res.send(Buffer.from(pngBuffer));
  } catch (error) {
    console.error("Card generation error:", error);
    return res.status(500).json({ error: error.message });
  }
}
