/**
 * Structured Bilingual Portfolio, Systems Architecture, Publications, and Career Data
 * for Yingting Huang (Senior Cloud Solution Architect @ Microsoft).
 */

window.RESUME_PORTFOLIO_DATA = {
  profile: {
    nameEn: "Yingting Huang",
    nameZh: "黄颖庭",
    role: {
      en: "Senior Cloud Solution Architect",
      zh: "资深云解决方案架构师 (Senior Cloud Solution Architect)"
    },
    company: "Microsoft",
    location: {
      en: "Shanghai, China",
      zh: "中国 · 上海"
    },
    motto: {
      en: "“Doers, not talkers.” — Shipping resilient cloud & agentic systems from architecture to workbench.",
      zh: "“Doers, not talkers.” — 实干笃行，将云原生与 AI 智能体架构从蓝图落地为生产级系统。"
    },
    summary: {
      en: "Seasoned IT professional and Senior Cloud Solution Architect at Microsoft with 20+ years of experience across technical consulting, software engineering, project management, and engineering leadership. Specializes in enterprise Azure architecture, Agentic AI & MCP ecosystems, Kubernetes/DevOps modernization, zero-trust cloud security, and high-scale data intelligence — backed by 120 verified Credly credentials, 3× Microsoft Expert certifications, and 7 consecutive years as a Microsoft Certified Trainer (MCT).",
      zh: "拥有 20 余年 IT 行业实战经验的微软资深云解决方案架构师（Senior CSA），历任技术咨询、软件工程、项目管理与工程团队管理岗位。深耕企业级 Azure 云架构、AI 智能体（Agentic AI / MCP 协议）、Kubernetes 云原生与 DevOps 现代化、零信任安全架构以及大规模数据智能分析；拥有 120 项 Credly 官方认证徽章、3 项微软专家级（Expert）认证，并连续 7 年获评微软认证讲师（MCT）。"
    },
    links: {
      linkedin: "https://www.linkedin.com/in/yingting-huang-9622bb20",
      credly: "https://www.credly.com/users/yingting-huang",
      github: "https://github.com/huangyingting",
      blog: "https://blog.genisisiq.com/",
      email: "mailto:huangyingting@outlook.com"
    }
  },

  lenses: {
    all: {
      label: { en: "360° Architect Dossier", zh: "360° 全景架构档案" },
      brief: {
        en: "<strong>Executive Synthesis:</strong> 20+ years of enterprise architecture and hands-on engineering — combining 3× Microsoft Expert certifications, 120 verified credentials, published Azure Reference Architecture, and autonomous AI data platforms.",
        zh: "<strong>全景概览：</strong> 20+ 年企业级架构设计与工程交付经验 —— 集齐 3 大微软 Expert 专家认证、120 项 Credly 权威徽章、微软官方架构中心发布作品，以及多款在线运行的 AI 数据智能平台。"
      },
      tags: ["20+ Yrs IT & Cloud", "120 Credly Badges", "3× Expert Certified", "7× Global Hackathon", "Published Author"]
    },
    ai: {
      label: { en: "AI & Agentic Systems", zh: "AI 与智能体工程" },
      brief: {
        en: "<strong>AI & Agentic Focus:</strong> Architecting production multi-agent pipelines, Model Context Protocol (MCP) enterprise servers secured with Entra ID, GitHub Copilot SDLC transformation, and self-validating research harnesses.",
        zh: "<strong>AI 与智能体聚焦：</strong> 构建自验证的多智能体数据流水线、基于 Entra ID OAuth 鉴权的企业级 MCP 服务与 Azure AI Foundry 集成、GitHub Copilot 研发效能转型及智能体内核逆向研究。"
      },
      tags: ["Model Context Protocol (MCP)", "GitHub Copilot Certified", "Azure AI Engineer", "Hackathon 2026 Judge", "Agentic Pipelines"]
    },
    cloud: {
      label: { en: "Cloud & Security Architecture", zh: "云原生与零信任安全" },
      brief: {
        en: "<strong>Cloud & Security Focus:</strong> Triple Expert certified (Azure Solutions Architect, Cybersecurity Architect SC-100, DevOps Engineer AZ-400) with deep field mastery in AKS, Flux2 GitOps, Private Link hybrid networking, and secretless OIDC Workload Identity.",
        zh: "<strong>云原生与安全聚焦：</strong> 囊括解决方案架构师、网络安全架构师（SC-100）与 DevOps 专家认证，深耕 AKS 容器平台、Flux2 GitOps、混合云私网架构及无密钥 OIDC 工作负载身份认证。"
      },
      tags: ["Solutions Architect Expert", "Cybersecurity Architect (SC-100)", "DevOps Expert (AZ-400)", "AKS & GitOps", "Zero-Secret OIDC"]
    },
    data: {
      label: { en: "Data, KQL & Leadership", zh: "数据智能与技术领导力" },
      brief: {
        en: "<strong>Data & Leadership Focus:</strong> FY26 Top Data Technical Insider, Kusto Detective Agency Gold Star (19 ADX badges), 5× Microsoft OpenHack Coach, 7-year Microsoft Certified Trainer (MCT), and MIIT Senior System Analyst.",
        zh: "<strong>数据智能与技术领导力：</strong> 获评微软 FY26 Top Data Technical Insider、Kusto 侦探金星奖章（19 枚 ADX 徽章）、5 大方向微软 OpenHack 教练、连续 7 年 MCT 认证讲师及工信部高级系统分析师。"
      },
      tags: ["FY26 Top Data Insider", "Kusto Gold Star (19 Badges)", "7-Yr MCT Educator", "5× OpenHack Coach", "System Analyst"]
    }
  },

  projects: [
    {
      id: "usecase-intel",
      featured: true,
      lenses: ["ai", "data", "cloud"],
      typePill: { en: "Live AI Platform · Daily Pipeline", zh: "在线 AI 平台 · 每日自动流水线" },
      pillStyle: "azure",
      metric: "2,300+ Cases · 39 Vendors · 18 Industries",
      title: {
        en: "Customer Use Case Intelligence",
        zh: "Use Case Intelligence — 全球企业 AI 落地案例情报库"
      },
      liveUrl: "https://usecase.genisisiq.com",
      repoUrl: "https://github.com/vibewatch/usecase",
      description: {
        en: "An autonomous intelligence platform and Astro/Pagefind observatory that discovers, triages, extracts, and scores 2,300+ real-world enterprise AI customer stories across 39 cloud/AI vendors and 18 industries — decomposing each into problem, layered architecture, products, quantified ROI, and source provenance.",
        zh: "全自动企业级 AI 案例情报平台。每日自动从 39 家主流云与 AI 厂商抓取并筛选真实客户案例，现已收录 18 个行业的 2,300+ 篇实战案例，按业务痛点、分层架构（采集/计算/存储/服务/编排/治理）、量化收益与证据可信度进行结构化评分与全文检索。"
      },
      stack: ["Agentic Extraction", "Python Triage Pipeline", "SQLite Provenance Ledger", "Astro Static Edge", "Pagefind WASM Search", "GitHub Actions 4×/Day"],
      blueprint: {
        title: {
          en: "End-to-End Autonomous Evidence & Architecture Pipeline",
          zh: "端到端自主案例发现、证据溯源与分层架构提取流水线"
        },
        nodes: [
          {
            step: "01 · Discover",
            name: "Vendor Sitemaps & Feeds",
            detail: "39 cloud & AI vendor catalogs monitored 4× daily"
          },
          {
            step: "02 · Triage",
            name: "4-Stage Deterministic Gate",
            detail: "Cutoff date, AI-depth, deduplication & Wayback check"
          },
          {
            step: "03 · Extract",
            name: "Agentic Schema + Mermaid",
            detail: "6-layer architecture, data flow & source ledger"
          },
          {
            step: "04 · Score & Serve",
            name: "SQLite → Astro + Pagefind",
            detail: "Deterministic evidence confidence & sub-50ms search"
          }
        ],
        highlights: {
          en: [
            "Strict provenance ledger mapping every claim and company attribute to verifiable publisher URLs and retrieval timestamps.",
            "Deterministic scoring across Evidence Confidence (0–100%) and Customer Reference Value (0–100) before static edge deployment."
          ],
          zh: [
            "严格的证据溯源账本（Source Ledger），将每项架构组件与量化收益精确映射至原始发布源与时间戳。",
            "每次构建自动计算「证据置信度 (0–100%)」与「参考价值评分 (0–100)」，通过 Pagefind 实现毫秒级多维筛选。"
          ]
        }
      }
    },
    {
      id: "futuregrid",
      featured: false,
      lenses: ["ai", "data"],
      typePill: { en: "Workforce & AI Economics Observatory", zh: "AI 劳动力与经济影响观测台" },
      pillStyle: "emerald",
      metric: "750+ SOC Occupations · 178 Economies",
      title: {
        en: "FutureGrid — Global AI Workforce & Diffusion Atlas",
        zh: "FutureGrid — 全球 AI 职业暴露度与产业渗透全景图谱"
      },
      liveUrl: "https://futuregrid.genisisiq.com",
      repoUrl: "https://github.com/vibewatch/FutureGrid",
      description: {
        en: "Interactive macro-labor visualization platform mapping how generative AI reshapes 750+ occupations, sectors, and 178 countries using observed Claude usage (Anthropic Economic Index), BLS OEWS wages, O*NET 31.0 skills, Microsoft AI Diffusion (147 economies), IMF AIPI, and St. Louis Fed / Census BTOS adoption series.",
        zh: "基于权威实证数据的全球 AI 劳动力影响交互平台。融合 Anthropic 经济指数（Claude 真实调用暴露度）、美国劳工局 BLS 薪资就业、O*NET 31.0 技能库、微软全球 147 个经济体 GenAI 渗透率及 IMF AI 准备度指数，覆盖 750+ 职业与 178 个国家。"
      },
      stack: ["Next.js 16 / React 19", "D3.js 7 & Chart.js 4", "Anthropic AEI + Microsoft AIEI", "BLS & O*NET 31.0", "Automated axe-core A11y CI"],
      blueprint: {
        title: {
          en: "Multi-Provider Empirical Synthesis & CI Guardrail Architecture",
          zh: "多源实证数据融合与自动化质量门禁架构"
        },
        nodes: [
          {
            step: "01 · Ingest",
            name: "7 Authoritative Datasets",
            detail: "AEI, BLS, O*NET, MSFT AIEI, IMF, FRED, Census BTOS"
          },
          {
            step: "02 · Harmonize",
            name: "SOC × NAICS × ISO-3",
            detail: "Strict comparability separation & provenance registry"
          },
          {
            step: "03 · Guardrails",
            name: "73+ Vitest & CDP axe-core",
            detail: "Zero critical/serious a11y bugs & <700KB chunk budget"
          },
          {
            step: "04 · Interactive UI",
            name: "D3 Choropleth & Heatmap",
            detail: "⌘K command palette & occupation reskilling paths"
          }
        ],
        highlights: {
          en: [
            "Replaces outdated 2013 Frey-Osborne estimates with post-2023 observed AI usage and biweekly employer telemetry.",
            "Enforces automated Chrome DevTools Protocol accessibility audits and bundle-size budgets on every build."
          ],
          zh: [
            "摒弃过时的 2013 预测模型，全部采用 2023 年后的真实大模型调用特征与官方高频统计序列。",
            "内建基于 Chrome DevTools Protocol 的无障碍审计（axe-core）与包体积预算门禁。"
          ]
        }
      }
    },
    {
      id: "university-signals",
      featured: false,
      lenses: ["data", "cloud"],
      typePill: { en: "Bilingual Data Atlas · EdTech", zh: "双语高等教育数据图谱" },
      pillStyle: "violet",
      metric: "11 Ranking Providers · 157K+ Subject Rows",
      title: {
        en: "University Signals — Cross-Provider Ranking Consensus",
        zh: "University Signals — 全球 11 大高校排名共识与学科趋势分析"
      },
      liveUrl: "https://unirank.genisisiq.com",
      repoUrl: "https://github.com/vibewatch/UniRank",
      description: {
        en: "Bilingual (EN/ZH) static data-insights platform backed by a resilient Node.js/TypeScript scraping engine that harmonizes 11 global ranking providers (ARWU, QS, THE, U.S. News, CWTS Leiden, Nature Index, etc.) and 157,000+ subject placements into cross-provider consensus and historical trajectories.",
        zh: "支持中英双语的全球高等教育多源共识分析平台。底层配备高鲁棒性 Node.js/TypeScript 采集引擎，整合 ARWU、QS、THE、U.S. News、Nature Index 等 11 家权威机构及 15.7 万条学科排名记录，提供跨榜共识度、历史轨迹与科研体量对比。"
      },
      stack: ["Astro i18n (EN/ZH)", "Node 24 Native TypeScript", "Compact Tuple Encoding", "11 Provider Adapters", "Multi-Strategy Fetch Chain"],
      blueprint: {
        title: {
          en: "High-Density Static Corpus Compression & Entity Resolution",
          zh: "高密度静态语料元组压缩与跨源实体对齐架构"
        },
        nodes: [
          {
            step: "01 · Scrape",
            name: "11 Provider Adapters",
            detail: "Fallback fetch chain with manifest & license tracking"
          },
          {
            step: "02 · Resolve",
            name: "Cross-Provider Consensus",
            detail: "Entity normalization across 10+ country-coded tables"
          },
          {
            step: "03 · Compress",
            name: "Versioned Tuple Schema",
            detail: "Splits 157K subject rows into fast on-demand chunks"
          },
          {
            step: "04 · Bilingual Render",
            name: "Mirrored / & /zh/ Routes",
            detail: "Zero-runtime-lag interactive filtering & movers"
          }
        ],
        highlights: {
          en: [
            "Custom versioned compact tuple schema keeps initial page loads lightweight while exposing 157,000+ subject placements.",
            "Full English and Simplified Chinese parity with preserved query and anchor state across locale switches."
          ],
          zh: [
            "独创紧凑元组编码（Compact Tuple Schema），无需首屏加载 15.7 万行数据即可实现全量学科毫秒级下钻。",
            "完整支持中英双语路由镜像，切换语言时自动保持当前筛选条件与锚点状态。"
          ]
        }
      }
    },
    {
      id: "mcp-copilot-workshops",
      featured: false,
      lenses: ["ai", "cloud", "leadership"],
      typePill: { en: "Enterprise Workshops & Agent Security", zh: "企业级实战工作坊 · MCP 与 Copilot" },
      pillStyle: "azure",
      metric: "MCP + Entra ID OAuth + Copilot Studio",
      title: {
        en: "Model Context Protocol (MCP) & GitHub Copilot Workshops",
        zh: "MCP 协议全栈实战与 GitHub Copilot 企业级工程工作坊"
      },
      liveUrl: "https://github.com/huangyingting/mcp-workshop",
      repoUrl: "https://github.com/huangyingting/github-copilot-workshop",
      description: {
        en: "Comprehensive hands-on engineering workshops designed for enterprise architects and developers: building MCP servers/clients from scratch, securing MCP with OAuth via Microsoft Entra ID, integrating Azure API Management, AI Foundry, Azure Functions, and Copilot Studio, plus end-to-end GitHub Copilot adoption.",
        zh: "面向企业架构师与开发团队打造的实战工程课程：涵盖从零构建 MCP 客户端与服务端、使用 Microsoft Entra ID 实现 OAuth 安全加固、集成 Azure API Management / AI Foundry / Azure Functions 与 Copilot Studio，以及 GitHub Copilot 企业级治理与研发提效。"
      },
      stack: ["Model Context Protocol (MCP)", "Microsoft Entra ID OAuth", "Azure API Management", "Azure AI Foundry", "Copilot Studio", "GitHub Copilot"],
      blueprint: {
        title: {
          en: "Enterprise-Grade MCP & Agentic Integration Reference Topology",
          zh: "企业级 MCP 零信任接入与 AI Foundry 编排参考架构"
        },
        nodes: [
          {
            step: "01 · Client Host",
            name: "Copilot Studio / IDE Agent",
            detail: "MCP Client discovering tools, resources & prompts"
          },
          {
            step: "02 · Identity & Gateway",
            name: "Entra ID OAuth + APIM",
            detail: "Token validation, rate limiting & policy governance"
          },
          {
            step: "03 · MCP Compute",
            name: "Azure Functions / AKS",
            detail: "Stateless & SSE/Streamable HTTP MCP server runtime"
          },
          {
            step: "04 · Intelligence",
            name: "Azure AI Foundry",
            detail: "Model routing, grounding & enterprise data tools"
          }
        ],
        highlights: {
          en: [
            "Demonstrates production OAuth 2.0 authentication and authorization for MCP servers using Microsoft Entra ID.",
            "Paired with the GitHub Copilot Enterprise Workshop covering custom instructions, agent skills, and SDLC governance."
          ],
          zh: [
            "完整演示基于 Microsoft Entra ID 与 Azure API Management 的生产级 MCP Server OAuth 认证授权链路。",
            "配套 GitHub Copilot 企业工作坊，覆盖自定义指令、Agent Skills 安全审计及软件工程全生命周期演进。"
          ]
        }
      }
    },
    {
      id: "cloud-native-wkldid",
      featured: false,
      lenses: ["cloud", "leadership"],
      typePill: { en: "Zero-Secret Cloud Native · AKS & GitOps", zh: "零密钥云原生架构 · AKS 与 GitOps" },
      pillStyle: "emerald",
      metric: "OIDC + Workload Identity + Flux2 + Microservices",
      title: {
        en: "Zero-Secret Azure Workload Identity, Bingo Microservices & Flux2 GitOps",
        zh: "零密钥 Azure 工作负载身份、Bingo 微服务与 Flux2 GitOps 样板工程"
      },
      liveUrl: "https://github.com/huangyingting/wkldid",
      repoUrl: "https://github.com/huangyingting/bingo-microservices",
      description: {
        en: "Production-grade cloud-native reference implementations: (1) Zero-secret CI/CD & runtime security using GitHub Actions OIDC + Terraform + AKS Workload Identity to access Key Vault and Azure SQL without client secrets; (2) Bingo polyglot microservices short-URL platform; (3) Flux v2 GitOps cluster automation.",
        zh: "生产级云原生参考实现套件：(1) 基于 GitHub Actions OIDC + Terraform + AKS Workload Identity 的全程「零密钥」部署与 Key Vault / Azure SQL 安全访问；(2) Bingo 云原生微服务短链平台；(3) 基于 Flux v2 的 Kubernetes 声明式 GitOps 集群治理。"
      },
      stack: ["AKS Workload Identity", "GitHub Actions OIDC", "Terraform IaC", "Azure Key Vault & SQL", "Flux v2 GitOps", "Java / Polyglot Microservices"],
      blueprint: {
        title: {
          en: "Zero-Secret Supply Chain & Runtime Federated Identity Flow",
          zh: "供应链与运行时全链路零静态密钥（Zero-Secret）联邦身份流"
        },
        nodes: [
          {
            step: "01 · CI/CD OIDC",
            name: "GitHub Actions → Entra ID",
            detail: "Federated token provisions Terraform & ACR build"
          },
          {
            step: "02 · GitOps Sync",
            name: "Flux v2 Controller",
            detail: "Reconciles Helm releases & K8s manifests in AKS"
          },
          {
            step: "03 · Pod Token",
            name: "AKS OIDC Issuer",
            detail: "Projected service account token exchanged via MSAL"
          },
          {
            step: "04 · Data Plane",
            name: "Key Vault & Azure SQL",
            detail: "Accessed via User-Assigned Managed Identity (0 secrets)"
          }
        ],
        highlights: {
          en: [
            "Eliminates static credentials across both CI/CD pipelines (GitHub OIDC) and Kubernetes pod runtimes (AKS Workload Identity).",
            "Showcases cloud-native twelve-factor patterns, observability, and declarative Flux2 GitOps lifecycle management."
          ],
          zh: [
            "彻底消除 CI/CD 流水线与 Kubernetes Pod 运行时中的任何静态密码或连接字符串。",
            "结合 Bingo 微服务与 Flux v2 GitOps，完整呈现云原生应用现代化与基础设施即代码的最佳实践。"
          ]
        }
      }
    },
    {
      id: "agent-internals-pulse",
      featured: false,
      lenses: ["ai", "cloud"],
      typePill: { en: "Agent Harness Research & Signal Intelligence", zh: "编码智能体逆向研究与每日情报流" },
      pillStyle: "violet",
      metric: "Claude Code + Copilot CLI + AI Pulse Daily",
      title: {
        en: "Coding Agent Internals & AI Pulse Daily (GenisisIQ)",
        zh: "前沿编码智能体内核剖析与 AI 趋势速递 (GenisisIQ)"
      },
      liveUrl: "https://claude-code.genisisiq.com/",
      repoUrl: "https://github.com/vibewatch/copilot-cli-internals",
      description: {
        en: "Deep-dive architectural reverse engineering of frontier coding agents (Claude Code Internals & Copilot CLI Internals — analyzing system prompts, tool-calling loops, context compaction, and sandboxing) alongside AI Pulse Daily (genisisiq.com), an automated bilingual monitor surfacing daily signals across Reddit, X, HackerNews, and YouTube.",
        zh: "深度解构主流终端编码智能体（Claude Code Internals 与 Copilot CLI Internals，剖析系统提示词、工具调用循环、上下文压缩与安全沙箱机制），并构建中英双语「AI 趋势速递 (genisisiq.com)」，每日自动聚合 Reddit、X、HackerNews 与 YouTube 的前沿技术脉搏。"
      },
      stack: ["Agent Harness Architecture", "Context Engineering", "Tool-Use Loops", "MCP Security", "Automated Social Monitors", "Bilingual Publishing"],
      blueprint: {
        title: {
          en: "Frontier Coding Agent Harness & Telemetry Anatomy",
          zh: "前沿编码智能体执行框架（Harness）与安全边界解构"
        },
        nodes: [
          {
            step: "01 · Prompt & Context",
            name: "Layered System Instructions",
            detail: "Memory injection, repo rules & token compaction"
          },
          {
            step: "02 · Tool Loop",
            name: "Parallel Action Dispatch",
            detail: "Bash, LSP, AST search & sub-agent orchestration"
          },
          {
            step: "03 · Verification",
            name: "Self-Validating Harnesses",
            detail: "Deterministic test/lint gates & schema checks"
          },
          {
            step: "04 · Defense",
            name: "Skill & MCP Security",
            detail: "Prompt injection scanning & sandbox isolation"
          }
        ],
        highlights: {
          en: [
            "Documented how production agent harnesses coordinate sub-agents, manage context windows, and enforce deterministic verification.",
            "Complemented by published research on Agent Skills & MCP security scanning and 2026 AI coding assistant token economics."
          ],
          zh: [
            "系统性揭示生产级 Coding Agent 如何协调子智能体、管理长上下文窗口并执行确定性自验证。",
            "配套发表《Agent Skills 与 MCP 安全扫描综述》及《2026 AI 编程助手 Token 经济学对比》等深度研究。"
          ]
        }
      }
    }
  ],

  publications: {
    archCenter: {
      badge: { en: "Official Microsoft Learn Publication · Azure Architecture Center", zh: "微软官方架构中心发布作品 · Azure Architecture Center" },
      title: {
        en: "Enterprise-level cloud file share solution on Azure",
        zh: "Azure 上的企业级云文件共享混合架构方案"
      },
      url: "https://learn.microsoft.com/en-us/azure/architecture/hybrid/azure-files-private",
      summary: {
        en: "Authored and published on the official Microsoft Azure Architecture Center. This reference architecture illustrates an enterprise-level hybrid cloud file sharing solution using Azure Files, Azure File Sync, Azure Private DNS, and Azure Private Endpoint — generating infrastructure cost savings while preserving strict private network data control.",
        zh: "发表于微软官方 Azure Architecture Center（获颁 Reference Architecture Platinum 与 Azure Architecture Center Expert 徽章）。该参考架构设计了结合 Azure Files、Azure File Sync、Azure Private DNS 与 Azure Private Endpoint 的企业级混合云文件共享方案，在确保全私网安全合规的前提下显著降低存储基础设施运维成本。"
      },
      zones: [
        {
          tag: "On-Premises Branch",
          title: "Windows Server + File Sync",
          sub: "Local AD DS + Cloud Tiering Cache"
        },
        {
          tag: "Hybrid Private Link",
          title: "ExpressRoute / VPN + DNS",
          sub: "Conditional Forwarder → Private DNS"
        },
        {
          tag: "Azure Virtual Network",
          title: "Private Endpoint + Azure Files",
          sub: "SMB 3.1.1 over Kerberos / Entra ID"
        }
      ]
    },
    blog: {
      title: { en: "Unofficial Azure Club — Selected Field Notes (58+ Articles Since 2018)", zh: "Unofficial Azure Club — 独立技术专栏精选（2018 至今已发表 58+ 篇深度文章）" },
      url: "https://blog.genisisiq.com/",
      articles: [
        {
          date: "2026-05-15",
          desk: "AI Economics",
          title: "AI Coding Assistant Pricing in 2026: The End of the Flat-Fee Era",
          url: "https://blog.genisisiq.com/ai-coding-assistant-pricing-comparison/"
        },
        {
          date: "2026-05-12",
          desk: "Agent Security",
          title: "Agent Skills and MCP Security: A Survey of Scanning and Defenses",
          url: "https://blog.genisisiq.com/agent-skills-and-mcp-security-survey/"
        },
        {
          date: "2026-05-08",
          desk: "Harness Engineering",
          title: "Harness Engineering: Shipping a Self-Validating Research Pipeline With Coding Agents",
          url: "https://blog.genisisiq.com/harness-engineering-self-validating-research-pipeline/"
        },
        {
          date: "2025-11-23",
          desk: "Cloud Networking",
          title: "Mapping Azure’s Backbone with a 24-Hour iperf3 Marathon",
          url: "https://blog.genisisiq.com/mapping-azure-backbone-with-a-24-hour-iperf3-marathon/"
        },
        {
          date: "2025-05-14",
          desk: "Agentic Systems",
          title: "Automated Prompt Optimization in DSPy: Mechanisms, Algorithms, and Observability",
          url: "https://blog.genisisiq.com/automated-prompt-optimization-in-dspy-mechanisms-algorithms-and-observability/"
        },
        {
          date: "2025-05-11",
          desk: "Agentic Systems",
          title: "ReAct Agents: Building From Scratch — Native Function Calling vs. Custom TAO Parsing",
          url: "https://blog.genisisiq.com/react-agents-building-from-scratch-native-function-calling-vs-custom-tao-parsing/"
        },
        {
          date: "2023-08-22",
          desk: "AKS & GenAI",
          title: "Cost-Effective Private Large Language Model Inference on Azure Kubernetes Service",
          url: "https://blog.genisisiq.com/cost-effective-private-large-language-model-inference-on-azure-kubernetes-service/"
        }
      ]
    }
  },

  career: [
    {
      period: "2019 – Present",
      role: {
        en: "Senior Cloud Solution Architect & Technical Leader",
        zh: "资深云解决方案架构师 (Senior Cloud Solution Architect)"
      },
      org: {
        en: "Microsoft · Shanghai, China (Multiple Progressive Roles)",
        zh: "微软 (Microsoft) · 中国上海（历任多个高级架构与专家技术岗位）"
      },
      bullets: {
        en: [
          "Lead enterprise cloud architecture, AI agent modernization (MCP, Azure AI Foundry, GitHub Copilot), Kubernetes/AKS, and zero-trust security engagements for strategic customers.",
          "Appointed Microsoft Global Hackathon 2026 Judge and 7-time Global Hackathon innovator (2020–2026, including 2023 Hack Advisor).",
          "Recognized as FY26 Top Technical Insider, FY26 Top Data Technical Insider, Enhanced Solutions Champion, CSU Pace Setter, and Excellence Award Diamond recipient.",
          "Served as Certified Coach across 5 Microsoft OpenHack tracks (Containers, Serverless, Security/Compliance/Identity, AI Knowledge Mining, Workload Migration) and 7-year Microsoft Certified Trainer (MCT 2020–2026)."
        ],
        zh: [
          "主导大型企业级 Azure 云原生架构设计、AI 智能体落地（MCP 协议、Azure AI Foundry、GitHub Copilot 研发转型）、AKS 容器化及零信任安全架构咨询。",
          "受邀担任微软全球黑客松评委（Microsoft Global Hackathon 2026 Judge），连续 7 年参与微软全球黑客松创新（含 2023 Hack Advisor）。",
          "荣获 FY26 Top Technical Insider、FY26 Top Data Technical Insider、Enhanced Solutions Champion、CSU Pace Setters 及 Excellence Award Diamond 等多项内部最高技术荣誉。",
          "担任 5 大技术方向微软 OpenHack 官方教练（容器、Serverless、安全合规、AI 知识挖掘、云迁移），并连续 7 年蝉联微软认证讲师（MCT 2020–2026）。"
        ]
      }
    },
    {
      period: "Prior Career (20+ Yrs Total IT Tenure)",
      role: {
        en: "Engineering Leadership, Technical Consulting & Senior Software Architecture",
        zh: "工程团队管理、技术咨询顾问与高级软件系统架构"
      },
      org: {
        en: "SeaChange International & Global Technology Enterprises · Shanghai & Dalian, China",
        zh: "SeaChange International 及大型跨国科技与咨询企业 · 上海 / 大连"
      },
      bullets: {
        en: [
          "Over two decades of progressive technical leadership spanning software engineering, distributed systems architecture, project management, and enterprise technical consulting.",
          "Earned Senior National System Analyst qualification (MIIT China / 工信部高级系统分析师), MapR Certified Apache Spark Developer (MCSD), ITIL® Foundation, and Prosci® Change Management certifications.",
          "Built a career-long track record of bridging executive digital transformation strategy with hands-on distributed systems engineering."
        ],
        zh: [
          "超过 20 年 IT 行业深厚积淀，完整经历核心软件研发、分布式系统架构、大型项目管理、工程团队负责人及企业级技术咨询顾问等角色。",
          "取得国家工信部软考高级「系统分析师」资格、MapR 认证 Apache Spark 开发者、ITIL® Foundation 服务管理及 Prosci® 变革管理认证。",
          "始终坚持「架构即代码、实干胜于空谈」的工程哲学，贯通企业高管数字化战略与一线复杂分布式系统排障。"
        ]
      }
    }
  ],

  educationAndHonors: {
    education: {
      school: {
        en: "China University of Mining and Technology (CUMT)",
        zh: "中国矿业大学 (China University of Mining and Technology)"
      },
      detail: {
        en: "National Key University (Project 211 / Double First-Class Discipline University) · Engineering & Computer Science Foundation",
        zh: "国家“211工程” / “双一流”建设高校 · 工学与计算机科学背景"
      }
    },
    languages: [
      {
        name: { en: "Chinese (Mandarin)", zh: "中文（普通话）" },
        level: { en: "Native / Bilingual Proficiency", zh: "母语 / 双语精通" }
      },
      {
        name: { en: "English", zh: "英语 (English)" },
        level: { en: "Full Professional Working Proficiency", zh: "流利专业工作语言（全英文授课与跨国架构咨询）" }
      }
    ],
    pillars: [
      {
        kicker: "Expert Triad",
        title: { en: "3× Microsoft Expert Certified", zh: "3× 微软 Expert 专家级认证" },
        desc: {
          en: "Azure Solutions Architect Expert (AZ-305/303/301/300), Cybersecurity Architect Expert (SC-100), and DevOps Engineer Expert (AZ-400).",
          zh: "同时持有 Azure 解决方案架构师专家、网络安全架构师专家 (SC-100) 与 DevOps 工程师专家 (AZ-400) 三大顶级认证。"
        }
      },
      {
        kicker: "Educator & Coach",
        title: { en: "7× MCT & 5× OpenHack Coach", zh: "连续 7 年 MCT 讲师 & 5× OpenHack 教练" },
        desc: {
          en: "Sustained instructional excellence from 2020 to 2026, coaching global engineering teams across Containers, Serverless, Security, AI, and Migration.",
          zh: "2020–2026 连续七年获评微软认证讲师，并在容器、无服务器、安全、AI 知识挖掘与迁移五大 OpenHack 实战营担任教练。"
        }
      },
      {
        kicker: "Data & KQL Mastery",
        title: { en: "Kusto Gold Star & Top Data Insider", zh: "Kusto 侦探金星 & FY26 顶级数据专家" },
        desc: {
          en: "19 verified Azure Data Explorer / Kusto Detective Agency badges culminating in the Gold Star & Special Detective Agent II rank, plus MapR Spark certification.",
          zh: "斩获 19 枚 Azure Data Explorer / KQL 侦探徽章（含最高荣誉 Gold Star）及 FY26 Top Data Technical Insider 称号。"
        }
      }
    ]
  }
};
