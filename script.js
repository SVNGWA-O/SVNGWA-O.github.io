// ── CUSTOM CURSOR ──
const cur = document.getElementById("cur");
const ring = document.getElementById("ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  cur.style.left = mx + "px";
  cur.style.top = my + "px";
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  ring.style.left = rx + "px";
  ring.style.top = ry + "px";
  requestAnimationFrame(tick);
})();

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cur.style.transform = "translate(-50%,-50%) scale(2.2)";
    cur.style.background = "var(--text)";
  });
  el.addEventListener("mouseleave", () => {
    cur.style.transform = "translate(-50%,-50%) scale(1)";
    cur.style.background = "var(--glow)";
  });
});

// ── THEME SWITCHER ──
const html = document.documentElement;

document.querySelectorAll(".tbn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const t = btn.dataset.t;
    html.setAttribute("data-theme", t);
    document
      .querySelectorAll(".tbn")
      .forEach((b) => b.classList.toggle("active", b === btn));
    localStorage.setItem("portfolio-theme-v2", t);
  });
});

// Restore saved theme on load (v2 key so the new light default applies to
// visitors who saved a theme on the old site)
const savedTheme = localStorage.getItem("portfolio-theme-v2");
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme);
  document.querySelectorAll(".tbn").forEach((b) => {
    b.classList.toggle("active", b.dataset.t === savedTheme);
  });
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".rv").forEach((el) => observer.observe(el));
