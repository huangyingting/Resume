/**
 * The Architect's Broadsheet Interactive Controller (v4)
 * - Strictly Fixed Top Header Bar
 * - 100% Flat & Seamless Multi-Column Newspaper Layout (Zero Cards, Zero Border-Radius)
 * - 5 Newsprint Paper Editions (Newsprint Ivory, FT Salmon, Midnight Press, Swiss Cyanotype, Kyoto Washi)
 */

(function () {
  const data = window.RESUME_PORTFOLIO_DATA;
  const creds = window.RESUME_CREDENTIALS_DATA.credentials;

  const urlParams = new URLSearchParams(window.location.search);
  const state = {
    lang: urlParams.get("lang") === "zh" ? "zh" : "en",
    palette: urlParams.get("palette") || localStorage.getItem("yh_broadsheet_palette") || "broadsheet",
    stream: "all", // 'all' | 'certifications' | 'openhack' | 'data_kql' | 'hackathons'
    selectedSealId: creds[0]?.id || ""
  };

  const PALETTE_NAMES = {
    broadsheet: { en: "Newsprint Ivory", zh: "经典报纸白" },
    ftpink: { en: "FT Salmon", zh: "金融时报粉" },
    noir: { en: "Midnight Press", zh: "午夜石印黑" },
    blueprint: { en: "Swiss Cyanotype", zh: "瑞士蓝晒版" },
    matcha: { en: "Kyoto Washi", zh: "京都和纸青" }
  };

  const I18N = {
    en: {
      roleTag: "MICROSOFT SENIOR CSA",
      navFront: "I. Front Page",
      navWorks: "II. 4 Systems",
      navAuthority: "III. Record & Arc",
      navArchive: "IV. 123 Seals",
      ch1Num: "SECTION I — PRODUCTION SYSTEMS",
      ch1Title: "Four Solo-Shipped AI & Data Platforms",
      ch1Desc: "END-TO-END AUTONOMOUS PIPELINES · ZERO-BACKEND EDGE DELIVERY",
      ch2Num: "SECTION II — OFFICIAL STANDING",
      ch2Title: "Five Career-Defining Distinctions",
      ch2Desc: "CURATED FROM 123 VERIFIED RECORDS",
      ch3Num: "SECTION III — 20-YEAR CHRONICLE",
      ch3Title: "Compound Leadership Arc",
      ch3Desc: "2005 — 2026 DISPATCH",
      ch4Num: "SECTION IV — CRYPTOGRAPHIC RECORD",
      ch4Title: "123 Verified Seals & Certifications",
      streamAll: "All 123",
      streamCerts: "Expert & Certs (30)",
      streamOpenhack: "OpenHack & MCT (34)",
      streamData: "Kusto Detective (21)",
      streamHack: "Hackathon & Honors (38)",
      liveLink: "LIVE SYSTEM ↗",
      repoLink: "SOURCE CODE ↗",
      verifySeal: "VERIFY RECORD ↗"
    },
    zh: {
      roleTag: "微软资深云架构师",
      navFront: "I. 头版头条",
      navWorks: "II. 四大系统",
      navAuthority: "III. 权威与履历",
      navArchive: "IV. 123枚印鉴",
      ch1Num: "第一版 — 独立交付的生产级系统",
      ch1Title: "一人成军：四大全栈 AI 与数据情报平台",
      ch1Desc: "从多智能体数据管线到前端交互独立完成 · 四栏通排架构解析",
      ch2Num: "第二版 — 行业权威背书",
      ch2Title: "最具含金量的五项官方里程碑",
      ch2Desc: "从 123 项可验真记录中严选",
      ch3Num: "第三版 — 二十年复合演进",
      ch3Title: "跨国研发管理与云架构编年史",
      ch3Desc: "2005 — 2026 履历实录",
      ch4Num: "第四版 — 官方数字印鉴检索版",
      ch4Title: "123 枚 Credly 与权威技术认证平面底片",
      streamAll: "全部 (123)",
      streamCerts: "专家与架构认证 (30)",
      streamOpenhack: "OpenHack 教练与讲师 (34)",
      streamData: "Kusto 侦探奖章 (21)",
      streamHack: "黑客松与微软表彰 (38)",
      liveLink: "访问线上系统 ↗",
      repoLink: "开源仓库 ↗",
      verifySeal: "前往官方验真 ↗"
    }
  };

  function t(val) {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[state.lang] || val.en || "";
  }

  function ui(k) {
    return I18N[state.lang][k];
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ========================================================================
     1. Curated Newsprint Palette Switcher
     ======================================================================== */
  function applyPalette(p) {
    if (!PALETTE_NAMES[p]) p = "broadsheet";
    state.palette = p;
    document.documentElement.setAttribute("data-palette", p);
    localStorage.setItem("yh_broadsheet_palette", p);

    document.querySelectorAll("[data-tone]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-tone") === p);
    });
    const labelEl = document.getElementById("palette-name");
    if (labelEl) {
      labelEl.textContent = t(PALETTE_NAMES[p]);
    }
  }

  /* ========================================================================
     2. Render Broadsheet Masthead & Front Page
     ======================================================================== */
  function renderMastheadAndHero() {
    document.getElementById("masthead-role").textContent = ui("roleTag");
    document.getElementById("nav-front").textContent = ui("navFront");
    document.getElementById("nav-works").textContent = ui("navWorks");
    document.getElementById("nav-authority").textContent = ui("navAuthority");
    document.getElementById("nav-archive").textContent = ui("navArchive");
    document.getElementById("lang-switch").textContent = state.lang === "en" ? "中文" : "EN";

    // Nameplate ears & title
    if (data.nameplate) {
      document.getElementById("ear-left-kicker").textContent = t(data.nameplate.earLeftKicker);
      document.getElementById("ear-left-main").textContent = t(data.nameplate.earLeftMain);
      document.getElementById("ear-left-sub").textContent = t(data.nameplate.earLeftSub);
      document.getElementById("nameplate-super").textContent = t(data.nameplate.super);
      document.getElementById("nameplate-title").textContent = t(data.nameplate.title);
      document.getElementById("nameplate-subtitle").textContent = t(data.nameplate.subtitle);
      document.getElementById("ear-right-kicker").textContent = t(data.nameplate.earRightKicker);
      document.getElementById("ear-right-main").textContent = t(data.nameplate.earRightMain);
      document.getElementById("ear-right-sub").textContent = t(data.nameplate.earRightSub);
    }

    document.getElementById("hero-kicker").textContent = t(data.hero.kicker);
    document.getElementById("lead-kicker").textContent = t(data.hero.leadKicker);
    document.getElementById("hero-statement").innerHTML = t(data.hero.statement);
    document.getElementById("hero-thesis").innerHTML = t(data.hero.thesis);
    document.getElementById("columnist-header").textContent = t(data.hero.dossierHeader);
    document.getElementById("portrait-caption").innerHTML = esc(t(data.hero.caption)).replace(/\n/g, "<br/>");

    document.getElementById("datum-strip").innerHTML = data.datums
      .map(
        (d) => `
        <div class="datum-cell">
          <span class="datum-index">${esc(d.idx)}</span>
          <div class="datum-value">${esc(d.val)}<span>${esc(d.suffix)}</span></div>
          <div class="datum-label">${esc(t(d.label))}</div>
          <div class="datum-note">${esc(t(d.note))}</div>
        </div>
      `
      )
      .join("");

    document.getElementById("dossier-ledger").innerHTML = (data.hero.dossier || [])
      .map(
        (item) => `
        <div class="dossier-item">
          <span class="dossier-key">${esc(t(item.key))}</span>
          <span class="dossier-val">${esc(t(item.val))}</span>
        </div>
      `
      )
      .join("");
  }

  /* ========================================================================
     3. Render Section I: 4-Column Vertical Feature Spread
     ======================================================================== */
  function renderWorksChapter() {
    document.getElementById("ch1-num").textContent = ui("ch1Num");
    document.getElementById("ch1-title").textContent = ui("ch1Title");
    document.getElementById("ch1-desc").textContent = ui("ch1Desc");

    const container = document.getElementById("works-index");
    container.innerHTML = data.works
      .map((w) => {
        const stepsHtml = w.steps
          .map(
            (s) => `
            <div class="pipe-row">
              <span class="pipe-row__stage">${esc(s.stage)}</span>
              <span class="pipe-row__title">${esc(t(s.title))}</span>
              <span class="pipe-row__detail">${esc(t(s.detail))}</span>
            </div>
          `
          )
          .join("");

        return `
          <article class="work-col" data-work-idx="${esc(w.idx)}">
            <div>
              <div class="work-col__head">
                <div class="work-col__topline">
                  <span class="work-col__idx">${esc(w.idx)}</span>
                  <span class="work-col__metric">${esc(t(w.metric))}</span>
                </div>
                <h3 class="work-col__name">${esc(w.name)}</h3>
                <span class="work-col__domain">${esc(t(w.domain))}</span>
              </div>
              <p class="work-col__essence">${esc(t(w.essence))}</p>
            </div>

            <div>
              <div class="work-col__pipeline">${stepsHtml}</div>
              <div class="work-col__links">
                <a class="news-link" href="${esc(w.liveUrl)}" target="_blank" rel="noopener noreferrer">${esc(
          ui("liveLink")
        )}</a>
                <a class="news-link" href="${esc(w.repoUrl)}" target="_blank" rel="noopener noreferrer">${esc(
          ui("repoLink")
        )}</a>
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  /* ========================================================================
     4. Render Section II & III: Asymmetric Double-Spread
     ======================================================================== */
  function renderAuthorityChapter() {
    document.getElementById("ch2-num").textContent = ui("ch2Num");
    document.getElementById("ch2-title").textContent = ui("ch2Title");
    document.getElementById("ch2-desc").textContent = ui("ch2Desc");

    document.getElementById("authority-list").innerHTML = data.distinctions
      .map(
        (d) => `
        <div class="authority-row">
          <span class="authority-year">${esc(d.year)}</span>
          <div>
            <h3 class="authority-title">${esc(t(d.title))}</h3>
            <p class="authority-detail">${esc(t(d.detail))}</p>
          </div>
          <a class="authority-proof news-link" href="${esc(d.proofUrl)}" target="_blank" rel="noopener noreferrer">
            ${esc(t(d.proofLabel))}
          </a>
        </div>
      `
      )
      .join("");
  }

  function renderTrajectoryChapter() {
    document.getElementById("ch3-num").textContent = ui("ch3Num");
    document.getElementById("ch3-title").textContent = ui("ch3Title");
    document.getElementById("ch3-desc").textContent = ui("ch3Desc");
    document.getElementById("editorial-pullquote").textContent = t(data.hero.pullquote);

    document.getElementById("chronology").innerHTML = data.trajectory
      .map(
        (tr) => `
        <div class="chrono-row">
          <div class="chrono-topline">
            <h3 class="chrono-role">${esc(t(tr.role))}</h3>
            <span class="chrono-period">${esc(tr.period)}</span>
          </div>
          <div class="chrono-org">${esc(t(tr.org))}</div>
          <p class="chrono-focus">${esc(t(tr.focus))}</p>
        </div>
      `
      )
      .join("");

    document.getElementById("domain-ledger").innerHTML = (data.hero.domains || [])
      .map(
        (dm) => `
        <div class="domain-cell">
          <div class="domain-cell__kicker">${esc(dm.kicker)}</div>
          <div class="domain-cell__title">${esc(t(dm.title))}</div>
        </div>
      `
      )
      .join("");
  }

  /* ========================================================================
     5. Render Section IV: Flat 123-Seal Contact Sheet
     ======================================================================== */
  function getFilteredSeals() {
    if (state.stream === "all") return creds;
    if (state.stream === "openhack") {
      return creds.filter((c) => c.category === "openhack" || c.category === "teaching_mct");
    }
    if (state.stream === "hackathons") {
      return creds.filter((c) => c.category === "hackathons" || c.category === "leadership_community");
    }
    return creds.filter((c) => c.category === state.stream);
  }

  function renderArchiveChapter() {
    document.getElementById("ch4-num").textContent = ui("ch4Num");
    document.getElementById("ch4-title").textContent = ui("ch4Title");

    const streams = [
      { id: "all", label: ui("streamAll") },
      { id: "certifications", label: ui("streamCerts") },
      { id: "openhack", label: ui("streamOpenhack") },
      { id: "data_kql", label: ui("streamData") },
      { id: "hackathons", label: ui("streamHack") }
    ];

    const streamsEl = document.getElementById("cred-streams");
    streamsEl.innerHTML = streams
      .map(
        (s) => `
        <button type="button" class="stream-btn ${state.stream === s.id ? "is-active" : ""}" data-stream="${s.id}">
          ${esc(s.label)}
        </button>
      `
      )
      .join("");

    streamsEl.querySelectorAll("[data-stream]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.stream = btn.getAttribute("data-stream");
        renderArchiveChapter();
      });
    });

    const filtered = getFilteredSeals();
    const activeSeal = creds.find((c) => c.id === state.selectedSealId) || filtered[0] || creds[0];

    const spotlight = document.getElementById("cred-spotlight-line");
    if (activeSeal) {
      const iconHtml = activeSeal.imageUrl
        ? `<img class="cred-spotlight-img" src="${esc(activeSeal.imageUrl)}" alt="${esc(activeSeal.name)}" />`
        : `<span class="seal-token__text">${esc(activeSeal.tier.slice(0, 4).toUpperCase())}</span>`;

      spotlight.innerHTML = `
        <div class="cred-spotlight-left">
          ${iconHtml}
          <div>
            <h3 class="cred-spotlight-name">${esc(activeSeal.name)}</h3>
            <div class="cred-spotlight-meta">
              ${esc(activeSeal.issuedAt)} · ${esc(activeSeal.issuer)} · ${esc(activeSeal.tier)} · ${esc(
        activeSeal.skills.slice(0, 4).join(" / ")
      )}
            </div>
          </div>
        </div>
        <a class="news-link" style="font-size:0.72rem;white-space:nowrap;" href="${esc(
          activeSeal.verifyUrl
        )}" target="_blank" rel="noopener noreferrer">
          ${esc(ui("verifySeal"))}
        </a>
      `;
    }

    const tapestry = document.getElementById("seal-tapestry");
    tapestry.innerHTML = filtered
      .map((c) => {
        const isSel = activeSeal && c.id === activeSeal.id;
        const fb = esc(c.tier.slice(0, 3).toUpperCase());
        const inner = c.imageUrl
          ? `<img src="${esc(c.imageUrl)}" alt="${esc(c.name)}" loading="lazy" onerror="this.outerHTML='<span class=\\'seal-token__text\\'>${fb}</span>'" />`
          : `<span class="seal-token__text">${fb}</span>`;

        return `
          <button type="button" class="seal-token ${isSel ? "is-selected" : ""}" data-seal-id="${esc(c.id)}" title="${esc(
          c.name
        )} (${esc(c.year)})">
            ${inner}
          </button>
        `;
      })
      .join("");

    tapestry.querySelectorAll("[data-seal-id]").forEach((btn) => {
      const activate = () => {
        state.selectedSealId = btn.getAttribute("data-seal-id");
        renderArchiveChapter();
      };
      btn.addEventListener("mouseenter", activate);
      btn.addEventListener("click", activate);
    });
  }

  function renderAll() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    applyPalette(state.palette);
    renderMastheadAndHero();
    renderWorksChapter();
    renderAuthorityChapter();
    renderTrajectoryChapter();
    renderArchiveChapter();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderAll();

    document.querySelectorAll("[data-tone]").forEach((btn) => {
      btn.addEventListener("click", () => applyPalette(btn.getAttribute("data-tone")));
    });

    document.getElementById("lang-switch").addEventListener("click", () => {
      state.lang = state.lang === "en" ? "zh" : "en";
      const url = new URL(window.location.href);
      if (state.lang === "zh") url.searchParams.set("lang", "zh");
      else url.searchParams.delete("lang");
      window.history.replaceState({}, "", url);
      renderAll();
    });
  });
})();
