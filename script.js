const revealedItems = document.querySelectorAll(".reveal");
const trajectoryList = document.querySelector("#trajectory-list");
const trajectoryToggleWrap = document.querySelector("#trajectory-toggle-wrap");
const educationList = document.querySelector("#education-list");
const projectsList = document.querySelector("#projects-list");
const projectsViewport = document.querySelector("#projects-viewport");
const projectsToggleWrap = document.querySelector("#projects-toggle-wrap");
const heroCode = document.querySelector("#hero-code");
const heroTitle = document.querySelector("#hero-title");
const heroSocialLinks = document.querySelector("#hero-social-links");
const heroText = document.querySelector("#hero-text");
const languageSwitch = document.querySelector("#language-switch");
const profileAvatar = document.querySelector("#profile-avatar");
const profileName = document.querySelector("#profile-name");
const profileRole = document.querySelector("#profile-role");
const profileDetails = document.querySelector("#profile-details");
const contactLinksList = document.querySelector("#contact-links-list");
const stackGroups = document.querySelector("#stack-groups");
const touchDevice = window.matchMedia("(hover: none)").matches;
const INITIAL_VISIBLE_EXPERIENCES = 4;
const LANGUAGE_STORAGE_KEY = "cv-language";
let showingAllExperiences = false;
let showingAllProjects = false;
let currentLanguage = "es";

