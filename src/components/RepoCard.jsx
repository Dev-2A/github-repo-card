import { formatCount, timeAgo } from "../lib/format";
import { THEMES } from "../lib/themes";
export default function RepoCard({
  data,
  theme = "dark",
  width = 600,
  height = 340,
}) {
  const t = THEMES[theme] || THEMES.dark;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: "12px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* 상단: 아바타 + 레포명 */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={data.owner.avatarUrl}
          alt={data.owner.login}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: `1px solid ${t.border}`,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: t.textSecondary, fontSize: "14px" }}>
            {data.owner.login}
          </span>
          <span style={{ color: t.accent, fontSize: "20px", fontWeight: 700 }}>
            {data.name}
          </span>
        </div>
      </div>

      {/* 중단: 설명 */}
      <p
        style={{
          color: t.textSecondary,
          fontSize: "15px",
          lineHeight: "1.5",
          margin: "0",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          webkitBoxOrient: "vertical",
        }}
      >
        {data.description}
      </p>

      {/* 언어 바 */}
      {data.languages.length > 0 && (
        <div>
          <div
            style={{
              display: "flex",
              height: "8px",
              borderRadius: "4px",
              overflow: "hidden",
              gap: "2px",
            }}
          >
            {data.languages.map((lang) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percent}%`,
                  backgroundColor: lang.color,
                  minWidth: lang.percent > 0 ? "3px" : "0",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "8px",
            }}
          >
            {data.languages.slice(0, 5).map((lang) => (
              <div
                key={lang.name}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <span
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: lang.color,
                    display: "inline-block",
                  }}
                />
                <span style={{ color: t.text, fontSize: "12px" }}>
                  {lang.name}
                </span>
                <span style={{ color: t.textSecondary, fontSize: "12px" }}>
                  {lang.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 하단: 스탯 */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Star */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={t.accent}>
            <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
          </svg>
          <span style={{ color: t.text, fontSize: "14px", fontWeight: 600 }}>
            {formatCount(data.stars)}
          </span>
        </div>
        {/* Fork */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={t.icon}>
            <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
          <span style={{ color: t.text, fontSize: "14px", fontWeight: 600 }}>
            {formatCount(data.forks)}
          </span>
        </div>
        {/* License */}
        {data.license && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill={t.icon}>
              <path d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227L3 6.327l1.305 2.9a2.481 2.481 0 01-1.305.373c-.529 0-.907-.146-1.305-.373zm8.61 0L11.61 6.327l1.305 2.9a2.481 2.481 0 01-1.305.373c-.529 0-.907-.146-1.305-.373z" />
            </svg>
            <span style={{ color: t.textSecondary, fontSize: "13px" }}>
              {data.license}
            </span>
          </div>
        )}
        {/* Updated */}
        <span
          style={{
            color: t.textSecondary,
            fontSize: "12px",
            marginLeft: "auto",
          }}
        >
          Updated {timeAgo(data.updatedAt)}
        </span>
      </div>
    </div>
  );
}
