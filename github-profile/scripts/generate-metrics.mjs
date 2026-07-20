import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const username = process.env.PROFILE_USERNAME || process.env.GITHUB_REPOSITORY_OWNER || 'DouglasZu';
const outputPath = process.env.METRICS_OUTPUT || 'assets/metrics.svg';
const fixturePath = process.env.METRICS_FIXTURE;

const query = `
  query ProfileMetrics($login: String!) {
    user(login: $login) {
      followers { totalCount }
      repositories(
        first: 100
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: UPDATED_AT, direction: DESC }
      ) {
        totalCount
        nodes {
          stargazerCount
          languages(first: 8, orderBy: { field: SIZE, direction: DESC }) {
            edges { size node { name color } }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { contributionCount date weekday }
          }
        }
      }
    }
  }
`;

async function loadProfile() {
  if (fixturePath) {
    const fixture = JSON.parse(await readFile(fixturePath, 'utf8'));
    return fixture.data?.user || fixture.user;
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN is required unless METRICS_FIXTURE is set.');

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
      'user-agent': 'DouglasZu-profile-metrics',
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  });

  if (!response.ok) throw new Error(`GitHub GraphQL request failed: ${response.status} ${response.statusText}`);
  const payload = await response.json();
  if (payload.errors?.length) throw new Error(payload.errors.map(({ message }) => message).join('; '));
  if (!payload.data?.user) throw new Error(`GitHub user “${username}” was not found.`);
  return payload.data.user;
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US', { notation: value >= 10_000 ? 'compact' : 'standard' }).format(value || 0);
}

function languageSummary(repositories) {
  const sizes = new Map();
  const colors = new Map();

  for (const repository of repositories.nodes || []) {
    for (const edge of repository.languages?.edges || []) {
      sizes.set(edge.node.name, (sizes.get(edge.node.name) || 0) + edge.size);
      if (edge.node.color) colors.set(edge.node.name, edge.node.color);
    }
  }

  const total = [...sizes.values()].reduce((sum, value) => sum + value, 0);
  return [...sizes.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, size]) => ({ name, ratio: total ? size / total : 0, color: colors.get(name) || '#818cf8' }));
}

function metricCard(x, label, value, accent) {
  return `
    <g transform="translate(${x} 96)">
      <rect width="168" height="86" rx="14" class="card" />
      <circle cx="24" cy="25" r="5" fill="${accent}" />
      <text x="38" y="30" class="metric-label">${escapeXml(label)}</text>
      <text x="22" y="66" class="metric-value">${escapeXml(value)}</text>
    </g>`;
}

function heatmap(weeks) {
  const visible = (weeks || []).slice(-18);
  const values = visible.flatMap((week) => week.contributionDays.map((day) => day.contributionCount));
  const max = Math.max(1, ...values);
  const cells = [];

  visible.forEach((week, weekIndex) => {
    week.contributionDays.forEach((day) => {
      const level = day.contributionCount === 0 ? 0 : Math.max(1, Math.ceil((day.contributionCount / max) * 4));
      cells.push(`<rect x="${weekIndex * 17}" y="${day.weekday * 17}" width="12" height="12" rx="3" class="heat-${level}"><title>${escapeXml(day.date)}: ${day.contributionCount} contributions</title></rect>`);
    });
  });

  return cells.join('');
}