const translations = {
  es: {
    pageTitle: "Ignacio Cutignola | Firmware y Sistemas Embebidos",
    pageDescription:
      "Currículum online de Ignacio Cutignola. Desarrollador de firmware y sistemas embebidos, estudiante de Ingeniería Electrónica (ITBA), con experiencia en ciberseguridad y desarrollo full stack.",
    nav: {
      profile: "Perfil",
      trajectory: "Trayectoria",
      projects: "Proyectos",
      capabilities: "Capacidades",
      contact: "Contacto",
    },
    switchAriaLabel: "Cambiar idioma entre español e inglés",
    headerRole: "Desarrollador de Firmware · Sistemas Embebidos",
    headerDegree: "Ingeniería Electrónica",
    heroSectionLabel: "Currículum / Portfolio",
    heroAboutTitle: "Sobre mí...",
    heroAboutText:
      "Soy Ignacio Cutignola, estudiante de Ingeniería Electrónica en el ITBA y Técnico Electrónico. Hoy desarrollo firmware y hardware para sistemas embebidos de seguridad en Prosegur, y antes trabajé en ciberseguridad y desarrollo full stack. Me motiva que la electrónica y el software se conviertan en soluciones concretas para problemas reales.",
    heroDownloadAlt: "Descargar currículum",
    heroDownloadLabel: "Currículum",
    heroDownloadTitle: "Descargar currículum",
    heroDownloadText: "Accede a una versión PDF de mi CV.",
    overviewLabel: "Perfil",
    overviewTitle: "Del microcontrolador a la plataforma: entiendo el producto de punta a punta.",
    overviewText1:
      "Combino experiencia en firmware, diseño de PCB, desarrollo full stack y ciberseguridad. Eso me permite trabajar en todas las capas de un sistema: desde el hardware y su comunicación hasta el software que usa el cliente.",
    overviewText2:
      "Además, diseñé y dicté cursos de programación que llegaron a 430 alumnos y coordiné un equipo de hasta 10 tutores, una experiencia que me formó en liderazgo y comunicación técnica.",
    strengthsLabel: "Fortalezas",
    strengths: [
      "Firmware y sistemas embebidos",
      "Diseño de PCB",
      "Desarrollo full stack",
      "Liderazgo de equipos técnicos",
      "Comunicación técnica y docencia",
      "Aprendizaje constante",
    ],
    recognitionLabel: "Reconocimientos",
    recognitionText: "Beca de honor ITBA",
    trajectoryLabel: "Trayectoria",
    trajectoryTitle: "Un recorrido por mi experiencia.",
    projectsLabel: "Proyectos",
    projectsTitle: "Mis proyectos y trabajos destacados.",
    projectsScrollHint: "Desliza para ver más proyectos",
    capabilitiesLabel: "Capacidades",
    capabilitiesTitle: "Herramientas, idiomas y formación organizados como un sistema.",
    stackTitle: "Stack técnico",
    educationTitle: "Educación",
    languagesTitle: "Idiomas",
    languageLabels: {
      spanish: "Español",
      spanishLevel: "Nativo",
      english: "Inglés",
      portuguese: "Portugués",
      portugueseLevel: "Intermedio",
      certifications: "Certificaciones",
    },
    contactLabel: "Contacto",
    contactTitle: "Disponible para sumarme a equipos y proyectos con ambición técnica.",
    contactText: "Abierto a oportunidades en firmware, sistemas embebidos y desarrollo de software.",
    profileFields: {
      email: "Email",
      phone: "Teléfono",
      location: "Ubicación",
    },
    contactLinks: {
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    buttons: {
      showLess: "Mostrar menos",
      moreJobs: "Ver {count} puestos más",
      moreJob: "Ver 1 puesto más",
      expandProjects: "Expandir {count} proyectos",
      watchVideo: "← Enlace",
    },
    labels: {
      logoOf: "Logo de {label}",
      mediaOf: "Media de {title}",
      profilePhotoOf: "Foto de perfil de {name}",
      invalidData: "Datos inválidos",
      toolUsedIn: "Herramienta {index} usada en {title}",
    },
    errors: {
      trajectoryTitle: "No se pudo cargar la trayectoria",
      trajectoryText:
        "Revisa experiencia-data.js y confirma que tenga un formato válido.",
      educationTitle: "No se pudo cargar la educación",
      educationText: "Revisa education-data.js y confirma que tenga un formato válido.",
      projectsTitle: "No se pudieron cargar los proyectos",
      projectsText: "Revisa projects-data.js y confirma que tenga un formato válido.",
    },
  },
  en: {
    pageTitle: "Ignacio Cutignola | Firmware & Embedded Systems",
    pageDescription:
      "Online resume of Ignacio Cutignola. Firmware and embedded systems developer, Electronics Engineering student (ITBA), with experience in cybersecurity and full-stack development.",
    nav: {
      profile: "Profile",
      trajectory: "Experience",
      projects: "Projects",
      capabilities: "Capabilities",
      contact: "Contact",
    },
    switchAriaLabel: "Switch language between Spanish and English",
    headerRole: "Firmware Developer · Embedded Systems",
    headerDegree: "Electronics Engineering",
    heroSectionLabel: "Resume / Portfolio",
    heroAboutTitle: "About me...",
    heroAboutText:
      "I am Ignacio Cutignola, an Electronics Engineering student at ITBA and Electronics Technician. I currently develop firmware and hardware for embedded security systems at Prosegur, and previously worked in cybersecurity and full-stack development. I am driven by turning electronics and software into concrete solutions for real problems.",
    heroDownloadAlt: "Download resume",
    heroDownloadLabel: "Resume",
    heroDownloadTitle: "Download resume",
    heroDownloadText: "Access a PDF version of my resume.",
    overviewLabel: "Profile",
    overviewTitle: "From the microcontroller to the platform: I understand the product end to end.",
    overviewText1:
      "I combine experience in firmware, PCB design, full-stack development, and cybersecurity. This lets me work across every layer of a system: from the hardware and its communication to the software the customer uses.",
    overviewText2:
      "I also designed and taught programming courses that reached 430 students and coordinated a team of up to 10 tutors, an experience that shaped my leadership and technical communication skills.",
    strengthsLabel: "Strengths",
    strengths: [
      "Firmware & embedded systems",
      "PCB design",
      "Full-stack development",
      "Technical team leadership",
      "Technical communication & teaching",
      "Continuous learning",
    ],
    recognitionLabel: "Recognition",
    recognitionText: "ITBA Honors Scholarship",
    trajectoryLabel: "Experience",
    trajectoryTitle: "A journey through my experience.",
    projectsLabel: "Projects",
    projectsTitle: "My highlighted projects and work.",
    projectsScrollHint: "Swipe to see more projects",
    capabilitiesLabel: "Capabilities",
    capabilitiesTitle: "Tools, languages, and education organized as a system.",
    stackTitle: "Technical stack",
    educationTitle: "Education",
    languagesTitle: "Languages",
    languageLabels: {
      spanish: "Spanish",
      spanishLevel: "Native",
      english: "English",
      portuguese: "Portuguese",
      portugueseLevel: "Intermediate",
      certifications: "Certifications",
    },
    contactLabel: "Contact",
    contactTitle: "Available to join teams and projects with technical ambition.",
    contactText: "Open to opportunities in firmware, embedded systems, and software development.",
    profileFields: {
      email: "Email",
      phone: "Phone",
      location: "Location",
    },
    contactLinks: {
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    buttons: {
      showLess: "Show less",
      moreJobs: "View {count} more roles",
      moreJob: "View 1 more role",
      expandProjects: "Expand {count} projects",
      watchVideo: "← Link",
    },
    labels: {
      logoOf: "Logo of {label}",
      mediaOf: "Media for {title}",
      profilePhotoOf: "Profile photo of {name}",
      invalidData: "Invalid data",
      toolUsedIn: "Tool {index} used in {title}",
    },
    errors: {
      trajectoryTitle: "Could not load experience",
      trajectoryText:
        "Review experiencia-data.js and confirm it has a valid format.",
      educationTitle: "Could not load education",
      educationText: "Review education-data.js and confirm it has a valid format.",
      projectsTitle: "Could not load projects",
      projectsText: "Review projects-data.js and confirm it has a valid format.",
    },
  },
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

function observeReveal(element) {
  if (!element) {
    return;
  }

  observer.observe(element);
}

revealedItems.forEach((item) => observeReveal(item));


function getTranslationValue(path) {
  return path.split(".").reduce((value, key) => value?.[key], translations[currentLanguage]);
}

function formatTranslation(path, replacements = {}) {
  let template = getTranslationValue(path) || "";

  Object.entries(replacements).forEach(([key, value]) => {
    template = template.replace(`{${key}}`, String(value));
  });

  return template;
}

function localizedText(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[currentLanguage] || value.es || value.en || "";
  }

  return value || "";
}

function setTextContent(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = translations[currentLanguage].pageTitle;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", translations[currentLanguage].pageDescription);
  }

  if (languageSwitch) {
    languageSwitch.checked = currentLanguage === "en";
    languageSwitch.setAttribute("aria-label", translations[currentLanguage].switchAriaLabel);
  }

  setTextContent("#nav-profile", translations[currentLanguage].nav.profile);
  setTextContent("#nav-trajectory", translations[currentLanguage].nav.trajectory);
  setTextContent("#nav-projects", translations[currentLanguage].nav.projects);
  setTextContent("#nav-capabilities", translations[currentLanguage].nav.capabilities);
  setTextContent("#nav-contact", translations[currentLanguage].nav.contact);
  setTextContent("#header-role", translations[currentLanguage].headerRole);
  setTextContent("#header-degree", translations[currentLanguage].headerDegree);
  setTextContent("#hero-section-label", translations[currentLanguage].heroSectionLabel);
  setTextContent("#hero-about-title", translations[currentLanguage].heroAboutTitle);
  setTextContent("#hero-about-text", translations[currentLanguage].heroAboutText);
  setTextContent("#hero-download-label", translations[currentLanguage].heroDownloadLabel);
  setTextContent("#hero-download-title", translations[currentLanguage].heroDownloadTitle);
  setTextContent("#hero-download-text", translations[currentLanguage].heroDownloadText);
  setTextContent("#overview-label", translations[currentLanguage].overviewLabel);
  setTextContent("#overview-title", translations[currentLanguage].overviewTitle);
  setTextContent("#overview-text-1", translations[currentLanguage].overviewText1);
  setTextContent("#overview-text-2", translations[currentLanguage].overviewText2);
  setTextContent("#strengths-label", translations[currentLanguage].strengthsLabel);
  translations[currentLanguage].strengths.forEach((strength, index) => {
    setTextContent(`#strength-item-${index + 1}`, strength);
  });
  setTextContent("#recognition-label", translations[currentLanguage].recognitionLabel);
  setTextContent("#recognition-text", translations[currentLanguage].recognitionText);
  setTextContent("#trajectory-label", translations[currentLanguage].trajectoryLabel);
  setTextContent("#trajectory-title", translations[currentLanguage].trajectoryTitle);
  setTextContent("#projects-label", translations[currentLanguage].projectsLabel);
  setTextContent("#projects-title", translations[currentLanguage].projectsTitle);
  setTextContent("#projects-scroll-hint", translations[currentLanguage].projectsScrollHint);
  setTextContent("#capabilities-label", translations[currentLanguage].capabilitiesLabel);
  setTextContent("#capabilities-title", translations[currentLanguage].capabilitiesTitle);
  setTextContent("#stack-title", translations[currentLanguage].stackTitle);
  setTextContent("#education-title", translations[currentLanguage].educationTitle);
  setTextContent("#languages-title", translations[currentLanguage].languagesTitle);
  setTextContent("#language-label-spanish", translations[currentLanguage].languageLabels.spanish);
  setTextContent("#language-level-spanish", translations[currentLanguage].languageLabels.spanishLevel);
  setTextContent("#language-label-english", translations[currentLanguage].languageLabels.english);
  setTextContent("#language-label-portuguese", translations[currentLanguage].languageLabels.portuguese);
  setTextContent("#language-level-portuguese", translations[currentLanguage].languageLabels.portugueseLevel);
  setTextContent("#language-label-certifications", translations[currentLanguage].languageLabels.certifications);
  setTextContent("#contact-label", translations[currentLanguage].contactLabel);
  setTextContent("#contact-title", translations[currentLanguage].contactTitle);
  setTextContent("#contact-text", translations[currentLanguage].contactText);

  const downloadIcon = document.querySelector("#hero-download-icon");
  if (downloadIcon) {
    downloadIcon.alt = translations[currentLanguage].heroDownloadAlt;
  }
}

function applyLanguage() {
  applyStaticTranslations();
  loadProfile();
  loadTrajectory();
  loadEducation();
  loadProjects();
  renderStack();
}

function openPrintableCv() {
  const file = currentLanguage === "en" ? "./Ignacio-Cutignola-Resume-EN.pdf" : "./Ignacio-Cutignola-CV-ES.pdf";
  window.open(file, "_blank", "noopener");
}

function renderStack() {
  const data = window.toolsData;

  if (!stackGroups || !data) {
    return;
  }

  stackGroups.innerHTML = "";
  data.categorias.forEach((category) => {
    const group = document.createElement("div");
    const heading = document.createElement("h4");
    const list = document.createElement("ul");
    group.className = "stack-group";
    heading.className = "stack-group-title";
    heading.textContent = localizedText(category.nombre);
    list.className = "chip-list";

    category.herramientas.forEach((key) => {
      const tool = data.herramientas[key];

      if (!tool) {
        return;
      }

      const name = localizedText(tool.nombre);
      const item = document.createElement("li");
      const image = document.createElement("img");
      item.dataset.tooltip = name;
      item.tabIndex = 0;
      item.setAttribute("aria-label", name);
      image.src = tool.archivo;
      image.alt = name;
      image.loading = "lazy";
      item.appendChild(image);
      list.appendChild(item);
    });

    group.appendChild(heading);
    group.appendChild(list);
    stackGroups.appendChild(group);
  });
}

function isCurrentExperience(periodo) {
  const value = localizedText(periodo);

  if (typeof value !== "string") {
    return false;
  }

  const parts = value.split(" - ");
  const end = parts[parts.length - 1]?.trim();

  return end === "Vigente" || end === "Actual" || end === "Present";
}

function sortExperiences(items) {
  const currentItems = [];
  const pastItems = [];

  items.forEach((item) => {
    if (isCurrentExperience(item.periodo)) {
      currentItems.push(item);
    } else {
      pastItems.push(item);
    }
  });

  return [...currentItems, ...pastItems];
}

function createLogoMarkup(logo, label, className = "content-logo") {
  if (logo) {
    return `
      <div class="${className}">
        <img src="${logo}" alt="${formatTranslation("labels.logoOf", { label })}">
      </div>
    `;
  }

  return `
    <div class="${className} content-logo-fallback" aria-hidden="true">
      <span>${label.slice(0, 2).toUpperCase()}</span>
    </div>
  `;
}

function createProfileField(label, value, options = {}) {
  const wrapper = document.createElement("div");
  const mediaPath = options.mediaPath || "";
  const fieldClassName = options.className || "";
  const href = options.href || "";
  const imagePath = options.imagePath || "";
  const imageClassName = options.imageClassName || "identity-field-image";
  wrapper.className = fieldClassName;

  if (mediaPath) {
    const mediaContainer = document.createElement("div");
    mediaContainer.className = "identity-field-media";
    mediaContainer.setAttribute("aria-hidden", "true");
    mediaContainer.appendChild(createMediaLayer(mediaPath, label, undefined, options.mediaPoster || ""));
    wrapper.appendChild(mediaContainer);
  }

  if (imagePath) {
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    imageContainer.className = imageClassName;
    imageContainer.setAttribute("aria-hidden", "true");
    image.src = imagePath;
    image.alt = "";
    image.loading = "lazy";
    image.addEventListener("error", () => {
      imageContainer.remove();
    });
    imageContainer.appendChild(image);
    wrapper.appendChild(imageContainer);
  }

  const labelElement = document.createElement("span");
  labelElement.textContent = label;
  wrapper.appendChild(labelElement);

  const valueElement = document.createElement("strong");

  if (href) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = value;
    link.target = "_blank";
    link.rel = "noreferrer";
    valueElement.appendChild(link);
  } else {
    valueElement.textContent = value;
  }

  wrapper.appendChild(valueElement);

  return wrapper;
}

