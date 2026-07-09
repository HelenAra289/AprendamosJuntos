document.addEventListener("DOMContentLoaded", () => {

    /* ==================================
       1. CURSOR ANIMADO (LAG EFFECT)
    ================================== */
    const cursor = document.querySelector(".cursor");
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;
        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Efecto Hover en elementos interactivos extensivos
    const hoverItems = document.querySelectorAll("a, button, .tab-btn, .subtab-btn, .interactive-action-btn, input, textarea");
    hoverItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            cursor.style.width = "35px";
            cursor.style.height = "35px";
            cursor.style.boxShadow = "0 0 35px #00ff9d";
        });
        item.addEventListener("mouseleave", () => {
            cursor.style.width = "18px";
            cursor.style.height = "18px";
            cursor.style.boxShadow = "0 0 15px #00ff9d";
        });
    });

    /* ==================================
       2. MODO OSCURO / CLARO
    ================================== */
    const themeBtn = document.querySelector(".theme-btn");
    let darkMode = true;

    themeBtn.addEventListener("click", () => {
        darkMode = !darkMode;
        if (!darkMode) {
            document.documentElement.style.setProperty("--bg", "#f4f7ff");
            document.documentElement.style.setProperty("--bg2", "#ffffff");
            document.documentElement.style.setProperty("--card", "#ffffff");
            document.documentElement.style.setProperty("--text", "#111827");
            document.documentElement.style.setProperty("--text-soft", "#4b5563");
            document.documentElement.style.setProperty("--input-bg", "#e2e8f0");
            themeBtn.textContent = "Modo Claro";
        } else {
            document.documentElement.style.setProperty("--bg", "#0b1020");
            document.documentElement.style.setProperty("--bg2", "#121a2f");
            document.documentElement.style.setProperty("--card", "#181f38");
            document.documentElement.style.setProperty("--text", "#ffffff");
            document.documentElement.style.setProperty("--text-soft", "#bfc7d5");
            document.documentElement.style.setProperty("--input-bg", "#1e294b");
            themeBtn.textContent = "Modo Oscuro";
        }
    });

    /* ==================================
       3. EFECTO PARALLAX EN EL PLANETA
    ================================== */
    const planet = document.querySelector(".planet");
    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;
        planet.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });

    /* ==================================
       4. GENERADOR DE PARTICULAS INTERACTIVAS (CON MOVIMIENTO)
    ================================== */
    const particlesContainer = document.querySelector(".particles");
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("span");
        particle.style.position = "absolute";
        
        // Tamaños variables estilo pelotas (entre 4px y 12px)
        const tano = Math.random() * 8 + 4; 
        particle.style.width = tano + "px";
        particle.style.height = tano + "px";
        
        particle.style.borderRadius = "50%";
        particle.style.background = "var(--primary)";
        particle.style.opacity = Math.random() * 0.4 + 0.2;
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";
        
        // Tiempos aleatorios para que luzca fluido y orgánico
        const duracion = Math.random() * 6 + 4; // De 4 a 10 segundos
        const retraso = Math.random() * 5;      // Retraso aleatorio inicial
        
        particle.style.animation = `flotarParticula ${duracion}s ease-in-out ${retraso}s infinite`;
        
        particlesContainer.appendChild(particle);
    }

    /* ==================================
       5. SISTEMA DE PESTANAS PRINCIPALES
    ================================== */
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            button.classList.add("active");
            const targetTabId = button.getAttribute("data-tab");
            document.getElementById(targetTabId).classList.add("active");
        });
    });

    /* ==================================
       6. SISTEMA DE SUB-PESTANAS INTERNAS
    ================================== */
    const subtabButtons = document.querySelectorAll(".subtab-btn");
    
    subtabButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            const parentCard = this.closest(".course-card");
            
            parentCard.querySelectorAll(".subtab-btn").forEach(b => b.classList.remove("sub-active"));
            parentCard.querySelectorAll(".subtab-pane").forEach(p => p.classList.remove("sub-active"));
            
            this.classList.add("sub-active");
            const paneId = this.getAttribute("data-subtarget");
            document.getElementById(paneId).classList.add("sub-active");
        });
    });

    /* ==================================
       7. ACCIONES DE EJERCICIOS INTERACTIVOS
    ================================== */
    const actionBtns = document.querySelectorAll(".interactive-action-btn");
    actionBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const sectionTitle = this.parentElement.querySelector("h4").textContent;
            alert(`Cargando entorno interactivo para: ${sectionTitle}. ¡Prepárate para practicar!`);
        });
    });

    /* ==================================
       8. CAPTURA DEL FORMULARIO DE OPINIÓN
    ================================== */
    const contactForm = document.getElementById("contact-form");
    if(contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("nombre").value;
            alert(`¡Gracias por tu opinión, ${nombre}! Tu mensaje ha sido enviado correctamente.`);
            contactForm.reset();
        });
    }
});