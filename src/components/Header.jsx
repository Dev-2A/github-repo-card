export default function Header() {
  return (
    <header className="text-center px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-accent-blue mb-2">
        GitHub Repo Card Generator
      </h1>
      <p className="text-text-secondary text-base sm:text-lg">
        GitHub 레포 정보로 카드 이미지를 자동 생성합니다
      </p>
      <p className="text-text-secondary/60 text-xs sm:text-sm mt-1">
        owner/repo 입력 → 카드 생성 → README에 삽입
      </p>
    </header>
  );
}
