window.projectsData = [
  {
    clase: {
      es: "Proyecto académico",
      en: "Academic project",
    },
    titulo: {
      es: "Clasificador de colores",
      en: "Color classifier",
    },
    descripcion: {
      es: "Máquina que clasifica productos por color en un disco giratorio, en modo automático o manual, con cinta transportadora, sensores, motor paso a paso, control con Arduino Nano y piezas diseñadas en 3D.",
      en: "Machine that sorts products by color onto a rotating disc, in automatic or manual mode, with a conveyor belt, sensors, a stepper motor, Arduino Nano control, and 3D-designed parts.",
    },
    descripcionCv: {
      es: "Máquina desarrollada en equipo que clasifica productos por color en un disco giratorio, con modo automático y manual. Integra una cinta transportadora con motor de continua, sensor de color, sensor inductivo para homing, sensores infrarrojos de detección y llegada, un motor paso a paso, control con Arduino Nano, panel de seguridad para el operario, planos del tablero eléctrico diseñados en EPLAN y piezas diseñadas y modeladas en 3D.",
      en: "Team-built machine that sorts products by color onto a rotating disc, with automatic and manual modes. It integrates a DC-motor conveyor belt, a color sensor, an inductive sensor for homing, infrared sensors for detection and arrival, a stepper motor, Arduino Nano control, an operator safety panel, electrical panel drawings designed in EPLAN, and 3D-designed and modeled parts.",
    },
    media: ["./recurso/Proyectos/Clasificador.jpg"],
    linkedin: "https://lnkd.in/p/dekPENSN",
    linkedinTitulo: {
      es: "Publicación en LinkedIn",
      en: "LinkedIn post",
    },
    herramientas: [
      "./recurso/Herramientas/arduino.png",
      "./recurso/Herramientas/C.png",
      "./recurso/Herramientas/altium.png",
      "./recurso/Herramientas/eplan.jpg",
      "./recurso/Herramientas/fusion360.png",
    ],
  },
  {
    clase: {
      es: "Proyecto académico",
      en: "Academic project",
    },
    titulo: {
      es: "Simulador de muestreo y recuperación de señales",
      en: "Signal sampling and recovery simulator",
    },
    descripcion: {
      es: "Aplicación de escritorio que simula la cadena de muestreo y reconstrucción de una señal: filtro anti-aliasing Sallen-Key de 8.º orden, sample & hold, llave analógica y filtro recuperador, en tiempo y FFT.",
      en: "Desktop app that simulates a signal's sampling and reconstruction chain: 8th-order Sallen-Key anti-aliasing filter, sample & hold, analog switch, and recovery filter, in time and FFT views.",
    },
    descripcionCv: {
      es: "Aplicación de escritorio en Python (PyQt5, NumPy, SciPy y Matplotlib) que simula la cadena completa de muestreo y reconstrucción de una señal analógica. Modela un filtro anti-aliasing de 8.º orden (aproximación de Legendre) con 4 celdas Sallen-Key definidas por componentes reales, un sample & hold, una llave analógica con duty cycle configurable y un filtro recuperador. Cada etapa se puede activar o puentear y se visualiza en tiempo y en frecuencia (FFT), sobre una arquitectura extensible con una clase base común.",
      en: "Python desktop application (PyQt5, NumPy, SciPy, and Matplotlib) that simulates the full sampling and reconstruction chain of an analog signal. It models an 8th-order anti-aliasing filter (Legendre approximation) built from 4 Sallen-Key cells defined by real components, a sample & hold, an analog switch with configurable duty cycle, and a recovery filter. Each stage can be enabled or bypassed and is displayed in time and frequency (FFT), on an extensible architecture with a common base class.",
    },
    media: [
      "./recurso/Proyectos/ASSD-tiempo.png",
      "./recurso/Proyectos/ASSD-frecuencia.png",
    ],
    github: "https://github.com/cutignolai/ASSD-TP1",
    githubTitulo: {
      es: "Repositorio en GitHub",
      en: "GitHub repository",
    },
    herramientas: ["./recurso/Herramientas/python.png"],
  },
  {
    clase: {
      es: "Proyecto académico",
      en: "Academic project",
    },
    titulo: {
      es: "Brazo robótico que dibuja a partir de imágenes",
      en: "Robotic arm that draws from images",
    },
    descripcion: {
      es: "Junto con mi grupo de la universidad, implementamos un brazo robot al cual se le envía la imagen de un dibujo y tiene la capacidad de interpretarlo y replicarlo.",
      en: "Together with my university team, we implemented a robotic arm that receives an image of a drawing and is able to interpret and replicate it.",
    },
    media: [
      "./recurso/Proyectos/Brazo.jpeg",
      "./recurso/Proyectos/Dibujo.jpeg",
      "./recurso/Proyectos/Dibujado.jpeg",
    ],
    herramientas: [
      "./recurso/Herramientas/matlab.png",
      "./recurso/Herramientas/vision.png",
    ],
  },
  {
    clase: {
      es: "Emprendimiento personal",
      en: "Personal venture",
    },
    titulo: {
      es: "Pulp Vision 3D",
      en: "Pulp Vision 3D",
    },
    descripcion: {
      es: "Emprendimiento de impresión 3D: diseño y fabricación de piezas mecánicas y repuestos a medida con una Ender 3 SE, en PLA y PETG, desde el modelado hasta la venta.",
      en: "3D printing venture: design and manufacturing of mechanical parts and custom spare parts on an Ender 3 SE, in PLA and PETG, from modeling to sale.",
    },
    media: ["./recurso/Proyectos/PulpVision.gif"],
    herramientas: [
      "./recurso/Herramientas/fusion360.png",
      "./recurso/Herramientas/blender.png",
      "./recurso/Herramientas/photoshop.png",
      "./recurso/Herramientas/premier.png",
      "./recurso/Herramientas/excel.png",
    ],
  },
  {
    clase: {
      es: "Proyecto personal",
      en: "Personal project",
    },
    titulo: {
      es: "Administrador de stock doméstico",
      en: "Home stock manager",
    },
    descripcion: {
      es: "Sistema para el hogar que registra los productos con un lector de código de barras y usa una Raspberry Pi como cerebro central: lleva el stock, avisa por mail cuando falta algo y arma la lista de compras.",
      en: "Home system that registers products with a barcode reader and uses a Raspberry Pi as its central brain: it tracks stock, sends email alerts when something runs out, and builds the shopping list.",
    },
    media: [],
    herramientas: [
      "./recurso/Herramientas/arduino.png",
      "./recurso/Herramientas/raspberry.png",
      "./recurso/Herramientas/mongodb.png",
      "./recurso/Herramientas/postgres.png",
      "./recurso/Herramientas/linux.png",
    ],
  },
  {
    clase: {
      es: "Docencia particular",
      en: "Private tutoring",
    },
    titulo: {
      es: "Clases particulares",
      en: "Private lessons",
    },
    descripcion: {
      es: "Clases de Física, Matemática, C/C++ y Python 3 para un grupo de entre 5 y 10 alumnos, con foco en claridad conceptual y acompañamiento personalizado.",
      en: "Lessons in Physics, Mathematics, C/C++, and Python 3 for a group of 5 to 10 students, with a focus on conceptual clarity and personalized support.",
    },
    media: [],
    herramientas: [
      "./recurso/Herramientas/python.png",
      "./recurso/Herramientas/cpp.png",
    ],
  },
  {
    clase: {
      es: "Proyecto personal",
      en: "Personal project",
    },
    titulo: {
      es: "Consola retro arcade",
      en: "Retro arcade console",
    },
    enCv: false,
    descripcion: {
      es: "Armado de un sistema de arcade usando RetroPie, incluyendo la configuración del software, carga de juegos y conexión de controles físicos. Se logró un sistema funcional para emulación de videojuegos clásicos.",
      en: "Built an arcade system using RetroPie, including software setup, game loading, and physical controller connection. The result was a functional system for classic video game emulation.",
    },
    media: [],
    herramientas: ["./recurso/Herramientas/raspberry.png"],
  },
];
