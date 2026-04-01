const ERROR_MESSAGES = {
  404: {
    title: "레포지토리를 찾을 수 없습니다",
    description: "owner/repo 형식이 맞는지, 레포가 public인지 확인해주세요.",
  },
  403: {
    title: "API 요청 한도 초과",
    description:
      "GitHub API 호출 제한에 도달했습니다. 잠시 후 다시 시도해주세요.",
  },
};

export default function ErrorMessage({ message, onDismiss }) {
  // 에러 메시지에서 상태 코드를 추출해 매칭
  const matched = Object.entries(ERROR_MESSAGES).find(([code]) =>
    message.includes(code),
  );
  const info = matched ? matched[1] : null;

  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 max-w-xl w-full">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f87171"
        strokeWidth="2"
        className="shrink-0 mt-0.5"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div className="flex-1">
        <p className="text-red-400 text-sm font-semibold">
          {info ? info.title : "오류가 발생했습니다"}
        </p>
        <p className="text-red-400/70 text-xs mt-1">
          {info ? info.description : message}
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-red-400/50 hover:text-red-400 cursor-pointer"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
