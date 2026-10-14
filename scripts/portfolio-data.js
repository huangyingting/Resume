/**
 * Distilled Visual-First Data for Yingting Huang's Kinetic Resume Showcase
 * Zero paragraphs — scannable in seconds.
 */

window.RESUME_PORTFOLIO_DATA = {
  hero: {
    signal: {
      en: "MICROSOFT · SHANGHAI · 2026 HACKATHON JUDGE",
      zh: "微软中国 · 上海 · 2026 全球黑客松官方评委"
    },
    tagline: {
      en: "Senior Cloud Solution Architect · <strong>“Doers, not talkers.”</strong>",
      zh: "微软资深云解决方案架构师 · <strong>“实干笃行，用代码与架构说话”</strong>"
    },
    essences: [
      {
        icon: "01 · AUTHORITY",
        title: { en: "Triple-Expert Architect", zh: "3× 微软顶级专家认证" },
        sub: { en: "Solutions · Cyber (SC-100) · DevOps", zh: "架构 · 网络安全 · DevOps 大满贯" }
      },
      {
        icon: "02 · BUILDER",
        title: { en: "Autonomous AI Creator", zh: "独立构建多款 AI 平台" },
        sub: { en: "UseCase Intel · FutureGrid · UniSignals", zh: "2,300+ 案例库 · 全球 AI 就业图谱" }
      },
      {
        icon: "03 · LEADER",
        title: { en: "2026 Judge & 7× MCT", zh: "黑客松评委 & 7年讲师" },
        sub: { en: "5× OpenHack Coach · Top Tech Insider", zh: "5× OpenHack 教练 · 双料内部专家" }
      }
    ]
  },

  kpis: [
    {
      num: "20+",
      label: { en: "Years in IT & Cloud", zh: "年 IT 与云架构实战" },
      sub: { en: "Consulting → Eng Lead → Microsoft CSA", zh: "技术咨询 · 研发管理 · 微软资深架构师" },
      pct: 96
    },
    {
      num: "120",
      label: { en: "Credly Verified Badges", zh: "枚 Credly 官方认证徽章" },
      sub: { en: "100% Cryptographically Verifiable", zh: "2019–2026 全量在线可验真" },
      pct: 100
    },
    {
      num: "2,300+",
      label: { en: "AI Architectures Indexed", zh: "篇企业 AI 架构案例库" },
      sub: { en: "39 Vendors · 18 Industries · Daily", zh: "39 家厂商 · 18 个行业 · 每日自动更新" },
      pct: 92
    },
    {
      num: "7×",
      label: { en: "Global Hackathon Streak", zh: "届微软全球黑客松老将" },
      sub: { en: "2026 Official Judge · 19 KQL Badges", zh: "2026 官方评委 · Kusto 侦探金星" },
      pct: 95
    }
  ],

  radar: [
    { axis: { en: "Cloud & AKS", zh: "云原生与 AKS" }, score: 99 },
    { axis: { en: "Agentic AI & MCP", zh: "AI 智能体与 MCP" }, score: 97 },
    { axis: { en: "Zero-Trust Security", zh: "零信任安全 (SC-100)" }, score: 96 },
    { axis: { en: "Data & KQL", zh: "数据智能与 KQL" }, score: 96 },
    { axis: { en: "DevOps & GitOps", zh: "DevOps 与 GitOps" }, score: 95 },
    { axis: { en: "Coaching & MCT", zh: "技术教练与讲师" }, score: 98 }
  ],

  triad: [
    {
      code: "AZ-305",
      name: { en: "Solutions Architect Expert", zh: "Azure 解决方案架构专家" },
      sub: { en: "Infra · Hybrid · Private Link", zh: "混合云 · 私有网络 · 高可用" }
    },
    {
      code: "SC-100",
      name: { en: "Cybersecurity Architect Expert", zh: "微软网络安全架构专家" },
      sub: { en: "Zero-Trust · OIDC · Entra ID", zh: "零信任 · 无密钥联邦身份" }
    },
    {
      code: "AZ-400",
      name: { en: "DevOps Engineer Expert", zh: "Azure DevOps 专家" },
      sub: { en: "GitHub Actions · Flux2 GitOps", zh: "CI/CD · 声明式容器编排" }
    }
  ],

  honors: [
    {
      icon: "🏆",
      title: { en: "Global Hackathon 2026 Judge", zh: "2026 微软全球黑客松评委" },
      meta: "The Microsoft Garage · 7× Hackathon"
    },
    {
      icon: "💎",
      title: { en: "FY26 Top Data & Tech Insider", zh: "FY26 顶级数据与技术专家" },
      meta: "MCAPS Dual Recognition · 2026"
    },
    {
      icon: "🏛️",
      title: { en: "Azure Architecture Center Expert", zh: "微软官方架构中心专家作者" },
      meta: "Reference Architecture Platinum"
    },
    {
      icon: "🕵️",
      title: { en: "Kusto Detective Gold Star", zh: "Kusto 侦探最高金星奖章" },
      meta: "19 ADX / KQL Badges · MapR Spark"
    },
    {
      icon: "🎓",
      title: { en: "7-Year Microsoft Trainer (MCT)", zh: "连续 7 年微软认证讲师" },
      meta: "2020–2026 · 5× OpenHack Coach"
    },
    {
      icon: "🛡️",
      title: { en: "Senior System Analyst (MIIT)", zh: "工信部高级系统分析师" },
      meta: "National Senior Qualification · ITIL"
    }
  ],

  shipped: [
    {
      id: "usecase",
      stat: "2,300+ AI Cases · 39 Vendors",
      name: { en: "Use Case Intelligence", zh: "Use Case Intelligence · 企业 AI 情报库" },
      hook: {
        en: "Autonomous daily pipeline indexing & scoring global enterprise AI architectures.",
        zh: "每日 4 次自动采集并结构化评分全球 39 家云与 AI 厂商的真实落地架构。"
      },
      nodes: [
        { k: "01 · INGEST", v: "39 Sitemaps" },
        { k: "02 · TRIAGE", v: "4-Stage Gate" },
        { k: "03 · AGENT", v: "6-Layer Arch" },
        { k: "04 · EDGE", v: "Astro + WASM" }
      ],
      chips: ["Agentic Pipeline", "SQLite Provenance", "Pagefind", "18 Industries"],
      liveUrl: "https://usecase.genisisiq.com",
      repoUrl: "https://github.com/vibewatch/usecase"
    },
    {
      id: "futuregrid",
      stat: "750+ Careers · 178 Economies",
      name: { en: "FutureGrid", zh: "FutureGrid · 全球 AI 职业冲击观测台" },
      hook: {
        en: "Real-world AI labor exposure atlas powered by Anthropic, Microsoft & BLS telemetry.",
        zh: "融合 Claude 实测调用、微软全球渗透率与美国劳工局薪资数据的交互图谱。"
      },
      nodes: [
        { k: "01 · AEI", v: "Claude Usage" },
        { k: "02 · AIEI", v: "147 Countries" },
        { k: "03 · BLS/O*NET", v: "750+ Jobs" },
        { k: "04 · VISUAL", v: "D3 Choropleth" }
      ],
      chips: ["Next.js 16", "D3.js 7", "Anthropic AEI", "Microsoft AIEI"],
      liveUrl: "https://futuregrid.genisisiq.com",
      repoUrl: "https://github.com/vibewatch/FutureGrid"
    },
    {
      id: "unirank",
      stat: "11 Providers · 157K+ Ranks",
      name: { en: "University Signals", zh: "University Signals · 全球高校排名共识" },
      hook: {
        en: "Bilingual higher-education observatory harmonizing 11 global ranking systems.",
        zh: "整合 QS / THE / ARWU / Nature 等 11 家权威榜单的跨源共识与学科轨迹图谱。"
      },
      nodes: [
        { k: "01 · SCRAPE", v: "11 Adapters" },
        { k: "02 · ALIGN", v: "Entity Match" },
        { k: "03 · ENCODE", v: "Tuple Schema" },
        { k: "04 · I18N", v: "EN / 中文" }
      ],
      chips: ["Node 24 TS", "Compact Tuples", "157K Subject Rows", "Bilingual"],
      liveUrl: "https://unirank.genisisiq.com",
      repoUrl: "https://github.com/vibewatch/UniRank"
    },
    {
      id: "lab",
      stat: "MS Learn + 58 Essays + Workshops",
      name: { en: "Agentic Lab & Published Architecture", zh: "智能体逆向研究 · 微软官方架构与工作坊" },
      hook: {
        en: "Published Microsoft Learn hybrid architecture, MCP/Copilot workshops & agent internals.",
        zh: "涵盖微软官方混合云参考架构、Entra ID OAuth MCP 工作坊及编码智能体逆向解构。"
      },
      nodes: [
        { k: "MS LEARN", v: "Hybrid Files" },
        { k: "WORKSHOP", v: "MCP + Entra" },
        { k: "INTERNALS", v: "Claude/Copilot" },
        { k: "JOURNAL", v: "58+ Essays" }
      ],
      chips: ["Azure Arch Center", "MCP OAuth", "Zero-Secret OIDC", "Unofficial Azure Club"],
      liveUrl: "https://blog.genisisiq.com/",
      repoUrl: "https://github.com/huangyingting/mcp-workshop"
    }
  ],

  eras: [
    {
      year: "2024 – 2026",
      role: { en: "Agentic AI & Global Judge", zh: "AI 智能体架构与全球黑客松评委" },
      org: { en: "Microsoft · Senior CSA", zh: "微软 (Microsoft) · 上海" },
      tags: ["2026 Hackathon Judge", "FY26 Top Data & Tech Insider", "MCP & Copilot Workshops", "GenisisIQ Platforms"]
    },
    {
      year: "2019 – 2023",
      role: { en: "Triple-Expert Cloud Architect", zh: "大满贯云原生与安全架构师" },
      org: { en: "Microsoft · Shanghai", zh: "微软 (Microsoft) · 上海" },
      tags: ["3× Expert (AZ-305/SC-100/AZ-400)", "5× OpenHack Coach", "Azure Arch Center Author", "Kusto Gold Star"]
    },
    {
      year: "2005 – 2019",
      role: { en: "Engineering Lead & Consultant", zh: "工程团队管理与企业技术咨询" },
      org: { en: "SeaChange & Global Tech · SH/DL", zh: "SeaChange 等跨国科技企业 · 上海/大连" },
      tags: ["MIIT Senior System Analyst", "MapR Spark Developer", "ITIL® & Prosci®", "Distributed Systems"]
    },
    {
      year: "FOUNDATION",
      role: { en: "China Univ. of Mining & Tech", zh: "中国矿业大学 (CUMT)" },
      org: { en: "Project 211 / Double First-Class", zh: "国家 211 工程 / 双一流高校" },
      tags: ["Computer Science & Eng", "Native Mandarin", "Fluent Professional English", "Shanghai, China"]
    }
  ]
};
