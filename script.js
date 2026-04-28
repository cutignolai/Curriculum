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
const capabilityChips = document.querySelectorAll(".chip-list li");
const INITIAL_VISIBLE_EXPERIENCES = 3;
const LANGUAGE_STORAGE_KEY = "cv-language";
let showingAllExperiences = false;
let showingAllProjects = false;
let currentLanguage = "es";

const translations = {
  es: {
    pageTitle: "Curriculum | Ignacio Cutignola",
    pageDescription:
      "Curriculum online de Ignacio Cutignola. Estudiante de Ingenieria Electronica con experiencia en software, sistemas y proyectos tecnicos.",
    nav: {
      profile: "Perfil",
      trajectory: "Trayectoria",
      projects: "Proyectos",
      capabilities: "Capacidades",
      contact: "Contacto",
    },
    switchAriaLabel: "Cambiar idioma entre espanol e ingles",
    heroSectionLabel: "Curriculum / Portfolio",
    heroAboutTitle: "Sobre mi...",
    heroAboutText:
      "Soy Ignacio Cutignola, estudiante de Ingenieria Electronica y Tecnico Electronico. Me interesa trabajar en proyectos donde la logica, la programacion y la tecnologia se conviertan en herramientas concretas para resolver problemas reales.",
    heroDownloadAlt: "Descargar curriculum",
    heroDownloadLabel: "Curriculum",
    heroDownloadTitle: "Descargar curriculum",
    heroDownloadText: "Accede a una version PDF de mi CV.",
    overviewLabel: "Perfil",
    overviewTitle: "Base tecnica, curiosidad y compromiso con aprender haciendo.",
    overviewText1:
      "Busco nuevas experiencias para ampliar conocimientos y profundizar mi recorrido en entornos donde la electronica, la programacion y el analisis tecnico tengan impacto real.",
    overviewText2:
      "Me destaco por adaptarme rapido, trabajar con criterio y recibir feedback como parte natural del proceso para mejorar resultados y elevar el nivel del trabajo.",
    strengthsLabel: "Fortalezas",
    strengths: [
      "Trabajo en equipo",
      "Liderazgo",
      "Consejeria",
      "Aprendizaje constante",
      "Pasion por la electronica",
      "Comunicacion clara",
    ],
    recognitionLabel: "Reconocimientos",
    recognitionText: "Beca de honor ITBA",
    trajectoryLabel: "Trayectoria",
    trajectoryTitle: "Un recorrido por mi experiencia.",
    projectsLabel: "Proyectos",
    projectsTitle: "Mis proyectos y trabajos destacados.",
    projectsScrollHint: "Desliza para ver mas proyectos",
    capabilitiesLabel: "Capacidades",
    capabilitiesTitle: "Herramientas, idiomas y formacion organizados como un sistema.",
    stackTitle: "Stack tecnico",
    educationTitle: "Educacion",
    languagesTitle: "Idiomas",
    languageLabels: {
      spanish: "Español",
      spanishLevel: "Nativo",
      english: "Ingles",
      portuguese: "Portugues",
      portugueseLevel: "Intermedio",
      certifications: "Certificaciones",
    },
    contactLabel: "Contacto",
    contactTitle: "Disponible para sumarme a equipos y proyectos con ambicion tecnica.",
    contactText: "",
    profileFields: {
      email: "Email",
      phone: "Telefono",
      location: "Ubicacion",
    },
    contactLinks: {
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    buttons: {
      showLess: "Mostrar menos",
      moreJobs: "Ver {count} puestos mas",
      expandProjects: "Expandir {count} proyectos",
    },
    labels: {
      logoOf: "Logo de {label}",
      mediaOf: "Media de {title}",
      profilePhotoOf: "Foto de perfil de {name}",
      invalidData: "Datos invalidos",
      toolUsedIn: "Herramienta {index} usada en {title}",
    },
    errors: {
      trajectoryTitle: "No se pudo cargar la trayectoria",
      trajectoryText:
        "Revisa el bloque JSON embebido en el HTML y confirma que tenga un formato valido.",
      educationTitle: "No se pudo cargar educacion",
      educationText: "Revisa education-data.js y confirma que tenga un formato valido.",
      projectsTitle: "No se pudieron cargar los proyectos",
      projectsText: "Revisa projects-data.js y confirma que tenga un formato valido.",
    },
  },
  en: {
    pageTitle: "Resume | Ignacio Cutignola",
    pageDescription:
      "Online resume of Ignacio Cutignola. Electronics Engineering student with experience in software, systems, and technical projects.",
    nav: {
      profile: "Profile",
      trajectory: "Experience",
      projects: "Projects",
      capabilities: "Capabilities",
      contact: "Contact",
    },
    switchAriaLabel: "Switch language between Spanish and English",
    heroSectionLabel: "Resume / Portfolio",
    heroAboutTitle: "About me...",
    heroAboutText:
      "I am Ignacio Cutignola, an Electronics Engineering student and Electronics Technician. I am interested in working on projects where logic, programming, and technology become concrete tools for solving real problems.",
    heroDownloadAlt: "Download resume",
    heroDownloadLabel: "Resume",
    heroDownloadTitle: "Download resume",
    heroDownloadText: "Access a PDF version of my resume.",
    overviewLabel: "Profile",
    overviewTitle: "Technical foundation, curiosity, and commitment to learning by doing.",
    overviewText1:
      "I am looking for new experiences to broaden my knowledge and deepen my path in environments where electronics, programming, and technical analysis create real impact.",
    overviewText2:
      "I stand out for adapting quickly, working with good judgment, and taking feedback as a natural part of improving results and raising the quality of the work.",
    strengthsLabel: "Strengths",
    strengths: [
      "Teamwork",
      "Leadership",
      "Mentoring",
      "Continuous learning",
      "Passion for electronics",
      "Clear communication",
    ],
    recognitionLabel: "Recognition",
    recognitionText: "ITBA Honor Scholarship",
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
    contactText: "",
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
      expandProjects: "Expand {count} projects",
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
        "Review the embedded JSON block in the HTML and confirm it has a valid format.",
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

capabilityChips.forEach((chip) => {
  const image = chip.querySelector("img");
  const tooltipText = image?.alt?.trim();

  if (!tooltipText) {
    return;
  }

  chip.dataset.tooltip = tooltipText;
  chip.tabIndex = 0;
  chip.setAttribute("aria-label", tooltipText);
});

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
}

function openPrintableCv() {
  const file = currentLanguage === "en" ? "./cv-print-english.html" : "./cv-print.html";
  window.open(`${file}?print=1`, "_blank", "noopener");
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
    mediaContainer.appendChild(createMediaLayer(mediaPath, label));
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

function createContactLink(href, label) {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = label;

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

function createTrajectoryItem(item, index) {
  const article = document.createElement("article");
  article.className = "trajectory-item trajectory-item-reveal";
  article.style.transitionDelay = `${Math.min(index * 90, 360)}ms`;

  const formattedIndex = String(index + 1).padStart(2, "0");
  const role = localizedText(item.puesto);
  const company = localizedText(item.empresa);
  const period = localizedText(item.periodo);
  const description = localizedText(item.descripcion);
  const logoMarkup = createLogoMarkup(item.logo, company, "trajectory-logo");
  const extraLogosMarkup = Array.isArray(item.logos) && item.logos.length > 0
    ? '<div class="trajectory-tools"></div>'
    : "";

  article.innerHTML = `
    <div class="trajectory-meta">
      <span class="trajectory-index">${formattedIndex}</span>
      <p>${period}</p>
    </div>
    <div class="trajectory-card panel">
      <div class="trajectory-card-header">
        ${logoMarkup}
        <div class="trajectory-card-copy">
          <h3>${role} / ${company}</h3>
        </div>
      </div>
      <p>${description}</p>
      ${extraLogosMarkup}
    </div>
  `;

  attachLogoFallback(article, company, ".trajectory-logo img");

  const toolsContainer = article.querySelector(".trajectory-tools");
  if (toolsContainer) {
    item.logos.forEach((path, logoIndex) => {
      toolsContainer.appendChild(createToolLogo(path, logoIndex, item.empresa));
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
  const logoMarkup = createLogoMarkup(item.logo, institution, "edu-logo");

  article.innerHTML = `
    <div class="edu-item-header">
      ${logoMarkup}
      <div class="edu-item-copy">
        <strong>${program}</strong>
        <h4>${institution}</h4>
      </div>
    </div>
    <span>${period}</span>
  `;

  attachLogoFallback(article, institution, ".edu-logo img");
  return article;
}

function getFileNameLabel(path) {
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

function createMediaLayer(path, title, className = "project-tile-media-layer") {
  const mediaLayer = document.createElement("div");
  mediaLayer.className = className;

  if (isVideoPath(path)) {
    const video = document.createElement("video");
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

  if (!mediaContainer || mediaList.length === 0) {
    return;
  }

  let currentMediaIndex = 0;
  let rotationTimer = null;

  const renderMedia = (mediaIndex, { immediate = false } = {}) => {
    const nextMedia = createProjectMediaElement(mediaList[mediaIndex], item.titulo);
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

  article.addEventListener("mouseenter", startRotation);
  article.addEventListener("mouseleave", () => {
    stopRotation();
    currentMediaIndex = 0;
    renderMedia(currentMediaIndex);
  });
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
      <span>${formatTranslation("buttons.moreJobs", { count: hiddenCount })}</span>
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

  trajectoryList.classList.toggle(
    "trajectory-layout-collapsed",
    hiddenCount > 0 && !showingAllExperiences
  );
  trajectoryList.innerHTML = '<div class="trajectory-line"></div>';
  items.forEach((item, index) => {
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
      contactLinksList.appendChild(createContactLink(`mailto:${data.email}`, data.email));
    }

    if (data.telefono) {
      contactLinksList.appendChild(createContactLink(`tel:${String(data.telefono).replace(/\s+/g, "")}`, data.telefono));
    }

    if (data.linkedin) {
      contactLinksList.appendChild(
        createContactLink(data.linkedin, translations[currentLanguage].contactLinks.linkedin)
      );
    }

    if (data.github) {
      contactLinksList.appendChild(
        createContactLink(data.github, translations[currentLanguage].contactLinks.github)
      );
    }
  }
}

function loadTrajectory() {
  try {
    const data = window.experienceData;

    if (!Array.isArray(data)) {
      throw new Error("Formato invalido");
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
      throw new Error("Formato invalido");
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
      throw new Error("Formato invalido");
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
      throw new Error("Formato invalido");
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
