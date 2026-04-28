const printParams = new URLSearchParams(window.location.search);
const storedPrintLanguage = window.localStorage.getItem("cv-language");
const PRINT_LANGUAGE =
  printParams.get("lang") === "en" || storedPrintLanguage === "en" ? "en" : "es";
const printProfile = window.profileData || {};
const printExperience = Array.isArray(window.experienceData) ? window.experienceData : [];
const printEducation = Array.isArray(window.educationData) ? window.educationData : [];
const printProjects = Array.isArray(window.projectsData) ? window.projectsData : [];
const printTranslations = {
  es: {
    pageTitle: "CV PDF | Ignacio Cutignola",
    eyebrow: "Curriculum Vitae",
    contact: {
      email: "Email",
      phone: "Telefono",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      profile: "Perfil",
      experience: "Experiencia laboral",
      recognition: "Reconocimientos",
      education: "Educacion",
      languages: "Idiomas",
      stack: "Stack tecnico",
      projects: "Proyectos",
    },
    summary:
      "Soy Ignacio Cutignola, estudiante de Ingenieria Electronica y Tecnico Electronico. Busco seguir ampliando conocimientos y profundizando mi recorrido en entornos donde la electronica, la programacion y el analisis tecnico se conviertan en herramientas concretas para resolver problemas reales.",
    recognition: "Beca de honor ITBA",
    languages: {
      spanish: "Espanol",
      spanishLevel: "Nativo",
      english: "Ingles",
      englishLevel: "Upper-Intermediate B2",
      portuguese: "Portugues",
      portugueseLevel: "Intermedio",
    },
    profilePhotoAlt: "Foto de perfil de {{name}}",
    logoOf: "Logo de {{label}}",
  },
  en: {
    pageTitle: "Resume PDF | Ignacio Cutignola",
    eyebrow: "Resume",
    contact: {
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
    sections: {
      profile: "Profile",
      experience: "Work Experience",
      recognition: "Recognition",
      education: "Education",
      languages: "Languages",
      stack: "Technical Stack",
      projects: "Projects",
    },
    summary:
      "I am Ignacio Cutignola, an Electronics Engineering student and Electronics Technician. I am looking to keep expanding my knowledge and deepen my path in environments where electronics, programming, and technical analysis become concrete tools for solving real problems.",
    recognition: "ITBA Honors Scholarship",
    languages: {
      spanish: "Spanish",
      spanishLevel: "Native",
      english: "English",
      englishLevel: "Upper-Intermediate B2",
      portuguese: "Portuguese",
      portugueseLevel: "Intermediate",
    },
    profilePhotoAlt: "Profile photo of {{name}}",
    logoOf: "{{label}} logo",
  },
};
const printStack = [
  { path: "./recurso/Herramientas/python.png", label: "Python" },
  { path: "./recurso/Herramientas/TypeScript.png", label: "TypeScript" },
  { path: "./recurso/Herramientas/node.png", label: "Node.js" },
  { path: "./recurso/Herramientas/angular.png", label: "Angular" },
  { path: "./recurso/Herramientas/postgres.png", label: "SQL" },
  { path: "./recurso/Herramientas/redis.png", label: "Redis" },
  { path: "./recurso/Herramientas/mongodb.png", label: "MongoDB" },
  { path: "./recurso/Herramientas/C.png", label: "C" },
  { path: "./recurso/Herramientas/cpp.png", label: "C++" },
  { path: "./recurso/Herramientas/asm.png", label: "Assembly" },
  { path: "./recurso/Herramientas/matlab.png", label: "Matlab" },
  { path: "./recurso/Herramientas/eplan.jpg", label: "Eplan" },
  { path: "./recurso/Herramientas/latex.png", label: "Latex" },
  { path: "./recurso/Herramientas/fusion360.png", label: "Fusion360" },
  { path: "./recurso/Herramientas/arduino.png", label: "Arduino" },
  { path: "./recurso/Herramientas/raspberry.png", label: "Raspberry" },
  { path: "./recurso/Herramientas/blender.png", label: "Blender" },
  { path: "./recurso/Herramientas/altium.png", label: "Altium" },
  { path: "./recurso/Herramientas/ubuntu.png", label: "Ubuntu" },
  { path: "./recurso/Herramientas/ltspice.jpg", label: "Ltspice" },
  { path: "./recurso/Herramientas/linux.png", label: "Linux" },
];

function pickLocalized(value) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[PRINT_LANGUAGE] || value.es || value.en || "";
  }

  return value || "";
}