const WHATSAPP_ICON = `
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#25d366"></circle>
    <path fill="#ffffff" d="M12 5.2a6.8 6.8 0 0 0-5.86 10.26L5.2 18.8l3.43-.9A6.8 6.8 0 1 0 12 5.2Zm0 12.4a5.6 5.6 0 0 1-2.86-.78l-.2-.12-2.04.53.55-1.98-.13-.21A5.6 5.6 0 1 1 12 17.6Zm3.07-4.2c-.17-.08-1-.49-1.15-.55-.15-.06-.27-.08-.38.09-.11.17-.44.55-.54.66-.1.11-.2.13-.37.04a4.6 4.6 0 0 1-2.3-2c-.17-.3.17-.28.5-.93.05-.11.03-.21-.02-.3l-.52-1.24c-.13-.33-.27-.28-.37-.29h-.32a.6.6 0 0 0-.44.21 1.85 1.85 0 0 0-.58 1.38 3.2 3.2 0 0 0 .68 1.71 7.35 7.35 0 0 0 2.82 2.49c1.05.45 1.46.49 1.98.41.32-.05 1-.41 1.14-.8.14-.4.14-.73.1-.8-.04-.07-.15-.11-.32-.19Z"></path>
  </svg>
`;

function createContactLink(href, label, icon = "") {
  const link = document.createElement("a");
  const text = document.createElement("span");
  const arrow = document.createElement("span");
  link.href = href;
  link.className = "contact-link";
  text.textContent = label;
  arrow.className = "contact-link-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";

  if (icon) {
    const iconWrap = document.createElement("span");
    iconWrap.className = "contact-link-icon";
    iconWrap.setAttribute("aria-hidden", "true");

    if (icon.trim().startsWith("<svg")) {
      iconWrap.innerHTML = icon;
    } else {
      const image = document.createElement("img");
      image.src = icon;
      image.alt = "";
      iconWrap.appendChild(image);
    }

    link.appendChild(iconWrap);
  }

  link.appendChild(text);
  link.appendChild(arrow);

  if (href.startsWith("http")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }

  return link;
}

