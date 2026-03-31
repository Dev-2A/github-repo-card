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
          <span style={{ color: t.icon, fontSize: "14px" }}>⭐</span>
          <span style={{ color: t.text, fontSize: "14px", fontWeight: 600 }}>
            {formatCount(data.stars)}
          </span>
        </div>
        {/* Fork */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ color: t.icon, fontSize: "14px" }}>🍴</span>
          <span style={{ color: t.text, fontSize: "14px", fontWeight: 600 }}>
            {formatCount(data.forks)}
          </span>
        </div>
        {/* License */}
        {data.license && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ color: t.icon, fontSize: "14px" }}>📄</span>
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
