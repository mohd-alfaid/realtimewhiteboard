/****************************** Upload Image ************************************/

const uploadImg = document.querySelector(".upload-img");   // Upload button
const FileInput = document.querySelector(".input-img");    // Hidden file input

// ✅ Parent container for all uploaded images
const imageLayer = document.getElementById("image-layer");

// 🔹 Upload button click → trigger file input
uploadImg.addEventListener("click", function (e) {
  e.preventDefault();
  FileInput.value = ""; // same file re-upload fix
  FileInput.click();
});

// 🔹 File input change → create new image box
FileInput.addEventListener("change", function (e) {
  const imgBox = document.createElement("div");
  imgBox.setAttribute("class", "uploadedBox");

  // 🔹 Create image element
  const img = document.createElement("img");
  img.src = URL.createObjectURL(e.target.files[0]);
  imgBox.appendChild(img);

  // 🔹 Add Close button (Cut / Remove)
  const closeBtn = document.createElement("div");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "✕";
  imgBox.appendChild(closeBtn);

  // 🔹 Close button click → remove image box
  closeBtn.addEventListener("click", () => {
    imgBox.remove();
  });

  imageLayer.appendChild(imgBox); // ✅ Append to image layer

  // 🔹 Release object URL after image loads
  img.onload = () => URL.revokeObjectURL(img.src);

  /******************* Drag & Move functionality *******************/
  let isDragging = false; 
  let offsetX, offsetY;

  imgBox.addEventListener("mousedown", (event) => {
    // Ignore drag if resize handle or close button is clicked
    if (event.target.classList.contains("resize-handle") || event.target.classList.contains("close-btn")) return;

    isDragging = true;
    offsetX = event.clientX - imgBox.offsetLeft;
    offsetY = event.clientY - imgBox.offsetTop;
    imgBox.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (event) => {
    if (isDragging) {
      imgBox.style.left = event.clientX - offsetX + "px";
      imgBox.style.top = event.clientY - offsetY + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    imgBox.style.cursor = "move";
  });

  /******************* Resize functionality *******************/
  const resizeHandle = document.createElement("div");
  resizeHandle.classList.add("resize-handle");
  imgBox.appendChild(resizeHandle);

  let isResizing = false;

  resizeHandle.addEventListener("mousedown", (e) => {
    e.stopPropagation(); // Prevent triggering drag
    isResizing = true;
  });

  document.addEventListener("mousemove", (e) => {
    if (isResizing) {
      let newWidth = e.clientX - imgBox.getBoundingClientRect().left;
      let newHeight = e.clientY - imgBox.getBoundingClientRect().top;

      imgBox.style.width = newWidth + "px";
      imgBox.style.height = newHeight + "px";
      img.style.width = "100%";
      img.style.height = "100%";
    }
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
  });
});

/*********************************** Download Image *******************************/

const downloadTool = document.querySelector(".download-tool");

downloadTool.addEventListener("click", function (e) {
  const a = document.createElement("a");
  a.download = "file.png";                  
  a.href = board.toDataURL("image/png");   
  a.click();                               
  a.remove();
});
