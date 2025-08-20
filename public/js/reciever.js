// 👇 yaha apna Render backend ka URL lagao
const socket = io("https://realtimewhiteboard-p0se.onrender.com");

// fir tumhare events handle honge
socket.on("onsize", function(size) {
  ctx.lineWidth = size;
});
socket.on("oncolor", function(color) {
  ctx.strokeStyle = color;
});
socket.on("ontoolchange", function(tool) {
  handleToolChange(tool);
});
socket.on("onhamburger", function() {
  handleHamburger();
});
socket.on("onmousedown", function(point) {
  const { x, y, color, width } = point;
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  undoStack.push(point);
});
socket.on("onmousemove", function(point) {
  const { x, y, color, width } = point;
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.lineTo(x, y);
  ctx.stroke();
  undoStack.push(point);
});
socket.on("onundo", function() {
  undoMaker();
});
socket.on("onredo", function() {
  redoMaker();
});
socket.on("onthemeChange", (theme) => {
  canvasWrapper.classList.remove(...themeClasses);
  canvasWrapper.classList.add(theme);
  currentTheme = theme;

  themeOptions.forEach(opt => {
    opt.classList.remove("active");
    if (opt.getAttribute("data-theme") === theme) {
      opt.classList.add("active");
    }
  });
});
