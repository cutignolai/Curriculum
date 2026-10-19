const printParams = new URLSearchParams(window.location.search);
const PRINT_LANGUAGE = window.CV_LANGUAGE === "en" || printParams.get("lang") === "en" ? "en" : "es";
const printProfile = window.profileData || {};
const printExperience = Array.isArray(window.experienceData) ? window.experienceData : [];
const printEducation = Array.isArray(window.educationData) ? window.educationData : [];
const printProjects = Array.isArray(window.projectsData) ? window.projectsData : [];
const printTools = window.toolsData || { categorias: [], herramientas: {} };
const SITE_URL = "https://ignacio-cutignola.com";
const printTranslations = {
  es: {
    pageTitle: "Ignacio Cutignola - CV",
    eyebrow: "Curriculum Vitae",
    contact: {
      email: "Email",
      phone: "Teléfono",
      linkedin: "LinkedIn",
      github: "GitHub",
      website: "Portfolio",
    },
    sections: {
      profile: "Perfil",
      experience: "Experiencia laboral",
      recognition: "Reconocimientos",
      education: "Educación",
      languages: "Idiomas",
      stack: "Habilidades técnicas",
      projects: "Proyectos",
    },
    summary:
      "Estudiante de Ingeniería Electrónica en el ITBA (85% de la carrera aprobada) y Técnico Electrónico. Actualmente desarrollo firmware y hardware para sistemas embebidos en Prosegur, con experiencia previa en ciberseguridad (Accenture) y desarrollo full stack (Balanz). Como Director-Tutor de la Rama IEEE ITBA diseñé y dicté cursos de programación que llegaron a 430 alumnos. Busco seguir creciendo en roles de firmware, sistemas embebidos y desarrollo de software.",
    recognition: "Beca de honor ITBA",
    languages: [
      { name: "Español", level: "Nativo" },
      { name: "Inglés", level: "Upper-Intermediate (B2)" },
      { name: "Portugués", level: "Intermedio" },
    ],
    tools: "Herramientas",
    profilePhotoAlt: "Foto de perfil de {{name}}",
    logoOf: "Logo de {{label}}",
  },
  en: {
    pageTitle: "Ignacio Cutignola - Resume",
    eyebrow: "Resume",
    contact: {
      email: "Email",
      phone: "Phone",
      linkedin: "LinkedIn",
      github: "GitHub",
      website: "Portfolio",
    },
    sections: {
      profile: "Profile",
      experience: "Work Experience",
      recognition: "Honors & Awards",
      education: "Education",
      languages: "Languages",
      stack: "Technical Skills",
      projects: "Projects",
    },
    summary:
      "Electronics Engineering student at ITBA (85% of the degree completed) and Electronics Technician. I currently develop firmware and hardware for embedded systems at Prosegur, with previous experience in cybersecurity (Accenture) and full-stack development (Balanz). As Director and Tutor at the IEEE ITBA Student Branch, I designed and taught programming courses that reached 430 students. I am looking to keep growing in firmware, embedded systems, and software development roles.",
    recognition: "ITBA Honors Scholarship",
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "Upper-Intermediate (B2)" },
      { name: "Portuguese", level: "Intermediate" },
    ],
    tools: "Tools",
    profilePhotoAlt: "Profile photo of {{name}}",
    logoOf: "{{label}} logo",
  },
};

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

