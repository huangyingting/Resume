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
      ch1Num: "SECTION I — PROJECTS & WRITING",
      ch1Title: "Hands-On Side Projects & Technical Notes",
      ch1Desc: "DATA TOOLS, WORKSHOPS & ARCHITECTURE NOTES",
      ch2Num: "SECTION II — RECOGNITION & COMMUNITY",
      ch2Title: "Selected Recognition & Contributions",
      ch2Desc: "CERTIFICATIONS, HACKATHONS & DOCUMENTATION",
      ch3Num: "SECTION III — CAREER EXPERIENCE",
      ch3Title: "20+ Year Architectural & Engineering Arc",
      ch3Desc: "MICROSOFT · SHANGHAI, CHINA",
      ch4Num: "SECTION IV — CREDENTIAL ARCHIVE",
      ch4Title: "123 Verified Badges & Certifications",
      streamAll: "All 123",
      streamCerts: "Expert & Certs (30)",
      streamOpenhack: "OpenHack & MCT (34)",
      streamData: "Kusto Detective (21)",
      streamHack: "Hackathon & Honors (38)",
      liveLink: "OPEN SITE ↗",
      repoLink: "GITHUB REPO ↗",
      verifySeal: "VERIFY RECORD ↗",
      tickerBadge: "HIGHLIGHTS",
      tickerItems: [
        "<strong>2026 JUDGE</strong> MICROSOFT GLOBAL HACKATHON JUDGE",
        "<strong>2,300+ CASES</strong> USE CASE INTELLIGENCE DIRECTORY",
        "<strong>3× EXPERT</strong> AZURE · DEVOPS · CYBERSECURITY ARCHITECT",
        "<strong>MS LEARN</strong> AZURE ARCHITECTURE CENTER CONTRIBUTOR",
        "<strong>120 BADGES</strong> VERIFIED CREDLY LEARNING RECORD",
        "<strong>MOTTO</strong> “DOERS, NOT TALKERS.”"
      ]
    },
    zh: {
      roleTag: "微软云解决方案架构师",
      navFront: "I. 个人概览",
      navWorks: "II. 业余项目",
      navAuthority: "III. 认证与履历",
      navArchive: "IV. 徽章归档",
      ch1Num: "第一部分 — 业余实践与技术笔记",
      ch1Title: "动手实践：业余构建的数据小工具与实验工作坊",
      ch1Desc: "工作之余编写的静态数据站点、开源实验手册与学习笔记",
      ch2Num: "第二部分 — 社区参与与专业认证",
      ch2Title: "部分技术认证与社区贡献",
      ch2Desc: "整理自 Credly 认证记录与日常技术社区参与",
      ch3Num: "第三部分 — 职业履历",
      ch3Title: "二十余年云架构与软件工程经历",
      ch3Desc: "微软中国 (MICROSOFT) · 上海",
      ch4Num: "第四部分 — 认证徽章归档",
      ch4Title: "123 枚 Credly 与技术认证记录",
      streamAll: "全部 (123)",
      streamCerts: "架构与专业认证 (30)",
      streamOpenhack: "OpenHack 与讲师 (34)",
      streamData: "Kusto 数据练习 (21)",
      streamHack: "黑客松与社区参与 (38)",
      liveLink: "访问站点 ↗",
      repoLink: "代码仓库 ↗",
      verifySeal: "查看记录 ↗",
      tickerBadge: "概览",
      tickerItems: [
        "<strong>2026 评委</strong> 受邀参与 2026 微软全球黑客松 (Global Hackathon) 评审",
        "<strong>2,300+ 案例</strong> 业余整理 Use Case Intelligence 企业 AI 案例检索站",
        "<strong>三项专家认证</strong> 持有 Azure 解决方案架构 · DevOps 工程 · 网络安全架构认证",
        "<strong>文档贡献</strong> 参与编写 Microsoft Learn / Azure 架构中心参考文档",
        "<strong>120 枚徽章</strong> Credly 持续学习与技术社区参与记录",
        "<strong>日常习惯</strong> “Doers, Not Talkers — 多做少说，保持动手实践”"
      ]
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

    // Wire Ticker Strip
    const tickerBadge = document.getElementById("ticker-badge");
    const tickerTrack = document.getElementById("press-ticker-track");
    if (tickerBadge && tickerTrack) {
      tickerBadge.textContent = ui("tickerBadge");
      const items = ui("tickerItems") || [];
      const passHtml = items
        .map((item) => `<span class="ticker-item">${item}</span><span class="ticker-sep" aria-hidden="true">◆</span>`)
        .join("");
      tickerTrack.innerHTML = passHtml + passHtml;
    }

    document.getElementById("datum-strip").innerHTML = data.datums
      .map(
        (d, i) => `
        <div class="datum-cell reveal-item reveal-delay-${(i % 4) + 1}">
          <span class="datum-index">${esc(d.idx)}</span>
          <div class="datum-value"><strong class="datum-num" data-target="${esc(d.val)}">${esc(d.val)}</strong><span>${esc(
          d.suffix
        )}</span></div>
          <div class="datum-label">${esc(t(d.label))}</div>
          <div class="datum-note">${esc(t(d.note))}</div>
        </div>
      `
      )
      .join("");

    animateDatumCounters();

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

  function animateDatumCounters() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll(".datum-num[data-target]").forEach((el) => {
      const raw = el.getAttribute("data-target") || "";
      const hasComma = raw.includes(",");
      const prefixMatch = raw.match(/^([^\d]*)/);
      const suffixMatch = raw.match(/([^\d,]*)$/);
      const prefix = prefixMatch ? prefixMatch[1] : "";
      const trail = suffixMatch ? suffixMatch[1] : "";
      const numVal = parseInt(raw.replace(/[^\d]/g, ""), 10);
      if (!numVal || isNaN(numVal)) return;

      const duration = 260;
      const start = performance.now();
      function tick(now) {
        const elapsed = Math.min((now - start) / duration, 1);
        const eased = elapsed === 1 ? 1 : 1 - Math.pow(1 - elapsed, 3);
        const current = Math.round(numVal * eased);
        const formatted = hasComma ? current.toLocaleString("en-US") : String(current);
        el.textContent = `${prefix}${formatted}${trail}`;
        if (elapsed < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = raw;
        }
      }
      requestAnimationFrame(tick);
    });
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
      .map((w, i) => {
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
          <article class="work-col reveal-item reveal-delay-${(i % 4) + 1}" data-work-idx="${esc(w.idx)}">
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
        (d, i) => `
        <div class="authority-row reveal-item reveal-delay-${(i % 4) + 1}">
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

    // Update top scroll reading progress bar
    const progressEl = document.getElementById("scroll-progress");
    function updateScrollProgress() {
      if (!progressEl) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
      progressEl.style.transform = `scaleX(${ratio.toFixed(4)})`;
    }
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });
    updateScrollProgress();

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
