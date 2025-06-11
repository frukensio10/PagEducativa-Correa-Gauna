const activities = [
    {
      id: 1,
      title: "Control de LED con Arduino",
      description: "Aprende a encender y apagar un LED mediante programación básica en Arduino.",
      objective: "Introducir a los estudiantes en el uso básico de Arduino y programación secuencial.",
      tools: ["Arduino Uno", "LED", "Resistencia 220Ω", "Protoboard", "Cables"],
      concepts: ["Salida digital", "Pines GPIO", "Estructura de código Arduino"],
      level: "Básico",
      duration: "45 minutos",
      ageRange: "13-15",
      tab: "arduino"
    },
    {
      id: 2,
      title: "Sensor de temperatura DHT11",
      description: "Construye un termómetro digital usando el sensor DHT11 y muestra los datos en el monitor serial.",
      objective: "Familiarizar a los alumnos con sensores analógicos y lecturas de datos ambientales.",
      tools: ["Arduino Uno", "Sensor DHT11", "LCD Display", "I2C", "Cables"],
      concepts: ["Sensores analógicos", "Comunicación I2C", "Visualización de datos", "Variables y condiciones"],
      level: "Intermedio",
      duration: "60 minutos",
      ageRange: "14-16",
      tab: "arduino"
    },
    {
      id: 3,
      title: "Simulación de semáforo",
      description: "Implementa un semáforo funcional utilizando LEDs y resistencias en Tinkercad.",
      objective: "Practicar control de salidas digitales y secuencias lógicas en un entorno virtual seguro.",
      tools: ["Tinkercad", "LEDs (rojo, amarillo, verde)", "Resistencias", "Arduino Virtual"],
      concepts: ["Lógica secuencial", "Delay y estados", "Simulación de hardware"],
      level: "Básico",
      duration: "40 minutos",
      ageRange: "13-15",
      tab: "tinkercad"
    },
    {
      id: 4,
      title: "Servomotor controlado por potenciómetro",
      description: "Gira un servomotor según la posición del potenciómetro, integrando hardware y lógica analógica.",
      objective: "Mostrar cómo los valores analógicos pueden ser usados para controlar dispositivos físicos.",
      tools: ["Arduino Uno", "Servo Motor", "Potenciómetro 10kΩ", "Protoboard", "Cables"],
      concepts: ["Entradas analógicas", "Mapeo de valores", "Control proporcional", "Actuadores"],
      level: "Avanzado",
      duration: "75 minutos",
      ageRange: "15-17",
      tab: "arduino"
    },
    {
      id: 5,
      title: "Detector de luz con LDR",
      description: "Crea un sistema que responda a cambios de luz ambiental usando una fotocelda (LDR) en Tinkercad.",
      objective: "Introducir sensores analógicos en un entorno virtual, útil para proyectos de automatización.",
      tools: ["Tinkercad", "LDR", "LED", "Resistencia variable", "Arduino Virtual"],
      concepts: ["Sensores analógicos", "Umbralización", "Condicionales", "Automatización"],
      level: "Intermedio",
      duration: "50 minutos",
      ageRange: "14-16",
      tab: "tinkercad"
    }
  ];
  
  let currentPage = 'home';
  let searchQuery = '';
  
  function renderMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.innerHTML = `
      <div class="flex flex-col space-y-3">
        <button onclick="goToPage('home'); toggleMenu()" class="px-4 py-2 rounded hover:bg-gray-700 ${currentPage === 'home' ? 'bg-blue-600 text-white' : ''}">Inicio</button>
        <button onclick="goToPage('arduino'); toggleMenu()" class="px-4 py-2 rounded hover:bg-gray-700 ${currentPage === 'arduino' ? 'bg-blue-600 text-white' : ''}">Arduino</button>
        <button onclick="goToPage('tinkercad'); toggleMenu()" class="px-4 py-2 rounded hover:bg-gray-700 ${currentPage === 'tinkercad' ? 'bg-teal-600 text-white' : ''}">Tinkercad</button>
        <button onclick="goToPage('nosotros'); toggleMenu()" class="px-4 py-2 rounded hover:bg-gray-700 ${currentPage === 'nosotros' ? 'bg-purple-600 text-white' : ''}">Sobre Nosotros</button>
      </div>
    `;
  }
  
  function toggleMenu() {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  }
  
  document.getElementById("menu-toggle").addEventListener("click", toggleMenu);
  
  function goToPage(page) {
    window.location.hash = page;
  }
  
  window.addEventListener("hashchange", () => {
    currentPage = window.location.hash.replace('#', '') || 'home';
    render();
  });
  
  function render() {
    const app = document.getElementById("app");
    const templateId = currentPage === 'home' ? 'inicio-template'
                       : currentPage === 'nosotros' ? 'sobre-nosotros-template'
                       : 'actividades-template';
  
    const template = document.getElementById(templateId).content.cloneNode(true);
    app.innerHTML = '';
    app.appendChild(template);
  
    if (['arduino', 'tinkercad'].includes(currentPage)) {
      const titleEl = app.querySelector("h3");
      titleEl.textContent = currentPage === 'arduino' ? 'Proyectos con Arduino' : 'Actividades en Tinkercad';
  
      const searchInput = app.querySelector("#search-input");
      if (searchInput) {
        searchInput.value = searchQuery;
        searchInput.oninput = (e) => {
          searchQuery = e.target.value.toLowerCase();
          renderActivities();
        };
      }
  
      renderActivities();
    }
  }
  
  function renderActivities() {
    const filtered = activities.filter(a =>
      a.title.toLowerCase().includes(searchQuery) &&
      a.tab === currentPage
    );
  
    const grid = document.getElementById("activities-grid");
    if (!grid) return;
  
    grid.innerHTML = "";
  
    filtered.forEach(activity => {
      const card = document.createElement("div");
      card.className = "bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 border border-gray-700";
      card.innerHTML = `
        <div class="h-40 bg-gradient-to-br from-gray-700 via-gray-800 to-black flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div class="p-5">
          <div class="flex justify-between items-start mb-2">
            <h4 class="text-xl font-semibold">${activity.title}</h4>
            <span class="${activity.level === "Básico" ? "bg-green-800 text-green-200" :
                activity.level === "Intermedio" ? "bg-yellow-800 text-yellow-200" :
                "bg-red-800 text-red-200"} text-xs px-2 py-1 rounded-full">${activity.level}</span>
          </div>
          <p class="text-gray-300 text-sm mb-3">${activity.description}</p>
          <p class="text-xs text-gray-400 mb-3"><strong>Objetivo:</strong> ${activity.objective}</p>
          <div class="mb-3">
            <span class="text-xs text-gray-500">Conceptos:</span>
            <div class="flex flex-wrap gap-1 mt-1">
              ${activity.concepts.map(c => `<span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">${c}</span>`).join('')}
            </div>
          </div>
          <button onclick="downloadPDF(${JSON.stringify(activity)})" class="mt-3 inline-block text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full">
            Descargar PDF
          </button>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  
  function downloadPDF(activity) {
    const content = generatePDFContent(activity);
    const blob = new Blob([content], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${activity.title.replace(/ /g, '_')}.pdf`;
    link.click();
  }
  
  function generatePDFContent(activity) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: auto; padding: 20px;">
        <h1 style="color: #2563eb; font-size: 24px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px;">${activity.title}</h1>
        <p><strong>Nivel:</strong> ${activity.level}</p>
        <p><strong>Rango de edad:</strong> ${activity.ageRange} años</p>
        <p><strong>Duración:</strong> ${activity.duration}</p>
        <h2 style="color: #60a5fa; margin-top: 20px;">Descripción</h2>
        <p>${activity.description}</p>
        <h2 style="color: #60a5fa; margin-top: 20px;">Conceptos clave</h2>
        <ul style="list-style: disc inside;">${activity.concepts.map(c => `<li>${c}</li>`).join('')}</ul>
        <h2 style="color: #60a5fa; margin-top: 20px;">Herramientas necesarias</h2>
        <ul style="list-style: disc inside;">${activity.tools.map(t => `<li>${t}</li>`).join('')}</ul>
        <h2 style="color: #60a5fa; margin-top: 20px;">Pasos</h2>
        <ol style="margin-left: 20px;">${activity.steps ? activity.steps.map(s => `<li>${s}</li>`).join('') : '<li>No disponible</li>'}</ol>
        <p style="margin-top: 30px; font-size: 12px; color: #9ca3af; text-align: center;">Generado por Robótica EduTec | www.roboticaedutec.com</p>
      </div>`;
  }
  
  // Inicialización
  function initApp() {
    renderMenu();
    currentPage = window.location.hash.replace('#', '') || 'home';
    render();
  }
  
  window.onload = initApp;