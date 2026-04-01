# 🃏 GitHub Repo Card Generator

GitHub 유저명/레포를 입력하면 스타 수, 언어 비율, 설명이 담긴 카드 이미지를 자동 생성합니다.  
Vercel 서버리스로 배포되어, URL 하나면 누구나 README에 삽입할 수 있습니다.

![github-repo-card card](https://github-repo-card-mu.vercel.app/api/card?repo=Dev-2A/github-repo-card)

## Usage

README에 아래 마크다운을 추가하면 카드가 자동으로 표시됩니다.

### Markdown

```markdown
![repo card](https://github-repo-card.vercel.app/api/card?repo=Dev-2A/bookshelf-log)
```

## Parameters

| 파라미터 | 설명 | 기본값 | 예시 |
| --- | --- | --- | --- |
| `repo` | GitHub 레포 (필수) | — | `Dev-2A/bookshelf-log` |
| `theme` | 카드 테마 | `dark` | `light`, `github`, `dracula`, `nord`, `monokai` |
| `format` | 출력 형식 | `png` | `svg` |
| `bg` | 배경색 오버라이드 | — | `1a1b26` |
| `border` | 테두리색 오버라이드 | — | `ff6b6b` |
| `text` | 텍스트색 오버라이드 | — | `ffffff` |
| `accent` | 강조색 오버라이드 | — | `ff9800` |

### 사용 예시

```text
# 기본 (다크)
/api/card?repo=facebook/react

# 라이트 테마
/api/card?repo=facebook/react&theme=light

# Nord 테마 + SVG
/api/card?repo=facebook/react&theme=nord&format=svg

# 커스텀 색상
/api/card?repo=facebook/react&theme=dark&accent=ff6b6b&bg=1a1b26
```

## Themes

| 테마 | 미리보기 |
| --- | --- |
| `dark` | ![dark](https://github-repo-card.vercel.app/api/card?repo=Dev-2A/github-repo-card&theme=dark) |
| `light` | ![light](https://github-repo-card.vercel.app/api/card?repo=Dev-2A/github-repo-card&theme=light) |
| `github` | ![github](https://github-repo-card.vercel.app/api/card?repo=Dev-2A/github-repo-card&theme=github) |
| `dracula` | ![dracula](https://github-repo-card.vercel.app/api/card?repo=Dev-2A/github-repo-card&theme=dracula) |
| `nord` | ![nord](https://github-repo-card.vercel.app/api/card?repo=Dev-2A/github-repo-card&theme=nord) |
| `monokai` | ![monokai](https://github-repo-card.vercel.app/api/card?repo=Dev-2A/github-repo-card&theme=monokai) |

## Features

- 🔍 GitHub API로 레포 정보 자동 수집 (스타, 포크, 언어 비율, 설명, 라이선스)
- 🎨 Satori 기반 카드 이미지 동적 생성
- 🌗 6종 테마 + 커스텀 색상 오버라이드
- 📋 Markdown / HTML / URL 원클릭 복사
- 📥 PNG / SVG 다운로드
- ⚡ Vercel 서버리스 — URL 하나로 동작
- 📱 반응형 웹 UI
- 🔄 클라이언트 캐싱 (5분 TTL)

## Tech Stack

| 영역 | 기술 |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS v4 |
| Image Generation | Satori, @resvg/resvg-wasm |
| API | Vercel Serverless Functions |
| Data | GitHub REST API |
| Font | Pretendard (woff) |
| Deploy | Vercel |

## Project Structure

```text
github-repo-card/
├── api/
│   ├── _lib/
│   │   ├── cardBuilder.js    # Satori 카드 마크업 빌더
│   │   ├── format.js         # 숫자 포맷, 이모지 제거
│   │   ├── github.js         # GitHub API 클라이언트
│   │   └── themes.js         # 테마 상수
│   └── card.js               # 서버리스 엔드포인트
├── src/
│   ├── components/
│   │   ├── CardPreview.jsx    # 카드 미리보기 + 다운로드
│   │   ├── ErrorMessage.jsx   # 에러 표시
│   │   ├── Header.jsx         # 헤더
│   │   ├── LoadingSkeleton.jsx# 로딩 스켈레톤
│   │   ├── MarkdownCopy.jsx   # 마크다운/HTML/URL 복사
│   │   ├── RepoCard.jsx       # 카드 React 컴포넌트
│   │   ├── RepoInput.jsx      # 입력 폼
│   │   └── ThemeSelector.jsx  # 테마 선택
│   ├── hooks/
│   │   └── useCopyToClipboard.js
│   ├── lib/
│   │   ├── cache.js           # 클라이언트 메모리 캐시
│   │   ├── cardTemplate.js    # Satori 마크업 (프론트용)
│   │   ├── download.js        # 파일 다운로드 유틸
│   │   ├── font.js            # 폰트 로더 (Satori용)
│   │   ├── format.js          # 숫자 포맷, 이모지 제거
│   │   ├── github.js          # GitHub API 클라이언트
│   │   ├── render.js          # Satori → SVG → PNG 렌더
│   │   └── themes.js          # 테마 상수
│   ├── styles/
│   │   └── global.css         # 글로벌 스타일
│   ├── App.jsx
│   └── main.jsx
├── vercel.json
├── vite.config.js
├── package.json
└── README.md
```

## Getting Started

### 로컬 개발

```bash
# 의존성 설치
npm install

# 프론트엔드 개발 서버
npm run dev

# Vercel 서버리스 로컬 실행
vercel dev
```

### 환경 변수

| 변수 | 설명 | 필수 |
| --- | --- | --- |
| `GITHUB_TOKEN` | GitHub Personal Access Token (rate limit 대응) | 선택 |

## License

MIT