function setPrintText(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function getToolLabel(path) {
  if (typeof window.getToolName === "function") {
    return window.getToolName(path, PRINT_LANGUAGE);
  }

  const fileName = String(path || "").split("/").pop() || "";
  return fileName.replace(/\.[^.]+$/, "");
}

function stripProtocol(url) {
  return String(url || "")
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/[?#].*$/, "")
    .replace(/\/$/, "");
}

function applyPrintTranslations() {
  document.documentElement.lang = PRINT_LANGUAGE;
  document.title = t("pageTitle");
  setPrintText("#cv-eyebrow", t("eyebrow"));
  setPrintText("#cv-section-profile", t("sections.profile"));
  setPrintText("#cv-section-experience", t("sections.experience"));
  setPrintText("#cv-section-recognition", t("sections.recognition"));
  setPrintText("#cv-section-education", t("sections.education"));
  setPrintText("#cv-section-languages", t("sections.languages"));
  setPrintText("#cv-section-stack", t("sections.stack"));
  setPrintText("#cv-section-projects", t("sections.projects"));
  setPrintText("#cv-profile-summary", t("summary"));
  setPrintText("#cv-recognition-text", t("recognition"));
}

function createContactItem(label, text, href, icon) {
  const item = document.createElement("div");
  const labelElement = document.createElement("span");
  const value = document.createElement("strong");
  labelElement.className = icon ? "cv-contact-label-with-icon" : "";

  if (icon) {
    const image = document.createElement("img");
    image.src = icon;
    image.alt = "";
    labelElement.appendChild(image);
  }

  labelElement.appendChild(document.createTextNode(`${label}: `));

  if (href) {
    const link = document.createElement("a");
    link.href = href;
    link.textContent = text;
    value.appendChild(link);
  } else {
    value.textContent = text;
  }

  item.appendChild(labelElement);
  item.appendChild(value);
  return item;
}

function renderPrintHeader() {
  setPrintText("#cv-name", printProfile.nombre || "");
  setPrintText("#cv-role", pickLocalized(printProfile.titulo));
  setPrintText("#cv-location", pickLocalized(printProfile.ubicacion));

  const contact = document.querySelector("#cv-contact");
  if (contact) {
    contact.innerHTML = "";

    if (printProfile.email) {
      contact.appendChild(createContactItem(t("contact.email"), printProfile.email, `mailto:${printProfile.email}`));
    }

    if (printProfile.telefono) {
      contact.appendChild(
        createContactItem(
          t("contact.phone"),
          printProfile.telefono,
          `tel:${String(printProfile.telefono).replace(/[^\d+]/g, "")}`
        )
      );
    }

    if (printProfile.linkedin) {
      const linkedinUrl = printProfile.linkedin.replace(/[?#].*$/, "");
      contact.appendChild(
        createContactItem(
          t("contact.linkedin"),
          stripProtocol(linkedinUrl),
          linkedinUrl,
          "./recurso/Herramientas/linkedin.png"
        )
      );
    }

    if (printProfile.github) {
      contact.appendChild(
        createContactItem(
          t("contact.github"),
          stripProtocol(printProfile.github),
          printProfile.github,
          "./recurso/Herramientas/github-black.png"
        )
      );
    }

    contact.appendChild(createContactItem(t("contact.website"), stripProtocol(SITE_URL), SITE_URL));
  }

  const photoContainer = document.querySelector("#cv-profile-photo");
  const photo = printProfile.fotoCv || printProfile.foto;
  if (PRINT_LANGUAGE === "en") {
    // International resumes usually go without a photo.
    document.querySelector("#cv-page")?.classList.add("cv-no-photo");
  } else if (photoContainer && photo) {
    photoContainer.innerHTML = `<img src="${photo}" alt="${formatPrintText(t("profilePhotoAlt"), {
      name: printProfile.nombre || "perfil",
    })}">`;
  }
}

function createPrintLogo(logo, label, className) {
  if (logo) {
    return `
      <div class="${className}">
        <img src="${logo}" alt="${formatPrintText(t("logoOf"), { label })}">
      </div>
    `;
  }

  return `
    <div class="${className} cv-logo-fallback" aria-hidden="true">${label.slice(0, 2).toUpperCase()}</div>
  `;
}

// Text extractors drop the hyphen when a hyphenated word wraps ("Sallen-Key" -> "SallenKey"),
// so hyphenated words are kept on a single line.
function keepHyphenatedWords(text) {
  return String(text || "").replace(/\S*\w-\w\S*/g, (word) => `<span class="cv-nowrap">${word}</span>`);
}

function createPrintDescription(description) {
  if (Array.isArray(description)) {
    return `<ul class="cv-bullets">${description
      .map((line) => `<li>${keepHyphenatedWords(line)}</li>`)
      .join("")}</ul>`;
  }

  return `<p>${keepHyphenatedWords(description)}</p>`;
}

function createPrintVideoLink(url, label) {
  if (!url) {
    return "";
  }

  return `<p class="cv-project-link">${pickLocalized(label) || "Video"}: <a href="${url}">${url.replace(/^https?:\/\/(www\.)?/, "")}</a></p>`;
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
    const tools = Array.isArray(item.logos) ? item.logos.map(getToolLabel).filter(Boolean) : [];
    const toolsMarkup = tools.length
      ? `<p class="cv-item-tools"><strong>${t("tools")}:</strong> ${tools.join(", ")}</p>`
      : "";
    article.innerHTML = `
      <div class="cv-experience-item-layout">
        ${createPrintLogo(item.logo, company, "cv-experience-logo")}
        <div class="cv-experience-item-body">
          <div class="cv-experience-item-header">
            <h3>${pickLocalized(item.puesto)} | ${company}</h3>
            <div class="cv-experience-period">${pickLocalized(item.periodo)}</div>
          </div>
          ${createPrintDescription(pickLocalized(item.descripcion))}
          ${createPrintVideoLink(item.video, item.videoTitulo)}
          ${toolsMarkup}
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
    const detail = pickLocalized(item.detalle);
    article.innerHTML = `
      <div class="cv-experience-item-layout">
        ${createPrintLogo(item.logo, institution, "cv-education-logo")}
        <div class="cv-experience-item-body">
          <div class="cv-experience-item-header">
            <h3>${pickLocalized(item.programa)} | ${institution}</h3>
            <div class="cv-experience-period">${pickLocalized(item.periodo)}</div>
          </div>
          ${detail ? `<p class="cv-education-detail">${detail}</p>` : ""}
        </div>
      </div>
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
  printTools.categorias.forEach((category) => {
    const names = category.herramientas
      .map((key) => printTools.herramientas[key])
      .filter(Boolean)
      .map((tool) => pickLocalized(tool.nombre));
    const row = document.createElement("p");
    row.className = "cv-skill-row";
    row.innerHTML = `<strong>${pickLocalized(category.nombre)}:</strong> ${names.join(", ")}`;
    container.appendChild(row);
  });
}

function renderLanguages() {
  const container = document.querySelector("#cv-languages");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  t("languages").forEach((language) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${language.name}:</strong> ${language.level}`;
    container.appendChild(item);
  });
}

function renderProjects() {
  const container = document.querySelector("#cv-projects");

  if (!container) {
    return;
  }

  container.innerHTML = "";
  printProjects.filter((item) => item.enCv !== false).forEach((item) => {
    const article = document.createElement("article");
    article.className = "cv-project-item";
    const tools = Array.isArray(item.herramientas) ? item.herramientas.map(getToolLabel).filter(Boolean) : [];
    const toolMarkup = tools.length
      ? `<p class="cv-item-tools"><strong>${t("tools")}:</strong> ${tools.join(", ")}</p>`
      : "";
    const videoMarkup =
      createPrintVideoLink(item.video, item.videoTitulo) +
      createPrintVideoLink(item.linkedin, item.linkedinTitulo) +
      createPrintVideoLink(item.github, item.githubTitulo);

    article.innerHTML = `
      <div class="cv-project-item-header">
        <h3>${pickLocalized(item.titulo)}</h3>
        <div class="cv-project-type">${pickLocalized(item.clase)}</div>
      </div>
      <p>${keepHyphenatedWords(pickLocalized(item.descripcionCv || item.descripcion))}</p>
      ${videoMarkup}
      ${toolMarkup}
    `;
    container.appendChild(article);
  });
}

applyPrintTranslations();
renderPrintHeader();
renderExperience();
renderEducation();
renderStack();
renderLanguages();
renderProjects();

if (printParams.get("print") === "1") {
  window.addEventListener("load", () => {
    window.setTimeout(() => {
      window.print();
    }, 250);
  });
}
