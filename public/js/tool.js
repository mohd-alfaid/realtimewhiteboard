// ======================= Socket & Canvas Setup ==========================
const socket = io.connect("https://realtime-whiteboard-9kpz.onrender.com");

const board = document.querySelector(".board");
board.height = window.innerHeight;
board.width = window.innerWidth;

const ctx = board.getContext("2d");
ctx.strokeStyle = "blue";           // Default pencil color
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
ctx.imageSmoothingQuality = "high";
ctx.lineWidth = 3;                  // Default pencil size

// ======================= Pencil / Eraser Size ===========================
function sizeChange(value) {
  ctx.lineWidth = value;
  socket.emit("size", value);

  // 🔹 Auto-hide pencil and eraser options after size select
  hideAllToolOptions();
}

// ======================= Tool Change ===========================
function handleLocaltoolChange(tool) {
  handleToolChange(tool);  // existing function
  socket.emit("toolchange", tool);

  // 🔹 Show options for current tool
  hideAllToolOptions(); // hide all first
  const toolOptions = document.querySelector(`.tool-options.${tool}`);
  if (toolOptions) toolOptions.style.display = "block";
}

// ======================= Color Change ===========================
function handleColorChange(color) {
  ctx.strokeStyle = color;
  socket.emit("color", color);

  // 🔹 Auto-hide pencil options after color select
  hideAllToolOptions();
}

// ======================= Hamburger Menu ===========================
const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function () {
  handleHamburger();   // existing function
  socket.emit("hamburger");
});

// ======================= Helper Function: Hide All Tool Options ===========================
function hideAllToolOptions() {
  document.querySelectorAll(".tool-options").forEach(opt => {
    opt.style.display = "none";
  });
}

// ======================= Optional: Initialize Tools ===========================
// Pehle page load pe sab tool options hide kare
hideAllToolOptions();