function createHeroSocialLink(href, iconPath, label) {
  const link = document.createElement("a");
  const image = document.createElement("img");
  link.href = href;
  link.className = "hero-social-link";
  link.setAttribute("aria-label", label);
  link.target = "_blank";
  link.rel = "noreferrer";
  image.src = iconPath;
  image.alt = "";
  image.loading = "lazy";
  link.appendChild(image);
  return link;
}

function createHeroDownloadButton() {
  const button = document.createElement("button");
  const image = document.createElement("img");
  const text = document.createElement("span");
  button.type = "button";
  button.className = "hero-social-download";
  button.setAttribute("aria-label", translations[currentLanguage].heroDownloadTitle);
  image.src = "./recurso/Herramientas/pdf.png";
  image.alt = "";
  image.loading = "lazy";
  text.textContent = translations[currentLanguage].heroDownloadTitle;
  button.appendChild(image);
  button.appendChild(text);
  button.addEventListener("click", openPrintableCv);
  return button;
}

function attachLogoFallback(container, label, selector = ".content-logo img") {
  const image = container.querySelector(selector);

  if (!image) {
    return;
  }

  image.addEventListener("error", () => {
    const logoContainer = image.parentElement;
    logoContainer.classList.add("content-logo-fallback");
    logoContainer.innerHTML = `<span>${label.slice(0, 2).toUpperCase()}</span>`;
  });
}

