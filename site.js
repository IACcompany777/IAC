(function () {
  const { contacts, projects, nav, ui, pages } = window.SITE;
  const pageKey = document.body.dataset.page;
  const page = pages[pageKey] || pages.home;
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const LOGO = '<svg viewBox="180 375 580 250" aria-hidden="true"><rect x="180" y="375" width="60" height="250" fill="#F4F6F8"/><polygon fill="#C6F135" points="270,625 362,375 422,375 514,625 450,625 392,467 334,625"/><path d="M736.2 432.8 A95 95 0 1 0 736.2 567.2" fill="none" stroke="#F4F6F8" stroke-width="60"/></svg>';
  const COMMANDS = ["iac build telegram-bot", "iac automate --boring-stuff", "iac deploy website", "iac fix bugs"];

  let lang = pickLanguage();
  let renderId = 0;

  function pickLanguage() {
    let saved = null;
    try { saved = localStorage.getItem("lang"); } catch {}
    if (saved === "en" || saved === "uk") return saved;
    return (navigator.language || "").toLowerCase().startsWith("uk") ? "uk" : "en";
  }

  const tr = (value) => (value && typeof value === "object" && "en" in value ? value[lang] : value);

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function link(href, className, text) {
    const node = el("a", className, text);
    node.href = href;
    return node;
  }

  function section(title) {
    const block = el("section", "block");
    const wrap = el("div", "wrap");
    block.append(wrap);
    if (title) wrap.append(el("h2", "", tr(title)));
    return { block, wrap };
  }

  /* Header and footer */
  function renderHeader() {
    const header = document.querySelector("header");
    header.replaceChildren();
    const bar = el("div", "wrap bar");

    const brand = link("index.html", "brand");
    brand.setAttribute("aria-label", "IAC");
    brand.innerHTML = LOGO;

    const menu = el("nav");
    menu.id = "site-nav";
    const list = el("ul");
    const current = location.pathname.split("/").pop() || "index.html";
    nav.forEach(([href, label]) => {
      const item = el("li");
      const anchor = link(href, "", tr(label));
      const isServicePage = href === "services.html" && ["bots", "automation", "websites"].includes(pageKey);
      if (href === current || isServicePage) anchor.setAttribute("aria-current", "page");
      item.append(anchor);
      list.append(item);
    });
    menu.append(list);

    const right = el("div", "bar-right");
    const languages = el("div", "lang");
    languages.setAttribute("role", "group");
    languages.setAttribute("aria-label", "Language");
    [["en", "EN"], ["uk", "UA"]].forEach(([code, label]) => {
      const button = el("button", "", label);
      button.type = "button";
      button.setAttribute("aria-pressed", String(code === lang));
      button.addEventListener("click", () => {
        lang = code;
        try { localStorage.setItem("lang", code); } catch {}
        render();
      });
      languages.append(button);
    });

    const toggle = el("button", "menu-button", tr(ui.menu));
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "site-nav");
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    right.append(menu, languages, toggle);
    bar.append(brand, right);
    const progress = el("div");
    progress.id = "progress";
    progress.setAttribute("aria-hidden", "true");
    header.append(bar, progress);
  }

  function renderFooter() {
    const footer = document.querySelector("footer");
    footer.replaceChildren();
    const foot = el("div", "wrap foot");

    const about = el("div");
    about.append(el("h3", "", "IAC"), el("p", "", tr(ui.rights)), el("p", "", tr(ui.location)));
    if (contacts.email) {
      const line = el("p");
      line.append(link(`mailto:${contacts.email}`, "", contacts.email));
      about.append(line);
    }
    if (contacts.telegram) {
      const line = el("p");
      line.append(link(`https://t.me/${contacts.telegram}`, "", `@${contacts.telegram}`));
      about.append(line);
    }

    const column = (title, items) => {
      const box = el("div");
      const list = el("ul");
      items.forEach(([href, label]) => {
        const item = el("li");
        item.append(link(href, "", tr(label)));
        list.append(item);
      });
      box.append(el("h3", "", tr(title)), list);
      return box;
    };

    foot.append(
      about,
      column(ui.servicesLabel, [
        ["telegram-bots.html", pages.bots.blocks[0].eyebrow],
        ["automation.html", pages.automation.blocks[0].eyebrow],
        ["websites.html", pages.websites.blocks[0].eyebrow],
      ]),
      column(ui.pages, nav.filter(([href]) => href !== "services.html"))
    );
    footer.append(foot);
  }

  /* Page blocks */
  const blocks = {
    hero(data) {
      const area = el("div", "hero-area");
      const canvas = el("canvas");
      canvas.id = "sky";
      canvas.setAttribute("aria-hidden", "true");
      const hero = el("div", data.big ? "wrap hero big" : "wrap hero");
      hero.append(el("p", "eyebrow", tr(data.eyebrow)), el("h1", "", tr(data.title)), el("p", "lead", tr(data.lead)));

      if (data.terminal) {
        const line = el("p", "typed");
        line.setAttribute("aria-hidden", "true");
        const typed = el("span");
        line.append(el("span", "prompt", "$"), " ", typed, el("span", "cursor"));
        hero.append(line);
        typeCommands(typed, renderId);
      }
      let score = null;
      if (data.game) {
        score = el("p", "score", `${tr(ui.game.score)}: 0`);
        score.setAttribute("aria-live", "polite");
        hero.append(score);
      }
      if (data.button) hero.append(link(data.button.href, "button", tr(data.button.text)));

      area.append(canvas, hero);
      queueMicrotask(() => setupSky(area, canvas, score));
      return area;
    },

    cards(data) {
      const { block, wrap } = section(data.title);
      const grid = el("div", data.items.length % 2 === 0 && data.items.length < 6 ? "grid two" : "grid");
      data.items.forEach((item) => {
        const card = item.href ? link(item.href, "card") : el("article", "card");
        card.append(el("h3", "", tr(item.title)), el("p", "", tr(item.text)));
        if (item.href) card.append(el("span", "more", `${tr(ui.learnMore)} ->`));
        grid.append(card);
      });
      wrap.append(grid);
      return block;
    },

    checks(data) {
      const { block, wrap } = section(data.title);
      const list = el("ul", "checks");
      data.items.forEach((item) => list.append(el("li", "", tr(item))));
      wrap.append(list);
      return block;
    },

    steps(data) {
      const { block, wrap } = section(data.title);
      const list = el("ol", "steps");
      data.items.forEach((item) => list.append(el("li", "", tr(item))));
      wrap.append(list);
      return block;
    },

    timeline(data) {
      const { block, wrap } = section();
      const list = el("ol", "timeline");
      data.items.forEach((item) => {
        const row = el("li");
        row.append(el("h3", "", tr(item.title)), el("p", "", tr(item.text)));
        list.append(row);
      });
      wrap.append(list);
      return block;
    },

    text(data) {
      const { block, wrap } = section(data.title);
      const prose = el("div", "prose");
      data.paragraphs.forEach((paragraph) => prose.append(el("p", "", tr(paragraph))));
      wrap.append(prose);
      return block;
    },

    projects(data) {
      const { block, wrap } = section(data.title);
      const list = el("div", "grid two");
      list.style.gridTemplateColumns = "1fr";
      projects.forEach((project) => {
        const card = el("article", "card project");
        const body = el("div");
        body.append(el("h3", "", tr(project.title)), el("p", "", tr(project.text)), el("p", "tags", project.tags));
        card.append(body);
        if (project.link) card.append(link(project.link, "", tr(ui.viewProject)));
        list.append(card);
      });
      wrap.append(list, el("p", "note", tr(ui.moreProjects)));
      return block;
    },

    faq(data) {
      const { block, wrap } = section();
      const box = el("div");
      data.items.forEach((item) => {
        const row = el("details");
        row.append(el("summary", "", tr(item.q)), el("p", "", tr(item.a)));
        box.append(row);
      });
      wrap.append(box);
      return block;
    },

    cta(data) {
      const { block, wrap } = section();
      block.classList.add("cta");
      wrap.append(el("h2", "", tr(data.title)), el("p", "", tr(data.text)), link(data.button.href, "button", tr(data.button.text)));
      return block;
    },

    calculator() {
      const text = ui.calc;
      const { block, wrap } = section(text.title);
      const fields = el("div", "calc-inputs");
      const inputs = [[text.minutes, 15], [text.times, 10], [text.people, 1]].map(([label, value]) => {
        const box = el("label", "", tr(label));
        const input = el("input");
        input.type = "number";
        input.min = "0";
        input.value = value;
        box.append(input);
        fields.append(box);
        return input;
      });
      const result = el("div", "calc-result");
      result.setAttribute("aria-live", "polite");
      const line = el("div");
      const number = el("span", "calc-number", "0");
      line.append(number, el("span", "calc-label", tr(text.result)));
      const days = el("p");
      result.append(line, days, el("p", "", tr(text.note)));

      function update() {
        const [minutes, times, people] = inputs.map((input) => Math.max(Number(input.value) || 0, 0));
        const hours = Math.round((minutes * times * people * 52) / 60);
        number.textContent = hours.toLocaleString(lang === "uk" ? "uk-UA" : "en-US");
        days.textContent = tr(text.days).replace("{n}", Math.round(hours / 8).toLocaleString(lang === "uk" ? "uk-UA" : "en-US"));
      }
      inputs.forEach((input) => input.addEventListener("input", update));
      update();
      wrap.append(el("p", "lead", tr(text.lead)), fields, result);
      return block;
    },

    brief() {
      const text = ui.brief;
      const { block, wrap } = section(text.title);
      const form = el("form", "form");
      form.noValidate = true;

      const field = (label, control) => {
        const box = el("label", "", tr(label));
        box.append(control);
        return box;
      };
      const name = el("input");
      name.autocomplete = "name";
      const type = el("select");
      text.types.forEach((option) => type.append(el("option", "", tr(option))));
      const task = el("textarea");
      task.required = true;
      const deadline = el("input");
      const budget = el("input");

      const top = el("div", "form-row");
      top.append(field(text.name, name), field(text.type, type));
      const bottom = el("div", "form-row");
      bottom.append(field(text.deadline, deadline), field(text.budget, budget));

      const actions = el("div", "form-actions");
      const send = el("button", "button", tr(text.send));
      send.type = "submit";
      const copy = el("button", "button ghost", tr(text.copy));
      copy.type = "button";
      actions.append(send, copy);
      const status = el("p", "status");
      status.setAttribute("role", "status");

      const message = () => [
        `${tr(text.name)}: ${name.value.trim() || "-"}`,
        `${tr(text.type)}: ${type.value}`,
        `${tr(text.deadline)}: ${deadline.value.trim() || "-"}`,
        `${tr(text.budget)}: ${budget.value.trim() || "-"}`,
        "",
        task.value.trim(),
      ].join("\n");

      const hasTask = () => {
        if (task.value.trim()) return true;
        status.textContent = tr(text.needTask);
        task.focus();
        return false;
      };

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!hasTask()) return;
        status.textContent = tr(text.opened);
        location.href = `mailto:${contacts.email}?subject=${encodeURIComponent(tr(text.subject))}&body=${encodeURIComponent(message())}`;
      });
      copy.addEventListener("click", async () => {
        if (!hasTask()) return;
        try {
          await navigator.clipboard.writeText(message());
          status.textContent = tr(text.copied);
        } catch {
          status.textContent = tr(text.copyFailed);
        }
      });

      form.append(top, field(text.task, task), bottom, actions, status);
      wrap.append(el("p", "lead", tr(text.lead)), form);
      return block;
    },

    contacts(data) {
      const { block, wrap } = section(data.title);
      const box = el("div", "contacts");
      if (contacts.email) box.append(link(`mailto:${contacts.email}`, "button", tr(ui.emailMe)));
      if (contacts.telegram) box.append(link(`https://t.me/${contacts.telegram}`, "button ghost", "Telegram"));
      if (contacts.upwork) box.append(link(contacts.upwork, "button ghost", "Upwork"));
      if (contacts.github) box.append(link(contacts.github, "button ghost", "GitHub"));
      wrap.append(box);
      return block;
    },
  };

  /* Animation */
  async function typeCommands(target, id) {
    if (calm) { target.textContent = COMMANDS[0]; return; }
    const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
    for (let i = 0; id === renderId; i = (i + 1) % COMMANDS.length) {
      const command = COMMANDS[i];
      for (let n = 1; n <= command.length && id === renderId; n++) { target.textContent = command.slice(0, n); await sleep(55); }
      await sleep(1600);
      for (let n = command.length; n >= 0 && id === renderId; n--) { target.textContent = command.slice(0, n); await sleep(22); }
      await sleep(250);
    }
  }

  function setupReveal() {
    if (calm || !("IntersectionObserver" in window)) return;
    const seen = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        seen.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll("section.block").forEach((block) => {
      block.classList.add("reveal");
      seen.observe(block);
    });
  }

  function setupSky(area, canvas, scoreLine) {
    const ctx = canvas.getContext("2d");
    if (!ctx || (calm && !scoreLine)) return;

    const random = (min, max) => min + Math.random() * (max - min);
    let width = 0, height = 0, pointer = null, visible = true, running = false, score = 0;
    let carets = [], sparks = [];

    const makeCaret = (y) => ({
      x: random(0, width), y, size: random(scoreLine ? 16 : 8, scoreLine ? 30 : 22), speed: random(.15, scoreLine ? 1 : .55),
      sway: random(0, 6.3), turn: random(-.4, .4), lime: Math.random() < .6, alpha: scoreLine ? .7 : random(.14, .36), pushX: 0, pushY: 0,
    });

    function resize() {
      const box = area.getBoundingClientRect();
      const scale = Math.min(devicePixelRatio || 1, 2);
      width = box.width; height = box.height;
      canvas.width = width * scale; canvas.height = height * scale;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
      const count = Math.min(36, Math.floor(width / 34));
      carets = Array.from({ length: count }, () => makeCaret(random(0, height)));
    }

    function drawCaret(x, y, size, turn, color, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(turn);
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(2, size * .26);
      ctx.beginPath();
      ctx.moveTo(-size * .5, size * .55);
      ctx.lineTo(0, -size * .55);
      ctx.lineTo(size * .5, size * .55);
      ctx.stroke();
      ctx.restore();
    }

    function frame() {
      if (!canvas.isConnected || !visible) { running = false; return; }
      ctx.clearRect(0, 0, width, height);
      for (const c of carets) {
        c.sway += .012;
        if (pointer && !scoreLine) {
          const dx = c.x - pointer.x, dy = c.y - pointer.y, distance = Math.hypot(dx, dy) || 1;
          if (distance < 140) {
            const force = (140 - distance) / 140;
            c.pushX += (dx / distance) * force * .7;
            c.pushY += (dy / distance) * force * .7;
          }
        }
        c.x += Math.sin(c.sway) * .25 + c.pushX;
        c.y += c.pushY - c.speed;
        c.pushX *= .92; c.pushY *= .92;
        if (c.y < -30) Object.assign(c, makeCaret(height + 30));
        drawCaret(c.x, c.y, c.size, c.turn + Math.sin(c.sway) * .2, c.lime ? "#c6f135" : "#f4f6f8", c.alpha);
      }
      sparks = sparks.filter((s) => s.life > 0);
      for (const s of sparks) {
        s.x += s.vx; s.y += s.vy; s.vy += .09; s.turn += s.spin; s.life -= .018;
        drawCaret(s.x, s.y, s.size, s.turn, s.lime ? "#c6f135" : "#f4f6f8", Math.max(s.life, 0));
      }
      requestAnimationFrame(frame);
    }

    function start() {
      if (running || !visible) return;
      running = true;
      requestAnimationFrame(frame);
    }

    function position(event) {
      const box = area.getBoundingClientRect();
      return { x: event.clientX - box.left, y: event.clientY - box.top };
    }

    function burst(x, y) {
      for (let i = 0; i < 18; i++) {
        const angle = random(0, 6.3), power = random(2, 7);
        sparks.push({
          x, y, vx: Math.cos(angle) * power, vy: Math.sin(angle) * power - 2, size: random(8, 18),
          turn: random(0, 6.3), spin: random(-.2, .2), lime: Math.random() < .75, life: 1,
        });
      }
    }

    area.addEventListener("pointermove", (event) => { if (event.pointerType === "mouse") pointer = position(event); });
    area.addEventListener("pointerleave", () => { pointer = null; });
    area.addEventListener("pointerdown", (event) => {
      if (event.target.closest("a")) return;
      const { x, y } = position(event);
      burst(x, y);
      if (!scoreLine) return;
      const hit = carets.find((c) => Math.hypot(c.x - x, c.y - y) < c.size + 16);
      if (!hit) return;
      score += 1;
      scoreLine.textContent = `${tr(ui.game.score)}: ${score}`;
      Object.assign(hit, makeCaret(height + 30));
    });

    new ResizeObserver(resize).observe(area);
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    }).observe(area);
    resize();
    start();
  }

  function updateProgress() {
    const bar = document.getElementById("progress");
    if (!bar) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  }

  function render() {
    renderId += 1;
    document.documentElement.lang = lang;
    renderHeader();
    const main = document.querySelector("main");
    main.replaceChildren(...page.blocks.map((block) => blocks[block.type](block)));
    renderFooter();
    setupReveal();
    updateProgress();
  }

  addEventListener("scroll", updateProgress, { passive: true });
  addEventListener("resize", updateProgress);
  render();
})();
