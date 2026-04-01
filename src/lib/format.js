/**
 * 숫자를 축약 표기한다. (1200 → 1.2k)
 */
export function formatCount(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "m";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return String(num);
}

/**
 * 날짜를 상대 시간으로 표시한다. (2일 전, 3개월 전)
 */
export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  const intervals = [
    { label: "년", seconds: 31536000 },
    { label: "개월", seconds: 2592000 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label} 전`;
    }
  }

  return "방금 전";
}

/**
 * 문자열에서 이모지를 제거한다. (Satori는 이모지 렌더링 미지원)
 */
export function stripEmoji(str) {
  return str
    .replace(/[\u{1F600}-\u{1F64F}]/gu, "")
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, "")
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, "")
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "")
    .replace(/[\u{2600}-\u{26FF}]/gu, "")
    .replace(/[\u{2700}-\u{27BF}]/gu, "")
    .replace(/[\u{FE00}-\u{FE0F}]/gu, "")
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "")
    .replace(/[\u{1FA00}-\u{1FA6F}]/gu, "")
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, "")
    .replace(/[\u{200D}]/gu, "")
    .replace(/[\u{20E3}]/gu, "")
    .replace(/[\u{E0020}-\u{E007F}]/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}