function t(path) {
  return path.split(".").reduce((value, key) => value?.[key], printTranslations[PRINT_LANGUAGE]) || "";
}

function formatPrintText(template, replacements = {}) {
  return Object.entries(replacements).reduce(
    (text, [key, value]) => text.replace(`{{${key}}}`, value),
    template
  );
}

function applyPrintTranslations() {
  document.documentElement.lang = PRINT_LANGUAGE;
  document.title = t("pageTitle");
  setPrintText("#cv-eyebrow", t("eyebrow"));
  setPrintText("#cv-contact-label-email", t("contact.email"));
  setPrintText("#cv-contact-label-phone", t("contact.phone"));
  setPrintText("#cv-contact-label-linkedin", t("contact.linkedin"));
  setPrintText("#cv-contact-label-github", t("contact.github"));
  setPrintText("#cv-section-profile", t("sections.profile"));
  setPrintText("#cv-section-experience", t("sections.experience"));
  setPrintText("#cv-section-recognition", t("sections.recognition"));
  setPrintText("#cv-section-education", t("sections.education"));
  setPrintText("#cv-section-languages", t("sections.languages"));
  setPrintText("#cv-section-stack", t("sections.stack"));
  setPrintText("#cv-section-projects", t("sections.projects"));
  setPrintText("#cv-profile-summary", t("summary"));
  setPrintText("#cv-recognition-text", t("recognition"));
  setPrintText("#cv-language-spanish-label", t("languages.spanish"));
  setPrintText("#cv-language-spanish-level", t("languages.spanishLevel"));
  setPrintText("#cv-language-english-label", t("languages.english"));
  setPrintText("#cv-language-english-level", t("languages.englishLevel"));
  setPrintText("#cv-language-portuguese-label", t("languages.portuguese"));
  setPrintText("#cv-language-portuguese-level", t("languages.portugueseLevel"));
}

function setPrintText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function getToolLabel(path) {
  const fileName = String(path || "").split("/").pop() || "";
  return fileName.replace(/\.[^.]+$/, "");
}

function renderPrintHeader() {
  setPrintText("#cv-name", printProfile.nombre || "");
  setPrintText("#cv-role", pickLocalized(printProfile.titulo));
  setPrintText("#cv-location", pickLocalized(printProfile.ubicacion));
  setPrintText("#cv-email", printProfile.email || "");
  setPrintText("#cv-phone", printProfile.telefono || "");
  setPrintText("#cv-linkedin", printProfile.linkedinLabel || "");
  setPrintText("#cv-github", printProfile.githubLabel || "");
  setPrintText("#cv-banner-name", printProfile.nombre || "");
  setPrintText("#cv-banner-role", pickLocalized(printProfile.titulo));
  setPrintText("#cv-banner-email", printProfile.email || "");
  setPrintText("#cv-banner-phone", printProfile.telefono || "");
  setPrintText("#cv-banner-linkedin", printProfile.linkedinLabel || "");
  setPrintText("#cv-banner-github", printProfile.githubLabel || "");

  const photoContainer = document.querySelector("#cv-profile-photo");
  if (photoContainer && printProfile.foto) {
    photoContainer.innerHTML = `<img src="${printProfile.foto}" alt="${formatPrintText(t("profilePhotoAlt"), {
      name: printProfile.nombre || "perfil",
    })}">`;
  }
}

