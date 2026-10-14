/**
 * Interactive Controller for Yingting Huang's Architect Dossier & Credential Explorer
 * Zero modal dialogs — 100% inline progressive disclosure.
 */

(function () {
  const portfolio = window.RESUME_PORTFOLIO_DATA;
  const credData = window.RESUME_CREDENTIALS_DATA;

  const state = {
    lang: new URLSearchParams(window.location.search).get("lang") === "zh" ? "zh" : "en",
    theme: localStorage.getItem("yh_resume_theme") || "light",
    lens: "all",
    credCategory: "featured", // 'featured' | 'all' | 'certifications' | 'openhack' | 'data_kql' | 'leadership_community' | 'hackathons' | 'teaching_mct'
    credYear: null,
    credSkill: null,
    credQuery: "",
    expandedCredIds: new Set(),
    openBlueprints: new Set(["usecase-intel"]),
    showAllInCategory: false
  };

  const UI_STRINGS = {
    en: {
      navProjects: "Systems",
      navCredentials: "123 Credentials",
      navPublications: "Publications",
      navTrajectory: "Trajectory",
      printBtn: "Print / PDF",
      lensTitle: "Interactive Dossier Lens",
      systemsKicker: "Built & Shipped · Live Production Systems & Workshops",
      systemsTitle: "Autonomous AI Observatories & Reference Architectures",
      systemsSubtitle: "Real systems running in production — each with an inline expandable system blueprint showing its ingestion, agentic processing, governance, and static-edge delivery pipeline.",
      inspectBlueprint: "Inspect System Blueprint ▾",
      hideBlueprint: "Hide System Blueprint ▴",
      liveSite: "Live Platform ↗",
      sourceCode: "GitHub Repo ↗",
      credKicker: "Cryptographically Verifiable Track Record",
      credTitle: "123 Verified Credentials & Certifications",
      credSubtitle: "Every credential below is verified via Credly (120 badges) or LinkedIn/Skilljar (3 certifications). Click any badge card to expand its inline verification dossier.",
      domainDnaTitle: "Credential Domain DNA",
      domainDnaMeta: "123 Total Verified",
      yearlyVelocityTitle: "Credly Issuance Velocity (2019–2026)",
      yearlyVelocityMeta: "Click a year or skill to filter",
      catFeatured: "Spotlight (25)",
      catAll: "All Verified (123)",
      catCerts: "Certifications (30)",
      catOpenhack: "OpenHack (27)",
      catData: "Data & KQL (21)",
      catLeadership: "Arch & Leadership (21)",
      catHackathons: "Hackathons (14)",
      catTeaching: "MCT & Teaching (10)",
      searchPlaceholder: "Search 123 badges, skills, or codes (e.g. SC-100, Kusto, Copilot)...",
      clearFilters: "Reset Filters",
      verifyCredly: "Verify Official Credential ↗",
      showAllBtn: (count) => `Show All ${count} Matching Credentials ▾`,
      showingCount: (shown, total) => `Showing ${shown} of ${total} matching verified credentials`,
      pubKicker: "Published Architecture & Field Notes",
      pubTitle: "Reference Architecture & Technical Journal",
      pubSubtitle: "Official Microsoft Learn Reference Architecture and independent deep dives from Unofficial Azure Club (blog.genisisiq.com).",
      readMsLearn: "Read on Microsoft Learn ↗",
      exploreBlog: "Explore All 58+ Articles on Unofficial Azure Club ↗",
      careerKicker: "20+ Years of Enterprise Impact",
      careerTitle: "Career Trajectory, Education & Distinctions",
      careerSubtitle: "Two decades across technical consulting, software engineering, project management, and cloud architecture leadership.",
      careerPanelTitle: "Experience & Leadership Arc",
      eduPanelTitle: "Education, Distinctions & Languages",
      eduHeading: "Education",
      langHeading: "Languages"
    },
    zh: {
      navProjects: "代表作与系统",
      navCredentials: "123 项权威认证",
      navPublications: "架构著作与专栏",
      navTrajectory: "职业履历",
      printBtn: "打印 / 导出 PDF",
      lensTitle: "交互式档案视角切换",
      systemsKicker: "生产级作品 · 在线 AI 数据平台与实战工作坊",
      systemsTitle: "自主 AI 情报观测台与云原生参考架构",
      systemsSubtitle: "全部在线运行的生产级系统与工程样板 —— 点击任意卡片即可在页面内联展开其完整的「采集 → 智能体处理 → 治理 → 静态边缘分发」系统架构蓝图。",
      inspectBlueprint: "展开系统架构蓝图 ▾",
      hideBlueprint: "收起系统架构蓝图 ▴",
      liveSite: "访问在线平台 ↗",
      sourceCode: "GitHub 源码 ↗",
      credKicker: "全量可验证的数字徽章与资质档案",
      credTitle: "123 项官方认证与技术荣誉矩阵",
      credSubtitle: "以下全部 120 枚 Credly 徽章及 3 项专业认证均可在线验真。点击任意卡片即可在当前页面内联展开完整证书详情与核验链接。",
      domainDnaTitle: "技术认证领域分布 (Domain DNA)",
      domainDnaMeta: "共 123 项权威认证",
      yearlyVelocityTitle: "Credly 认证时间轴 (2019–2026)",
      yearlyVelocityMeta: "点击年份柱状图或技能标签即可筛选",
      catFeatured: "核心精选 (25)",
      catAll: "全部认证 (123)",
      catCerts: "专业技术认证 (30)",
      catOpenhack: "OpenHack 实战与教练 (27)",
      catData: "数据与 KQL 侦探 (21)",
      catLeadership: "架构中心与技术奖项 (21)",
      catHackathons: "全球黑客松与评委 (14)",
      catTeaching: "MCT 讲师与授课 (10)",
      searchPlaceholder: "搜索 123 项证书、技能或考试代码（如 SC-100, Kusto, Copilot）...",
      clearFilters: "重置筛选",
      verifyCredly: "前往官方页面核验证书 ↗",
      showAllBtn: (count) => `展开全部 ${count} 项匹配认证 ▾`,
      showingCount: (shown, total) => `当前显示 ${shown} / ${total} 项匹配的可验证认证`,
      pubKicker: "官方参考架构与独立技术专栏",
      pubTitle: "微软架构中心著作与技术深度文章",
      pubSubtitle: "收录发表于 Microsoft Azure Architecture Center 的企业级混合云架构，以及独立技术博客 Unofficial Azure Club 的精选实战笔记。",
      readMsLearn: "在 Microsoft Learn 阅读原文 ↗",
      exploreBlog: "访问 Unofficial Azure Club 阅读全部 58+ 篇技术文章 ↗",
      careerKicker: "20+ 年 IT 与云架构实战积淀",
      careerTitle: "职业轨迹、教育背景与核心竞争力",
      careerSubtitle: "横跨技术咨询、核心软件研发、项目管理、工程领导力与企业级云解决方案架构的二十余年演进之路。",
      careerPanelTitle: "职业发展与技术领导力轨迹",
      eduPanelTitle: "教育背景、核心支柱与工作语言",
      eduHeading: "教育经历",
      langHeading: "工作语言"
    }
  };

  function t(obj) {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] || obj.en || "";
  }

  function s(key) {
    return UI_STRINGS[state.lang][key];
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    const btn = document.getElementById("theme-toggle-btn");
    if (btn) {
      btn.textContent = state.theme === "dark" ? "☀ Light" : "☾ Dark";
    }
  }

  function renderStaticText() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    const langBtn = document.getElementById("lang-toggle-btn");
    if (langBtn) {
      langBtn.textContent = state.lang === "en" ? "中文 / EN" : "EN / 中文";
    }

    // Nav & Hero
    document.getElementById("nav-projects").textContent = s("navProjects");
    document.getElementById("nav-credentials").textContent = s("navCredentials");
    document.getElementById("nav-publications").textContent = s("navPublications");
    document.getElementById("nav-trajectory").textContent = s("navTrajectory");
    document.getElementById("print-btn").textContent = s("printBtn");

    document.getElementById("hero-role-text").textContent = t(portfolio.profile.role);
    document.getElementById("hero-loc-text").textContent = t(portfolio.profile.location);
    document.getElementById("hero-motto-text").textContent = t(portfolio.profile.motto);
    document.getElementById("hero-summary-text").textContent = t(portfolio.profile.summary);

    // Section headers
    document.getElementById("lens-bar-title").textContent = s("lensTitle");
    document.getElementById("systems-kicker").textContent = s("systemsKicker");
    document.getElementById("systems-title").textContent = s("systemsTitle");
    document.getElementById("systems-subtitle").textContent = s("systemsSubtitle");
    document.getElementById("cred-kicker").textContent = s("credKicker");
    document.getElementById("cred-title").textContent = s("credTitle");
    document.getElementById("cred-subtitle").textContent = s("credSubtitle");
    document.getElementById("domain-dna-title").textContent = s("domainDnaTitle");
    document.getElementById("domain-dna-meta").textContent = s("domainDnaMeta");
    document.getElementById("yearly-velocity-title").textContent = s("yearlyVelocityTitle");
    document.getElementById("yearly-velocity-meta").textContent = s("yearlyVelocityMeta");
    document.getElementById("cred-search-input").placeholder = s("searchPlaceholder");

    document.getElementById("pub-kicker").textContent = s("pubKicker");
    document.getElementById("pub-title").textContent = s("pubTitle");
    document.getElementById("pub-subtitle").textContent = s("pubSubtitle");

    document.getElementById("career-kicker").textContent = s("careerKicker");
    document.getElementById("career-title").textContent = s("careerTitle");
    document.getElementById("career-subtitle").textContent = s("careerSubtitle");
  }

  function renderLensBar() {
    const segWrap = document.getElementById("lens-segmented-control");
    const lensKeys = ["all", "ai", "cloud", "data"];

    segWrap.innerHTML = lensKeys
      .map((key) => {
        const lensObj = portfolio.lenses[key];
        const count =
          key === "all"
            ? credData.credentials.length
            : credData.credentials.filter((c) => c.lenses.includes(key)).length;
        return `
          <button type="button" class="segment-btn ${state.lens === key ? "is-active" : ""}" data-lens="${key}">
            <span>${escapeHtml(t(lensObj.label))}</span>
            <span class="segment-count">${count}</span>
          </button>
        `;
      })
      .join("");

    const activeLens = portfolio.lenses[state.lens];
    const briefEl = document.getElementById("lens-brief-box");
    briefEl.innerHTML = `
      <div class="lens-brief__text">${t(activeLens.brief)}</div>
      <div class="lens-brief__highlights">
        ${activeLens.tags.map((tag) => `<span class="lens-tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
    `;

    segWrap.querySelectorAll("[data-lens]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.lens = btn.getAttribute("data-lens");
        renderLensBar();
        renderProjects();
        renderCredentials();
      });
    });
  }

  function renderProjects() {
    const grid = document.getElementById("projects-grid");
    const ordered = [...portfolio.projects].sort((a, b) => {
      if (state.lens === "all") return 0;
      const aMatch = a.lenses.includes(state.lens) ? 1 : 0;
      const bMatch = b.lenses.includes(state.lens) ? 1 : 0;
      return bMatch - aMatch;
    });

    grid.innerHTML = ordered
      .map((p) => {
        const isMatch = state.lens === "all" || p.lenses.includes(state.lens);
        const isOpen = state.openBlueprints.has(p.id);
        const pillClass =
          p.pillStyle === "emerald"
            ? "project-type-pill project-type-pill--emerald"
            : p.pillStyle === "violet"
            ? "project-type-pill project-type-pill--violet"
            : "project-type-pill";

        const nodesHtml = p.blueprint.nodes
          .map(
            (n, idx) => `
            <div class="pipeline-node">
              <div class="pipeline-node__step">${escapeHtml(n.step)}</div>
              <div class="pipeline-node__name">${escapeHtml(n.name)}</div>
              <div class="pipeline-node__detail">${escapeHtml(n.detail)}</div>
            </div>
            ${idx < p.blueprint.nodes.length - 1 ? '<span class="pipeline-arrow" aria-hidden="true">→</span>' : ""}
          `
          )
          .join("");

        const highlights = t(p.blueprint.highlights) || [];

        return `
          <article class="project-card ${p.featured ? "project-card--featured" : ""} ${
          state.lens !== "all" ? (isMatch ? "is-lens-match" : "is-lens-dimmed") : ""
        }" data-project-id="${p.id}">
            <div class="project-head">
              <div>
                <div class="project-badge-row">
                  <span class="${pillClass}">${escapeHtml(t(p.typePill))}</span>
                  <span class="project-metric-pill">${escapeHtml(p.metric)}</span>
                </div>
                <h3 class="project-title">${escapeHtml(t(p.title))}</h3>
              </div>
              <div class="project-links">
                ${
                  p.liveUrl
                    ? `<a class="project-link-btn" href="${escapeHtml(p.liveUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                        s("liveSite")
                      )}</a>`
                    : ""
                }
                ${
                  p.repoUrl
                    ? `<a class="project-link-btn" href="${escapeHtml(p.repoUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                        s("sourceCode")
                      )}</a>`
                    : ""
                }
              </div>
            </div>

            <p class="project-desc">${escapeHtml(t(p.description))}</p>

            <div class="project-stack">
              ${p.stack.map((item) => `<span class="stack-chip">${escapeHtml(item)}</span>`).join("")}
            </div>

            <div class="project-footer">
              <button type="button" class="blueprint-toggle" data-blueprint-btn="${p.id}" aria-expanded="${isOpen}">
                ${escapeHtml(isOpen ? s("hideBlueprint") : s("inspectBlueprint"))}
              </button>
              <span class="panel-meta">${p.lenses.map((l) => `#${l}`).join(" · ")}</span>
            </div>

            <div class="blueprint-drawer ${isOpen ? "is-open" : ""}" id="blueprint-${p.id}">
              <h4 class="blueprint-title">${escapeHtml(t(p.blueprint.title))}</h4>
              <div class="blueprint-pipeline">${nodesHtml}</div>
              <ul class="blueprint-highlights">
                ${highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
              </ul>
            </div>
          </article>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-blueprint-btn]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-blueprint-btn");
        if (state.openBlueprints.has(id)) {
          state.openBlueprints.delete(id);
        } else {
          state.openBlueprints.add(id);
        }
        renderProjects();
      });
    });
  }

  function renderCredentialTelemetry() {
    // 1. Domain DNA Bars
    const domainLabels = {
      certifications: { en: "Certifications & Exams", zh: "专业技术认证 (Exams/Certs)" },
      openhack: { en: "OpenHack & Coaching", zh: "OpenHack 实战与教练" },
      data_kql: { en: "Data & Kusto (KQL)", zh: "数据智能与 KQL 侦探" },
      leadership_community: { en: "Arch Center & Awards", zh: "架构中心与技术领导力" },
      hackathons: { en: "Global Hackathons & Judge", zh: "全球黑客松与评委" },
      teaching_mct: { en: "MCT & Instructional Impact", zh: "MCT 认证讲师与教学" }
    };

    const byCat = credData.stats.byCategory;
    const maxCat = Math.max(...Object.values(byCat), 1);
    const domainWrap = document.getElementById("domain-bars-wrap");

    domainWrap.innerHTML = Object.keys(domainLabels)
      .map((cat) => {
        const count = byCat[cat] || 0;
        const pct = Math.round((count / maxCat) * 100);
        return `
          <div class="domain-bar-row" style="cursor:pointer" data-domain-cat="${cat}">
            <span class="domain-bar-label">${escapeHtml(t(domainLabels[cat]))}</span>
            <div class="domain-bar-track">
              <div class="domain-bar-fill" style="width:${pct}%"></div>
            </div>
            <span class="domain-bar-count">${count}</span>
          </div>
        `;
      })
      .join("");

    domainWrap.querySelectorAll("[data-domain-cat]").forEach((row) => {
      row.addEventListener("click", () => {
        const cat = row.getAttribute("data-domain-cat");
        state.credCategory = state.credCategory === cat ? "all" : cat;
        state.showAllInCategory = true;
        renderCredentialControls();
        renderCredentials();
      });
    });

    // 2. Yearly Velocity Chart (2019-2026)
    const byYear = credData.stats.byYear;
    const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
    const maxYear = Math.max(...years.map((y) => byYear[y] || 0), 1);
    const yearChart = document.getElementById("year-chart-wrap");

    yearChart.innerHTML = years
      .map((y) => {
        const count = byYear[y] || 0;
        const hPct = Math.max(Math.round((count / maxYear) * 76), 8);
        const active = state.credYear === y;
        return `
          <button type="button" class="year-col ${active ? "is-active" : ""}" data-year="${y}" title="${y}: ${count} badges">
            <span class="year-val">${count}</span>
            <div class="year-bar" style="height:${hPct}px"></div>
            <span class="year-lbl">${y.slice(2)}'</span>
          </button>
        `;
      })
      .join("");

    yearChart.querySelectorAll("[data-year]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const y = btn.getAttribute("data-year");
        state.credYear = state.credYear === y ? null : y;
        if (state.credYear && state.credCategory === "featured") {
          state.credCategory = "all";
        }
        state.showAllInCategory = true;
        renderCredentialTelemetry();
        renderCredentialControls();
        renderCredentials();
      });
    });

    // 3. Top Skills Cloud
    const topSkills = credData.stats.topSkills.slice(0, 14);
    const skillCloud = document.getElementById("skill-cloud-wrap");
    skillCloud.innerHTML = topSkills
      .map((sk) => {
        const active = state.credSkill === sk.name;
        return `
          <button type="button" class="skill-filter-chip ${active ? "is-active" : ""}" data-skill="${escapeHtml(sk.name)}">
            ${escapeHtml(sk.name)}<span>${sk.count}</span>
          </button>
        `;
      })
      .join("");

    skillCloud.querySelectorAll("[data-skill]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const sk = btn.getAttribute("data-skill");
        state.credSkill = state.credSkill === sk ? null : sk;
        if (state.credSkill && state.credCategory === "featured") {
          state.credCategory = "all";
        }
        state.showAllInCategory = true;
        renderCredentialTelemetry();
        renderCredentialControls();
        renderCredentials();
      });
    });
  }

  function renderCredentialControls() {
    const pillsWrap = document.getElementById("cred-cat-pills");
    const cats = [
      { id: "featured", label: s("catFeatured") },
      { id: "all", label: s("catAll") },
      { id: "certifications", label: s("catCerts") },
      { id: "openhack", label: s("catOpenhack") },
      { id: "data_kql", label: s("catData") },
      { id: "leadership_community", label: s("catLeadership") },
      { id: "hackathons", label: s("catHackathons") },
      { id: "teaching_mct", label: s("catTeaching") }
    ];

    pillsWrap.innerHTML = cats
      .map(
        (c) => `
        <button type="button" class="cat-pill ${state.credCategory === c.id ? "is-active" : ""}" data-cat="${c.id}">
          ${escapeHtml(c.label)}
        </button>
      `
      )
      .join("");

    pillsWrap.querySelectorAll("[data-cat]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.credCategory = btn.getAttribute("data-cat");
        state.showAllInCategory = state.credCategory !== "featured";
        renderCredentialControls();
        renderCredentials();
      });
    });
  }

  function getFilteredCredentials() {
    return credData.credentials.filter((c) => {
      if (state.credCategory === "featured" && !c.featured && !state.credQuery && !state.credYear && !state.credSkill && state.lens === "all") {
        return false;
      }
      if (
        state.credCategory !== "featured" &&
        state.credCategory !== "all" &&
        c.category !== state.credCategory
      ) {
        return false;
      }
      if (state.lens !== "all" && !c.lenses.includes(state.lens)) {
        return false;
      }
      if (state.credYear && c.year !== state.credYear) {
        return false;
      }
      if (state.credSkill && !c.skills.includes(state.credSkill)) {
        return false;
      }
      if (state.credQuery) {
        const q = state.credQuery.toLowerCase();
        const hay = `${c.name} ${c.issuer} ${c.description} ${c.skills.join(" ")} ${c.year}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderCredentials() {
    const filtered = getFilteredCredentials();
    const limit = state.showAllInCategory || state.credQuery || state.credYear || state.credSkill ? filtered.length : 25;
    const visible = filtered.slice(0, limit);

    const statusEl = document.getElementById("cred-count-status");
    const hasActiveFilter = state.credYear || state.credSkill || state.credQuery || state.lens !== "all";
    statusEl.innerHTML = `
      <span>${escapeHtml(s("showingCount")(visible.length, filtered.length))}</span>
      ${
        hasActiveFilter
          ? `<button type="button" class="dock-btn" id="reset-cred-filters-btn">${escapeHtml(s("clearFilters"))}</button>`
          : ""
      }
    `;

    const resetBtn = document.getElementById("reset-cred-filters-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.credYear = null;
        state.credSkill = null;
        state.credQuery = "";
        state.lens = "all";
        state.credCategory = "featured";
        state.showAllInCategory = false;
        document.getElementById("cred-search-input").value = "";
        renderLensBar();
        renderProjects();
        renderCredentialTelemetry();
        renderCredentialControls();
        renderCredentials();
      });
    }

    const grid = document.getElementById("cred-grid");
    grid.innerHTML = visible
      .map((c) => {
        const isExpanded = state.expandedCredIds.has(c.id);
        const fallbackLabel = escapeHtml(c.tier.slice(0, 4).toUpperCase());
        const thumbHtml = c.imageUrl
          ? `<img class="cred-thumb" src="${escapeHtml(c.imageUrl)}" alt="${escapeHtml(c.name)}" loading="lazy" onerror="this.outerHTML='<div class=\\'cred-thumb-fallback\\'>${fallbackLabel}</div>'" />`
          : `<div class="cred-thumb-fallback">${fallbackLabel}</div>`;

        return `
          <article class="cred-card ${isExpanded ? "is-expanded" : ""}" data-cred-id="${escapeHtml(c.id)}" tabindex="0" role="button" aria-expanded="${isExpanded}">
            <div class="cred-card-top">
              ${thumbHtml}
              <div class="cred-info">
                <div class="cred-meta-row">
                  <span class="cred-tier-badge">${escapeHtml(c.tier)}</span>
                  <span class="cred-date">${escapeHtml(c.issuedAt)}</span>
                </div>
                <h3 class="cred-name">${escapeHtml(c.name)}</h3>
                <div class="cred-issuer">${escapeHtml(c.issuer)}</div>
              </div>
            </div>

            <div class="cred-drawer">
              <p class="cred-drawer-desc">${escapeHtml(c.description)}</p>
              ${
                c.skills.length
                  ? `<div class="cred-drawer-skills">
                      ${c.skills.map((sk) => `<span class="stack-chip">${escapeHtml(sk)}</span>`).join("")}
                    </div>`
                  : ""
              }
              <div class="cred-drawer-actions">
                <span class="panel-meta">Source: ${escapeHtml(c.source)} · ID: ${escapeHtml(c.id.slice(0, 12))}</span>
                <a class="verify-link" href="${escapeHtml(c.verifyUrl)}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">
                  ${escapeHtml(s("verifyCredly"))}
                </a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    grid.querySelectorAll("[data-cred-id]").forEach((card) => {
      const toggleCard = () => {
        const id = card.getAttribute("data-cred-id");
        if (state.expandedCredIds.has(id)) {
          state.expandedCredIds.delete(id);
        } else {
          state.expandedCredIds.add(id);
        }
        renderCredentials();
      };
      card.addEventListener("click", toggleCard);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleCard();
        }
      });
    });

    const moreWrap = document.getElementById("cred-show-more-wrap");
    if (visible.length < filtered.length) {
      moreWrap.innerHTML = `
        <button type="button" class="dock-btn dock-btn--primary" id="show-all-creds-btn">
          ${escapeHtml(s("showAllBtn")(filtered.length))}
        </button>
      `;
      document.getElementById("show-all-creds-btn").addEventListener("click", () => {
        state.showAllInCategory = true;
        renderCredentials();
      });
    } else if (state.credCategory === "featured" && state.lens === "all" && !state.credQuery) {
      moreWrap.innerHTML = `
        <button type="button" class="dock-btn dock-btn--primary" id="switch-all-123-btn">
          ${escapeHtml(s("showAllBtn")(credData.credentials.length))}
        </button>
      `;
      document.getElementById("switch-all-123-btn").addEventListener("click", () => {
        state.credCategory = "all";
        state.showAllInCategory = true;
        renderCredentialControls();
        renderCredentials();
      });
    } else {
      moreWrap.innerHTML = "";
    }
  }

  function renderPublications() {
    const ac = portfolio.publications.archCenter;
    const archCard = document.getElementById("arch-publication-card");

    const zonesHtml = ac.zones
      .map(
        (z, idx) => `
        <div class="arch-zone">
          <div class="arch-zone__tag">${escapeHtml(z.tag)}</div>
          <div class="arch-zone__title">${escapeHtml(z.title)}</div>
          <div class="arch-zone__sub">${escapeHtml(z.sub)}</div>
        </div>
        ${idx < ac.zones.length - 1 ? '<div class="arch-connector">⇄<br/>SMB/TLS</div>' : ""}
      `
      )
      .join("");

    archCard.innerHTML = `
      <div>
        <span class="project-type-pill">${escapeHtml(t(ac.badge))}</span>
        <h3 class="project-title" style="margin-top:8px">${escapeHtml(t(ac.title))}</h3>
      </div>
      <p class="project-desc">${escapeHtml(t(ac.summary))}</p>
      <div class="arch-diagram-box">
        <div class="blueprint-title">Hybrid Private Endpoint Topology (Azure Files + File Sync + Private DNS)</div>
        <div class="arch-diagram-grid">${zonesHtml}</div>
      </div>
      <div class="project-footer">
        <span class="panel-meta">Azure Files · Azure File Sync · Private Endpoint · Private DNS</span>
        <a class="project-link-btn" href="${escapeHtml(ac.url)}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(s("readMsLearn"))}
        </a>
      </div>
    `;

    const blog = portfolio.publications.blog;
    const journalCard = document.getElementById("journal-list-card");
    journalCard.innerHTML = `
      <div class="panel-head" style="margin-bottom:6px">
        <h3 class="panel-title">${escapeHtml(t(blog.title))}</h3>
      </div>
      ${blog.articles
        .map(
          (art) => `
          <a class="journal-item" href="${escapeHtml(art.url)}" target="_blank" rel="noopener noreferrer">
            <div class="journal-item__meta">
              <span>${escapeHtml(art.date)}</span>
              <span>·</span>
              <span style="color:var(--accent-azure)">${escapeHtml(art.desk)}</span>
            </div>
            <div class="journal-item__title">${escapeHtml(art.title)} ↗</div>
          </a>
        `
        )
        .join("")}
      <div style="margin-top:auto; padding-top:8px">
        <a class="project-link-btn" href="${escapeHtml(blog.url)}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(s("exploreBlog"))}
        </a>
      </div>
    `;
  }

  function renderCareerAndEducation() {
    const careerPanel = document.getElementById("career-timeline-card");
    careerPanel.innerHTML = `
      <div class="panel-head">
        <h3 class="panel-title">${escapeHtml(s("careerPanelTitle"))}</h3>
        <span class="panel-meta">Shanghai & Dalian, China</span>
      </div>
      <div class="timeline-list">
        ${portfolio.career
          .map(
            (item) => `
            <div class="timeline-node">
              <div class="timeline-period">${escapeHtml(item.period)}</div>
              <h4 class="timeline-role">${escapeHtml(t(item.role))}</h4>
              <div class="timeline-org">${escapeHtml(t(item.org))}</div>
              <ul class="timeline-bullets">
                ${(t(item.bullets) || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
              </ul>
            </div>
          `
          )
          .join("")}
      </div>
    `;

    const edu = portfolio.educationAndHonors;
    const eduPanel = document.getElementById("edu-honors-card");
    eduPanel.innerHTML = `
      <div class="panel-head">
        <h3 class="panel-title">${escapeHtml(s("eduPanelTitle"))}</h3>
      </div>

      <div style="margin-bottom:18px; padding:14px; border-radius:var(--radius-sm); background:var(--bg-surface-muted); border:1px solid var(--border-hairline);">
        <div class="telemetry-tile__kicker">${escapeHtml(s("eduHeading"))}</div>
        <div style="font-weight:760; font-size:1rem; margin-top:4px; color:var(--ink-primary)">
          ${escapeHtml(t(edu.education.school))}
        </div>
        <div style="font-size:0.84rem; color:var(--ink-secondary); margin-top:4px">
          ${escapeHtml(t(edu.education.detail))}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:18px">
        ${edu.pillars
          .map(
            (pil) => `
            <div style="padding:12px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-hairline); background:var(--bg-surface)">
              <div class="telemetry-tile__kicker" style="color:var(--accent-azure)">${escapeHtml(pil.kicker)}</div>
              <div style="font-weight:720; font-size:0.92rem; margin-top:2px">${escapeHtml(t(pil.title))}</div>
              <div style="font-size:0.82rem; color:var(--ink-secondary); margin-top:3px">${escapeHtml(t(pil.desc))}</div>
            </div>
          `
          )
          .join("")}
      </div>

      <div style="padding:14px; border-radius:var(--radius-sm); background:var(--bg-surface-muted); border:1px solid var(--border-hairline);">
        <div class="telemetry-tile__kicker">${escapeHtml(s("langHeading"))}</div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:8px">
          ${edu.languages
            .map(
              (l) => `
              <div>
                <div style="font-weight:700; font-size:0.88rem">${escapeHtml(t(l.name))}</div>
                <div style="font-size:0.78rem; color:var(--ink-muted)">${escapeHtml(t(l.level))}</div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  function renderAll() {
    applyTheme();
    renderStaticText();
    renderLensBar();
    renderProjects();
    renderCredentialTelemetry();
    renderCredentialControls();
    renderCredentials();
    renderPublications();
    renderCareerAndEducation();
  }

  function initEvents() {
    document.getElementById("lang-toggle-btn").addEventListener("click", () => {
      state.lang = state.lang === "en" ? "zh" : "en";
      const url = new URL(window.location.href);
      if (state.lang === "zh") {
        url.searchParams.set("lang", "zh");
      } else {
        url.searchParams.delete("lang");
      }
      window.history.replaceState({}, "", url);
      renderAll();
    });

    document.getElementById("theme-toggle-btn").addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("yh_resume_theme", state.theme);
      applyTheme();
    });

    document.getElementById("print-btn").addEventListener("click", () => {
      window.print();
    });

    const searchInput = document.getElementById("cred-search-input");
    searchInput.addEventListener("input", (e) => {
      state.credQuery = e.target.value.trim();
      renderCredentials();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initEvents();
    renderAll();
  });
})();