function createDescriptionMarkup(description, listClassName) {
  if (Array.isArray(description)) {
    return `<ul class="${listClassName}">${description.map((line) => `<li>${line}</li>`).join("")}</ul>`;
  }

  return `<p>${description}</p>`;
}

function createTrajectoryItem(item, index) {
  const article = document.createElement("article");
  article.className = "trajectory-item trajectory-item-reveal";
  article.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;

  const role = localizedText(item.puesto);
  const company = localizedText(item.empresa);
  const period = localizedText(item.periodo);
  const startYear = period.match(/\d{4}/)?.[0] || String(index + 1).padStart(2, "0");
  const description = localizedText(item.descripcion);
  const logoMarkup = createLogoMarkup(item.logo, company, "trajectory-logo");
  const extraLogosMarkup = Array.isArray(item.logos) && item.logos.length > 0
    ? '<div class="trajectory-tools"></div>'
    : "";

  article.innerHTML = `
    <div class="trajectory-meta">
      <span class="trajectory-index">${startYear}</span>
      <p>${period}</p>
    </div>
    <div class="trajectory-card panel">
      <div class="trajectory-card-header">
        ${logoMarkup}
        <div class="trajectory-card-copy">
          <h3>${role} / ${company}</h3>
        </div>
      </div>
      ${createDescriptionMarkup(description, "trajectory-bullets")}
      ${extraLogosMarkup}
    </div>
  `;

  attachLogoFallback(article, company, ".trajectory-logo img");

  const toolsContainer = article.querySelector(".trajectory-tools");

  if (item.video) {
    article
      .querySelector(".trajectory-card")
      .insertBefore(createProjectVideoLink(item.video, localizedText(item.videoTitulo)), toolsContainer);
  }

  if (toolsContainer) {
    item.logos.forEach((path, logoIndex) => {
      toolsContainer.appendChild(createToolLogo(path, logoIndex, company));
    });
  }

  return article;
}

function createEducationItem(item) {
  const article = document.createElement("article");
  article.className = "edu-item";

  const institution = localizedText(item.institucion);
  const program = localizedText(item.programa);
  const period = localizedText(item.periodo);
  const detail = localizedText(item.detalle);
  const logoMarkup = createLogoMarkup(item.logo, institution, "edu-logo");
  const detailMarkup = detail ? `<span class="edu-item-detail">${detail}</span>` : "";

  article.innerHTML = `
    <div class="edu-item-header">
      ${logoMarkup}
      <div class="edu-item-copy">
        <strong>${program}</strong>
        <h4>${institution}</h4>
      </div>
    </div>
    <span>${period}</span>
    ${detailMarkup}
  `;

  attachLogoFallback(article, institution, ".edu-logo img");
  return article;
}

function getFileNameLabel(path) {
  if (typeof window.getToolName === "function") {
    return window.getToolName(path, currentLanguage);
  }

  const fileName = String(path || "").split("/").pop() || "";
  return fileName.replace(/\.[^.]+$/, "");
}

function isVideoPath(path) {
  return /\.(mp4|webm|ogg)$/i.test(String(path || ""));
}
function createToolLogo(path, index, title) {
  const item = document.createElement("div");
  const toolLabel = getFileNameLabel(path);
  item.className = "project-tool";
  item.title = toolLabel;
  item.setAttribute("aria-label", toolLabel);
  item.innerHTML = `<img src="${path}" alt="${toolLabel || formatTranslation("labels.toolUsedIn", { index: index + 1, title })}">`;

  const image = item.querySelector("img");
  image.addEventListener("error", () => {
    item.classList.add("content-logo-fallback");
    item.innerHTML = `<span>${toolLabel || `T${index + 1}`}</span>`;
  });

  return item;
}

function createMediaLayer(path, title, className = "project-tile-media-layer", poster = "") {
  const mediaLayer = document.createElement("div");
  mediaLayer.className = className;

  if (isVideoPath(path)) {
    const video = document.createElement("video");
    if (poster) {
      video.poster = poster;
    }
    video.src = path;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("aria-label", formatTranslation("labels.mediaOf", { title }));
    mediaLayer.appendChild(video);
    return mediaLayer;
  }

  const image = document.createElement("img");
  image.src = path;
  image.alt = formatTranslation("labels.mediaOf", { title });
  image.loading = "lazy";
  mediaLayer.appendChild(image);
  return mediaLayer;
}

function createProjectMediaElement(path, title) {
  return createMediaLayer(path, title);
}

