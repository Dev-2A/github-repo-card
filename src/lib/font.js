let fontCacheBold = null;
let fontCacheRegular = null;

// npm 패키지 기준 Pretendard 정적 woff 경로 (Satori는 woff2 미지원)
const FONT_URLS = {
  regular:
    "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/woff/Pretendard-Regular.woff",
  bold: "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/static/woff/Pretendard-Bold.woff",
};

async function fetchFont(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`폰트 로드 실패: ${url}`);
  }
  return response.arrayBuffer();
}

/**
 * Satori에 전달할 fonts 배열을 반환한다.
 * Pretendard Regular + Bold (woff)를 로드해 한국어를 지원한다.
 * ※ Satori는 woff2를 지원하지 않으므로 반드시 woff를 사용해야 한다.
 */
export async function getSatoriFonts() {
  const [regular, bold] = await Promise.all([
    fontCacheRegular ||
      fetchFont(FONT_URLS.regular).then((d) => {
        fontCacheRegular = d;
        return d;
      }),
    fontCacheBold ||
      fetchFont(FONT_URLS.bold).then((d) => {
        fontCacheBold = d;
        return d;
      }),
  ]);

  return [
    { name: "Pretendard", data: regular, weight: 400, style: "normal" },
    { name: "Pretendard", data: bold, weight: 700, style: "normal" },
  ];
}
