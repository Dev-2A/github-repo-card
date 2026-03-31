# 🃏 GitHub Repo Card Generator

GitHub 유저명/레포를 입력하면 스타 수, 언어 비율, 설명이 담긴 카드 이미지를 자동 생성합니다.  
Vercel 서버리스로 배포되어, URL 하나면 누구나 README에 삽입할 수 있습니다.

## Usage

```markdown
![My Repo Card](https://github-repo-card.vercel.app/api/card?repo=Dev-2A/bookshelf-log)
```

## Features

- 🔍 GitHub API로 레포 정보 자동 수집 (스타, 포크, 언어 비율, 설명)
- 🎨 Satori 기반 카드 이미지 동적 생성 (PNG)
- 🌗 다크/라이트/GitHub 스타일 테마 지원
- 📋 마크다운 삽입 코드 원클릭 복사
- ⚡ Vercel 서버리스 — URL 하나로 동작

## Tech Stack

- React + Vite (프론트엔드)
- Satori + @resvg/resvg-wasm (SVG → PNG 변환)
- Vercel Serverless Functions (API)
- GitHub REST API

## Getting Started

> 추후 작성 예정

## License

MIT