function setupProjectMedia(article, item) {
  const mediaContainer = article.querySelector(".project-tile-media");
  const mediaList = Array.isArray(item.media)
    ? item.media.filter(Boolean)
    : [];

  if (!mediaContainer) {
    return;
  }

  if (mediaList.length === 0) {
    const mainTool = Array.isArray(item.herramientas) ? item.herramientas[0] : "";
    mediaContainer.classList.add("project-tile-media-empty");

    if (mainTool) {
      const icon = document.createElement("img");
      icon.src = mainTool;
      icon.alt = "";
      icon.loading = "lazy";
      mediaContainer.appendChild(icon);
    }

    return;
  }

  let currentMediaIndex = 0;
  let rotationTimer = null;

  const renderMedia = (mediaIndex, { immediate = false } = {}) => {
    const nextMedia = createProjectMediaElement(mediaList[mediaIndex], localizedText(item.titulo));
    const currentMedia = mediaContainer.querySelector(".project-tile-media-layer.is-active");

    if (!currentMedia || immediate) {
      mediaContainer.innerHTML = "";
      nextMedia.classList.add("is-active");
      mediaContainer.appendChild(nextMedia);
      return;
    }

    nextMedia.classList.add("is-entering");
    mediaContainer.appendChild(nextMedia);

    window.requestAnimationFrame(() => {
      nextMedia.classList.add("is-active");
      currentMedia.classList.remove("is-active");
      currentMedia.classList.add("is-leaving");
    });

    window.setTimeout(() => {
      if (currentMedia.parentNode === mediaContainer) {
        currentMedia.remove();
      }
      nextMedia.classList.remove("is-entering");
    }, 420);
  };

  const stopRotation = () => {
    if (rotationTimer) {
      window.clearInterval(rotationTimer);
      rotationTimer = null;
    }
  };

  const startRotation = () => {
    if (rotationTimer || mediaList.length < 2) {
      return;
    }

    rotationTimer = window.setInterval(() => {
      currentMediaIndex = (currentMediaIndex + 1) % mediaList.length;
      renderMedia(currentMediaIndex);
    }, 1800);
  };

  renderMedia(currentMediaIndex, { immediate: true });
  article.classList.add("project-tile-has-media");

  if (touchDevice) {
    const mediaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startRotation();
          } else {
            stopRotation();
          }
        });
      },
      { threshold: 0.3 }
    );
    mediaObserver.observe(article);
    return;
  }

  article.addEventListener("mouseenter", startRotation);
  article.addEventListener("mouseleave", () => {
    stopRotation();

    if (currentMediaIndex !== 0) {
      currentMediaIndex = 0;
      renderMedia(currentMediaIndex);
    }
  });
}

function createProjectVideoLink(url, label = "") {
  const link = document.createElement("a");
  link.href = url;
  link.className = "project-video-link";
  link.target = "_blank";
  link.rel = "noreferrer";
  link.setAttribute("aria-label", label ? `YouTube: ${label}` : "YouTube");
  link.innerHTML = `
    <svg class="project-video-link-logo" viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" rx="6" fill="#ff0000"></rect>
      <path d="M11 5.5v9l8-4.5z" fill="#ffffff"></path>
    </svg>
    <span>${translations[currentLanguage].buttons.watchVideo}</span>
  `;
  return link;
}

function createProjectIconLink(url, brand, iconPath, label = "") {
  const link = document.createElement("a");
  link.href = url;
  link.className = "project-video-link";
  link.target = "_blank";
  link.rel = "noreferrer";
  link.setAttribute("aria-label", label ? `${brand}: ${label}` : brand);
  link.innerHTML = `
    <img class="project-video-link-logo project-link-logo-square" src="${iconPath}" alt="" aria-hidden="true">
    <span>${translations[currentLanguage].buttons.watchVideo}</span>
  `;
  return link;
}

function createProjectLinkedInLink(url, label = "") {
  return createProjectIconLink(url, "LinkedIn", "./recurso/Herramientas/linkedin.png", label);
}

function createProjectGitHubLink(url, label = "") {
  return createProjectIconLink(url, "GitHub", "./recurso/Herramientas/github.png", label);
}

function createProjectCard(item, index) {
  const article = document.createElement("article");
  article.className = "project-tile panel reveal";
  article.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;
  const projectClass = localizedText(item.clase);
  const title = localizedText(item.titulo);
  const description = localizedText(item.descripcion);

  article.innerHTML = `
    <div class="project-tile-media" aria-hidden="true"></div>
    <div class="project-tile-inner">
      <p class="project-tile-class">${projectClass}</p>
      <h3>${title}</h3>
      <p class="project-tile-description">${description}</p>
      <div class="project-tools"></div>
    </div>
  `;

  const toolsContainer = article.querySelector(".project-tools");
  const tools = Array.isArray(item.herramientas) ? item.herramientas : [];

  if (tools.length > 0) {
    tools.forEach((path, toolIndex) => {
      toolsContainer.appendChild(createToolLogo(path, toolIndex, title));
    });
  } else {
    toolsContainer.classList.add("project-tools-empty");
  }

  if (item.video) {
    toolsContainer.appendChild(createProjectVideoLink(item.video, localizedText(item.videoTitulo)));
  }

  if (item.linkedin) {
    toolsContainer.appendChild(createProjectLinkedInLink(item.linkedin, localizedText(item.linkedinTitulo)));
  }

  if (item.github) {
    toolsContainer.appendChild(createProjectGitHubLink(item.github, localizedText(item.githubTitulo)));
  }

  setupProjectMedia(article, item);

  return article;
}

