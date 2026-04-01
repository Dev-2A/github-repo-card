export default function LoadingSkeleton() {
  return (
    <div className="w-[600px] h-[340px] rounded-xl border border-border bg-bg-card p-8 flex flex-col justify-between animate-pulse">
      {/* 상단 */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-border" />
        <div className="flex flex-col gap-2">
          <div className="w-20 h-3 rounded bg-border" />
          <div className="w-36 h-5 rounded bg-border" />
        </div>
      </div>
      {/* 중단 */}
      <div className="flex flex-col gap-2">
        <div className="w-full h-3 rounded bg-border" />
        <div className="w-3/4 h-3 rounded bg-border" />
      </div>
      {/* 언어바 */}
      <div>
        <div className="w-full h-2 rounded bg-border" />
        <div className="flex gap-4 mt-2">
          <div className="w-16 h-3 rounded bg-border" />
          <div className="w-20 h-3 rounded bg-border" />
          <div className="w-12 h-3 rounded bg-border" />
        </div>
      </div>
      {/* 하단 */}
      <div className="flex gap-6">
        <div className="w-12 h-3 rounded bg-border" />
        <div className="w-12 h-3 rounded bg-border" />
        <div className="w-10 h-3 rounded bg-border" />
      </div>
    </div>
  );
}
