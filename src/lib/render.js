import satori from "satori";
import { buildCardMarkup } from "./cardTemplate";
import { getSatoriFonts } from "./font";

/**
 * 레포 데이터 + 테마로 SVG 문자열을 생성한다.
 * @param {object} data - fetchRepoData()의 반환값
 * @param {string} theme - 테마 키
 * @param {object} options - { width, height }
 * @returns {Promise<string>} SVG 문자열
 */
export async function renderCardSVG(data, theme = "dark", options = {}) {
  const { width = 600, height = 340 } = options;
  const markup = buildCardMarkup(data, theme);
  const fonts = await getSatoriFonts();

  const svg = await satori(markup, {
    width,
    height,
    fonts,
  });

  return svg;
}

/**
 * SVG 문자열을 PNG Blob으로 변환한다. (브라우저 Canvas 사용)
 * @param {string} svgString - SVG 문자열
 * @param {number} width
 * @param {number} height
 * @param {number} scale - 해상도 배율 (기본 2x)
 * @returns {Promise<Blob>} PNG Blob
 */
export async function svgToPngBlob(
  svgString,
  width = 600,
  height = 340,
  scale = 2,
) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("PNG 변환에 실패했습니다."));
        }
      }, "image/png");
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("SVG 이미지 로드에 실패했습니다."));
    };

    img.src = url;
  });
}

/**
 * 레포 데이터 → PNG Blob 원스텝 변환
 */
export async function renderCardPNG(data, theme = "dark", options = {}) {
  const { width = 600, height = 340, scale = 2 } = options;
  const svg = await renderCardSVG(data, theme, { width, height });
  const blob = await svgToPngBlob(svg, width, height, scale);
  return { svg, blob };
}
