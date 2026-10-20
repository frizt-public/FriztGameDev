// Логика сайта: язык, отрисовка проектов/команды/галереи, форма заявки.
(function () {
  var CFG = window.SITE_CONFIG;
  var T = window.I18N;
  var C = window.CONTENT;
  var lang = "ru";
  try { lang = localStorage.getItem("lang") || CFG.defaultLang; } catch (e) { lang = CFG.defaultLang; }
  if (!T[lang]) lang = CFG.defaultLang;

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function tr(obj) { return typeof obj === "string" ? obj : (obj[lang] || obj.ru || ""); }
  function t(key) { return T[lang][key] || key; }

  function stars(r) {
    var full = Math.round(r), s = "";
    for (var i = 1; i <= 5; i++) s += i <= full ? "★" : "☆";
    return s;
  }

  function renderProjects() {
    $("projectsGrid").innerHTML = C.projects.map(function (p) {
      var actions = "";
      if (p.play) actions += '<a class="btn btn--primary btn--sm" href="' + esc(p.play) + '" target="_blank" rel="noopener">' + t("play") + "</a>";
      if (p.repo) actions += '<a class="btn btn--ghost btn--sm" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + t("repo") + "</a>";
      if (!p.play) actions += '<span class="soon">' + t("soon") + "</span>";
      return '<article class="card">' +
        '<img class="card__img" src="' + esc(p.image) + '" alt="' + esc(tr(p.title)) + '" loading="lazy">' +
        '<div class="card__body"><h3>' + esc(tr(p.title)) + "</h3>" +
        "<p>" + esc(tr(p.desc)) + "</p>" +
        '<div class="tags">' + p.tags.map(function (g) { return '<span class="tag">' + esc(g) + "</span>"; }).join("") + "</div>" +
        '<div class="card__actions">' + actions + "</div></div></article>";
    }).join("");
  }

  function renderTeam() {
    $("teamGrid").innerHTML = C.team.map(function (m) {
      return '<article class="card member"><img src="' + esc(m.photo) + '" alt="' + esc(m.name) + '" loading="lazy">' +
        "<h3>" + esc(m.name) + "</h3>" +
        '<p class="role">' + esc(tr(m.role)) + "</p>" +
        '<div class="stars" title="' + t("rating") + '">' + stars(m.rating) + "<small>" + m.rating.toFixed(1) + "</small></div></article>";
    }).join("");
  }

  function renderGallery() {
    $("galleryGrid").innerHTML = C.gallery.map(function (g) {
      return '<button type="button" data-src="' + esc(g.src) + '" aria-label="' + esc(tr(g.alt)) + '">' +
        '<img src="' + esc(g.src) + '" alt="' + esc(tr(g.alt)) + '" loading="lazy"></button>';
    }).join("");
  }

  function renderCeo() {
    var c = CFG.company.ceo;
    if (!c) { $("ceo").hidden = true; return; }
    $("ceo").innerHTML = '<img src="' + esc(c.photo) + '" alt="' + esc(c.name) + '">' +
      "<div><span class=\"ceo__role\">" + esc(tr(c.role)) + "</span>" +
      "<h3>" + esc(c.name) + "</h3>" +
      "<p class=\"ceo__edu\"><b>" + t("ceo_edu") + ":</b> " + esc(tr(c.education)) + "</p>" +
      "<p>" + esc(tr(c.bio)) + "</p></div>";
  }

  function renderStatic() {
    $("aboutPoints").innerHTML = t("about_points").map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");
    var sel = $("topicSelect"), cur = sel.selectedIndex;
    sel.innerHTML = t("topics").map(function (x, i) { return '<option value="' + i + '">' + esc(x) + "</option>"; }).join("");
    sel.selectedIndex = cur > 0 ? cur : 0;
    var co = CFG.company;
    $("contactLinks").innerHTML =
      "<li>✉ <a href=\"mailto:" + esc(co.email) + '">' + esc(co.email) + "</a></li>" +
      '<li>✈ <a href="' + esc(co.telegram) + '" target="_blank" rel="noopener">Telegram</a></li>' +
      '<li>⌘ <a href="' + esc(co.github) + '" target="_blank" rel="noopener">GitHub</a></li>' +
      "<li>⌖ " + esc(tr(co.city)) + "</li>";
  }

  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("#lang button").forEach(function (b) { b.classList.toggle("active", b.dataset.lang === lang); });
    renderStatic(); renderCeo(); renderProjects(); renderTeam(); renderGallery();
  }

  // Базовые данные компании
  $("brandName").textContent = CFG.company.name;
  $("footBrand").textContent = CFG.company.name;
  $("statSince").textContent = CFG.company.founded;
  $("statGames").textContent = C.projects.length;
  $("year").textContent = new Date().getFullYear();

  // Переключатель языка
  $("lang").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-lang]");
    if (!b) return;
    lang = b.dataset.lang;
    try { localStorage.setItem("lang", lang); } catch (err) {}
    applyLang();
  });

  // Мобильное меню
  $("burger").addEventListener("click", function () { $("nav").classList.toggle("open"); });
  $("nav").addEventListener("click", function () { $("nav").classList.remove("open"); });

  // Лайтбокс галереи
  $("galleryGrid").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-src]");
    if (!b) return;
    $("lightboxImg").src = b.dataset.src;
    $("lightbox").hidden = false;
  });
  $("lightbox").addEventListener("click", function () { $("lightbox").hidden = true; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") $("lightbox").hidden = true; });

  // Форма заявки
  var form = $("leadForm"), status = $("formStatus"), btn = $("submitBtn");
  function setStatus(cls, msg) { status.className = "status " + cls; status.textContent = msg; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements;
    var name = f.name.value.trim(), contact = f.contact.value.trim(), message = f.message.value.trim();
    if (!name || !contact || message.length < 5 || !f.consent.checked) { setStatus("err", t("s_invalid")); return; }

    btn.disabled = true;
    setStatus("", t("s_sending"));
    fetch(CFG.formEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        contact: contact,
        topic: t("topics")[f.topic.value] || "",
        message: message,
        lang: lang,
        website: f.website.value // honeypot
      })
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { return { ok: r.ok && d.ok, d: d }; }); })
      .then(function (res) {
        if (res.ok) { setStatus("ok", t("s_ok")); form.reset(); }
        else setStatus("err", res.d && res.d.error === "invalid" ? t("s_invalid") : t("s_err"));
      })
      .catch(function () { setStatus("err", t("s_err")); })
      .then(function () { btn.disabled = false; });
  });

  applyLang();
})();
