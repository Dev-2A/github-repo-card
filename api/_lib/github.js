const GITHUB_API = "https://api.github.com";

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

export async function fetchRepoInfo(owner, repo) {
  const headers = { Accept: "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return response.json();
}

export async function fetchRepoLanguages(owner, repo) {
  const headers = { Accept: "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `${GITHUB_API}/repos/${owner}/${repo}/languages`,
    { headers },
  );
  if (!response.ok) return {};
  return response.json();
}

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

export async function fetchRepoData(owner, repo) {
  const [info, languages] = await Promise.all([
    fetchRepoInfo(owner, repo),
    fetchRepoLanguages(owner, repo),
  ]);

  return {
    name: info.name,
    fullName: info.full_name,
    description: info.description || "No description provided.",
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
