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

// ── THEME TOGGLE (light / dark, sun / moon) ──
const html = document.documentElement;

// Restore saved theme (only light/dark now; anything else falls back to light)
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("portfolio-theme-v3");
} catch (_) {}
html.setAttribute("data-theme", savedTheme === "dark" ? "dark" : "light");

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next =
      html.getAttribute("data-theme") === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    try {
      localStorage.setItem("portfolio-theme-v3", next);
    } catch (_) {
      // storage can be unavailable in private browsing; the theme still applies
    }
  });
}

// ── SCROLL REVEAL ──
// If IntersectionObserver is unavailable, reveal everything immediately so
// no browser is ever left with hidden content.
if ("IntersectionObserver" in window) {
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
} else {
  document.querySelectorAll(".rv").forEach((el) => el.classList.add("on"));
}