function renderStrengths() {
  const strengths = [
    "Trabajo en equipo",
    "Liderazgo",
    "Consejeria",
    "Aprendizaje constante",
    "Comunicacion clara",
    "Criterio tecnico",
  ];
  const container = document.querySelector("#cv-strengths");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  strengths.forEach((strength) => {
    const item = document.createElement("li");
    item.textContent = strength;
    container.appendChild(item);
  });
}

function renderExperience() {
  const container = document.querySelector("#cv-experience");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  printExperience.forEach((item) => {
    const article = document.createElement("article");
    article.className = "cv-experience-item";
    const company = pickLocalized(item.empresa);
    const logoMarkup = item.logo
      ? `
        <div class="cv-experience-logo">
          <img src="${item.logo}" alt="${formatPrintText(t("logoOf"), { label: company })}">
        </div>
      `
      : "";
    article.innerHTML = `
      <div class="cv-experience-item-layout">
        ${logoMarkup}
        <div class="cv-experience-item-body">
          <div class="cv-experience-item-header">
            <div>
              <h3>${pickLocalized(item.puesto)}</h3>
              <div class="cv-experience-company">${company}</div>
              <div class="cv-experience-period">${pickLocalized(item.periodo)}</div>
            </div>
          </div>
          <p>${pickLocalized(item.descripcion)}</p>
        </div>
      </div>
    `;
    container.appendChild(article);
  });
}

function renderEducation() {
  const container = document.querySelector("#cv-education");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  printEducation.forEach((item) => {
    const article = document.createElement("article");
    article.className = "cv-education-item";
    const institution = pickLocalized(item.institucion);
    const logoMarkup = item.logo
      ? `
        <div class="cv-education-logo">
          <img src="${item.logo}" alt="${formatPrintText(t("logoOf"), { label: institution })}">
        </div>
      `
      : "";
    article.innerHTML = `
      <div class="cv-education-item-main">
        ${logoMarkup}
        <div>
          <strong>${pickLocalized(item.programa)}</strong>
          <div class="cv-experience-period">${pickLocalized(item.periodo)}</div>
          <span>${institution}</span>
        </div>
      </div>
    `;
    container.appendChild(article);
  });
}

function renderProjects() {
  const container = document.querySelector("#cv-projects");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  printProjects.forEach((item) => {
    const article = document.createElement("article");
    article.className = "cv-project-item";
    const toolMarkup = Array.isArray(item.herramientas)
      ? item.herramientas
          .slice(0, 5)
          .map(
            (tool) => `
              <span class="cv-project-tool-chip">
                <img src="${tool}" alt="${getToolLabel(tool)}">
              </span>
            `
          )
          .join("")
      : "";

    article.innerHTML = `
      <div class="cv-project-item-header">
        <div>
          <div class="cv-project-type">${pickLocalized(item.clase)}</div>
          <h3>${pickLocalized(item.titulo)}</h3>
        </div>
      </div>
      <p>${pickLocalized(item.descripcion)}</p>
      <div class="cv-project-tools">${toolMarkup}</div>
    `;
    container.appendChild(article);
  });
}

function renderStack() {
  const container = document.querySelector("#cv-stack");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${Math.ceil(printStack.length / 2)}, minmax(0, 1fr))`;
  printStack.forEach((tool) => {
    const item = document.createElement("div");
    item.className = "cv-stack-item";
    item.innerHTML = `<img src="${tool.path}" alt="${tool.label}" title="${tool.label}">`;
    container.appendChild(item);
  });
}

applyPrintTranslations();
renderPrintHeader();
renderStrengths();
renderExperience();
renderEducation();
renderStack();
renderProjects();

if (new URLSearchParams(window.location.search).get("print") === "1") {
  window.addEventListener("load", () => {
    window.setTimeout(() => {
      window.print();
    }, 250);
  });
}
