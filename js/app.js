const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");
const navItems = document.querySelectorAll(".nav-link");
const faqQuestions = document.querySelectorAll(".faq-question");

const modalOverlay = document.querySelector("#orientacion-modal");
const modalTitle = document.querySelector("#modal-title");
const modalBody = document.querySelector("#modal-body");
const modalIcon = document.querySelector("#modal-icon");
const modalClose = document.querySelector("#modal-close");

const orientacion = {
  radiografia: {
    icon: "🩻",
    descripcion:
      "La radiografía usa rayos X para obtener imágenes de huesos, tórax y algunas partes blandas. Es un estudio breve y de baja dosis de radiación.",
    puntos: [
      "Usa ropa cómoda y sin metales, cierres o joyas en la zona a evaluar.",
      "Retira cadenas, relojes, anteojos y accesorios metálicos si te lo solicitan.",
      "Informa si estás embarazada o crees estarlo antes del estudio.",
      "No es necesario ayunar para la radiografía simple, salvo indicación específica.",
      "Lleva la orden médica y radiografías previas si las tienes.",
    ],
    nota: "Indicaciones generales. Confirma los detalles de tu preparación con el centro donde realizarás el examen.",
  },
  tomografia: {
    icon: "◉",
    descripcion:
      "La tomografía computarizada (TC) obtiene imágenes transversales detalladas. Puede requerir medio de contraste según el estudio.",
    puntos: [
      "Sigue el ayuno indicado por el centro si el estudio lo requiere.",
      "Informa sobre alergias, especialmente al medio de contraste yodado.",
      "Comunica si padeces insuficiencia renal o estás embarazada.",
      "Retira objetos metálicos de la zona a estudiar antes del examen.",
      "Consulta cómo suspender medicamentos si te lo indica el médico.",
    ],
    nota: "Las indicaciones cambian según la zona y el uso de contraste. Verifica siempre con tu centro.",
  },
  resonancia: {
    icon: "◎",
    descripcion:
      "La resonancia magnética (RM) usa campos magnéticos y radiofrecuencia. No utiliza radiación ionizante y puede requerir contraste.",
    puntos: [
      "Retira todo elemento metálico: joyas, relojes, monedas y tarjetas.",
      "Informa sobre marcapasos, implantes, prótesis o fragmentos metálicos.",
      "Comunica si tienes claustrofobia: pueden ofrecerte apoyo.",
      "Sigue las instrucciones de ayuno solo si tu estudio lo requiere.",
      "Consulta sobre el medio de contraste si te fue indicado.",
    ],
    nota: "El campo magnético exige una revisión estricta de objetos metálicos. Sigue las indicaciones del centro.",
  },
  ecografia: {
    icon: "≋",
    descripcion:
      "La ecografía utiliza ultrasonido para generar imágenes en tiempo real. No usa radiación y su preparación depende de la zona estudiada.",
    puntos: [
      "Para abdomen puede ser necesario ayuno y beber agua según la zona.",
      "Usa ropa cómoda y de fácil acceso para la zona a examinar.",
      "Informa si estás embarazada: la ecografía es segura y de uso frecuente.",
      "Lleva exámenes o ecografías previas si te fueron solicitadas.",
      "Confirma los requisitos exactos, pues varían según la zona y el motivo.",
    ],
    nota: "La preparación depende del tipo de ecografía. Revisa las indicaciones específicas de tu cita.",
  },
};

function openModal(tipo) {
  const data = orientacion[tipo];
  if (!data) return;

  modalIcon.textContent = data.icon;
  modalTitle.textContent = capitalizar(tipo);

  const puntos = data.puntos
    .map((p) => `        <li>${p}</li>`)
    .join("\n");

  modalBody.innerHTML =
    `        <p>${data.descripcion}</p>` +
    `        <h4>Preparación general</h4>` +
    `        <ul class="orient-list">\n${puntos}\n        </ul>` +
    `        <div class="orient-note">${data.nota}</div>`;

  modalOverlay.classList.add("is-open");
  modalOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.classList.remove("is-open");
  modalOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

document.querySelectorAll("[data-exam]").forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.exam));
});

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOverlay.classList.contains("is-open")) {
    closeModal();
  }
});

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
  );
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menú de navegación");
  });
});

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    question.setAttribute("aria-expanded", String(isOpen));
  });
});
