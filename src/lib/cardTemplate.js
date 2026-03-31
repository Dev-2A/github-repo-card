import { formatCount, timeAgo } from "./format";
import { THEMES } from "./themes";

/**
 * Satori에 전달할 카드 마크업 객체를 생성한다.
 * Satori는 React.createElement 형태 또는 JSX → React element를 받으므로,
 * 여기서는 React.createElement 호환 구조로 반환한다.
 */
export function buildCardMarkup(data, theme = "dark") {
  const t = THEMES[theme] || THEMES.dark;

  const langBar =
    data.languages.length > 0
      ? {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column", gap: "8px" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    height: "8px",
                    borderRadius: "4px",
                    overflow: "hidden",
                    gap: "2px",
                  },
                  children: data.languages.map((lang) => ({
                    type: "div",
                    props: {
                      style: {
                        width: `${lang.percent}%`,
                        backgroundColor: lang.color,
                        minWidth: "3px",
                      },
                    },
                  })),
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", flexWrap: "wrap", gap: "12px" },
                  children: data.languages.slice(0, 5).map((lang) => ({
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      },
                      children: [
                        {
                          type: "div",
                          props: {
                            style: {
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              backgroundColor: lang.color,
                            },
                          },
                        },
                        {
                          type: "span",
                          props: {
                            style: { color: t.text, fontSize: "12px" },
                            children: lang.name,
                          },
                        },
                        {
                          type: "span",
                          props: {
                            style: { color: t.textSecondary, fontSize: "12px" },
                            children: `${lang.percent}%`,
                          },
                        },
                      ],
                    },
                  })),
                },
              },
            ],
          },
        }
      : null;

  return {
    type: "div",
    props: {
      style: {
        width: "600px",
        height: "340px",
        background: t.cardBg,
        border: `1px solid ${t.border}`,
        borderRadius: "12px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "Segoe UI, sans-serif",
      },
      children: [
        // 상단: 아바타 + 레포명
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", gap: "12px" },
            children: [
              {
                type: "img",
                props: {
                  src: data.owner.avatarUrl,
                  width: 40,
                  height: 40,
                  style: {
                    borderRadius: "50%",
                    border: `1px solid ${t.border}`,
                  },
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "span",
                      props: {
                        style: { color: t.textSecondary, fontSize: "14px" },
                        children: data.owner.login,
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          color: t.accent,
                          fontSize: "20px",
                          fontWeight: 700,
                        },
                        children: data.name,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        // 중단: 설명
        {
          type: "p",
          props: {
            style: {
              color: t.textSecondary,
              fontSize: "15px",
              lineHeight: "1.5",
              margin: "0",
            },
            children: data.description,
          },
        },
        // 언어 바
        langBar,
        // 하단: 스탯
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", gap: "20px" },
            children: [
              {
                type: "span",
                props: {
                  style: { color: t.text, fontSize: "14px" },
                  children: `⭐ ${formatCount(data.stars)}`,
                },
              },
              {
                type: "span",
                props: {
                  style: { color: t.text, fontSize: "14px" },
                  children: `🍴 ${formatCount(data.forks)}`,
                },
              },
              data.license
                ? {
                    type: "span",
                    props: {
                      style: { color: t.textSecondary, fontSize: "13px" },
                      children: `📄 ${data.license}`,
                    },
                  }
                : null,
              {
                type: "span",
                props: {
                  style: {
                    color: t.textSecondary,
                    fontSize: "12px",
                    marginLeft: "auto",
                  },
                  children: `Updated ${timeAgo(data.updatedAt)}`,
                },
              },
            ].filter(Boolean),
          },
        },
      ].filter(Boolean),
    },
  };
}
