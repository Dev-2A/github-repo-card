import { formatCount, timeAgo, stripEmoji } from "./format.js";
import { THEMES } from "./themes.js";

export function buildCardMarkup(data, theme = "dark", colorOverrides = {}) {
  const t = { ...(THEMES[theme] || THEMES.dark), ...colorOverrides };

  const starPath =
    "M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z";
  const forkPath =
    "M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z";
  const licensePath =
    "M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227L3 6.327l1.305 2.9a2.481 2.481 0 01-1.305.373c-.529 0-.907-.146-1.305-.373zm8.61 0L11.61 6.327l1.305 2.9a2.481 2.481 0 01-1.305.373c-.529 0-.907-.146-1.305-.373z";

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
        fontFamily: "Pretendard, sans-serif",
      },
      children: [
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
        {
          type: "p",
          props: {
            style: {
              color: t.textSecondary,
              fontSize: "15px",
              lineHeight: "1.5",
              margin: "0",
            },
            children: stripEmoji(data.description),
          },
        },
        langBar,
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", gap: "20px" },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", gap: "6px" },
                  children: [
                    {
                      type: "svg",
                      props: {
                        width: 16,
                        height: 16,
                        viewBox: "0 0 16 16",
                        children: {
                          type: "path",
                          props: { fill: t.accent, d: starPath },
                        },
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          color: t.text,
                          fontSize: "14px",
                          fontWeight: 600,
                        },
                        children: String(formatCount(data.stars)),
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", gap: "6px" },
                  children: [
                    {
                      type: "svg",
                      props: {
                        width: 16,
                        height: 16,
                        viewBox: "0 0 16 16",
                        children: {
                          type: "path",
                          props: { fill: t.icon, d: forkPath },
                        },
                      },
                    },
                    {
                      type: "span",
                      props: {
                        style: {
                          color: t.text,
                          fontSize: "14px",
                          fontWeight: 600,
                        },
                        children: String(formatCount(data.forks)),
                      },
                    },
                  ],
                },
              },
              data.license
                ? {
                    type: "div",
                    props: {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      },
                      children: [
                        {
                          type: "svg",
                          props: {
                            width: 16,
                            height: 16,
                            viewBox: "0 0 16 16",
                            children: {
                              type: "path",
                              props: { fill: t.icon, d: licensePath },
                            },
                          },
                        },
                        {
                          type: "span",
                          props: {
                            style: { color: t.textSecondary, fontSize: "13px" },
                            children: String(data.license),
                          },
                        },
                      ],
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
