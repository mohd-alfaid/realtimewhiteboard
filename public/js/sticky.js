// ================== DOM Ready Event ==================
document.addEventListener("DOMContentLoaded", () => {
    // Toolbar ke andar Sticky Note icon find kar raha hai
    const stickyIcon = document.querySelector("img[src='NewIcons/StickyNote.svg']");

    // Agar icon mila to uspe click event lagao
    if (stickyIcon) {
        stickyIcon.addEventListener("click", createSticky);
    } else {
        console.error("Sticky Note icon not found in DOM."); // Debugging ke liye error msg
    }

    // ================== Sticky Note Create Function ==================
    function createSticky() {
        // Count kitne sticky notes already present hain, aur uske basis pe note number set
        let noteNumber = document.querySelectorAll(".sticky-pad").length + 1;

        // --- Main sticky container create karna ---
        const stickyPad = document.createElement("div");
        stickyPad.classList.add("sticky-pad"); // CSS class assign
        stickyPad.style.left = "150px"; // Default left position
        stickyPad.style.top = "150px";  // Default top position
        stickyPad.style.transform = "none"; // Center wala transform remove kiya

        // --- Nav Bar create karna ---
        const navBar = document.createElement("div");
        navBar.classList.add("nav");

        // --- Title text (Sticky Note (n)) ---
        const title = document.createElement("div");
        title.classList.add("sticky-title");
        title.textContent = `Sticky Note (${noteNumber})`; // Numbering add karta hai

        // --- Minimize button ---
        const minBtn = document.createElement("div");
        minBtn.classList.add("minimize");

        // --- Close button ---
        const closeBtn = document.createElement("div");
        closeBtn.classList.add("close");

        // NavBar ke andar Title, Minimize aur Close buttons append
        navBar.appendChild(title);
        navBar.appendChild(minBtn);
        navBar.appendChild(closeBtn);
        stickyPad.appendChild(navBar);

        // --- Color selection bar ---
        const colorBar = document.createElement("div");
        colorBar.classList.add("sticky-color-bar");

        // Available colors ka list
        const colors = ["black", "red", "blue", "green", "purple", "orange", "brown", "pink"];
        let currentColor = "black"; // Default text color

        // Har ek color ke liye ek button banate hain
        colors.forEach(col => {
            const btn = document.createElement("div");
            btn.classList.add("color-btn");
            btn.style.background = col; // Button ka background usi color ka hoga
            btn.addEventListener("click", () => {
                currentColor = col; // Current color update hoga
                if (!textarea.classList.contains("placeholder")) {
                    textarea.style.color = currentColor; // Text ka color change karega
                }
            });
            colorBar.appendChild(btn);
        });

        // --- Editable Area (textarea) ---
        const textarea = document.createElement("textarea");
        textarea.placeholder = "Write something..."; // Placeholder text
        textarea.style.color = currentColor; // Default color black set

        // Color bar aur text area sticky pad me add karo
        stickyPad.appendChild(colorBar);
        stickyPad.appendChild(textarea);

        // Pure sticky note ko body me append kar do
        document.body.appendChild(stickyPad);

        // --- Close button ka logic ---
        closeBtn.addEventListener("click", () => {
            stickyPad.remove(); // Sticky note remove kar do
            updateStickyNumbers(); // Baaki notes ka numbering update
        });

        // --- Minimize button ka logic ---
        minBtn.addEventListener("click", () => {
            const isHidden = textarea.style.display === "none"; // Check agar hidden hai
            textarea.style.display = isHidden ? "block" : "none"; // Toggle textarea
            colorBar.style.display = isHidden ? "flex" : "none"; // Toggle color bar
        });

        // --- Drag functionality enable karo ---
        enableDrag(stickyPad, navBar);
    }

    // ================== Sticky Note Number Update ==================
    function updateStickyNumbers() {
        // Har ek sticky note title ko uska correct number assign karta hai
        document.querySelectorAll(".sticky-pad .sticky-title").forEach((title, index) => {
            title.textContent = `Sticky Note (${index + 1})`;
        });
    }

    // ================== Drag Functionality ==================
    function enableDrag(sticky, handle) {
        let offsetX, offsetY, isDragging = false;

        // Mouse dabane par drag start hota hai
        handle.addEventListener("mousedown", (e) => {
            isDragging = true;
            // Mouse ki position aur sticky note ke offset calculate karte hain
            offsetX = e.clientX - sticky.offsetLeft;
            offsetY = e.clientY - sticky.offsetTop;
            sticky.style.transition = "none"; // Smooth transition band (taaki drag snap na ho)
            document.addEventListener("mousemove", move); // Mouse move par call
            document.addEventListener("mouseup", stopDrag); // Mouse chhodne par stop
        });

        // Move function: mouse ke sath sticky note chalne lagega
        function move(e) {
            if (!isDragging) return;
            sticky.style.left = `${e.clientX - offsetX}px`; // X position set
            sticky.style.top = `${e.clientY - offsetY}px`;  // Y position set
        }

        // Stop drag: mouse chhodte hi dragging band ho jaegi
        function stopDrag() {
            isDragging = false;
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", stopDrag);
        }
    }
});
