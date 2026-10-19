window.toolsData = {
  categorias: [
    {
      id: "embedded",
      nombre: {
        es: "Embebidos y hardware",
        en: "Embedded & Hardware",
      },
      herramientas: ["C", "cpp", "asm", "atmel_studio", "bascom", "arduino", "raspberry", "altium", "ltspice", "eplan"],
    },
    {
      id: "software",
      nombre: {
        es: "Software y datos",
        en: "Software & Data",
      },
      herramientas: ["python", "TypeScript", "node", "angular", "postgres", "redis", "mongodb", "postman"],
    },
    {
      id: "systems",
      nombre: {
        es: "Sistemas y seguridad",
        en: "Systems & Security",
      },
      herramientas: ["linux", "ubuntu", "kali"],
    },
    {
      id: "design",
      nombre: {
        es: "Diseño, cálculo y documentación",
        en: "Design, Computing & Documentation",
      },
      herramientas: ["fusion360", "blender", "matlab", "latex", "photoshop", "premier", "excel"],
    },
  ],
  herramientas: {
    C: { nombre: "C", archivo: "./recurso/Herramientas/C.png" },
    cpp: { nombre: "C++", archivo: "./recurso/Herramientas/cpp.png" },
    asm: { nombre: "Assembly", archivo: "./recurso/Herramientas/asm.png" },
    atmel_studio: { nombre: "Atmel Studio", archivo: "./recurso/Herramientas/atmel_studio.png" },
    bascom: { nombre: "BASCOM", archivo: "./recurso/Herramientas/bascom.png" },
    arduino: { nombre: "Arduino", archivo: "./recurso/Herramientas/arduino.png" },
    raspberry: { nombre: "Raspberry Pi", archivo: "./recurso/Herramientas/raspberry.png" },
    altium: { nombre: "Altium Designer", archivo: "./recurso/Herramientas/altium.png" },
    ltspice: { nombre: "LTspice", archivo: "./recurso/Herramientas/ltspice.jpg" },
    eplan: { nombre: "EPLAN", archivo: "./recurso/Herramientas/eplan.jpg" },
    python: { nombre: "Python", archivo: "./recurso/Herramientas/python.png" },
    TypeScript: { nombre: "TypeScript", archivo: "./recurso/Herramientas/TypeScript.png" },
    node: { nombre: "Node.js", archivo: "./recurso/Herramientas/node.png" },
    angular: { nombre: "Angular", archivo: "./recurso/Herramientas/angular.png" },
    postgres: { nombre: "SQL (PostgreSQL)", archivo: "./recurso/Herramientas/postgres.png" },
    redis: { nombre: "Redis", archivo: "./recurso/Herramientas/redis.png" },
    mongodb: { nombre: "MongoDB", archivo: "./recurso/Herramientas/mongodb.png" },
    postman: { nombre: "Postman", archivo: "./recurso/Herramientas/postman.png" },
    linux: { nombre: "Linux", archivo: "./recurso/Herramientas/linux.png" },
    ubuntu: { nombre: "Ubuntu", archivo: "./recurso/Herramientas/ubuntu.png" },
    kali: { nombre: "Kali Linux", archivo: "./recurso/Herramientas/kali.png" },
    fusion360: { nombre: "Fusion 360", archivo: "./recurso/Herramientas/fusion360.png" },
    blender: { nombre: "Blender", archivo: "./recurso/Herramientas/blender.png" },
    matlab: { nombre: "MATLAB", archivo: "./recurso/Herramientas/matlab.png" },
    latex: { nombre: "LaTeX", archivo: "./recurso/Herramientas/latex.png" },
    photoshop: { nombre: "Photoshop", archivo: "./recurso/Herramientas/photoshop.png" },
    premier: { nombre: "Premiere Pro", archivo: "./recurso/Herramientas/premier.png" },
    excel: { nombre: "Excel", archivo: "./recurso/Herramientas/excel.png" },
    vision: {
      nombre: { es: "Visión artificial", en: "Computer Vision" },
      archivo: "./recurso/Herramientas/vision.png",
    },
  },
};

window.getToolName = function getToolName(path, language) {
  const fileName = String(path || "").split("/").pop() || "";
  const key = fileName.replace(/\.[^.]+$/, "");
  const tool = window.toolsData.herramientas[key];

  if (!tool) {
    return key;
  }

  if (typeof tool.nombre === "object") {
    return tool.nombre[language] || tool.nombre.es;
  }

  return tool.nombre;
};
