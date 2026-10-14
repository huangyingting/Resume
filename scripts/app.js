/**
 * Editorial Monograph Interactive Controller (v3)
 * - 5 Curated Architectural Palettes (Atelier Paper, Kyoto Sumi, Swiss Blueprint, Botanical Moss, Obsidian Chalk)
 * - Subtle Ambient Gallery Lighting Canvas (zero game particles)
 * - Seamless Click-to-Unfold Project Blueprints + Sibling-Dimming Hover
 * - Tactile 123-Seal Credential Tapestry with Live Margin Spotlight
 */

(function () {
  const data = window.RESUME_PORTFOLIO_DATA;
  const creds = window.RESUME_CREDENTIALS_DATA.credentials;

  const urlParams = new URLSearchParams(window.location.search);
  const state = {
    lang: urlParams.get("lang") === "zh" ? "zh" : "en",
    palette: urlParams.get("palette") || localStorage.getItem("yh_editorial_palette") || "atelier",
    stream: "all", // 'all' | 'certifications' | 'openhack' | 'data_kql' | 'hackathons'
    selectedSealId: creds[0]?.id || ""
  };

  const PALETTE_NAMES = {
    atelier: { en: "Atelier Paper", zh: "纸本画廊" },
    sumi: { en: "Kyoto Sumi", zh: "京都墨韵" },
    swiss: { en: "Swiss Blueprint", zh: "瑞士蓝图" },
    moss: { en: "Botanical Moss", zh: "松烟青苔" },
    obsidian: { en: "Obsidian Chalk", zh: "黑曜极简" }
  };

  const I18N = {
    en: {
      roleTag: "Senior CSA @ Microsoft",
      navWorks: "01 Works",
      navAuthority: "02 Authority",
      navTrajectory: "03 Trajectory",
      navArchive: "04 Proof (120)",
      ch1Num: "01 — SELECTED WORKS",
      ch1Title: "Systems Shipped Solo",
      ch1Desc: "Live, autonomous intelligence platforms engineered end-to-end. Click any row to unfold its architecture.",
      ch2Num: "02 — DISTINCTIONS",
      ch2Title: "Architectural Authority",
      ch2Desc: "The top 5 career distinctions across global judging, published reference architectures, and triple expert mastery.",
      ch3Num: "03 — TRAJECTORY",
      ch3Title: "20-Year Compound Arc",
      ch3Desc: "From hands-on software engineering and team management to enterprise cloud & AI architecture at Microsoft.",
      ch4Num: "04 — VERIFIED ARCHIVE",
      ch4Title: "123 Cryptographic Seals",
      ch4Desc: "Hover any seal in the tapestry to inspect its official Credly verification record.",
      streamAll: "All 123 Seals",
      streamCerts: "Expert & Certs (30)",
      streamOpenhack: "OpenHack & MCT (34)",
      streamData: "Kusto Detective (21)",
      streamHack: "Hackathon & Honors (38)",
      liveLink: "Launch Live Platform ↗",
      repoLink: "Source Repository ↗",
      verifySeal: "Verify on Credly ↗"
    },
    zh: {
      roleTag: "微软资深云架构师",
      navWorks: "01 代表作",
      navAuthority: "02 权威认可",
      navTrajectory: "03 20年履历",
      navArchive: "04 徽章索引",
      ch1Num: "01 — 独立交付代表作",
      ch1Title: "亲自写代码上线的 AI 平台",
      ch1Desc: "拒绝纸上谈兵。独立完成从数据管线、智能体编排到前端交互的全栈线上系统（点击任意行展开架构蓝图）。",
      ch2Num: "02 — 核心行业地位",
      ch2Title: "最具份量的五项专业背书",
      ch2Desc: "从 123 项认证中严选最具稀缺性的五项里程碑：全球评委、官方架构作者与三大专家大满贯。",
      ch3Num: "03 — 复合职业演进",
      ch3Title: "20 年跨国工程与架构视野",
      ch3Desc: "历任一线研发、项目经理、工程团队经理、技术咨询顾问及微软资深云架构师。",
      ch4Num: "04 — 可验真资质索引",
      ch4Title: "123 枚官方数字徽章星带",
      ch4Desc: "去卡片化集成展示——鼠标掠过任意徽章印记，即可在上方索引栏查看并前往官方验真。",
      streamAll: "全部印记 (123)",
      streamCerts: "专家与架构认证 (30)",
      streamOpenhack: "OpenHack 教练与讲师 (34)",
      streamData: "Kusto 侦探奖章 (21)",
      streamHack: "黑客松与微软表彰 (38)",
      liveLink: "访问线上系统 ↗",
      repoLink: "查看开源代码 ↗",
      verifySeal: "官方证书验真 ↗"
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
     1. Curated Palette Switcher
     ======================================================================== */
  function applyPalette(p) {
    if (!PALETTE_NAMES[p]) p = "atelier";
    state.palette = p;
    document.documentElement.setAttribute("data-palette", p);
    localStorage.setItem("yh_editorial_palette", p);

    document.querySelectorAll("[data-tone]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-tone") === p);
    });
    const labelEl = document.getElementById("palette-name");
    if (labelEl) {
      labelEl.textContent = t(PALETTE_NAMES[p]);
    }
  }

  /* ========================================================================
     2. Subtle Ambient Gallery Lighting Canvas (Soft Warm Radial Wash)
     ======================================================================== */
  function initAmbientCanvas() {
    const canvas = document.getElementById("ambient-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const target = { x: w * 0.65, y: h * 0.28 };
    const current = { x: w * 0.65, y: h * 0.28 };

    window.addEventListener("mousemove", (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
    });
    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    function renderAmbient() {
      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;

      ctx.clearRect(0, 0, w, h);
      const style = getComputedStyle(document.documentElement);
      const rgb1 = (style.getPropertyValue("--ambient-rgb-1") || "200, 62, 43").trim();
      const rgb2 = (style.getPropertyValue("--ambient-rgb-2") || "185, 145, 95").trim();

      const grad1 = ctx.createRadialGradient(current.x, current.y, 10, current.x, current.y, Math.max(w, h) * 0.48);
      grad1.addColorStop(0, `rgba(${rgb1}, 0.075)`);
      grad1.addColorStop(1, `rgba(${rgb1}, 0)`);
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const grad2 = ctx.createRadialGradient(w * 0.2, h * 0.8, 10, w * 0.2, h * 0.8, Math.max(w, h) * 0.45);
      grad2.addColorStop(0, `rgba(${rgb2}, 0.055)`);
      grad2.addColorStop(1, `rgba(${rgb2}, 0)`);
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      requestAnimationFrame(renderAmbient);
    }
    requestAnimationFrame(renderAmbient);
  }

  /* ========================================================================
     3. Render Editorial Sections
     ======================================================================== */
  function renderMastheadAndHero() {
    document.getElementById("masthead-role").textContent = ui("roleTag");
    document.getElementById("nav-works").textContent = ui("navWorks");
    document.getElementById("nav-authority").textContent = ui("navAuthority");
    document.getElementById("nav-trajectory").textContent = ui("navTrajectory");
    document.getElementById("nav-archive").textContent = ui("navArchive");
    document.getElementById("lang-switch").textContent = state.lang === "en" ? "中文" : "EN";

    document.getElementById("hero-kicker").textContent = t(data.hero.kicker);
    document.getElementById("hero-statement").innerHTML = t(data.hero.statement);
    document.getElementById("hero-thesis").innerHTML = t(data.hero.thesis);
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
  }

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
            <div class="bp-step">
              <div class="bp-step__stage">${esc(s.stage)}</div>
              <div class="bp-step__title">${esc(t(s.title))}</div>
              <div class="bp-step__detail">${esc(t(s.detail))}</div>
            </div>
          `
          )
          .join("");

        return `
          <article class="work-row ${w.openDefault ? "is-open" : ""}" data-work-idx="${esc(w.idx)}">
            <div class="work-row__summary" role="button" tabindex="0">
              <span class="work-row__idx">${esc(w.idx)}</span>
              <div>
                <h3 class="work-row__name">${esc(w.name)}</h3>
                <span class="work-row__domain">${esc(t(w.domain))}</span>
              </div>
              <p class="work-row__essence">${esc(t(w.essence))}</p>
              <div class="work-row__metric">
                <span>${esc(t(w.metric))}</span>
                <span class="work-row__toggle">+</span>
              </div>
            </div>

            <div class="work-row__drawer">
              <div class="blueprint-flow">${stepsHtml}</div>
              <div class="work-row__footer">
                <div class="work-row__tags">
                  ${w.tags.map((tg) => `<span># ${esc(tg)}</span>`).join("")}
                </div>
                <div class="work-row__actions">
                  <a class="editorial-link" href="${esc(w.liveUrl)}" target="_blank" rel="noopener noreferrer">${esc(
          ui("liveLink")
        )}</a>
                  <a class="editorial-link" href="${esc(w.repoUrl)}" target="_blank" rel="noopener noreferrer">${esc(
          ui("repoLink")
        )}</a>
                </div>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    container.querySelectorAll(".work-row__summary").forEach((row) => {
      row.addEventListener("click", () => {
        const article = row.closest(".work-row");
        article.classList.toggle("is-open");
      });
    });
  }

  function renderAuthorityChapter() {
    document.getElementById("ch2-num").textContent = ui("ch2Num");
    document.getElementById("ch2-title").textContent = ui("ch2Title");
    document.getElementById("ch2-desc").textContent = ui("ch2Desc");

    document.getElementById("authority-list").innerHTML = data.distinctions
      .map(
        (d) => `
        <div class="authority-row">
          <span class="authority-year">${esc(d.year)}</span>
          <h3 class="authority-title">${esc(t(d.title))}</h3>
          <p class="authority-detail">${esc(t(d.detail))}</p>
          <a class="authority-proof editorial-link" href="${esc(d.proofUrl)}" target="_blank" rel="noopener noreferrer">
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

    document.getElementById("chronology").innerHTML = data.trajectory
      .map(
        (tr) => `
        <div class="chrono-row">
          <span class="chrono-period">${esc(tr.period)}</span>
          <div>
            <h3 class="chrono-role">${esc(t(tr.role))}</h3>
            <div class="chrono-org">${esc(t(tr.org))}</div>
          </div>
          <p class="chrono-focus">${esc(t(tr.focus))}</p>
        </div>
      `
      )
      .join("");
  }

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
    document.getElementById("ch4-desc").textContent = ui("ch4Desc");

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
        <a class="editorial-link" style="font-family:var(--font-mono);font-size:0.74rem;white-space:nowrap;" href="${esc(
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
    initAmbientCanvas();
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
