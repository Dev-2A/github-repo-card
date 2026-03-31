const GITHUB_API = "https://api.github.com";

/**
 * GitHub 레포 정보를 가져온다.
 * @param {string} owner - GitHub 유저명
 * @param {string} repo - 레포지토리 이름
 * @returns {Promise<object>} 레포 정보
 */
export async function fetchRepoInfo(owner, repo) {
  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`레포지토리를 찾을 수 없습니다: ${owner}/${repo}`);
    }
    if (response.status === 403) {
      throw new Error(
        "GitHub API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.",
      );
    }
    throw new Error(`GitHub API 오류: ${response.status}`);
  }

  return response.json();
}

/**
 * GitHub 레포의 언어 비율을 가져온다.
 * @param {string} owner - GitHub 유저명
 * @param {string} repo - 레포지토리 이름
 * @returns {Promise<object>} { JavaScript: 45000, Python: 30000, ... }
 */
export async function fetchRepoLanguages(owner, repo) {
  const response = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/languages`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!response.ok) {
    return {};
  }

  return response.json();
}

/**
 * 언어 바이트 데이터를 퍼센트로 변환한다.
 * @param {object} languages - { JavaScript: 45000, Python: 30000, ... }
 * @returns {Array<{name: string, percent: number, color: string}>}
 */
export function calculateLanguagePercents(languages) {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  if (total === 0) return [];

  return Object.entries(languages)
    .map(([name, bytes]) => ({
      name,
      percent: Math.round((bytes / total) * 1000) / 10,
      color: LANGUAGE_COLORS[name] || "#8b949e",
    }))
    .sort((a, b) => b.percent - a.percent);
}

/**
 * owner/repo 문자열을 파싱한다.
 * @param {string} input - "Dev-2A/bookshelf-log" 형태
 * @returns {{ owner: string, repo: string } | null}
 */
export function parseRepoInput(input) {
  const trimmed = input.trim();

  // URL 형태: https://github.com/owner/repo
  const urlMatch = trimmed.match(/github\.com\/([^/]+)\/([^/\s]+)/);
  if (urlMatch) {
    return { owner: urlMatch[1], repo: urlMatch[2].replace(/\.git$/, "") };
  }

  // owner/repo 형태
  const slashMatch = trimmed.match(/^([^/\s]+)\/([^/\s]+)$/);
  if (slashMatch) {
    return { owner: slashMatch[1], repo: slashMatch[2] };
  }

  return null;
}

/**
 * 레포 정보 + 언어 비율을 한 번에 가져온다.
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<object>}
 */
export async function fetchRepoData(owner, repo) {
  const [info, languages] = await Promise.all([
    fetchRepoInfo(owner, repo),
    fetchRepoLanguages(owner, repo),
  ]);

  return {
    name: info.name,
    fullName: info.full_name,
    description: info.description || "설명이 없습니다.",
    stars: info.stargazers_count,
    forks: info.forks_count,
    watchers: info.watchers_count,
    openIssues: info.open_issues_count,
    language: info.language,
    license: info.license?.spdx_id || null,
    homepage: info.homepage || null,
    owner: {
      login: info.owner.login,
      avatarUrl: info.owner.avatar_url,
    },
    languages: calculateLanguagePercents(languages),
    updatedAt: info.updated_at,
    createdAt: info.created_at,
  };
}

/**
 * GitHub 언어별 공식 색상 맵
 */
const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00add8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4f5d95",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Dart: "#00b4ab",
  HTML: "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Shell: "#89e051",
  Lua: "#000080",
  R: "#198ce7",
  Jupyter: "#da5b0b",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dockerfile: "#384d54",
  Makefile: "#427819",
  MDX: "#fcb32c",
};
