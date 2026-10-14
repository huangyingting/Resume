#!/usr/bin/env node
/**
 * Builds the normalized credential dataset (`data/credentials.json` and `scripts/credentials-data.js`)
 * from Credly's public badges API (`https://www.credly.com/users/yingting-huang/badges.json`)
 * plus additional non-Credly certifications listed on LinkedIn.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

async function loadRawCredlyBadges() {
  const cachedPath = '/tmp/all_credly_badges.json';
  if (fs.existsSync(cachedPath) && !process.argv.includes('--fetch')) {
    return JSON.parse(fs.readFileSync(cachedPath, 'utf8'));
  }
  const all = [];
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(`https://www.credly.com/users/yingting-huang/badges.json?page=${page}`, {
      headers: { Accept: 'application/json', 'User-Agent': 'Mozilla/5.0' }
    });
    if (!res.ok) break;
    const payload = await res.json();
    const data = payload.data || [];
    if (!data.length) break;
    all.push(...data);
    if (all.length >= (payload.metadata?.total_count || 0)) break;
  }
  return all;
}

function classifyBadge(b) {
  const bt = b.badge_template || {};
  const name = (bt.name || '').trim();
  const issuer = b.issuer?.entities?.[0]?.entity?.name || 'Microsoft';
  const lower = `${name} ${issuer}`.toLowerCase();

  // Category classification
  let category = 'leadership_community';
  if (
    lower.includes('microsoft certified:') ||
    lower.includes('az-') ||
    lower.includes('dp-') ||
    lower.includes('sc-') ||
    lower.includes('github ') ||
    lower.includes('gitops') ||
    lower.includes('prosci')
  ) {
    category = 'certifications';
  } else if (
    lower.includes('certified trainer') ||
    lower.includes('mct') ||
    lower.includes('instructor recognition') ||
    lower.includes('mentor') ||
    lower.includes('speaker')
  ) {
    category = 'teaching_mct';
  } else if (lower.includes('openhack')) {
    category = 'openhack';
  } else if (lower.includes('hackathon') || lower.includes('hack ') || lower.includes('garage') || lower.includes('challenger')) {
    category = 'hackathons';
  } else if (lower.includes('kusto') || lower.includes('detective') || lower.includes('mlads') || lower.includes('data technical insider')) {
    category = 'data_kql';
  }

  // Lens mapping: ai, cloud, data, leadership
  const lenses = new Set();
  if (
    lower.includes('ai') ||
    lower.includes('copilot') ||
    lower.includes('agent') ||
    lower.includes('knowledge mining') ||
    lower.includes('mlads') ||
    lower.includes('hackathon 2026') ||
    lower.includes('hackathon 2025') ||
    lower.includes('hackathon 2024')
  ) {
    lenses.add('ai');
  }
  if (
    lower.includes('azure') ||
    lower.includes('architect') ||
    lower.includes('security') ||
    lower.includes('cybersecurity') ||
    lower.includes('network') ||
    lower.includes('container') ||
    lower.includes('serverless') ||
    lower.includes('devops') ||
    lower.includes('github') ||
    lower.includes('gitops') ||
    lower.includes('virtual desktop') ||
    lower.includes('migrat')
  ) {
    lenses.add('cloud');
  }
  if (
    lower.includes('data') ||
    lower.includes('kusto') ||
    lower.includes('nosql') ||
    lower.includes('warehousing') ||
    lower.includes('dp-200') ||
    lower.includes('dp-201') ||
    lower.includes('mlads') ||
    lower.includes('iot')
  ) {
    lenses.add('data');
  }
  if (
    lower.includes('judge') ||
    lower.includes('coach') ||
    lower.includes('trainer') ||
    lower.includes('instructor') ||
    lower.includes('insider') ||
    lower.includes('champion') ||
    lower.includes('pace setters') ||
    lower.includes('expert - azure architecture') ||
    lower.includes('architecture center') ||
    lower.includes('reference architecture') ||
    lower.includes('excellence award') ||
    lower.includes('mentor') ||
    lower.includes('speaker') ||
    lower.includes('prosci') ||
    lower.includes('subject matter expert') ||
    lower.includes('sme') ||
    lower.includes('hack advisor')
  ) {
    lenses.add('leadership');
  }
  if (lenses.size === 0) lenses.add('cloud');

  // Badge tier / badge pill label
  let tier = bt.level || '';
  if (lower.includes('expert')) tier = 'Expert';
  else if (lower.includes('judge')) tier = 'Judge';
  else if (lower.includes('coach')) tier = 'Coach';
  else if (lower.includes('specialty')) tier = 'Specialty';
  else if (lower.includes('associate')) tier = 'Associate';
  else if (lower.includes('trainer')) tier = 'MCT';
  else if (lower.includes('gold star') || lower.includes('platinum') || lower.includes('diamond')) tier = 'Distinction';
  else if (lower.includes('insider') || lower.includes('champion') || lower.includes('pace setter')) tier = 'Recognition';

  // Flagship featured subset (curated 24 standout credentials for the default spotlight)
  const featuredNames = new Set([
    'Microsoft Global Hackathon 2026 Judge',
    'Microsoft Certified: Cybersecurity Architect Expert',
    'Microsoft Certified: Azure Solutions Architect Expert',
    'Microsoft Certified: DevOps Engineer Expert',
    'Microsoft Certified Trainer (MCT) 2026',
    'FY26 Top Data Technical Insider',
    'FY26 Top Technical Insider',
    'Enhanced Solutions Champion',
    'Expert - Azure Architecture Center',
    'GitHub Copilot',
    'GitHub Advanced Security',
    'GitHub Actions',
    'SkillUp AI: Agent Speed Skills',
    'Hack Together: AI Agents Hackathon',
    'Microsoft AI Navigator [Azure]',
    'Microsoft Certified: Azure AI Engineer Associate',
    'Microsoft Certified: Azure Data Engineer Associate',
    'Microsoft Certified: Azure Security Engineer Associate',
    'Microsoft Certified: Azure Network Engineer Associate',
    'Microsoft Certified: Azure Virtual Desktop Specialty',
    'Kusto Detective Gold Star!',
    'Reference Architecture Platinum',
    'Excellence Award Diamond',
    'OpenHack: Containers Coach',
    'OpenHack: AI-Powered Knowledge Mining Coach',
    'GitOps Fundamentals'
  ]);

  return {
    id: b.id,
    name,
    issuedAt: b.issued_at_date || '',
    year: (b.issued_at_date || '').slice(0, 4) || '2020',
    issuer,
    category,
    lenses: Array.from(lenses),
    tier: tier || 'Verified',
    featured: featuredNames.has(name),
    imageUrl: b.image_url || bt.image_url || '',
    verifyUrl: `https://www.credly.com/badges/${b.id}`,
    description: (bt.description || '').trim(),
    skills: (bt.skills || []).map((s) => s.name).filter(Boolean),
    source: 'Credly'
  };
}

async function main() {
  const raw = await loadRawCredlyBadges();
  raw.sort((a, b) => (b.issued_at_date || '').localeCompare(a.issued_at_date || ''));

  // Deduplicate exact badge_template+datefeatured if multiple identical name+year exist while keeping all 120 in the full list
  const seenFeaturedNames = new Set();
  const normalized = raw.map((b) => {
    const item = classifyBadge(b);
    if (item.featured) {
      if (seenFeaturedNames.has(item.name)) {
        item.featured = false;
      } else {
        seenFeaturedNames.add(item.name);
      }
    }
    return item;
  });

  // Additional LinkedIn non-Credly certifications
  const linkedInExtras = [
    {
      id: 'linkedin-mapr-spark',
      name: 'MapR Certified Spark Developer',
      issuedAt: 'LinkedIn Verified',
      year: 'LinkedIn',
      issuer: 'MapR Technologies',
      category: 'certifications',
      lenses: ['data', 'cloud'],
      tier: 'Certified',
      featured: true,
      imageUrl: '',
      verifyUrl: 'https://verify.skilljar.com/c/stksr8puzhn4',
      description: 'Verified Apache Spark Developer certification listed on LinkedIn and issued by MapR Technologies, demonstrating distributed data processing and Spark engineering proficiency.',
      skills: ['Apache Spark', 'Big Data', 'Distributed Systems', 'Data Engineering'],
      source: 'Skilljar / LinkedIn'
    },
    {
      id: 'linkedin-miit-system-analyst',
      name: 'System Analyst (系统分析师)',
      issuedAt: 'LinkedIn Verified',
      year: 'LinkedIn',
      issuer: 'Ministry of Industry and Information Technology',
      category: 'certifications',
      lenses: ['cloud', 'leadership'],
      tier: 'National Cert',
      featured: true,
      imageUrl: '',
      verifyUrl: 'https://www.linkedin.com/in/yingting-huang-9622bb20',
      description: 'National computer technology and software professional qualification (系统分析师 / System Analyst) certified by the Ministry of Industry and Information Technology (MIIT).',
      skills: ['Systems Analysis', 'Enterprise Architecture', 'Software Engineering', 'Technical Consulting'],
      source: 'MIIT / LinkedIn'
    },
    {
      id: 'linkedin-itil-foundation',
      name: 'ITIL® Foundation',
      issuedAt: 'LinkedIn Verified',
      year: 'LinkedIn',
      issuer: 'Pearson VUE',
      category: 'certifications',
      lenses: ['cloud', 'leadership'],
      tier: 'Certified',
      featured: false,
      imageUrl: '',
      verifyUrl: 'https://www.linkedin.com/in/yingting-huang-9622bb20',
      description: 'ITIL® Foundation certification in IT Service Management issued by Pearson VUE.',
      skills: ['ITIL', 'IT Service Management', 'Enterprise Operations', 'Governance'],
      source: 'Pearson VUE / LinkedIn'
    }
  ];

  const allCredentials = [...normalized, ...linkedInExtras];

  // Aggregate telemetry stats
  const byCategory = {};
  const byYear = {};
  const skillCounts = {};

  for (const c of allCredentials) {
    byCategory[c.category] = (byCategory[c.category] || 0) + 1;
    if (c.source === 'Credly') {
      byYear[c.year] = (byYear[c.year] || 0) + 1;
    }
    for (const s of c.skills) {
      skillCounts[s] = (skillCounts[s] || 0) + 1;
    }
  }

  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 36)
    .map(([name, count]) => ({ name, count }));

  const output = {
    meta: {
      earner: 'Yingting Huang',
      credlyProfile: 'https://www.credly.com/users/yingting-huang',
      linkedinProfile: 'https://www.linkedin.com/in/yingting-huang-9622bb20',
      credlyCount: normalized.length,
      totalCount: allCredentials.length,
      generatedAt: new Date().toISOString()
    },
    stats: {
      byCategory,
      byYear,
      topSkills
    },
    credentials: allCredentials
  };

  fs.writeFileSync(path.join(ROOT, 'data/credentials.json'), JSON.stringify(output, null, 2));
  fs.writeFileSync(
    path.join(ROOT, 'scripts/credentials-data.js'),
    `window.RESUME_CREDENTIALS_DATA = ${JSON.stringify(output)};\n`
  );

  console.log(`Generated ${allCredentials.length} credentials (${normalized.length} Credly + ${linkedInExtras.length} LinkedIn).`);
  console.log('Categories:', byCategory);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