function render(profile) {
  const contributions = profile.contributionsCollection;
  const repositories = profile.repositories;
  const stars = (repositories.nodes || []).reduce((sum, repository) => sum + repository.stargazerCount, 0);
  const languages = languageSummary(repositories);
  const languageRows = languages.length
    ? languages.map((language, index) => {
        const y = 48 + index * 34;
        const width = Math.max(4, Math.round(language.ratio * 290));
        return `
          <g transform="translate(0 ${y})">
            <circle cx="6" cy="-5" r="5" fill="${escapeXml(language.color)}" />
            <text x="20" class="language">${escapeXml(language.name)}</text>
            <rect x="130" y="-14" width="290" height="8" rx="4" class="bar-bg" />
            <rect x="130" y="-14" width="${width}" height="8" rx="4" fill="${escapeXml(language.color)}" />
            <text x="432" class="language-value">${Math.round(language.ratio * 100)}%</text>
          </g>`;
      }).join('')
    : '<text x="0" y="64" class="copy">Language data will appear after public source repositories are available.</text>';

  const generatedOn = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date());
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="480" viewBox="0 0 1200 480" role="img" aria-labelledby="title description">
  <title id="title">${escapeXml(username)} public GitHub engineering signals</title>
  <desc id="description">${formatNumber(contributions.contributionCalendar.totalContributions)} contributions, ${formatNumber(repositories.totalCount)} public repositories, ${formatNumber(contributions.totalPullRequestContributions)} pull requests, ${formatNumber(contributions.totalIssueContributions)} issues, ${formatNumber(stars)} stars and ${formatNumber(profile.followers.totalCount)} followers.</desc>
  <style>
    .background{fill:#f8fafc;stroke:#cbd5e1}.card{fill:#fff;stroke:#e2e8f0}.eyebrow{fill:#6366f1;font:600 13px ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:1.5px}.heading{fill:#0f172a;font:700 24px system-ui,-apple-system,Segoe UI,sans-serif}.copy,.metric-label,.language-value{fill:#64748b;font:400 13px system-ui,-apple-system,Segoe UI,sans-serif}.metric-value{fill:#0f172a;font:700 27px system-ui,-apple-system,Segoe UI,sans-serif}.section{fill:#334155;font:600 14px ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:1px}.language{fill:#334155;font:600 14px system-ui,-apple-system,Segoe UI,sans-serif}.bar-bg{fill:#e2e8f0}.heat-0{fill:#e2e8f0}.heat-1{fill:#c7d2fe}.heat-2{fill:#a5b4fc}.heat-3{fill:#818cf8}.heat-4{fill:#6366f1}
    @media(prefers-color-scheme:dark){.background{fill:#0d1117;stroke:#30363d}.card{fill:#161b22;stroke:#30363d}.eyebrow{fill:#a5b4fc}.heading,.metric-value{fill:#f0f6fc}.copy,.metric-label,.language-value{fill:#8b949e}.section,.language{fill:#c9d1d9}.bar-bg,.heat-0{fill:#21262d}.heat-1{fill:#312e81}.heat-2{fill:#4338ca}.heat-3{fill:#6366f1}.heat-4{fill:#a5b4fc}}
  </style>
  <rect x="1" y="1" width="1198" height="478" rx="22" class="background" />
  <g transform="translate(52 46)">
    <text class="eyebrow">PUBLIC GITHUB SIGNALS</text>
    <text y="36" class="heading">Evidence that updates with the work</text>
    <text x="1096" y="2" text-anchor="end" class="copy">Updated ${escapeXml(generatedOn)} · UTC</text>
    ${metricCard(0, 'CONTRIBUTIONS', formatNumber(contributions.contributionCalendar.totalContributions), '#22d3ee')}
    ${metricCard(184, 'REPOSITORIES', formatNumber(repositories.totalCount), '#38bdf8')}
    ${metricCard(368, 'PULL REQUESTS', formatNumber(contributions.totalPullRequestContributions), '#818cf8')}
    ${metricCard(552, 'ISSUES', formatNumber(contributions.totalIssueContributions), '#8b5cf6')}
    ${metricCard(736, 'STARS', formatNumber(stars), '#a855f7')}
    ${metricCard(920, 'FOLLOWERS', formatNumber(profile.followers.totalCount), '#c084fc')}
    <g transform="translate(0 236)">
      <text class="section">LANGUAGES IN PUBLIC REPOSITORIES</text>
      ${languageRows}
    </g>
    <g transform="translate(748 236)">
      <text class="section">RECENT CONTRIBUTION RHYTHM</text>
      <g transform="translate(0 35)">${heatmap(contributions.contributionCalendar.weeks)}</g>
      <text y="180" class="copy">Last 18 weeks · public data available to this workflow</text>
    </g>
  </g>
</svg>`;
}

const profile = await loadProfile();
const svg = render(profile);
await writeFile(path.resolve(outputPath), `${svg}\n`, 'utf8');
console.log(`Updated ${outputPath} for ${username}.`);
