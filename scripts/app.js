/**
 * Kinetic Interactive Engine for Yingting Huang's Resume Showcase
 * Features:
 * - 60fps Interactive Constellation & Aurora Particle Canvas
 * - 5-Palette Live Theme Engine (Aurora, Cyber, Titanium, Emerald, Daylight)
 * - Mouse-tracking 3D Spotlight Bento Cards
 * - Interactive 6-Axis SVG Radar Chart
 * - Icon-First 123-Badge Medallion Matrix + Live Inspector Bar
 */

(function () {
  const data = window.RESUME_PORTFOLIO_DATA;
  const creds = window.RESUME_CREDENTIALS_DATA.credentials;

  const urlParams = new URLSearchParams(window.location.search);
  const state = {
    lang: urlParams.get("lang") === "zh" ? "zh" : "en",
    palette: urlParams.get("palette") || localStorage.getItem("yh_palette") || "aurora",
    orbit: "crown", // 'crown' | 'all' | 'certifications' | 'openhack' | 'data_kql' | 'hackathons'
    search: "",
    selectedBadgeId: creds[0]?.id || ""
  };

  const I18N = {
    en: {
      navDna: "DNA & Radar",
      navShipped: "Shipped Works",
      navConstellation: "120 Badges",
      navEras: "Trajectory",
      paletteLabel: "Palette",
      dnaEyebrow: "01 · THE ARCHITECT'S SIGNATURE",
      dnaTitle: "Rare Triad: Strategist, Security Authority & Hands-On Builder",
      triadKicker: "MICROSOFT EXPERT TRIAD",
      triadTitle: "3× Expert Certifications",
      radarKicker: "6-AXIS TELEMETRY",
      radarTitle: "Full-Stack Capability Radar",
      honorsKicker: "INTERNAL & GLOBAL DISTINCTIONS",
      honorsTitle: "Trophies, Coaching & KQL Mastery",
      velocityKicker: "2019–2026 CREDLY VELOCITY",
      velocityTitle: "Continuous Mastery Across 8 Years",
      shippedEyebrow: "02 · DOERS, NOT TALKERS",
      shippedTitle: "Live AI Platforms & Open-Source Systems Built From Scratch",
      liveBtn: "Launch Live ↗",
      repoBtn: "GitHub ↗",
      badgeEyebrow: "03 · VERIFIED CREDENTIAL CONSTELLATION",
      badgeTitle: "123 Cryptographically Verified Badges & Certifications",
      orbitCrown: "★ Crown 16",
      orbitAll: "All 123",
      orbitCerts: "Exams & Certs (30)",
      orbitOpenhack: "OpenHack (27)",
      orbitData: "Kusto & Data (21)",
      orbitHack: "Hackathons & Awards (45)",
      searchPlaceholder: "Filter 123 badges (e.g. SC-100, Kusto, Judge, Copilot)...",
      verifyBtn: "Verify Official Credential ↗",
      eraEyebrow: "04 · 20+ YEAR EVOLUTION",
      eraTitle: "Career Arc & Academic Foundation"
    },
    zh: {
      navDna: "核心特质与雷达",
      navShipped: "代表作品",
      navConstellation: "120 枚徽章星图",
      navEras: "20年演进",
      paletteLabel: "主题色盘",
      dnaEyebrow: "01 · 架构师核心辨识度",
      dnaTitle: "集齐「三大专家认证 + 全球评委 + 独立全栈交付」的稀缺组合",
      triadKicker: "微软顶级认证大满贯",
      triadTitle: "3× Expert 专家级认证",
      radarKicker: "六维能力遥测",
      radarTitle: "全栈技术与领导力雷达",
      honorsKicker: "微软内部大奖与社区影响力",
      honorsTitle: "全球评委 · 7年讲师 · KQL 金星侦探",
      velocityKicker: "2019–2026 持续进化曲线",
      velocityTitle: "8 年间斩获 120 枚官方认证分布",
      shippedEyebrow: "02 · DOERS, NOT TALKERS（实干代表作）",
      shippedTitle: "一人成军：独立构建并在线运行的 AI 情报平台与开源工程",
      liveBtn: "访问在线平台 ↗",
      repoBtn: "源码仓库 ↗",
      badgeEyebrow: "03 · CREDLY 权威认证星图",
      badgeTitle: "123 项可验真数字徽章与专业资质（点击任意徽章查看详情）",
      orbitCrown: "★ 王冠精选 (16)",
      orbitAll: "全部徽章 (123)",
      orbitCerts: "专业认证 (30)",
      orbitOpenhack: "OpenHack 教练 (27)",
      orbitData: "Kusto 侦探 (21)",
      orbitHack: "黑客松与内部大奖 (45)",
      searchPlaceholder: "搜索 123 枚徽章（如 SC-100, Kusto, Judge, Copilot）...",
      verifyBtn: "前往官方核验证书 ↗",
      eraEyebrow: "04 · 20+ 年技术演进",
      eraTitle: "职业里程碑与教育背景"
    }
  };

  function t(val) {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[state.lang] || val.en || "";
  }

  function ui(key) {
    return I18N[state.lang][key];
  }

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ========================================================================
     1. Palette Switcher
     ======================================================================== */
  function applyPalette(paletteName) {
    state.palette = paletteName;
    document.documentElement.setAttribute("data-palette", paletteName);
    localStorage.setItem("yh_palette", paletteName);
    document.querySelectorAll("[data-swatch]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.getAttribute("data-swatch") === paletteName);
    });
  }

  /* ========================================================================
     2. Interactive 60fps Constellation Canvas
     ======================================================================== */
  function initCanvas() {
    const canvas = document.getElementById("cosmos-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const pointer = { x: w * 0.5, y: h * 0.3 };
    window.addEventListener("mousemove", (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    });
    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const count = Math.min(55, Math.floor((w * h) / 26000));
    const nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.8 + 0.8
    }));

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const style = getComputedStyle(document.documentElement);
      const rgb = (style.getPropertyValue("--canvas-rgb-1") || "0, 240, 255").trim();

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, 0.45)`;
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist / 135) * 0.14})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const pd = Math.hypot(n.x - pointer.x, n.y - pointer.y);
        if (pd < 180) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - pd / 180) * 0.24})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ========================================================================
     3. Spotlight Hover Effect on Bento Cards
     ======================================================================== */
  function attachSpotlightCards() {
    document.querySelectorAll(".bento-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ========================================================================
     4. Render Sections
     ======================================================================== */
  function renderHeroAndKpis() {
    document.getElementById("nav-dna").textContent = ui("navDna");
    document.getElementById("nav-shipped").textContent = ui("navShipped");
    document.getElementById("nav-constellation").textContent = ui("navConstellation");
    document.getElementById("nav-eras").textContent = ui("navEras");
    document.getElementById("palette-label").textContent = ui("paletteLabel");
    document.getElementById("lang-btn").textContent = state.lang === "en" ? "中文" : "EN";

    document.getElementById("hero-signal").textContent = t(data.hero.signal);
    document.getElementById("hero-tagline").innerHTML = t(data.hero.tagline);

    document.getElementById("essence-trio").innerHTML = data.hero.essences
      .map(
        (e) => `
        <div class="essence-chip">
          <span class="essence-chip__icon">${esc(e.icon)}</span>
          <span class="essence-chip__title">${esc(t(e.title))}</span>
          <span class="essence-chip__sub">${esc(t(e.sub))}</span>
        </div>
      `
      )
      .join("");

    document.getElementById("kpi-strip").innerHTML = data.kpis
      .map((k) => {
        const dash = Math.round((k.pct / 100) * 113);
        return `
          <div class="bento-card kpi-card">
            <div>
              <div class="kpi-number">${esc(k.num)}</div>
              <div class="kpi-label">${esc(t(k.label))}</div>
              <div class="kpi-sub">${esc(t(k.sub))}</div>
            </div>
            <svg class="kpi-ring" viewBox="0 0 44 44">
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--border-subtle)" stroke-width="3.5" />
              <circle cx="22" cy="22" r="18" fill="none" stroke="var(--accent-1)" stroke-width="3.5"
                stroke-dasharray="${dash} 113" stroke-linecap="round" transform="rotate(-90 22 22)" />
            </svg>
          </div>
        `;
      })
      .join("");
  }

  function renderDnaBento() {
    document.getElementById("dna-eyebrow").textContent = ui("dnaEyebrow");
    document.getElementById("dna-title").textContent = ui("dnaTitle");

    // 6-Axis Radar SVG math
    const cx = 100;
    const cy = 100;
    const maxR = 76;
    const axes = data.radar;
    const polyPoints = axes
      .map((item, idx) => {
        const angle = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
        const r = (item.score / 100) * maxR;
        const x = (cx + r * Math.cos(angle)).toFixed(1);
        const y = (cy + r * Math.sin(angle)).toFixed(1);
        return `${x},${y}`;
      })
      .join(" ");

    const gridRings = [0.35, 0.68, 1.0]
      .map((scale) => {
        const pts = axes
          .map((_, idx) => {
            const angle = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
            const x = (cx + maxR * scale * Math.cos(angle)).toFixed(1);
            const y = (cy + maxR * scale * Math.sin(angle)).toFixed(1);
            return `${x},${y}`;
          })
          .join(" ");
        return `<polygon points="${pts}" fill="none" stroke="var(--border-subtle)" stroke-width="1" />`;
      })
      .join("");

    const axisLines = axes
      .map((_, idx) => {
        const angle = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
        const x = (cx + maxR * Math.cos(angle)).toFixed(1);
        const y = (cy + maxR * Math.sin(angle)).toFixed(1);
        return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="var(--border-subtle)" stroke-width="1" />`;
      })
      .join("");

    const vertexDots = axes
      .map((item, idx) => {
        const angle = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
        const r = (item.score / 100) * maxR;
        const x = (cx + r * Math.cos(angle)).toFixed(1);
        const y = (cy + r * Math.sin(angle)).toFixed(1);
        return `<circle cx="${x}" cy="${y}" r="4" fill="var(--accent-1)" />`;
      })
      .join("");

    const dnaGrid = document.getElementById("dna-bento");
    dnaGrid.innerHTML = `
      <!-- Left Stack: Triple Expert Triad + 6-Axis Radar -->
      <div style="display:flex; flex-direction:column; gap:18px;">
        <div class="bento-card">
          <div class="bento-title-row">
            <div>
              <div class="bento-kicker">${esc(ui("triadKicker"))}</div>
              <h3 class="bento-heading">${esc(ui("triadTitle"))}</h3>
            </div>
            <span class="signal-tag">AZ-305 · SC-100 · AZ-400</span>
          </div>
          <div class="triad-grid">
            ${data.triad
              .map(
                (tr) => `
                <div class="triad-pillar">
                  <span class="triad-code">${esc(tr.code)}</span>
                  <div class="triad-name">${esc(t(tr.name))}</div>
                  <div class="triad-sub">${esc(t(tr.sub))}</div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>

        <div class="bento-card">
          <div class="bento-title-row">
            <div>
              <div class="bento-kicker">${esc(ui("radarKicker"))}</div>
              <h3 class="bento-heading">${esc(ui("radarTitle"))}</h3>
            </div>
          </div>
          <div class="radar-wrap">
            <svg class="radar-svg" viewBox="0 0 200 200">
              ${gridRings}
              ${axisLines}
              <polygon points="${polyPoints}" fill="var(--accent-soft)" stroke="var(--accent-1)" stroke-width="2.2" />
              ${vertexDots}
            </svg>
            <div class="radar-legend">
              ${axes
                .map(
                  (a) => `
                  <div class="radar-legend-item">
                    <span>${esc(t(a.axis))}</span>
                    <span class="radar-legend-score">${a.score}</span>
                  </div>
                `
                )
                .join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Stack: 6 Elite Distinctions + 8-Year Credential Velocity Chart -->
      <div style="display:flex; flex-direction:column; gap:18px;">
        <div class="bento-card">
          <div class="bento-title-row">
            <div>
              <div class="bento-kicker">${esc(ui("honorsKicker"))}</div>
              <h3 class="bento-heading">${esc(ui("honorsTitle"))}</h3>
            </div>
            <span class="signal-tag">TOP 1%</span>
          </div>
          <div class="honor-pills-grid">
            ${data.honors
              .map(
                (h) => `
                <div class="honor-tile">
                  <div class="honor-icon">${h.icon}</div>
                  <div>
                    <div class="honor-title">${esc(t(h.title))}</div>
                    <div class="honor-meta">${esc(h.meta)}</div>
                  </div>
                </div>
              `
              )
              .join("")}
          </div>
        </div>

        <div class="bento-card" style="flex:1; display:flex; flex-direction:column; justify-content:space-between;">
          <div class="bento-title-row" style="margin-bottom:4px;">
            <div>
              <div class="bento-kicker">${esc(ui("velocityKicker"))}</div>
              <h3 class="bento-heading">${esc(ui("velocityTitle"))}</h3>
            </div>
            <span class="signal-tag">120 CREDLY</span>
          </div>
          <div class="velocity-bars">
            ${[
              { yr: "19", n: 4 },
              { yr: "20", n: 19 },
              { yr: "21", n: 21 },
              { yr: "22", n: 29 },
              { yr: "23", n: 20 },
              { yr: "24", n: 11 },
              { yr: "25", n: 8 },
              { yr: "26", n: 8 }
            ]
              .map((b) => {
                const hPct = Math.max(14, Math.round((b.n / 29) * 74));
                return `
                  <div class="v-bar-col">
                    <span class="v-bar-num">${b.n}</span>
                    <div class="v-bar-track" style="height:${hPct}px"></div>
                    <span class="v-bar-yr">'${b.yr}</span>
                  </div>
                `;
              })
              .join("")}
          </div>
          <div class="velocity-domains">
            <span class="mini-chip">Certs · 30</span>
            <span class="mini-chip">OpenHack · 27</span>
            <span class="mini-chip">Kusto &amp; Data · 21</span>
            <span class="mini-chip">Hackathon &amp; Honors · 45</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderShipped() {
    document.getElementById("shipped-eyebrow").textContent = ui("shippedEyebrow");
    document.getElementById("shipped-title").textContent = ui("shippedTitle");

    document.getElementById("shipped-grid").innerHTML = data.shipped
      .map((s) => {
        const nodesHtml = s.nodes
          .map(
            (n, idx) => `
            <div class="ship-node">
              <div class="ship-node__k">${esc(n.k)}</div>
              <div class="ship-node__v">${esc(n.v)}</div>
            </div>
            ${idx < s.nodes.length - 1 ? '<span class="ship-arrow">→</span>' : ""}
          `
          )
          .join("");

        return `
          <article class="bento-card ship-card">
            <div>
              <div class="ship-top">
                <span class="ship-stat-badge">${esc(s.stat)}</span>
                <div style="display:flex; gap:6px;">
                  <a class="pill-action" href="${esc(s.liveUrl)}" target="_blank" rel="noopener noreferrer">${esc(
          ui("liveBtn")
        )}</a>
                  <a class="pill-action" href="${esc(s.repoUrl)}" target="_blank" rel="noopener noreferrer">${esc(
          ui("repoBtn")
        )}</a>
                </div>
              </div>
              <h3 class="ship-name">${esc(t(s.name))}</h3>
              <p class="ship-hook">${esc(t(s.hook))}</p>
            </div>

            <div class="ship-visual">${nodesHtml}</div>

            <div class="ship-bottom">
              <div class="chip-row">
                ${s.chips.map((c) => `<span class="mini-chip">${esc(c)}</span>`).join("")}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function getFilteredBadges() {
    return creds.filter((c) => {
      if (state.search) {
        const q = state.search.toLowerCase();
        const hay = `${c.name} ${c.issuer} ${c.skills.join(" ")} ${c.year}`.toLowerCase();
        return hay.includes(q);
      }
      if (state.orbit === "crown") return c.featured;
      if (state.orbit === "all") return true;
      if (state.orbit === "hackathons") {
        return c.category === "hackathons" || c.category === "leadership_community" || c.category === "teaching_mct";
      }
      return c.category === state.orbit;
    });
  }

  function renderConstellation() {
    document.getElementById("badge-eyebrow").textContent = ui("badgeEyebrow");
    document.getElementById("badge-title").textContent = ui("badgeTitle");
    document.getElementById("orbit-search").placeholder = ui("searchPlaceholder");

    const orbits = [
      { id: "crown", label: ui("orbitCrown") },
      { id: "all", label: ui("orbitAll") },
      { id: "certifications", label: ui("orbitCerts") },
      { id: "openhack", label: ui("orbitOpenhack") },
      { id: "data_kql", label: ui("orbitData") },
      { id: "hackathons", label: ui("orbitHack") }
    ];

    const pillsEl = document.getElementById("orbit-pills");
    pillsEl.innerHTML = orbits
      .map(
        (o) => `
        <button type="button" class="orbit-pill ${state.orbit === o.id ? "is-active" : ""}" data-orbit="${o.id}">
          ${esc(o.label)}
        </button>
      `
      )
      .join("");

    pillsEl.querySelectorAll("[data-orbit]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.orbit = btn.getAttribute("data-orbit");
        renderConstellation();
      });
    });

    const list = getFilteredBadges();
    const visible = state.orbit === "crown" && !state.search ? list.slice(0, 16) : list;
    const selected = creds.find((c) => c.id === state.selectedBadgeId) || visible[0] || creds[0];

    // Render Single Sleek Spotlight Inspector Bar
    const inspector = document.getElementById("badge-inspector");
    if (selected) {
      const imgHtml = selected.imageUrl
        ? `<img class="inspector-img" src="${esc(selected.imageUrl)}" alt="${esc(selected.name)}" />`
        : `<div class="medallion__fallback" style="width:60px;height:60px">${esc(selected.tier.slice(0, 4))}</div>`;

      inspector.innerHTML = `
        <div class="inspector-left">
          ${imgHtml}
          <div>
            <div class="inspector-meta">${esc(selected.tier.toUpperCase())} · ${esc(selected.issuedAt)} · ${esc(
        selected.issuer
      )}</div>
            <h3 class="inspector-title">${esc(selected.name)}</h3>
            <div class="chip-row">
              ${selected.skills
                .slice(0, 6)
                .map((sk) => `<span class="mini-chip">${esc(sk)}</span>`)
                .join("")}
            </div>
          </div>
        </div>
        <a class="portal-btn portal-btn--glow" href="${esc(selected.verifyUrl)}" target="_blank" rel="noopener noreferrer">
          ${esc(ui("verifyBtn"))}
        </a>
      `;
    }

    // Render Medallion Wall
    const wall = document.getElementById("medallion-wall");
    wall.innerHTML = visible
      .map((c) => {
        const isSel = selected && c.id === selected.id;
        const fb = esc(c.tier.slice(0, 4).toUpperCase());
        const thumb = c.imageUrl
          ? `<img class="medallion__img" src="${esc(c.imageUrl)}" alt="${esc(c.name)}" loading="lazy" onerror="this.outerHTML='<div class=\\'medallion__fallback\\'>${fb}</div>'" />`
          : `<div class="medallion__fallback">${fb}</div>`;

        return `
          <div class="medallion ${isSel ? "is-selected" : ""}" data-medallion-id="${esc(c.id)}" tabindex="0" role="button">
            ${thumb}
            <div class="medallion__name">${esc(c.name)}</div>
            <div class="medallion__year">${esc(c.year)} · ${esc(c.tier)}</div>
          </div>
        `;
      })
      .join("");

    wall.querySelectorAll("[data-medallion-id]").forEach((el) => {
      const selectIt = () => {
        state.selectedBadgeId = el.getAttribute("data-medallion-id");
        renderConstellation();
      };
      el.addEventListener("click", selectIt);
      el.addEventListener("mouseenter", selectIt);
    });
  }

  function renderEras() {
    document.getElementById("era-eyebrow").textContent = ui("eraEyebrow");
    document.getElementById("era-title").textContent = ui("eraTitle");

    document.getElementById("era-grid").innerHTML = data.eras
      .map(
        (e) => `
        <div class="bento-card era-card">
          <div class="era-year">${esc(e.year)}</div>
          <h3 class="era-role">${esc(t(e.role))}</h3>
          <div class="era-org">${esc(t(e.org))}</div>
          <div class="era-tags">
            ${e.tags.map((tg) => `<span class="mini-chip">${esc(tg)}</span>`).join("")}
          </div>
        </div>
      `
      )
      .join("");
  }

  function renderAll() {
    document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
    applyPalette(state.palette);
    renderHeroAndKpis();
    renderDnaBento();
    renderShipped();
    renderConstellation();
    renderEras();
    attachSpotlightCards();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCanvas();
    renderAll();

    document.querySelectorAll("[data-swatch]").forEach((btn) => {
      btn.addEventListener("click", () => applyPalette(btn.getAttribute("data-swatch")));
    });

    document.getElementById("lang-btn").addEventListener("click", () => {
      state.lang = state.lang === "en" ? "zh" : "en";
      const url = new URL(window.location.href);
      if (state.lang === "zh") url.searchParams.set("lang", "zh");
      else url.searchParams.delete("lang");
      window.history.replaceState({}, "", url);
      renderAll();
    });

    document.getElementById("orbit-search").addEventListener("input", (e) => {
      state.search = e.target.value.trim();
      renderConstellation();
    });
  });
})();