function createToggleButton(hiddenCount) {
  const button = document.createElement("button");
  button.className = "trajectory-toggle";
  button.type = "button";
  button.setAttribute("aria-expanded", String(showingAllExperiences));

  if (showingAllExperiences) {
    button.innerHTML = `
      <span>${translations[currentLanguage].buttons.showLess}</span>
      <span class="trajectory-toggle-icon is-open" aria-hidden="true">↓</span>
    `;
  } else {
    button.innerHTML = `
      <span>${hiddenCount === 1 ? translations[currentLanguage].buttons.moreJob : formatTranslation("buttons.moreJobs", { count: hiddenCount })}</span>
      <span class="trajectory-toggle-icon" aria-hidden="true">↓</span>
    `;
  }

  button.addEventListener("click", () => {
    showingAllExperiences = !showingAllExperiences;
    renderTrajectory(window.experienceDataSorted || []);
  });

  return button;
}

function createProjectsToggleButton(totalCount) {
  const button = document.createElement("button");
  button.className = "trajectory-toggle";
  button.type = "button";
  button.setAttribute("aria-expanded", String(showingAllProjects));

  if (showingAllProjects) {
    button.innerHTML = `
      <span>${translations[currentLanguage].buttons.showLess}</span>
      <span class="trajectory-toggle-icon is-open" aria-hidden="true">↓</span>
    `;
  } else {
    button.innerHTML = `
      <span>${formatTranslation("buttons.expandProjects", { count: totalCount })}</span>
      <span class="trajectory-toggle-icon" aria-hidden="true">↓</span>
    `;
  }

  button.addEventListener("click", () => {
    showingAllProjects = !showingAllProjects;
    renderProjects(window.projectsData || []);
  });

  return button;
}

function renderTrajectory(items) {
  if (!trajectoryList) {
    return;
  }

  const hiddenCount = Math.max(items.length - INITIAL_VISIBLE_EXPERIENCES, 0);
  const visibleItems = showingAllExperiences ? items : items.slice(0, INITIAL_VISIBLE_EXPERIENCES);

  trajectoryList.innerHTML = '<div class="trajectory-line"></div>';
  visibleItems.forEach((item, index) => {
    const trajectoryItem = createTrajectoryItem(item, index);
    trajectoryList.appendChild(trajectoryItem);
    observeReveal(trajectoryItem);
  });

  if (trajectoryToggleWrap) {
    trajectoryToggleWrap.innerHTML = "";

    if (hiddenCount > 0) {
      trajectoryToggleWrap.appendChild(createToggleButton(hiddenCount));
    }
  }
}

function renderTrajectoryError() {
  if (!trajectoryList) {
    return;
  }

  trajectoryList.innerHTML = `
    <div class="trajectory-line"></div>
    <article class="trajectory-item">
      <div class="trajectory-meta">
        <span class="trajectory-index">--</span>
        <p>${translations[currentLanguage].labels.invalidData}</p>
      </div>
      <div class="trajectory-card panel">
        <h3>${translations[currentLanguage].errors.trajectoryTitle}</h3>
        <p>
          ${translations[currentLanguage].errors.trajectoryText}
        </p>
      </div>
    </article>
  `;

  if (trajectoryToggleWrap) {
    trajectoryToggleWrap.innerHTML = "";
  }
}

function renderEducation(items) {
  if (!educationList) {
    return;
  }

  educationList.innerHTML = "";
  items.forEach((item) => {
    educationList.appendChild(createEducationItem(item));
  });
}

function renderEducationError() {
  if (!educationList) {
    return;
  }

  educationList.innerHTML = `
    <article class="edu-item">
      <strong>${translations[currentLanguage].errors.educationTitle}</strong>
      <span>${translations[currentLanguage].errors.educationText}</span>
    </article>
  `;
}

function renderProjects(items) {
  if (!projectsList || !projectsViewport) {
    return;
  }

  const projectsScrollHint = document.querySelector("#projects-scroll-hint");

  projectsList.innerHTML = "";
  items.forEach((item, index) => {
    const projectCard = createProjectCard(item, index);
    projectsList.appendChild(projectCard);
    observeReveal(projectCard);
  });

  projectsViewport.classList.toggle("projects-viewport-collapsed", !showingAllProjects);
  projectsViewport.classList.toggle("projects-viewport-expanded", showingAllProjects);
  projectsList.classList.toggle("projects-grid-expanded", showingAllProjects);
  projectsList.classList.toggle("projects-grid-horizontal", !showingAllProjects);

  if (projectsScrollHint) {
    projectsScrollHint.hidden = showingAllProjects;
    projectsScrollHint.classList.toggle("is-hidden", showingAllProjects);
  }

  if (projectsToggleWrap) {
    projectsToggleWrap.innerHTML = "";

    if (items.length > 3) {
      projectsToggleWrap.appendChild(createProjectsToggleButton(items.length));
    }
  }
}

function renderProjectsError() {
  if (!projectsList) {
    return;
  }

  projectsList.innerHTML = `
    <article class="project-tile panel">
      <div class="project-tile-inner">
        <p class="project-tile-class">${translations[currentLanguage].labels.invalidData}</p>
        <h3>${translations[currentLanguage].errors.projectsTitle}</h3>
        <p class="project-tile-description">
          ${translations[currentLanguage].errors.projectsText}
        </p>
      </div>
    </article>
  `;

  if (projectsToggleWrap) {
    projectsToggleWrap.innerHTML = "";
  }
}

