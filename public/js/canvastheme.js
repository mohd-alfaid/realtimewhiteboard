// ======================= Theme + Socket Integration ==========================
const themeBtn = document.getElementById("theme-toggle");
const themePanel = document.getElementById("theme-panel");
const themeOptions = document.querySelectorAll(".theme-option");
const canvasWrapper = document.getElementById("canvas-wrapper");

// 🎨 List of all theme classes (include Disney + Marvel + others)
const themeClasses = [
  "canvas-normal",
  "canvas-dots",
  "canvas-grid",
  "canvas-ruled",
  "canvas-frozen",
  "canvas-tangled",
  "canvas-moana",
  "canvas-avengers",
  "canvas-ironman",
  "canvas-thor",
  "canvas-guardians",
  "canvas-drstrange",
  "canvas-dark",
  "canvas-luxury",
  "canvas-pastel",
  "canvas-sky",
  "canvas-ocean",
  "canvas-marble",
  "canvas-graph",
  "canvas-night"
];

// Default theme
let currentTheme = "canvas-normal";
canvasWrapper.classList.add(currentTheme);

// Toggle theme panel
themeBtn.addEventListener("click", () => {
  themePanel.classList.toggle("hidden");
});

// ================= Apply selected theme & emit to server ====================
themeOptions.forEach(option => {
  option.addEventListener("click", () => {
    const selectedTheme = option.getAttribute("data-theme");

    // 🔹 Local apply
    canvasWrapper.classList.remove(...themeClasses);
    canvasWrapper.classList.add(selectedTheme);
    currentTheme = selectedTheme;

    // Highlight active option
    themeOptions.forEach(opt => opt.classList.remove("active"));
    option.classList.add("active");

    // 🔹 Emit to server for other clients
    socket.emit("themeChange", selectedTheme);
  });
});

// ================= Reset to default on reload ===============================
window.addEventListener("load", () => {
  canvasWrapper.classList.remove(...themeClasses);
  canvasWrapper.classList.add("canvas-normal");
  currentTheme = "canvas-normal";

  themeOptions.forEach(opt => {
    opt.classList.remove("active");
    if (opt.getAttribute("data-theme") === "canvas-normal") {
      opt.classList.add("active");
    }
  });
});

// ======================= Receive theme change from other clients ===========
socket.on("onthemeChange", (theme) => {
  // 🔹 Apply received theme
  canvasWrapper.classList.remove(...themeClasses);
  canvasWrapper.classList.add(theme);
  currentTheme = theme;

  // Highlight active option
  themeOptions.forEach(opt => {
    opt.classList.remove("active");
    if (opt.getAttribute("data-theme") === theme) {
      opt.classList.add("active");
    }
  });
});