function renderProfile(data) {
  if (!data) {
    return;
  }

  if (heroCode) {
    heroCode.textContent = data.heroCode || "";
  }

  if (heroTitle) {
    heroTitle.textContent = localizedText(data.heroTitle);
  }

  if (heroText) {
    heroText.textContent = localizedText(data.heroText);
  }

  if (profileName) {
    profileName.textContent = data.nombre || "";
  }

  if (profileRole) {
    profileRole.textContent = localizedText(data.titulo);
  }

  if (profileAvatar) {
    profileAvatar.innerHTML = "";

    if (data.foto) {
      const image = document.createElement("img");
      image.src = data.foto;
      image.alt = formatTranslation("labels.profilePhotoOf", {
        name: data.nombre || "perfil",
      });
      image.addEventListener("error", () => {
        profileAvatar.textContent = data.iniciales || "PF";
      });
      profileAvatar.appendChild(image);
    } else {
      profileAvatar.textContent = data.iniciales || "PF";
    }
  }

  if (profileDetails) {
    profileDetails.innerHTML = "";
    profileDetails.appendChild(
      createProfileField(translations[currentLanguage].profileFields.email, data.email || "", {
        className: "identity-field identity-field-email",
        href: data.email
          ? `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.email)}`
          : "",
        imagePath: "./recurso/Herramientas/gmail.png",
        imageClassName: "identity-field-email-graphic",
      })
    );
    profileDetails.appendChild(
      createProfileField(translations[currentLanguage].profileFields.phone, data.telefono || "", {
        className: "identity-field",
        href: data.telefono ? `tel:${String(data.telefono).replace(/\s+/g, "")}` : "",
      })
    );
    profileDetails.appendChild(
      createProfileField(translations[currentLanguage].profileFields.location, localizedText(data.ubicacion), {
        className: "identity-field identity-field-location",
        mediaPath: data["media-ubicacion"] || data.mediaUbicacion || "",
        mediaPoster: data["media-ubicacion-poster"] || "",
      })
    );
  }

  if (heroSocialLinks) {
    heroSocialLinks.innerHTML = "";

    if (data.linkedin) {
      heroSocialLinks.appendChild(
        createHeroSocialLink(
          data.linkedin,
          "./recurso/Herramientas/linkedin.png",
          translations[currentLanguage].contactLinks.linkedin
        )
      );
    }

    if (data.github) {
      heroSocialLinks.appendChild(
        createHeroSocialLink(
          data.github,
          "./recurso/Herramientas/github.png",
          translations[currentLanguage].contactLinks.github
        )
      );
    }

    heroSocialLinks.appendChild(createHeroDownloadButton());
  }

  if (contactLinksList) {
    contactLinksList.innerHTML = "";

    if (data.email) {
      contactLinksList.appendChild(
        createContactLink(`mailto:${data.email}`, data.email, "./recurso/Herramientas/gmail.png")
      );
    }

    if (data.telefono) {
      contactLinksList.appendChild(createContactLink("https://wa.me/5491164074647", "WhatsApp", WHATSAPP_ICON));
    }

    if (data.linkedin) {
      contactLinksList.appendChild(
        createContactLink(
          data.linkedin,
          translations[currentLanguage].contactLinks.linkedin,
          "./recurso/Herramientas/linkedin.png"
        )
      );
    }

    if (data.github) {
      contactLinksList.appendChild(
        createContactLink(
          data.github,
          translations[currentLanguage].contactLinks.github,
          "./recurso/Herramientas/github.png"
        )
      );
    }
  }
}

function loadTrajectory() {
  try {
    const data = window.experienceData;

    if (!Array.isArray(data)) {
      throw new Error("Formato inválido");
    }

    const sortedData = sortExperiences(data);
    window.experienceDataSorted = sortedData;
    renderTrajectory(sortedData);
  } catch (error) {
    renderTrajectoryError();
    console.error("No se pudo cargar experienceData", error);
  }
}

function loadEducation() {
  try {
    const data = window.educationData;

    if (!Array.isArray(data)) {
      throw new Error("Formato inválido");
    }

    renderEducation(data);
  } catch (error) {
    renderEducationError();
    console.error("No se pudo cargar educationData", error);
  }
}

function loadProjects() {
  try {
    const data = window.projectsData;

    if (!Array.isArray(data)) {
      throw new Error("Formato inválido");
    }

    renderProjects(data);
  } catch (error) {
    renderProjectsError();
    console.error("No se pudo cargar projectsData", error);
  }
}

function loadProfile() {
  try {
    const data = window.profileData;

    if (!data || typeof data !== "object") {
      throw new Error("Formato inválido");
    }

    renderProfile(data);
  } catch (error) {
    console.error("No se pudo cargar profileData", error);
  }
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "es";
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  applyLanguage();
}

function initializeLanguage() {
  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  currentLanguage = storedLanguage === "en" ? "en" : "es";

  if (languageSwitch) {
    languageSwitch.checked = currentLanguage === "en";
    languageSwitch.addEventListener("change", () => {
      setLanguage(languageSwitch.checked ? "en" : "es");
    });
  }

  applyLanguage();
}

initializeLanguage();
