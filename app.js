const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4o42FhIcR4mcGG1chHjHDjBu0IMTqyeCsUMrC-XHM_tdfp_QyfzQuZ1p-su4qMjksAA/exec';

let charactersData = [];
let newsData = [];
let selectedCharaTab1 = null;
let selectedCharaTab2 = null;
let selectedCharaSim = null;
let reporteGuardado = [];
let lastUserSelectedLevelTab2 = 1;

let characterSkinState = {};
try {
  const savedSkinState = localStorage.getItem('characterSkinState');
  if (savedSkinState) characterSkinState = JSON.parse(savedSkinState);
} catch(e) { characterSkinState = {}; }

let zeroSkillState = {
  1: 0,
  2: 0,
  3: 0
};
try {
  const savedZeroState = localStorage.getItem('zeroSkillState');
  if (savedZeroState) zeroSkillState = JSON.parse(savedZeroState);
} catch(e) {}

let tab2UserState = {};
try {
  const savedTab2 = localStorage.getItem('tab2UserState');
  if (savedTab2) tab2UserState = JSON.parse(savedTab2);
} catch(e) {}

let simUserState = {};
try {
  const savedSim = localStorage.getItem('simUserState');
  if (savedSim) simUserState = JSON.parse(savedSim);
} catch(e) {}

let lastSelectedTab1 = localStorage.getItem('lastSelectedTab1') || '';
let lastSelectedTab2 = localStorage.getItem('lastSelectedTab2') || '';
let lastSelectedSim = localStorage.getItem('lastSelectedSim') || '';

const FONS_ICON_URL = 'https://lh3.googleusercontent.com/d/1eFSFZPncsRkZU-yORmU10zoxF5zwjt7T';
const AFFINITY_ICON_URL = 'https://lh3.googleusercontent.com/d/1Z9mfkUazDUY8z7LAoLsGal_JhGtrJL65';
const CARD_WRITE_IMG_URL = 'https://lh3.googleusercontent.com/d/1C9x-jmc4PuFCqtxZh8xinbZj-oTKR6TX';
const MOVIE_TICKET_IMG_URL = 'https://lh3.googleusercontent.com/d/14PzrxqsRtv8vZU3cnme0eC2d40PinhVr';
const SIM_NEW_ITEM_1 = 'https://lh3.googleusercontent.com/d/1dqQm82jdyCUIBGBTSEcaZVMZ4TMOuKPl';
const SIM_NEW_ITEM_2 = 'https://lh3.googleusercontent.com/d/1kggvA_cInSaqtsSJOLKUZgoGuoplaifp';

const BG_CARTA_URL = 'https://lh3.googleusercontent.com/d/1Sy-J4o3eir_Om4JJ7bjA27_pnOvXZAgM';
const BG_SPECIAL_ITEMS_URL = 'https://lh3.googleusercontent.com/d/1I4FqYEOsP5gjH3d1gCG90wRmbkj4oYv1';

const EXP_PARA_SUBIR = [500, 1000, 2000, 3500, 5000, 7000, 9000, 12000, 16000];
const REQUISITOS_NIVEL = [100, 500, 1000, 2000, 3500, 5000, 7000, 9000, 12000, 16000];
const ACUMULADO_HASTA_NIVEL = [0, 500, 1500, 3500, 7000, 12000, 19000, 28000, 40000, 56000];
const AFINIDAD_MAX = 56000;

const COLOR_MAP = {
  'rojo': '#ef4444',
  'azul': '#3b82f6',
  'amarillo': '#eab308',
  'verde': '#22c55e',
  'morado': '#a855f7',
  'cian': '#06b6d4',
  'rosa': '#ec4899',
  'naranja': '#f97316',
  'gris': '#94a3b8',
  'turquesa': '#14b8a6', 
  'blanco': '#f8fafc',
  'dorado': '#fbbf24'
};

const translations = {
  es: {
    tabInicio: "Inicio",
    tabPersonajes: "General",
    tabCalcular: "Calcular Afinidad",
    tabSimulador: "Simulador",
    tabNews: "Noticias",
    tabAbout: "Acerca de",
    headerPersonajesTitle: "GENERAL",
    headerPersonajesDesc: "Consulta los regalos favoritos de cada personaje para planificar tus recursos. Los cálculos de esta pestaña están considerados para llevar la afinidad de nivel 1 al nivel 10.",
    headerCalcularTitle: "CALCULAR AFINIDAD",
    headerCalcularDesc: "Calcula cuántos regalos, nubes y citas te tomará de acuerdo a tu nivel actual de afinidad ingresada.",
    headerSimuladorTitle: "SIMULADOR",
    headerSimuladorDesc: "Simula la progresión de nivel de cualquier personaje de manera dinámica ajustando la cantidad de regalos a tu criterio. Puedes hacerlo de 1 al 10 o ingresando tu afinidad actual en la parte inferior.",
    headerNewsTitle: "NOTICIAS Y REGISTRO DE CAMBIOS",
    headerNewsDesc: "Registro histórico de actualizaciones, parches y mejoras aplicadas a la calculadora.",
    headerAboutTitle: "ACERCA DE LA HERRAMIENTA",
    headerAboutDesc: "Información general y descargo de responsabilidad.",
    seleccionarEsper: "Seleccionar Esper",
    subtituloInicio: "Usa la rueda del ratón o arrastra para explorar",
    bonoAfinidad: "Bono de afinidad nivel 10",
    bonoObsesion: "Bono de obsesión nivel 10",
    outfit: "Outfit",
    noOutfit: "No cuenta con traje de afinidad",
    itemLabel: "Item",
    affinityLabel: "Afinidad",
    icono: "[ Icono ]",
    avatar: "[ Avatar ]",
    necesita: "Afinidad faltante para nivel 10",
    necesitaObsesion: "Obsesión faltante para nivel 10",
    ingreseAfinidad: "Ingrese su afinidad actual",
    ingreseObsesion: "Ingrese su obsesión actual",
    nivel: "Nivel",
    cantRegalos: "Regalos necesarios",
    diasFaltantes: "Días faltantes",
    precioUnidad: "Precio por unidad",
    costoTotalFons: "Costo total de Fons",
    nubesUsar: "Nubes a usar",
    cita: "¿Cita?",
    contarCita: "¿Incluir cita diaria?",
    contarDuelo: "¿Contar duelo?",
    usarNube: "¿Incluir nube?",
    sinCitaMsg: "Este personaje no cuenta con sistema de citas",
    reporteTitulo: "Reporte de Recursos Guardados",
    limpiarReporte: "Limpiar",
    exportarPng: "Descargar",
    costoTotalLv10: "COSTO TOTAL A NIVEL 10",
    bondLevelText: "NIVEL DE AFINIDAD",
    giftsAmountText: "Regalos faltantes:",
    datesUsedText: "Cita restantes:",
    cloudsUsedText: "Nubes faltantes:",
    daysRemainingText: "Días restantes:",
    regalosSinCondicion: "Regalos ilimitados",
    cartaEscritaMano: "Carta escrita a mano",
    boletoCineFloe: "Boleto del cine Floe",
    enviarACalcular: "Enviar datos",
    resetearSim: "Resetear",
    tablaProgresion: "TABLA DE PROGRESIÓN DE NIVEL",
    afinidadAcumulada: "AFINIDAD ACUMULADA",
    afinidadRequerida: "AFINIDAD REQUERIDA",
    defaultAttire: "Atuendo por Defecto",
    bondAttire: "Traje de Afinidad",
    tabla: "ESTADÍSTICAS",
    aplicarRegalos: "Aplicar regalos al perfil",
    urbanSkill: "Habilidad Urbana",
    favoritosTitle: "Favoritos",
    inventarioTitle: "Inventario",
    affectionLabelText: "Afinidad",
    affinityLabelUpper: "AFINIDAD",
    levelLabelShort: "NIVEL",
    affinityLabelShort: "AFINIDAD",
    obsessionLabel: "Obsesión",
    obsessionLabelUpper: "OBSESIÓN"
  },
  en: {
    tabInicio: "Home",
    tabPersonajes: "General",
    tabCalcular: "Affinity Calculator",
    tabSimulador: "Simulator",
    tabNews: "News",
    tabAbout: "About",
    headerPersonajesTitle: "GENERAL",
    headerPersonajesDesc: "Browse favorite gifts for each character to plan your resources. Calculations in this tab are designed to take affection from level 1 to level 10.",
    headerCalcularTitle: "AFFINITY CALCULATOR",
    headerCalcularDesc: "Calculate how many gifts, fluffy cottons, and dates it will take based on your current affection level.",
    headerSimuladorTitle: "SIMULATOR",
    headerSimuladorDesc: "Simulate level progression dynamically by adjusting gift amounts to your liking, taking your current level and affection into account.",
    headerNewsTitle: "NEWS & CHANGELOG",
    headerNewsDesc: "Historical updates, patches, and feature improvements applied to the calculator.",
    headerAboutTitle: "ABOUT THIS TOOL",
    headerAboutDesc: "General information and disclaimer.",
    seleccionarEsper: "Select Esper",
    subtituloInicio: "Use mouse wheel or drag to explore",
    bonoAfinidad: "Level 10 Affection Bonus",
    bonoObsesion: "Level 10 Obsession Bonus",
    outfit: "Outfit",
    noOutfit: "No affection outfit available",
    itemLabel: "Item",
    affinityLabel: "Affection",
    icono: "[ Icon ]",
    avatar: "[ Avatar ]",
    necesita: "Affection required to level 10",
    necesitaObsesion: "Obsession required to level 10",
    ingreseAfinidad: "Enter current affection",
    ingreseObsesion: "Enter current obsession",
    nivel: "Level",
    cantRegalos: "Gifts required",
    diasFaltantes: "Days to go",
    precioUnidad: "Cost",
    costoTotalFons: "Total Fons cost",
    nubesUsar: "Fluffy Cotton required",
    cita: "Date?",
    contarCita: "Date?",
    contarDuelo: "Duel?",
    usarNube: "Fluffy Cotton?",
    sinCitaMsg: "This character cannot be dated",
    reporteTitulo: "Saved Resources Report",
    limpiarReporte: "Clear all",
    exportarPng: "Download",
    costoTotalLv10: "TOTAL COST TO LV.10",
    bondLevelText: "BOND LEVEL",
    giftsAmountText: "Gifts required:",
    datesUsedText: "Dates required:",
    cloudsUsedText: "Fluffy Cotton req.:",
    daysRemainingText: "Days to go:",
    regalosSinCondicion: "Unlimited Gifts",
    cartaEscritaMano: "A Handwritten Letter",
    boletoCineFloe: "Floe Cinema Ticket",
    enviarACalcular: "Send data",
    resetearSim: "Reset",
    tablaProgresion: "LEVEL PROGRESSION TABLE",
    afinidadAcumulada: "ACCUMULATED AFFECTION",
    afinidadRequerida: "ACCUMULATED AFFECTION",
    defaultAttire: "Default Attire",
    bondAttire: "Bond Attire",
    tabla: "STATISTICS",
    aplicarRegalos: "Apply gifts to profile",
    urbanSkill: "Life Skills",
    favoritosTitle: "Favorites",
    inventarioTitle: "Inventory",
    affectionLabelText: "Affection",
    affinityLabelUpper: "AFFECTION",
    levelLabelShort: "LEVEL",
    affinityLabelShort: "AFFECTION",
    obsessionLabel: "Obsession",
    obsessionLabelUpper: "OBSESSION"
  }
};

let currentLang = 'es';

window.onload = function() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
  }
  
  const toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
  if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('appSidebar');
      if (sidebar) {
        sidebar.classList.toggle('collapsed');
      }
    });
  }

  const savedReport = localStorage.getItem('reporteGuardado');
  if (savedReport) {
    try {
      reporteGuardado = JSON.parse(savedReport);
    } catch(e) { reporteGuardado = []; }
  }

  const cachedData = localStorage.getItem('charactersData_cache');
  if (cachedData) {
    try {
      const parsedData = JSON.parse(cachedData);
      processPayloadData(parsedData);
    } catch (e) {
      console.error('Error al leer la caché local:', e);
    }
  }

  fetch(SCRIPT_URL)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('charactersData_cache', JSON.stringify(data));
      processPayloadData(data);
    })
    .catch(error => {
      console.error('Error al cargar los datos de Google Sheets:', error);
      if (!cachedData) {
        alert('Hubo un error al conectar con la base de datos.');
      }
    });
};

function processPayloadData(payload) {
  if (Array.isArray(payload)) {
    charactersData = payload;
    newsData = [];
  } else if (payload && typeof payload === 'object') {
    charactersData = payload.characters || [];
    newsData = payload.news || [];
  }
  
  initWeb(charactersData);
  renderNews();
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  aplicarTraducciones();

  const isEn = currentLang === 'en';

  if (selectedCharaTab1) {
    onCharacterChangeTab1(selectedCharaTab1.chara);
  }

  if (selectedCharaTab2) {
    onCharacterChangeTab2(selectedCharaTab2.chara);
  }

  if (selectedCharaSim) {
    const simCharaTagContainer = document.getElementById('sim-chara-tag-container');
    if (simCharaTagContainer) {
      const descrip = isEn ? (selectedCharaSim.vinc_descrip_en || selectedCharaSim.vinc_descrip) : selectedCharaSim.vinc_descrip;
      const textoEtiqueta = descrip || `Miembro de UAC-2`;
      simCharaTagContainer.innerHTML = `
        <svg class="sim-location-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style="fill: #94a3b8; flex-shrink: 0; display: inline-block; vertical-align: middle;">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span>${textoEtiqueta}</span>
      `;
    }
    simActualizarOutfitVisual();
  }

  recalculate();
  renderReporte();
  renderNews();
}

function aplicarTraducciones() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.innerText = t[key];
  });
  
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    const globeSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path></svg>`;
    langBtn.innerHTML = `${globeSVG} <span>${currentLang === 'es' ? 'ES' : 'EN'}</span>`;
  }

  [1, 2, 3].forEach(tabNum => {
    const labelBtn = document.querySelector(`#zero-skill-tab${tabNum} .zero-label-btn`);
    if (labelBtn) labelBtn.innerText = t.urbanSkill;
  });

  if (selectedCharaTab1) {
    onCharacterChangeTab1(selectedCharaTab1.chara);
  }

  if (selectedCharaTab2) {
    actualizarTerminologiaZankouUI(selectedCharaTab2.chara);
  }

  if (selectedCharaSim) {
    simOnCharacterChange(selectedCharaSim.chara);
  }
}

function actualizarTerminologiaZankouUI(nombreChara) {
  const isZankou = nombreChara && nombreChara.toLowerCase().includes('zankou');
  const t = translations[currentLang];

  const labelAfiInput = document.getElementById('p2-afiactual-label');
  if (labelAfiInput) {
    labelAfiInput.innerText = isZankou ? t.ingreseObsesion : t.ingreseAfinidad;
  }

  const labelNecesita = document.getElementById('p2-necesita-label');
  if (labelNecesita) {
    labelNecesita.innerText = isZankou ? t.necesitaObsesion : t.necesita;
  }
}

function initWeb(data) {
  charactersData = data;
  const sel1 = document.getElementById('select-chara-1');
  const sel2 = document.getElementById('select-chara-2');

  if (sel1) sel1.innerHTML = '';
  if (sel2) sel2.innerHTML = '';

  data.forEach(c => {
    if (sel1) {
      let opt1 = document.createElement('option');
      opt1.value = c.chara; opt1.text = c.chara;
      sel1.appendChild(opt1);
    }

    if (sel2) {
      let opt2 = document.createElement('option');
      opt2.value = c.chara; opt2.text = c.chara;
      sel2.appendChild(opt2);
    }
  });

  renderDotaCarousel(data);
  renderSimVerticalCarousel(data);
  setupCarouselButtons();
  renderZeroSkillComponents();

  if (data.length > 0) {
    const charTab1ToLoad = (lastSelectedTab1 && data.some(c => c.chara === lastSelectedTab1)) ? lastSelectedTab1 : data[0].chara;
    const charTab2ToLoad = (lastSelectedTab2 && data.some(c => c.chara === lastSelectedTab2)) ? lastSelectedTab2 : data[0].chara;
    const charSimToLoad  = (lastSelectedSim  && data.some(c => c.chara === lastSelectedSim )) ? lastSelectedSim  : data[0].chara;

    onCharacterChangeTab1(charTab1ToLoad);
    onCharacterChangeTab2(charTab2ToLoad);
    simOnCharacterChange(charSimToLoad);
  }
  aplicarTraducciones();
  renderReporte();

  const savedTab = localStorage.getItem('lastActiveTab');
  if (savedTab) {
    const targetTabElem = document.getElementById(savedTab);
    let targetBtn = null;
    document.querySelectorAll('.nav-sidebar-btn').forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick');
      if (onclickAttr && onclickAttr.includes(savedTab)) {
        targetBtn = btn;
      }
    });
    if (targetTabElem && targetBtn) {
      switchTab(savedTab, targetBtn, false);
    }
  }
}

function renderNews() {
  const container = document.getElementById('news-feed-container');
  if (!container) return;

  if (!newsData || newsData.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 24px; color: var(--text-muted); font-size: 13px; background: var(--card-bg); border-radius: 12px; border: 1px dashed var(--border-color);">
        ${currentLang === 'en' ? 'No news registered yet.' : 'No hay noticias registradas por el momento.'}
      </div>
    `;
    return;
  }

  const reversedNews = [...newsData].reverse();

  container.innerHTML = reversedNews.map(post => {
    let bullets = [];
    if (post.news_bulletitems) {
      bullets = String(post.news_bulletitems).split('||').map(b => b.trim()).filter(b => b.length > 0);
    }

    const rawDate = post.news_dia || '';
    const cleanDate = rawDate.length >= 10 ? String(rawDate).substring(0, 10) : rawDate;

    return `
      <div class="news-post-card">
        <div class="news-post-header">
          <h3>${post.news_titulo || ''}</h3>
          <span class="news-date-badge">${cleanDate}</span>
        </div>
        <div class="news-body">
          ${post.news_contenido ? `<p>${post.news_contenido}</p>` : ''}
          ${bullets.length > 0 ? `<ul>${bullets.map(item => `<li>${item}</li>`).join('')}</ul>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function renderZeroSkillComponents() {
  [1, 2, 3].forEach(tabNum => {
    updateZeroSkillUI(tabNum);
  });
}

function setZeroSkillLevel(tabNum, level) {
  if (zeroSkillState[tabNum] === level) {
    zeroSkillState[tabNum] = 0;
  } else {
    zeroSkillState[tabNum] = level;
  }
  localStorage.setItem('zeroSkillState', JSON.stringify(zeroSkillState));
  updateZeroSkillUI(tabNum);
  
  if (tabNum === 1) recalculateTab1();
  if (tabNum === 2) recalculateTab2();
  if (tabNum === 3) simRecalcular();
}

function toggleZeroSkillTab(tabNum) {
  if (zeroSkillState[tabNum] > 0) {
    zeroSkillState[tabNum] = 0;
  } else {
    zeroSkillState[tabNum] = 1;
  }
  localStorage.setItem('zeroSkillState', JSON.stringify(zeroSkillState));
  updateZeroSkillUI(tabNum);

  if (tabNum === 1) recalculateTab1();
  if (tabNum === 2) recalculateTab2();
  if (tabNum === 3) simRecalcular();
}

function updateZeroSkillUI(tabNum) {
  const container = document.getElementById(`zero-skill-tab${tabNum}`);
  if (!container) return;

  const currentLvl = zeroSkillState[tabNum];
  const labelBtn = container.querySelector('.zero-label-btn');
  const numBtns = container.querySelectorAll('.zero-num-btn');

  if (currentLvl > 0) {
    container.classList.add('active-skill');
    if (labelBtn) labelBtn.classList.add('active');
  } else {
    container.classList.remove('active-skill');
    if (labelBtn) labelBtn.classList.remove('active');
  }

  numBtns.forEach((btn, idx) => {
    const btnLvl = idx + 1;
    if (btnLvl === currentLvl) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function getZeroBuffValue(zeroLevel, bondLevel, baseValue) {
  if (zeroLevel <= 0 || bondLevel <= 0) return baseValue;

  const maxBondThresholds = { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8 };
  const maxAllowedBond = maxBondThresholds[zeroLevel] || 0;

  if (bondLevel <= maxAllowedBond) {
    return Math.round(baseValue * 1.05);
  }
  return baseValue;
}

function calcularRequisitosAfinidad(baseAfi, costUnit, usaNube, cuentaCita, tieneCita, umbralCita, zeroLevel, afiInicial = 0) {
  const maxBondZeroThresholds = { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8 };
  const maxBondZeroLevel = zeroLevel > 0 ? (maxBondZeroThresholds[zeroLevel] || 0) : 0;
  const afnZeroBufeada = maxBondZeroLevel > 0 ? (ACUMULADO_HASTA_NIVEL[maxBondZeroLevel] || 0) : 0;

  let afnTramo1Meta = 0;
  if (tieneCita && umbralCita >= 1 && umbralCita <= 10) {
    afnTramo1Meta = ACUMULADO_HASTA_NIVEL[umbralCita - 1] || 0;
  }

  const afiBufeadaUnit = Math.round(baseAfi * 1.05);
  let diasReq = 0;
  let cantRegalos = 0;

  if (!tieneCita || !cuentaCita) {
    const regalosPorDia = usaNube ? 2 : 3;
    const valorNubeBase = 400;
    const valorNubeBufeada = 420;

    let afiActualSim = afiInicial;
    let diasSim = 0;
    let regalosSim = 0;

    while (afiActualSim < AFINIDAD_MAX && diasSim < 1000) {
      diasSim++;
      const estaEnBuffSim = zeroLevel > 0 && afnZeroBufeada > 0 && afiActualSim < afnZeroBufeada;
      const currentAfiRegalo = estaEnBuffSim ? afiBufeadaUnit : baseAfi;
      const currentNubeVal = usaNube ? (estaEnBuffSim ? valorNubeBufeada : valorNubeBase) : 0;
      
      for (let r = 0; r < regalosPorDia; r++) {
        if (afiActualSim < AFINIDAD_MAX) {
          afiActualSim += currentAfiRegalo;
          regalosSim++;
        }
      }
      if (usaNube && afiActualSim < AFINIDAD_MAX) {
        afiActualSim += currentNubeVal;
      }
    }
    diasReq = diasSim;
    cantRegalos = regalosSim;
  } else {
    let afnFaltanteTramo1 = Math.max(0, afnTramo1Meta - afiInicial);
    let afiAcumuladaDespuesTramo1 = Math.max(afnTramo1Meta, afiInicial);
    let afnFaltanteTramo2 = Math.max(0, AFINIDAD_MAX - afiAcumuladaDespuesTramo1);

    let afiBaseT1 = getZeroBuffValue(zeroLevel, Math.min(10, Math.max(1, umbralCita - 1)), baseAfi);
    let valorNubeT1 = (zeroLevel > 0 && umbralCita <= (maxBondZeroLevel + 1)) ? 420 : 400;
    let afiRegalosDiaT1 = usaNube ? (afiBaseT1 * 2 + valorNubeT1) : (afiBaseT1 * 3);
    let diasT1 = afiRegalosDiaT1 > 0 ? Math.ceil(afnFaltanteTramo1 / afiRegalosDiaT1) : 0;

    let afiBaseT2 = getZeroBuffValue(zeroLevel, 10, baseAfi);
    let valorNubeT2 = 400;
    let afiRegalosDiaT2 = usaNube ? (afiBaseT2 * 2 + valorNubeT2) : (afiBaseT2 * 3);
    let afiCitaDia = 200;
    let afiTotalDiaT2 = afiRegalosDiaT2 + afiCitaDia;

    let diasT2 = 0;
    if (afnFaltanteTramo2 > 0) {
      diasT2 = afiTotalDiaT2 > 0 ? Math.ceil(afnFaltanteTramo2 / afiTotalDiaT2) : 0;
    }

    diasReq = diasT1 + diasT2;

    let afiTotalGeneradaSinRegalos = (usaNube ? diasReq * 400 : 0) + (diasT2 * 200);
    let afiNecesitadaEnRegalos = Math.max(0, (AFINIDAD_MAX - afiInicial) - afiTotalGeneradaSinRegalos);

    if (zeroLevel > 0 && afnZeroBufeada > 0) {
      let afiTargetBuff = Math.min(afiNecesitadaEnRegalos, Math.max(0, afnZeroBufeada - afiInicial));
      let regalosT1Buff = afiBufeadaUnit > 0 ? Math.ceil(afiTargetBuff / afiBufeadaUnit) : 0;
      let afiCubiertaT1 = regalosT1Buff * afiBufeadaUnit;

      let afiRestanteNorm = Math.max(0, afiNecesitadaEnRegalos - afiCubiertaT1);
      let regalosT2Norm = baseAfi > 0 ? Math.ceil(afiRestanteNorm / baseAfi) : 0;

      cantRegalos = regalosT1Buff + regalosT2Norm;
    } else {
      cantRegalos = baseAfi > 0 ? Math.ceil(afiNecesitadaEnRegalos / baseAfi) : 0;
    }
  }

  const costoTotal = cantRegalos * costUnit;
  const nubesTotalesUsadas = usaNube ? diasReq : 0;

  return { diasReq, cantRegalos, costoTotal, nubesTotalesUsadas };
}

function renderDotaCarousel(charactersData) {
  const carousel = document.getElementById('dotaCarousel');
  if (!carousel) return;
  carousel.innerHTML = '';

  let wrapper = carousel.closest('.dota-carousel-wrapper');
  if (!wrapper) return;
  
  let dotsContainer = wrapper.querySelector('.dota-pagination-dots');
  if (!dotsContainer) {
    dotsContainer = document.createElement('div');
    dotsContainer.className = 'dota-pagination-dots';
    const footerAction = wrapper.querySelector('.dota-footer-action');
    if (footerAction) {
      footerAction.before(dotsContainer);
    } else {
      wrapper.appendChild(dotsContainer);
    }
  }
  dotsContainer.innerHTML = '';

  charactersData.forEach((char, index) => {
    const card = document.createElement('div');
    card.className = `dota-card ${index === 0 ? 'active' : ''}`;
    card.dataset.index = index;
    card.dataset.characterName = char.chara;
    card.style.animationDelay = `${index * 0.05}s`;

    if (char.color_elemento) {
      const rawColor = char.color_elemento.toString().trim();
      const resolvedColor = COLOR_MAP[rawColor.toLowerCase()] || rawColor;
      card.style.setProperty('--active-glow-color', resolvedColor);
    }

    const imgUrl = getDirectImageUrl(char.pj_base_full || char.img_default);
    const esperTypeImgUrl = getDirectImageUrl(char.esper_type_img);

    const skill1 = getDirectImageUrl(char.skill_icon_1);
    const skill2 = getDirectImageUrl(char.skill_icon_2);
    const skill3 = getDirectImageUrl(char.skill_icon_3);
    const skill4 = getDirectImageUrl(char.skill_icon_4);

    card.innerHTML = `
        <div class="dota-card-header">
            <span class="dota-card-title">${char.chara}</span>
            <span class="dota-attribute-placeholder" title="${char.esper_type_name || 'Tipo de Esper'}">
              ${esperTypeImgUrl ? `<img src="${esperTypeImgUrl}" alt="Esper Type" draggable="false" style="width:100%; height:100%; object-fit:contain; border-radius:50%;">` : ''}
            </span>
        </div>
        <div class="dota-card-img-container">
            <img src="${imgUrl}" alt="${char.chara}" draggable="false" onerror="this.src='https://via.placeholder.com/200x400?text=No+Image'">
        </div>
        <div class="dota-skills-container">
            <div class="dota-skill-slot">${skill1 ? `<img src="${skill1}" alt="Skill 1" draggable="false" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">` : ''}</div>
            <div class="dota-skill-slot">${skill2 ? `<img src="${skill2}" alt="Skill 2" draggable="false" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">` : ''}</div>
            <div class="dota-skill-slot">${skill3 ? `<img src="${skill3}" alt="Skill 3" draggable="false" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">` : ''}</div>
            <div class="dota-skill-slot">${skill4 ? `<img src="${skill4}" alt="Skill 4" draggable="false" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">` : ''}</div>
        </div>
    `;

    card.addEventListener('click', () => {
        const cards = carousel.querySelectorAll('.dota-card');
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        actualizarDotsActivos(index);
    });

    carousel.appendChild(card);

    const dot = document.createElement('div');
    dot.className = `dota-dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      const targetCard = carousel.querySelectorAll('.dota-card')[index];
      if (targetCard) {
        carousel.querySelectorAll('.dota-card').forEach(c => c.classList.remove('active'));
        targetCard.classList.add('active');
        targetCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        actualizarDotsActivos(index);
      }
    });
    dotsContainer.appendChild(dot);
  });

  setupCarouselInteractivity(carousel);
}

function renderSimVerticalCarousel(charactersData) {
  const container = document.getElementById('sim-vertical-espers');
  if (!container) return;
  container.innerHTML = '';

  charactersData.forEach((char) => {
    const avatarCircle = document.createElement('div');
    avatarCircle.className = `sim-esper-circle ${char.chara === lastSelectedSim ? 'active' : ''}`;
    avatarCircle.dataset.chara = char.chara;

    let activeSkinIdx = characterSkinState[char.chara] || 0;
    let iconUrl = getDirectImageUrl(char.bond_img_short || char.pj_base_short || char.icon_afi);
    
    if (activeSkinIdx > 0) {
      const outfits = simObtenerListaOutfitsValidosParaChara(char);
      if (outfits[activeSkinIdx] && outfits[activeSkinIdx].short) {
        iconUrl = getDirectImageUrl(outfits[activeSkinIdx].short);
      }
    }

    avatarCircle.innerHTML = `<img src="${iconUrl}" alt="${char.chara}">`;

    avatarCircle.addEventListener('click', () => {
      container.querySelectorAll('.sim-esper-circle').forEach(el => el.classList.remove('active'));
      avatarCircle.classList.add('active');
      simOnCharacterChange(char.chara);
    });

    container.appendChild(avatarCircle);
  });
}

function actualizarDotsActivos(activeIndex) {
  const dots = document.querySelectorAll('.dota-dot');
  dots.forEach((dot, idx) => {
    if (idx === activeIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function scrollCarouselManual(direccion) {
  const carousel = document.getElementById('dotaCarousel');
  if (!carousel) return;
  const scrollAmount = direccion * 280;
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  setTimeout(updateActiveCardFromScroll, 200);
}

function updateActiveCardFromScroll() {
  const carousel = document.getElementById('dotaCarousel');
  if (!carousel) return;
  const cards = carousel.querySelectorAll('.dota-card');
  const carouselRect = carousel.getBoundingClientRect();
  const carouselCenter = carouselRect.left + carouselRect.width / 2;

  let closestCard = null;
  let minDistance = Infinity;
  let closestIndex = 0;

  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(carouselCenter - cardCenter);

    if (distance < minDistance) {
      minDistance = distance;
      closestCard = card;
      closestIndex = index;
    }
  });

  if (closestCard) {
    cards.forEach(c => c.classList.remove('active'));
    closestCard.classList.add('active');
    actualizarDotsActivos(closestIndex);
  }
}

function setupCarouselButtons() {
  const carousel = document.getElementById('dotaCarousel');
  const btnRandom = document.querySelector('.btn-random');
  const btnLockIn = document.getElementById('btnLockIn');

  if (btnRandom && carousel) {
    btnRandom.addEventListener('click', () => {
      const cards = carousel.querySelectorAll('.dota-card');
      if (cards.length === 0) return;

      const randomIndex = Math.floor(Math.random() * cards.length);
      const targetCard = cards[randomIndex];

      cards.forEach(c => c.classList.remove('active'));
      targetCard.classList.add('active');
      actualizarDotsActivos(randomIndex);
      
      targetCard.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    });
  }

  if (btnLockIn) {
    btnLockIn.addEventListener('click', () => {
      const activeCard = document.querySelector('.dota-card.active');
      if (!activeCard) return;

      const characterName = activeCard.dataset.characterName;

      const tabPersonajeBtn = document.querySelectorAll('.nav-sidebar-btn')[1];
      if (tabPersonajeBtn) {
        switchTab('tab-personaje', tabPersonajeBtn);
      }

      onCharacterChangeTab1(characterName);
      onCharacterChangeTab2(characterName);
    });
  }
}

function setupCarouselInteractivity(carousel) {
  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let lastX = 0;
  let lastTime = Date.now();
  let momentumID = null;

  function updateActiveCard() {
    const cards = carousel.querySelectorAll('.dota-card');
    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = carouselRect.left + carouselRect.width / 2;

    let closestCard = null;
    let minDistance = Infinity;
    let closestIndex = 0;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(carouselCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestCard = card;
        closestIndex = index;
      }
    });

    if (closestCard) {
      cards.forEach(c => c.classList.remove('active'));
      closestCard.classList.add('active');
      actualizarDotsActivos(closestIndex);
    }
  }

  function applyMomentum() {
    if (Math.abs(velocity) > 0.5) {
      carousel.scrollLeft -= velocity * 12;
      velocity *= 0.92;
      updateActiveCard();
      momentumID = requestAnimationFrame(applyMomentum);
    } else {
      updateActiveCard();
      const activeCard = carousel.querySelector('.dota-card.active');
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active-dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;

    lastX = e.pageX;
    lastTime = Date.now();
    velocity = 0;

    cancelAnimationFrame(momentumID);
  });

  carousel.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    carousel.classList.remove('active-dragging');
    applyMomentum();
  });

  carousel.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    carousel.classList.remove('active-dragging');
    applyMomentum();
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;

    const now = Date.now();
    const dt = now - lastTime;
    if (dt > 0) {
      const dx = e.pageX - lastX;
      velocity = dx / dt;
    }
    lastX = e.pageX;
    lastTime = now;

    updateActiveCard();
  });

  carousel.addEventListener('wheel', (e) => {
    e.preventDefault();
    cancelAnimationFrame(momentumID);
    const scrollAmount = e.deltaY > 0 ? 280 : -280;
    carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    
    setTimeout(updateActiveCard, 150);
  }, { passive: false });
}

function switchTab(tabId, btnElement, saveState = true) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-sidebar-btn').forEach(el => el.classList.remove('active'));
  
  const targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.classList.add('active');
  if (btnElement) btnElement.classList.add('active');

  if (saveState) {
    localStorage.setItem('lastActiveTab', tabId);
  }
}

function cambiarPersonajeConFlechaTab1(direccion) {
  const sel1 = document.getElementById('select-chara-1');
  if (!sel1 || sel1.options.length === 0) return;
  
  let nuevoIndex = sel1.selectedIndex + direccion;
  if (nuevoIndex < 0) nuevoIndex = sel1.options.length - 1;
  else if (nuevoIndex >= sel1.options.length) nuevoIndex = 0;
  
  sel1.selectedIndex = nuevoIndex;
  onCharacterChangeTab1(sel1.options[nuevoIndex].value);
}

function cambiarPersonajeConFlechaTab2(direccion) {
  const sel2 = document.getElementById('select-chara-2');
  if (!sel2 || sel2.options.length === 0) return;
  
  let nuevoIndex = sel2.selectedIndex + direccion;
  if (nuevoIndex < 0) nuevoIndex = sel2.options.length - 1;
  else if (nuevoIndex >= sel2.options.length) nuevoIndex = 0;
  
  sel2.selectedIndex = nuevoIndex;
  onCharacterChangeTab2(sel2.options[nuevoIndex].value);
}

function getDirectImageUrl(url) {
  if (!url) return '';
  if (url.includes('drive.google.com')) {
    let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return 'https://lh3.googleusercontent.com/d/' + match[1];
    }
  }
  return url;
}

function openModal(imgUrl) {
  if (!imgUrl) return;
  const modalImg = document.getElementById('modal-img');
  const modal = document.getElementById('image-modal');
  if (modalImg) modalImg.src = imgUrl;
  if (modal) modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  if (modal) modal.style.display = 'none';
}

function toggleCardCheckbox(checkboxId, event) {
  if (event) event.stopPropagation();
  const checkbox = document.getElementById(checkboxId);
  if (checkbox && !checkbox.disabled) {
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change'));
  }
}

function onCharacterChangeTab1(name) {
  selectedCharaTab1 = charactersData.find(c => c.chara === name);
  if (!selectedCharaTab1) return;
  
  lastSelectedTab1 = name;
  localStorage.setItem('lastSelectedTab1', name);

  const sel1 = document.getElementById('select-chara-1');
  const p1Bonus = document.getElementById('p1-bonus');
  const p1OutfitName = document.getElementById('p1-outfit-name');
  
  if (sel1) sel1.value = name;

  const isEn = currentLang === 'en';
  if (p1Bonus) {
    p1Bonus.innerText = isEn ? (selectedCharaTab1.bonus_en || selectedCharaTab1.bonus) : selectedCharaTab1.bonus;
  }
  if (p1OutfitName) {
    const bondName = isEn ? (selectedCharaTab1.bond_name || translations[currentLang].outfit) : (selectedCharaTab1.bond_name_es || selectedCharaTab1.bond_name || translations[currentLang].outfit);
    p1OutfitName.innerText = bondName;
  }

  const isZankouTab1 = name && name.toLowerCase().includes('zankou');
  const t = translations[currentLang];
  const labelBonoTitle = document.getElementById('p1-bono-title');
  if (labelBonoTitle) {
    labelBonoTitle.innerText = isZankouTab1 ? t.bonoObsesion : t.bonoAfinidad;
  }
  
  const item1Name = document.getElementById('p1-item1-name');
  const item2Name = document.getElementById('p1-item2-name');
  const item3Name = document.getElementById('p1-item3-name');

  if (item1Name) item1Name.innerText = isEn ? (selectedCharaTab1.itemname1en || selectedCharaTab1.itemname1) : selectedCharaTab1.itemname1;
  if (item2Name) item2Name.innerText = isEn ? (selectedCharaTab1.itemname2en || selectedCharaTab1.itemname2) : selectedCharaTab1.itemname2;
  if (item3Name) item3Name.innerText = isEn ? (selectedCharaTab1.itemname3en || selectedCharaTab1.itemname3) : selectedCharaTab1.itemname3;

  const avatarUrl = getDirectImageUrl(selectedCharaTab1.pj_base_short || selectedCharaTab1.img);
  const avatarContainer = document.getElementById('p1-avatar-container');
  if (avatarContainer) {
    if (avatarUrl) {
      avatarContainer.innerHTML = `<img src="${avatarUrl}" alt="Avatar" onclick="openModal('${avatarUrl}')">`;
    } else {
      avatarContainer.innerHTML = `<span style="font-size:12px;">${translations[currentLang].avatar}</span>`;
    }
  }

  const outfitUrl = getDirectImageUrl(selectedCharaTab1.bond_img_full || selectedCharaTab1.outfit_img);
  const outfitContainer = document.getElementById('p1-outfit-container');
  if (outfitContainer) {
    if (outfitUrl) {
      outfitContainer.innerHTML = `<img src="${outfitUrl}" alt="Outfit" onclick="openModal('${outfitUrl}')">`;
    } else {
      outfitContainer.innerHTML = `<span style="font-size:12px; color:var(--text-muted); text-align:center; padding: 0 8px;">${translations[currentLang].noOutfit}</span>`;
    }
  }

  [1, 2, 3].forEach(idx => {
    const itemImgUrl = getDirectImageUrl(selectedCharaTab1['itemimg_' + idx]);
    const itemBgUrl = getDirectImageUrl(selectedCharaTab1['itemgiftbg' + idx]);
    const itemContainer1 = document.getElementById(`p1-itemimg-${idx}-container`);
    if (itemContainer1) {
      if (itemImgUrl) {
        itemContainer1.innerHTML = `
          <div class="gift-slot">
            ${itemBgUrl ? `<img src="${itemBgUrl}" class="gift-bg-img" alt="Fondo">` : ''}
            <img src="${itemImgUrl}" class="gift-item-img" alt="Item" onclick="openModal('${itemImgUrl}')">
          </div>
        `;
      } else {
        itemContainer1.innerHTML = `<span>${translations[currentLang].icono}</span>`;
      }
    }
  });

  validarRestriccionCitaTab1();
  recalculateTab1();
}

function onCharacterChangeTab2(name) {
  selectedCharaTab2 = charactersData.find(c => c.chara === name);
  if (!selectedCharaTab2) return;
  
  lastSelectedTab2 = name;
  localStorage.setItem('lastSelectedTab2', name);

  const sel2 = document.getElementById('select-chara-2');
  const afiactual = document.getElementById('p2-afiactual');
  const nivel = document.getElementById('p2-nivel');
  const cartasQty = document.getElementById('p2-cartas-qty');
  const boletosQty = document.getElementById('p2-boletos-qty');

  if (sel2) sel2.value = name;

  let savedData = tab2UserState[name];
  if (!savedData) {
    savedData = {
      nivel: '1',
      afiactual: '0',
      cartasQty: '0',
      boletosQty: '0',
      nube1: false,
      nube2: false,
      nube3: false,
      cita1: false,
      cita2: false,
      cita3: false
    };
  }

  if (nivel) nivel.value = savedData.nivel;
  if (afiactual) afiactual.value = savedData.afiactual;
  if (cartasQty) cartasQty.value = savedData.cartasQty;
  if (boletosQty) boletosQty.value = savedData.boletosQty;

  [1, 2, 3].forEach(idx => {
    const nubeElem = document.getElementById(`p2-nube${idx}`);
    const citaElem = document.getElementById(`p2-cita${idx}`);
    if (nubeElem) nubeElem.checked = !!savedData[`nube${idx}`];
    if (citaElem) citaElem.checked = !!savedData[`cita${idx}`];
  });
  lastUserSelectedLevelTab2 = Number(savedData.nivel) || 1;

  const isEn = currentLang === 'en';
  const item1Name = document.getElementById('p2-item1-name');
  const item2Name = document.getElementById('p2-item2-name');
  const item3Name = document.getElementById('p2-item3-name');

  if (item1Name) item1Name.innerText = isEn ? (selectedCharaTab2.itemname1en || selectedCharaTab2.itemname1) : selectedCharaTab2.itemname1;
  if (item2Name) item2Name.innerText = isEn ? (selectedCharaTab2.itemname2en || selectedCharaTab2.itemname2) : selectedCharaTab2.itemname2;
  if (item3Name) item3Name.innerText = isEn ? (selectedCharaTab2.itemname3en || selectedCharaTab2.itemname3) : selectedCharaTab2.itemname3;

  const iconAfiUrl = getDirectImageUrl(selectedCharaTab2.bond_img_short || selectedCharaTab2.pj_base_short || selectedCharaTab2.icon_afi);
  const avatarContainer2 = document.getElementById('p2-avatar-container');
  if (avatarContainer2) {
    if (iconAfiUrl) {
      avatarContainer2.innerHTML = `<img src="${iconAfiUrl}" alt="Avatar" onclick="openModal('${iconAfiUrl}')">`;
    } else {
      avatarContainer2.innerHTML = `<span style="font-size:12px;">${translations[currentLang].avatar}</span>`;
    }
  }

  [1, 2, 3].forEach(idx => {
    const itemImgUrl = getDirectImageUrl(selectedCharaTab2['itemimg_' + idx]);
    const itemBgUrl = getDirectImageUrl(selectedCharaTab2['itemgiftbg' + idx]);
    const itemContainer2 = document.getElementById(`p2-itemimg-${idx}-container`);
    if (itemContainer2) {
      if (itemImgUrl) {
        itemContainer2.innerHTML = `
          <div class="gift-slot">
            ${itemBgUrl ? `<img src="${itemBgUrl}" class="gift-bg-img" alt="Fondo">` : ''}
            <img src="${itemImgUrl}" class="gift-item-img" alt="Item" onclick="openModal('${itemImgUrl}')">
          </div>
        `;
      } else {
        itemContainer2.innerHTML = `<span>${translations[currentLang].icono}</span>`;
      }
    }
  });

  validarRestriccionCitaTab2();
  actualizarTerminologiaZankouUI(name);
  recalculateTab2();
}

function guardarEstadoTab2Actual() {
  if (!selectedCharaTab2) return;
  const name = selectedCharaTab2.chara;
  const nivel = document.getElementById('p2-nivel')?.value || '1';
  const afiactual = document.getElementById('p2-afiactual')?.value || '0';
  const cartasQty = document.getElementById('p2-cartas-qty')?.value || '0';
  const boletosQty = document.getElementById('p2-boletos-qty')?.value || '0';

  let stateObj = {
    nivel,
    afiactual,
    cartasQty,
    boletosQty,
    nube1: document.getElementById('p2-nube1')?.checked || false,
    nube2: document.getElementById('p2-nube2')?.checked || false,
    nube3: document.getElementById('p2-nube3')?.checked || false,
    cita1: document.getElementById('p2-cita1')?.checked || false,
    cita2: document.getElementById('p2-cita2')?.checked || false,
    cita3: document.getElementById('p2-cita3')?.checked || false,
  };

  tab2UserState[name] = stateObj;
  localStorage.setItem('tab2UserState', JSON.stringify(tab2UserState));
}

function resetPerfilTab2() {
  const nivelSelect = document.getElementById('p2-nivel');
  const afiActualInput = document.getElementById('p2-afiactual');
  if (nivelSelect) nivelSelect.value = '1';
  if (afiActualInput) afiActualInput.value = '0';
  guardarEstadoTab2Actual();
  recalculateTab2();
}

function reiniciarRegalosTab2() {
  const cartasInput = document.getElementById('p2-cartas-qty');
  const boletosInput = document.getElementById('p2-boletos-qty');
  if (cartasInput) cartasInput.value = '0';
  if (boletosInput) boletosInput.value = '0';
  guardarEstadoTab2Actual();
  recalculateTab2();
}

function aplicarRegalosTab2() {
  if (!selectedCharaTab2) return;

  const nivelSelect = document.getElementById('p2-nivel');
  const afiActualInput = document.getElementById('p2-afiactual');
  const cartasInput = document.getElementById('p2-cartas-qty');
  const boletosInput = document.getElementById('p2-boletos-qty');

  if (!nivelSelect || !afiActualInput || !cartasInput || !boletosInput) return;

  const nivelSel = Number(nivelSelect.value) || 1;
  const rawAfiInput = afiActualInput.value.replace(/,/g, '');
  const afiIngresada = Number(rawAfiInput) || 0;

  const cartasQty = Number(cartasInput.value) || 0;
  const boletosQty = Number(boletosInput.value) || 0;

  const zeroLvlTab2 = zeroSkillState[2];
  const valorCartaBuff = getZeroBuffValue(zeroLvlTab2, nivelSel, 2000);
  const valorBoletoBuff = getZeroBuffValue(zeroLvlTab2, nivelSel, 400);

  const afiExtraRegalos = (cartasQty * valorCartaBuff) + (boletosQty * valorBoletoBuff);

  const afiBaseNivel = ACUMULADO_HASTA_NIVEL[nivelSel - 1] || 0;
  let afiAcumuladaTotal = afiBaseNivel + afiIngresada + afiExtraRegalos;
  if (afiAcumuladaTotal > AFINIDAD_MAX) afiAcumuladaTotal = AFINIDAD_MAX;

  const nuevoRes = calcularNivelYRestante(afiAcumuladaTotal);

  nivelSelect.value = nuevoRes.nivel;
  afiActualInput.value = nuevoRes.sobra.toLocaleString('en-US');

  cartasInput.value = '0';
  boletosInput.value = '0';

  guardarEstadoTab2Actual();
  recalculateTab2();
}

function simOnCharacterChange(name) {
  selectedCharaSim = charactersData.find(c => c.chara === name);
  if (!selectedCharaSim) return;

  lastSelectedSim = name;
  localStorage.setItem('lastSelectedSim', name);

  if (characterSkinState[name] === undefined) {
    characterSkinState[name] = 0;
  }

  const simCharaName = document.getElementById('sim-chara-name');
  const simCharaTagContainer = document.getElementById('sim-chara-tag-container');

  if (simCharaName) simCharaName.innerText = selectedCharaSim.chara;

  const isZankouSim = name && name.toLowerCase().includes('zankou');
  const simLevelBadgeLabel = document.getElementById('sim-level-badge-label');
  const t = translations[currentLang];
  if (simLevelBadgeLabel) {
    simLevelBadgeLabel.innerText = isZankouSim ? t.obsessionLabelUpper : t.affinityLabelUpper;
  }

  const isEn = currentLang === 'en';
  if (simCharaTagContainer) {
    const descrip = isEn ? (selectedCharaSim.vinc_descrip_en || selectedCharaSim.vinc_descrip) : selectedCharaSim.vinc_descrip;
    const textoEtiqueta = descrip || `Miembro de UAC-2`;
    
    simCharaTagContainer.innerHTML = `
      <svg class="sim-location-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style="fill: #94a3b8; flex-shrink: 0; display: inline-block; vertical-align: middle;">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
      <span>${textoEtiqueta}</span>
    `;
  }

  let savedSimData = simUserState[name];
  if (!savedSimData) {
    savedSimData = {
      initLevel: '1',
      initAffinity: '0',
      cartasQty: '0',
      boletosQty: '0',
      gift1: '0',
      gift2: '0',
      gift3: '0',
      gift4: '0',
      gift5: '0'
    };
  }

  const simInitLevel = document.getElementById('sim-init-level');
  const simInitAffinity = document.getElementById('sim-init-affinity');
  if (simInitLevel) simInitLevel.value = savedSimData.initLevel;
  if (simInitAffinity) simInitAffinity.value = savedSimData.initAffinity;

  const cartasQtyInv = document.getElementById('sim-inv-cartas-qty');
  const boletosQtyInv = document.getElementById('sim-inv-boletos-qty');
  if (cartasQtyInv) cartasQtyInv.value = savedSimData.cartasQty;
  if (boletosQtyInv) boletosQtyInv.value = savedSimData.boletosQty;

  [1, 2, 3, 4, 5].forEach(idx => {
    const invInput = document.getElementById(`sim-inv-gift-qty-${idx}`);
    if (invInput) invInput.value = savedSimData[`gift${idx}`] || '0';
  });

  simActualizarOutfitVisual();
  simActualizarRegalosPersonaje();
  simRecalcular();

  const vContainer = document.getElementById('sim-vertical-espers');
  if (vContainer) {
    vContainer.querySelectorAll('.sim-esper-circle').forEach(circle => {
      if (circle.dataset.chara === name) circle.classList.add('active');
      else circle.classList.remove('active');
    });
  }
}

function guardarEstadoSimActual() {
  if (!selectedCharaSim) return;
  const name = selectedCharaSim.chara;

  let simObj = {
    initLevel: document.getElementById('sim-init-level')?.value || '1',
    initAffinity: document.getElementById('sim-init-affinity')?.value || '0',
    cartasQty: document.getElementById('sim-inv-cartas-qty')?.value || '0',
    boletosQty: document.getElementById('sim-inv-boletos-qty')?.value || '0',
    gift1: document.getElementById('sim-inv-gift-qty-1')?.value || '0',
    gift2: document.getElementById('sim-inv-gift-qty-2')?.value || '0',
    gift3: document.getElementById('sim-inv-gift-qty-3')?.value || '0',
    gift4: document.getElementById('sim-inv-gift-qty-4')?.value || '0',
    gift5: document.getElementById('sim-inv-gift-qty-5')?.value || '0',
  };

  simUserState[name] = simObj;
  localStorage.setItem('simUserState', JSON.stringify(simUserState));
}

function simObtenerListaOutfitsValidosParaChara(char) {
  if (!char) return [];
  let lista = [];

  const baseFull = char.pj_base_full || char.img_default || char.img;
  if (baseFull && baseFull.toString().trim() !== "") {
    lista.push({
      full: baseFull,
      short: char.pj_base_short || char.icon_afi || char.img,
      name_en: char.pj_base_name || "Default Attire",
      name_es: char.pj_base_name_es || char.pj_base_name || "Atuendo por Defecto"
    });
  }

  const bondFull = char.bond_img_full || char.outfit_img;
  if (bondFull && bondFull.toString().trim() !== "") {
    lista.push({
      full: bondFull,
      short: char.bond_img_short || char.icon_afi || bondFull,
      name_en: char.bond_name || "Bond Attire",
      name_es: char.bond_name_es || char.bond_name || "Traje de Afinidad"
    });
  }

  for (let i = 1; i <= 6; i++) {
    const fullImg = char[`outfit_img_full_${i}`];
    const shortImg = char[`outfit_img_short_${i}`];
    const nameEn = char[`outfit_name_${i}`];
    const nameEs = char[`outfit_name_${i}_es`];

    if (fullImg && fullImg.toString().trim() !== "") {
      lista.push({
        full: fullImg,
        short: shortImg || fullImg,
        name_en: nameEn || `Outfit ${i}`,
        name_es: nameEs || nameEn || `Atuendo ${i}`
      });
    }
  }

  return lista;
}

function simObtenerListaOutfitsValidos() {
  return simObtenerListaOutfitsValidosParaChara(selectedCharaSim);
}

function cambiarSkinSimulador(direccion) {
  if (!selectedCharaSim) return;
  const outfitsDisponibles = simObtenerListaOutfitsValidos();
  if (outfitsDisponibles.length <= 1) return;

  const charName = selectedCharaSim.chara;
  let activeIndex = characterSkinState[charName] || 0;

  activeIndex += direccion;
  if (activeIndex < 0) {
    activeIndex = outfitsDisponibles.length - 1;
  } else if (activeIndex >= outfitsDisponibles.length) {
    activeIndex = 0;
  }

  characterSkinState[charName] = activeIndex;
  localStorage.setItem('characterSkinState', JSON.stringify(characterSkinState));

  simActualizarOutfitVisual();

  const vContainer = document.getElementById('sim-vertical-espers');
  if (vContainer) {
    const activeCircle = vContainer.querySelector(`.sim-esper-circle[data-chara="${charName}"] img`);
    const skinActual = outfitsDisponibles[activeIndex];
    if (activeCircle && skinActual && skinActual.short) {
      activeCircle.src = getDirectImageUrl(skinActual.short);
    }
  }
}

function simActualizarOutfitVisual() {
  if (!selectedCharaSim) return;

  const outfits = simObtenerListaOutfitsValidos();
  if (outfits.length === 0) return;

  const charName = selectedCharaSim.chara;
  let activeIndex = characterSkinState[charName] || 0;

  if (activeIndex >= outfits.length) {
    activeIndex = 0;
    characterSkinState[charName] = activeIndex;
    localStorage.setItem('characterSkinState', JSON.stringify(characterSkinState));
  }

  const skinActual = outfits[activeIndex];
  const viewer = document.getElementById('sim-outfit-viewer-container');

  const imgUrl = getDirectImageUrl(skinActual.full);
  const isEn = currentLang === 'en';
  const nombreSkin = isEn ? skinActual.name_en : skinActual.name_es;

  if (viewer) {
    viewer.innerHTML = `
      <img src="${imgUrl}" alt="${nombreSkin}" style="width: 100%; height: 100%; object-fit: contain; cursor: pointer;" onclick="openModal(this.src)">
      <button type="button" class="sim-skin-nav-btn sim-skin-prev" onclick="cambiarSkinSimulador(-1)" title="Skin anterior">‹</button>
      <button type="button" class="sim-skin-nav-btn sim-skin-next" onclick="cambiarSkinSimulador(1)" title="Siguiente skin">›</button>
      <div class="sim-outfit-name-box" id="sim-outfit-name-label">${nombreSkin}</div>
    `;
  }
}

function simActualizarRegalosPersonaje() {
  if (!selectedCharaSim) return;

  const favSlotsRow = document.querySelector('.sim-fav-slots-row');
  if (favSlotsRow) {
    const cartaImgUrl = CARD_WRITE_IMG_URL;
    const boletoImgUrl = MOVIE_TICKET_IMG_URL;
    const item1Img = getDirectImageUrl(selectedCharaSim.itemimg_1);
    const item2Img = getDirectImageUrl(selectedCharaSim.itemimg_2);
    const item3Img = getDirectImageUrl(selectedCharaSim.itemimg_3);

    const item1Bg = getDirectImageUrl(selectedCharaSim.itemgiftbg1);
    const item2Bg = getDirectImageUrl(selectedCharaSim.itemgiftbg2);
    const item3Bg = getDirectImageUrl(selectedCharaSim.itemgiftbg3);

    favSlotsRow.innerHTML = `
      <div class="sim-slot-display">
        <div class="gift-slot">
          <img src="${BG_CARTA_URL}" class="gift-bg-img" alt="Fondo Carta">
          <img src="${cartaImgUrl}" class="gift-item-img" alt="Carta" onclick="openModal('${cartaImgUrl}')">
        </div>
      </div>
      <div class="sim-slot-display">
        <div class="gift-slot">
          <img src="${BG_SPECIAL_ITEMS_URL}" class="gift-bg-img" alt="Fondo Ticket">
          <img src="${boletoImgUrl}" class="gift-item-img" alt="Boleto" onclick="openModal('${boletoImgUrl}')">
        </div>
      </div>
      <div class="sim-slot-display">
        <div class="gift-slot">
          ${item1Bg ? `<img src="${item1Bg}" class="gift-bg-img" alt="Fondo">` : ''}
          <img src="${item1Img}" class="gift-item-img" alt="Item 1" onclick="openModal('${item1Img}')">
        </div>
      </div>
      <div class="sim-slot-display">
        <div class="gift-slot">
          ${item2Bg ? `<img src="${item2Bg}" class="gift-bg-img" alt="Fondo">` : ''}
          <img src="${item2Img}" class="gift-item-img" alt="Item 2" onclick="openModal('${item2Img}')">
        </div>
      </div>
      <div class="sim-slot-display">
        <div class="gift-slot">
          ${item3Bg ? `<img src="${item3Bg}" class="gift-bg-img" alt="Fondo">` : ''}
          <img src="${item3Img}" class="gift-item-img" alt="Item 3" onclick="openModal('${item3Img}')">
        </div>
      </div>
    `;
  }

  [1, 2, 3].forEach(idx => {
    const itemImgUrl = getDirectImageUrl(selectedCharaSim[`itemimg_${idx}`]);
    const itemBgUrl = getDirectImageUrl(selectedCharaSim[`itemgiftbg${idx}`]);
    const wrap = document.getElementById(`sim-inv-gift-img-${idx}`)?.closest('.sim-card-img-wrap');
    if (wrap) {
      const inputElem = wrap.querySelector('input');
      const inputHtml = inputElem ? inputElem.outerHTML : '';
      if (itemImgUrl) {
        wrap.innerHTML = `
          <div class="gift-slot" style="width: 100%; height: 100%;">
            ${itemBgUrl ? `<img src="${itemBgUrl}" class="gift-bg-img" alt="Fondo">` : ''}
            <img src="${itemImgUrl}" class="gift-item-img" id="sim-inv-gift-img-${idx}" alt="Gift ${idx}" onclick="openModal('${itemImgUrl}')" style="max-width: 90px; max-height: 90px; object-fit: contain; cursor: zoom-in;">
          </div>
          ${inputHtml}
        `;
      }
    }
  });

  const wrapCarta = document.getElementById('sim-inv-cartas-qty')?.closest('.sim-card-img-wrap');
  if (wrapCarta) {
    const inputElem = wrapCarta.querySelector('input');
    const inputHtml = inputElem ? inputElem.outerHTML : '';
    wrapCarta.innerHTML = `
      <div class="gift-slot" style="width: 100%; height: 100%;">
        <img src="${BG_CARTA_URL}" class="gift-bg-img" alt="Fondo Carta">
        <img src="${CARD_WRITE_IMG_URL}" class="gift-item-img" alt="Carta" onclick="openModal('${CARD_WRITE_IMG_URL}')" style="max-width: 90px; max-height: 90px; object-fit: contain; cursor: zoom-in;">
      </div>
      ${inputHtml}
    `;
  }

  const wrapBoleto = document.getElementById('sim-inv-boletos-qty')?.closest('.sim-card-img-wrap');
  if (wrapBoleto) {
    const inputElem = wrapBoleto.querySelector('input');
    const inputHtml = inputElem ? inputElem.outerHTML : '';
    wrapBoleto.innerHTML = `
      <div class="gift-slot" style="width: 100%; height: 100%;">
        <img src="${BG_SPECIAL_ITEMS_URL}" class="gift-bg-img" alt="Fondo Ticket">
        <img src="${MOVIE_TICKET_IMG_URL}" class="gift-item-img" alt="Boleto" onclick="openModal('${MOVIE_TICKET_IMG_URL}')" style="max-width: 90px; max-height: 90px; object-fit: contain; cursor: zoom-in;">
      </div>
      ${inputHtml}
    `;
  }

  const wrapNube = document.getElementById('sim-inv-gift-qty-4')?.closest('.sim-card-img-wrap');
  if (wrapNube) {
    const inputElem = wrapNube.querySelector('input');
    const inputHtml = inputElem ? inputElem.outerHTML : '';
    wrapNube.innerHTML = `
      <div class="gift-slot" style="width: 100%; height: 100%;">
        <img src="${BG_SPECIAL_ITEMS_URL}" class="gift-bg-img" alt="Fondo Nube">
        <img src="${SIM_NEW_ITEM_1}" class="gift-item-img" id="sim-inv-gift-img-4" alt="Nube" onclick="openModal('${SIM_NEW_ITEM_1}')" style="max-width: 90px; max-height: 90px; object-fit: contain; cursor: zoom-in;">
      </div>
      ${inputHtml}
    `;
  }

  const wrapConcha = document.getElementById('sim-inv-gift-qty-5')?.closest('.sim-card-img-wrap');
  if (wrapConcha) {
    const inputElem = wrapConcha.querySelector('input');
    const inputHtml = inputElem ? inputElem.outerHTML : '';
    wrapConcha.innerHTML = `
      <div class="gift-slot" style="width: 100%; height: 100%;">
        <img src="${BG_SPECIAL_ITEMS_URL}" class="gift-bg-img" alt="Fondo Concha">
        <img src="${SIM_NEW_ITEM_2}" class="gift-item-img" id="sim-inv-gift-img-5" alt="Concha" onclick="openModal('${SIM_NEW_ITEM_2}')" style="max-width: 90px; max-height: 90px; object-fit: contain; cursor: zoom-in;">
      </div>
      ${inputHtml}
    `;
  }
}

function simResetAll() {
  const initLevelElem = document.getElementById('sim-init-level');
  const initAfiElem = document.getElementById('sim-init-affinity');
  if (initLevelElem) initLevelElem.value = '1';
  if (initAfiElem) initAfiElem.value = '0';

  if (selectedCharaSim) {
    delete simUserState[selectedCharaSim.chara];
    localStorage.setItem('simUserState', JSON.stringify(simUserState));
  }

  simOnCharacterChange(selectedCharaSim ? selectedCharaSim.chara : charactersData[0].chara);
}

function formatAndValidateSimAffinity(input) {
  if (!input) return;
  let rawValue = input.value.replace(/[^0-9]/g, '');
  if (rawValue === '') {
    input.value = '0';
    guardarEstadoSimActual();
    simRecalcular();
    return;
  }
  let num = parseInt(rawValue, 10);
  const nivelSelect = document.getElementById('sim-init-level');
  const nivel = nivelSelect ? Number(nivelSelect.value) || 1 : 1;
  
  const reqSubir = nivel < 10 ? EXP_PARA_SUBIR[nivel - 1] : 0;
  const maxPermitido = reqSubir > 0 ? reqSubir - 1 : 0;

  if (num > maxPermitido && maxPermitido >= 0) {
    num = maxPermitido;
  }
  input.value = num.toLocaleString('en-US');
  guardarEstadoSimActual();
  simRecalcular();
}

function validarRestriccionCitaTab1() {
  if (!selectedCharaTab1) return;
  const rawCita = selectedCharaTab1.nivelCita !== undefined && selectedCharaTab1.nivelCita !== null 
                  ? String(selectedCharaTab1.nivelCita).trim() 
                  : "";

  [1, 2, 3].forEach(idx => {
    const checkboxCita = document.getElementById(`p1-cita${idx}`);
    if (checkboxCita) {
      if (rawCita.toLowerCase().includes("no") || rawCita === "") {
        checkboxCita.disabled = true;
        checkboxCita.checked = false;
      } else {
        checkboxCita.disabled = false;
      }
    }
  });
}

function validarRestriccionCitaTab2() {
  if (!selectedCharaTab2) return;

  const nivelSelect = document.getElementById('p2-nivel');
  const nivelSel = nivelSelect ? Number(nivelSelect.value) || 1 : 1;
  const rawCita = selectedCharaTab2.nivelCita !== undefined && selectedCharaTab2.nivelCita !== null 
                  ? String(selectedCharaTab2.nivelCita).trim() 
                  : "";

  let umbralRequerido = parseInt(rawCita, 10);
  if (isNaN(umbralRequerido)) {
    umbralRequerido = 4;
  }

  [1, 2, 3].forEach(idx => {
    const checkboxCita = document.getElementById(`p2-cita${idx}`);
    if (checkboxCita) {
      if (rawCita.toLowerCase().includes("no") || rawCita === "") {
        checkboxCita.disabled = true;
        checkboxCita.checked = false;
      } else {
        if (nivelSel >= umbralRequerido) {
          checkboxCita.disabled = false;
        } else {
          checkboxCita.disabled = true;
          checkboxCita.checked = false;
        }
      }
    }
  });
}

function onNivelChangeTab2() {
  const nivelSelect = document.getElementById('p2-nivel');
  const rawAfiInput = document.getElementById('p2-afiactual');
  if (!nivelSelect || !rawAfiInput) return;

  const nivel = Number(nivelSelect.value) || 1;
  
  if (nivel < 10) {
    lastUserSelectedLevelTab2 = nivel;
  }

  const reqSubir = nivel < 10 ? EXP_PARA_SUBIR[nivel - 1] : 0;
  const maxPermitido = reqSubir > 0 ? reqSubir - 1 : 0;
  
  let actualVal = Number(rawAfiInput.value.replace(/,/g, '')) || 0;
  if (actualVal > maxPermitido && maxPermitido >= 0) {
    actualVal = maxPermitido;
    rawAfiInput.value = actualVal.toLocaleString('en-US');
  }
  
  guardarEstadoTab2Actual();
  recalculateTab2();
}

function formatAndValidateAffinity(input) {
  if (!input) return;
  let rawValue = input.value.replace(/[^0-9]/g, '');
  if (rawValue === '') {
    input.value = '0';
    guardarEstadoTab2Actual();
    recalculateTab2();
    return;
  }
  let num = parseInt(rawValue, 10);
  const nivelSelect = document.getElementById('p2-nivel');
  const nivel = nivelSelect ? Number(nivelSelect.value) || 1 : 1;
  
  const reqSubir = nivel < 10 ? EXP_PARA_SUBIR[nivel - 1] : 0;
  const maxPermitido = reqSubir > 0 ? reqSubir - 1 : 0;

  if (num > maxPermitido && maxPermitido >= 0) {
    num = maxPermitido;
  }
  input.value = num.toLocaleString('en-US');
  guardarEstadoTab2Actual();
  recalculateTab2();
}

function onTab1CheckboxChange() {
  recalculateTab1();
}

function onTab2CheckboxChange() {
  guardarEstadoTab2Actual();
  recalculateTab2();
}

function guardarEnReporte(idx, event) {
  if (!selectedCharaTab2) return;

  const bgCharaImg = getDirectImageUrl(selectedCharaTab2.pj_base_full || selectedCharaTab2.img_default);
  const avatarImg = getDirectImageUrl(selectedCharaTab2.bond_img_short || selectedCharaTab2.pj_base_short || selectedCharaTab2.icon_afi);

  const nivelSelElem = document.getElementById('p2-nivel');
  const rawAfiElem = document.getElementById('p2-afiactual');
  const cartasElem = document.getElementById('p2-cartas-qty');
  const boletosElem = document.getElementById('p2-boletos-qty');

  const nivelSel = nivelSelElem ? nivelSelElem.value : '1';
  const rawAfiInput = rawAfiElem ? rawAfiElem.value.replace(/,/g, '') : '0';
  const afiIngresada = Number(rawAfiInput) || 0;
  const cartasQty = cartasElem ? Number(cartasElem.value) || 0 : 0;
  const boletosQty = boletosElem ? Number(boletosElem.value) || 0 : 0;

  const zeroLvlTab2 = zeroSkillState[2];
  const valorCartaBuff = getZeroBuffValue(zeroLvlTab2, Number(nivelSel), 2000);
  const valorBoletoBuff = getZeroBuffValue(zeroLvlTab2, Number(nivelSel), 400);
  const afiExtraRegalos = (cartasQty * valorCartaBuff) + (boletosQty * valorBoletoBuff);

  const afiBaseNivel = ACUMULADO_HASTA_NIVEL[Number(nivelSel) - 1] || 0;
  let afiAcumulada = afiBaseNivel + afiIngresada + afiExtraRegalos;
  if (afiAcumulada > AFINIDAD_MAX) afiAcumulada = AFINIDAD_MAX;

  const porcentaje = Math.min(100, Math.max(0, (afiAcumulada / AFINIDAD_MAX) * 100));

  const cantRegalosElem = document.getElementById(`p2-cant${idx}`);
  const diasFaltantesElem = document.getElementById(`p2-dias${idx}`);
  const costoTotalFonsElem = document.getElementById(`p2-costototal${idx}`);
  const nubeElem = document.getElementById(`p2-nube${idx}`);
  const citaCheck = document.getElementById(`p2-cita${idx}`);

  const cantRegalos = cantRegalosElem ? cantRegalosElem.innerText : '0';
  const diasFaltantes = diasFaltantesElem ? diasFaltantesElem.innerText : '0';
  const costoTotalFons = costoTotalFonsElem ? costoTotalFonsElem.innerText : '0';
  
  const baseAfiUnit = Number(selectedCharaTab2['affinity' + idx]) || 0;
  const afiValor = getZeroBuffValue(zeroLvlTab2, Number(nivelSel), baseAfiUnit);

  const usaNube = nubeElem ? nubeElem.checked : false;
  const cuentaCita = citaCheck ? citaCheck.checked : false;

  const nuevoRegistro = {
    id: Date.now() + Math.random(),
    chara: selectedCharaTab2.chara,
    itemIndex: idx,
    nivelSel: nivelSel,
    porcentaje: porcentaje,
    afiAcumuladaTexto: `${afiAcumulada.toLocaleString('en-US')} / ${AFINIDAD_MAX.toLocaleString('en-US')}`,
    avatarImg: avatarImg,
    bgCharaImg: bgCharaImg,
    afiValor: afiValor,
    cantRegalos: cantRegalos,
    diasFaltantes: diasFaltantes,
    costoTotalFons: costoTotalFons,
    usaNube: usaNube,
    cuentaCita: cuentaCita
  };

  reporteGuardado.push(nuevoRegistro);
  localStorage.setItem('reporteGuardado', JSON.stringify(reporteGuardado));
  renderReporte();

  if (event && event.target) {
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "✓";
    setTimeout(() => { btn.innerText = originalText; }, 1200);
  }
}

function eliminarDelReporte(id) {
  reporteGuardado = reporteGuardado.filter(item => item.id !== id);
  localStorage.setItem('reporteGuardado', JSON.stringify(reporteGuardado));
  renderReporte();
}

function limpiarReporte() {
  reporteGuardado = [];
  localStorage.removeItem('reporteGuardado');
  renderReporte();
}

function exportReportToPNG() {
  const container = document.getElementById('reporte-lista-container');
  if (!container || reporteGuardado.length === 0) {
    alert(currentLang === 'en' ? 'There is no report to export.' : 'No hay reporte para exportar.');
    return;
  }

  const deleteButtons = container.querySelectorAll('.delete-report-btn');
  deleteButtons.forEach(btn => btn.style.display = 'none');

  const originalWidth = container.style.width;
  container.style.width = '1150px';

  const cards = container.querySelectorAll('.report-card');
  cards.forEach(card => {
    card.style.width = '1150px';
    card.style.minWidth = '1150px';
  });

  html2canvas(container, {
    scale: 2,
    width: 1150,
    windowWidth: 1300,
    backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-color').trim(),
    useCORS: true
  }).then(canvas => {
    container.style.width = originalWidth;
    cards.forEach(card => {
      card.style.width = '';
      card.style.minWidth = '';
    });
    deleteButtons.forEach(btn => btn.style.display = 'flex');

    const link = document.createElement('a');
    link.download = 'reporte-afinidad.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => {
    console.error("Error al generar la imagen:", err);
    container.style.width = originalWidth;
    cards.forEach(card => {
      card.style.width = '';
      card.style.minWidth = '';
    });
    deleteButtons.forEach(btn => btn.style.display = 'flex');
  });
}

function renderReporte() {
  const container = document.getElementById('reporte-lista-container');
  if (!container) return;

  if (reporteGuardado.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 24px; color: var(--text-muted); font-size: 13px; background: var(--card-bg); border-radius: 12px; border: 1px dashed var(--border-color);">
        ${currentLang === 'en' ? 'No saved items in report yet. Click the "+" button in any calculation card.' : 'Aún no hay elementos guardados en el reporte. Haz clic en el botón "+" en cualquier tarjeta de cálculo.'}
      </div>
    `;
    return;
  }

  let html = '';
  reporteGuardado.forEach(item => {
    const t = translations[currentLang];
    const bgStyle = item.bgCharaImg ? `--bg-chara-img: url('${item.bgCharaImg}');` : '';
    const pct = item.porcentaje !== undefined ? item.porcentaje : 0;
    const textoProgreso = item.afiAcumuladaTexto || `0 / 56,000`;
    
    const charaObj = charactersData.find(c => c.chara === item.chara);
    let itemName = item.itemName || '';
    let itemImg = item.itemImg || '';
    let itemBgImg = '';

    if (charaObj && item.itemIndex) {
      const isEn = currentLang === 'en';
      itemName = isEn ? (charaObj['itemname' + item.itemIndex + 'en'] || charaObj['itemname' + item.itemIndex]) : charaObj['itemname' + item.itemIndex];
      itemImg = getDirectImageUrl(charaObj['itemimg_' + item.itemIndex]);
      itemBgImg = getDirectImageUrl(charaObj['itemgiftbg' + item.itemIndex]);
    }

    const isZankouReport = item.chara && item.chara.toLowerCase().includes('zankou');
    const labelAffText = isZankouReport ? t.obsessionLabel : t.affectionLabelText;
    
    html += `
      <div class="report-card" style="${bgStyle}">
        <div class="report-block-identity">
          <img src="${item.avatarImg || ''}" class="report-avatar-img" alt="Avatar">
          <div class="report-identity-details">
            <div class="report-card-header-line">
              <span class="report-card-chara">${item.chara}</span>
              <span class="report-card-bond">${t.bondLevelText} ${item.nivelSel}</span>
            </div>
            <div class="report-progress-box">
              <div class="report-progress-bar-bg">
                <div class="report-progress-bar-fill" style="width: ${pct}%;"></div>
              </div>
              <span class="report-progress-text">${textoProgreso}</span>
            </div>
          </div>
        </div>
        
        <div class="report-block-item">
          <div class="gift-slot" style="width: 40px; height: 40px; flex-shrink: 0;">
            ${itemBgImg ? `<img src="${itemBgImg}" class="gift-bg-img" alt="Fondo">` : ''}
            <img src="${itemImg}" class="report-card-img" alt="Item" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
          </div>
          <div class="report-item-details">
            <div class="report-card-itemline">${itemName}</div>
            <div class="report-card-affinity-gain">
              <img src="${AFFINITY_ICON_URL}" class="affinity-icon" alt="Affinity"> +${item.afiValor} ${labelAffText}
            </div>
          </div>
        </div>

        <div class="report-block-metrics">
          <span>🎁 ${t.giftsAmountText} <strong>${item.cantRegalos}</strong></span>
          ${item.cuentaCita ? `<span>📅 ${t.datesUsedText} <strong>${item.diasFaltantes}</strong></span>` : ''}
          ${item.usaNube ? `<span>☁️ ${t.cloudsUsedText} <strong>${item.diasFaltantes}</strong></span>` : ''}
        </div>
        
        <div class="report-card-right-group">
          <div class="report-card-days">
            ⏳ ${t.daysRemainingText} <strong>${item.diasFaltantes}</strong>
          </div>
          <div class="report-card-cost-box">
            <div class="report-card-cost-label">${t.costoTotalLv10}</div>
            <div class="report-card-cost-val">
              <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons" style="width:16px; height:16px;"> ${item.costoTotalFons}
            </div>
          </div>
          <button class="delete-report-btn" onclick="eliminarDelReporte(${item.id})" title="Eliminar">✕</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function recalculateTab1() {
  if (!selectedCharaTab1) return;

  const rawCita = selectedCharaTab1.nivelCita !== undefined && selectedCharaTab1.nivelCita !== null 
                  ? String(selectedCharaTab1.nivelCita).trim() 
                  : "";

  let tieneCita = true;
  let umbralCita = parseInt(rawCita, 10);

  const isZankouTab1 = selectedCharaTab1.chara && selectedCharaTab1.chara.toLowerCase().includes('zankou');
  const t = translations[currentLang];
  const labelAff = isZankouTab1 ? t.obsessionLabel : t.affinityLabel;

  if (rawCita.toLowerCase().includes("no") || rawCita === "") {
    tieneCita = false;
    umbralCita = 0;
  } else if (isNaN(umbralCita)) {
    tieneCita = true;
    umbralCita = 4;
  } else {
    tieneCita = true;
  }

  const zeroLvlTab1 = zeroSkillState[1];

  [1, 2, 3].forEach(idx => {
    const baseAfi = selectedCharaTab1['affinity' + idx] || 0;
    const costUnit = selectedCharaTab1['itemcost_' + idx] || 0;
    
    const container = document.getElementById(`p1-tables-container-${idx}`);
    if (!container) return;

    const usaNube = document.getElementById('p1-nube' + idx) ? document.getElementById('p1-nube' + idx).checked : false;
    const checkboxCita = document.getElementById(`p1-cita${idx}`);
    const cuentaCita = checkboxCita ? (checkboxCita.checked && !checkboxCita.disabled) : false;

    const afiDisplay = getZeroBuffValue(zeroLvlTab1, 1, baseAfi);

    const resultadoCalculo = calcularRequisitosAfinidad(baseAfi, costUnit, usaNube, cuentaCita, tieneCita, umbralCita, zeroLvlTab1, 0);
    const diasReq = resultadoCalculo.diasReq;
    const cantRegalos = resultadoCalculo.cantRegalos;
    const costoTotal = resultadoCalculo.costoTotal;
    const nubesTotalesUsadas = resultadoCalculo.nubesTotalesUsadas;

    let citaHtml = '';
    if (tieneCita) {
      const textoCitaLabel = isZankouTab1 ? t.contarDuelo : t.contarCita;
      citaHtml = `
        <div class="toggle-container" onclick="toggleCardCheckbox('p1-cita${idx}', event)">
          <span>${textoCitaLabel}</span>
          <input type="checkbox" id="p1-cita${idx}" ${cuentaCita ? 'checked' : ''} onchange="onTab1CheckboxChange()" onclick="event.stopPropagation()">
        </div>
      `;
    } else {
      citaHtml = `
        <div class="toggle-container" style="background-color: rgba(239, 68, 68, 0.15); border: 1px solid #fecaca; color: #ef4444; font-weight: bold; justify-content: center; cursor: default;">
          <span style="font-size: 11px; text-align: center;">${t.sinCitaMsg}</span>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="metric-row"><span class="metric-label">${labelAff}</span><span class="metric-value"><img src="${AFFINITY_ICON_URL}" class="affinity-icon" alt="Afinidad"> ${afiDisplay}</span></div>
      <div class="metric-row"><span class="metric-label">${t.precioUnidad}</span><span class="metric-value">${costUnit.toLocaleString('en-US')} <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons"></span></div>
      
      ${citaHtml}

      <div class="toggle-container-nube" onclick="toggleCardCheckbox('p1-nube${idx}', event)">
        <span>${t.usarNube}</span>
        <input type="checkbox" id="p1-nube${idx}" ${usaNube ? 'checked' : ''} onchange="onTab1CheckboxChange()" onclick="event.stopPropagation()">
      </div>

      <div class="highlight-box">
        <div class="metric-row"><span class="metric-label">${t.diasFaltantes}</span><span class="metric-value">${diasReq}</span></div>
        ${usaNube ? `<div class="metric-row"><span class="metric-label">${t.nubesUsar}</span><span class="metric-value">${nubesTotalesUsadas}</span></div>` : ''}
        <div class="metric-row"><span class="metric-label">${t.cantRegalos}</span><span class="metric-value">${cantRegalos}</span></div>
        <div class="metric-row total-cost-row"><span class="metric-label">${t.costoTotalFons}</span><span class="metric-value">${costoTotal.toLocaleString('en-US')} <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons"></span></div>
      </div>
    `;
  });
}

function calcularNivelYRestante(puntosTotales) {
  let nivelActual = 1;
  let expRestante = puntosTotales;

  while (nivelActual < 10 && expRestante >= EXP_PARA_SUBIR[nivelActual - 1]) {
    expRestante -= EXP_PARA_SUBIR[nivelActual - 1];
    nivelActual++;
  }

  const reqSiguiente = nivelActual < 10 ? EXP_PARA_SUBIR[nivelActual - 1] : 0;

  return {
    nivel: nivelActual,
    sobra: expRestante,
    reqNivel: reqSiguiente
  };
}

function simRecalcular() {
  if (!selectedCharaSim) return;

  guardarEstadoSimActual();

  const zeroLvlSim = zeroSkillState[3];
  const maxBondZeroThresholds = { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8 };
  const maxBondZeroLevel = zeroLvlSim > 0 ? (maxBondZeroThresholds[zeroLvlSim] || 0) : 0;
  const afnZeroMeta = maxBondZeroLevel > 0 ? (ACUMULADO_HASTA_NIVEL[maxBondZeroLevel] || 0) : 0;

  const initLevelElem = document.getElementById('sim-init-level');
  const initAfiElem = document.getElementById('sim-init-affinity');

  const initLevel = initLevelElem ? Number(initLevelElem.value) || 1 : 1;
  const rawInitAfi = initAfiElem ? initAfiElem.value.replace(/,/g, '') : '0';
  const initAfi = Number(rawInitAfi) || 0;

  const afiBaseNivel = ACUMULADO_HASTA_NIVEL[initLevel - 1] || 0;
  let afiAcumulada = afiBaseNivel + initAfi;

  function getUnitVal(baseUnit, currentAfi) {
    return (zeroLvlSim > 0 && afnZeroMeta > 0 && currentAfi < afnZeroMeta) ? Math.round(baseUnit * 1.05) : baseUnit;
  }

  const inputCartas = document.getElementById('sim-inv-cartas-qty');
  const inputBoletos = document.getElementById('sim-inv-boletos-qty');
  const inputsRegalos = [
    { input: inputCartas, base: 2000, valElem: document.getElementById('sim-inv-cartas-val') },
    { input: inputBoletos, base: 400, valElem: document.getElementById('sim-inv-boletos-val') }
  ];

  [1, 2, 3].forEach(idx => {
    inputsRegalos.push({
      input: document.getElementById(`sim-inv-gift-qty-${idx}`),
      base: Number(selectedCharaSim[`affinity${idx}`]) || 0,
      valElem: document.getElementById(`sim-inv-gift-val-${idx}`)
    });
  });

  [4, 5].forEach(idx => {
    inputsRegalos.push({
      input: document.getElementById(`sim-inv-gift-qty-${idx}`),
      base: 400,
      valElem: document.getElementById(`sim-inv-gift-val-${idx}`)
    });
  });

  inputsRegalos.forEach(item => {
    if (!item.input) return;
    let cantDeseada = Number(item.input.value) || 0;
    if (cantDeseada <= 0) return;

    let cantUsada = 0;
    for (let r = 0; r < cantDeseada; r++) {
      if (afiAcumulada >= AFINIDAD_MAX) break;
      const unitVal = getUnitVal(item.base, afiAcumulada);
      if (afiAcumulada + unitVal > AFINIDAD_MAX) {
        if (afiAcumulada < AFINIDAD_MAX) {
          afiAcumulada = AFINIDAD_MAX;
          cantUsada++;
        }
        break;
      }
      afiAcumulada += unitVal;
      cantUsada++;
    }

    if (cantUsada !== cantDeseada) {
      item.input.value = cantUsada;
    }
  });

  if (afiAcumulada > AFINIDAD_MAX) afiAcumulada = AFINIDAD_MAX;

  inputsRegalos.forEach(item => {
    if (item.valElem) {
      const unitVal = getUnitVal(item.base, afiAcumulada);
      item.valElem.innerHTML = `<img src="${AFFINITY_ICON_URL}" class="affinity-icon" alt="Affinity"> ${unitVal}`;
    }
  });

  const res = calcularNivelYRestante(afiAcumulada);

  const levelBadge = document.getElementById('sim-level-badge');
  const expSub = document.getElementById('sim-exp-sub');
  const circleFill = document.getElementById('sim-circle-fill');

  if (levelBadge) levelBadge.innerText = res.nivel;

  if (expSub) {
    if (res.nivel >= 10) {
      expSub.innerText = res.sobra > 0 ? `+${res.sobra.toLocaleString('en-US')} (MAX)` : `0 (MAX)`;
    } else {
      expSub.innerText = `${res.sobra.toLocaleString('en-US')} / ${res.reqNivel.toLocaleString('en-US')}`;
    }
  }

  let pctNivel = 0;
  if (res.nivel >= 10) {
    pctNivel = 1;
  } else {
    pctNivel = Math.min(1, Math.max(0, res.sobra / res.reqNivel));
  }

  const circumference = 175.9;
  const offset = circumference - (pctNivel * circumference);

  if (circleFill) {
    circleFill.style.strokeDashoffset = offset;

    if (res.nivel >= 1 && res.nivel <= 3) {
      circleFill.style.stroke = '#06b6d4'; 
    } else if (res.nivel >= 4 && res.nivel <= 5) {
      circleFill.style.stroke = '#22c55e'; 
    } else if (res.nivel >= 6 && res.nivel <= 9) {
      circleFill.style.stroke = '#eab308'; 
    } else if (res.nivel >= 10) {
      circleFill.style.stroke = '#f97316'; 
    }
  }
}

function simEnviarDatos() {
  if (!selectedCharaSim) return;

  const zeroLvlSim = zeroSkillState[3];
  const maxBondZeroThresholds = { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8 };
  const maxBondZeroLevel = zeroLvlSim > 0 ? (maxBondZeroThresholds[zeroLvlSim] || 0) : 0;
  const afnZeroMeta = maxBondZeroLevel > 0 ? (ACUMULADO_HASTA_NIVEL[maxBondZeroLevel] || 0) : 0;

  const initLevelElem = document.getElementById('sim-init-level');
  const initAfiElem = document.getElementById('sim-init-affinity');
  const initLevel = initLevelElem ? Number(initLevelElem.value) || 1 : 1;
  const rawInitAfi = initAfiElem ? initAfiElem.value.replace(/,/g, '') : '0';
  const initAfi = Number(rawInitAfi) || 0;

  const afiBaseNivel = ACUMULADO_HASTA_NIVEL[initLevel - 1] || 0;
  let afiAcumulada = afiBaseNivel + initAfi;

  function sumarConBuffSim(cantidad, baseUnit) {
    if (cantidad <= 0) return;
    for (let r = 0; r < cantidad; r++) {
      const bufeadaUnit = (zeroLvlSim > 0 && afnZeroMeta > 0 && afiAcumulada < afnZeroMeta) ? Math.round(baseUnit * 1.05) : baseUnit;
      afiAcumulada += bufeadaUnit;
    }
  }

  const invCartas = Number(document.getElementById('sim-inv-cartas-qty')?.value) || 0;
  sumarConBuffSim(invCartas, 2000);

  const invBoletos = Number(document.getElementById('sim-inv-boletos-qty')?.value) || 0;
  sumarConBuffSim(invBoletos, 400);

  [1, 2, 3].forEach(idx => {
    const invCant = Number(document.getElementById(`sim-inv-gift-qty-${idx}`)?.value) || 0;
    const baseAfiUnit = Number(selectedCharaSim[`affinity${idx}`]) || 0;
    sumarConBuffSim(invCant, baseAfiUnit);
  });

  [4, 5].forEach(idx => {
    const invCant = Number(document.getElementById(`sim-inv-gift-qty-${idx}`)?.value) || 0;
    sumarConBuffSim(invCant, 400);
  });

  if (afiAcumulada > AFINIDAD_MAX) afiAcumulada = AFINIDAD_MAX;

  const res = calcularNivelYRestante(afiAcumulada);

  onCharacterChangeTab2(selectedCharaSim.chara);

  const p2Nivel = document.getElementById('p2-nivel');
  const p2Afiactual = document.getElementById('p2-afiactual');
  if (p2Nivel) p2Nivel.value = res.nivel;
  if (p2Afiactual) p2Afiactual.value = res.sobra.toLocaleString('en-US');

  guardarEstadoTab2Actual();

  const tabCalcBtn = document.querySelectorAll('.nav-sidebar-btn')[2];
  if (tabCalcBtn) {
    switchTab('tab-calcular', tabCalcBtn);
  }

  recalculateTab2();
}

function recalculateTab2() {
  if (!selectedCharaTab2) return;

  guardarEstadoTab2Actual();
  validarRestriccionCitaTab2();

  const nivelSelect = document.getElementById('p2-nivel');
  const afiActualInput = document.getElementById('p2-afiactual');
  if (!nivelSelect || !afiActualInput) return;

  let nivelSel = Number(nivelSelect.value) || lastUserSelectedLevelTab2 || 1;
  if (nivelSel < 10) {
    lastUserSelectedLevelTab2 = nivelSel;
  } else {
    nivelSel = lastUserSelectedLevelTab2;
  }

  const rawAfiInput = afiActualInput.value.replace(/,/g, '');
  const afiIngresada = Number(rawAfiInput) || 0;

  const cartasQtyElem = document.getElementById('p2-cartas-qty');
  const boletosQtyElem = document.getElementById('p2-boletos-qty');
  let cartasQty = cartasQtyElem ? Number(cartasQtyElem.value) || 0 : 0;
  let boletosQty = boletosQtyElem ? Number(boletosQtyElem.value) || 0 : 0;

  const zeroLvlTab2 = zeroSkillState[2];
  
  const afiBaseNivel = ACUMULADO_HASTA_NIVEL[nivelSel - 1] || 0;
  let afiAcumulada = afiBaseNivel + afiIngresada;
  
  const maxBondZeroThresholds = { 1: 4, 2: 5, 3: 6, 4: 7, 5: 8 };
  const maxBondZeroLevel = zeroLvlTab2 > 0 ? (maxBondZeroThresholds[zeroLvlTab2] || 0) : 0;
  const afnZeroMeta = maxBondZeroLevel > 0 ? (ACUMULADO_HASTA_NIVEL[maxBondZeroLevel] || 0) : 0;

  function getTab2UnitVal(baseUnit, currentAfi) {
    return (zeroLvlTab2 > 0 && afnZeroMeta > 0 && currentAfi < afnZeroMeta) ? Math.round(baseUnit * 1.05) : baseUnit;
  }

  let cartasUsadas = 0;
  for (let c = 0; c < cartasQty; c++) {
    if (afiAcumulada >= AFINIDAD_MAX) break;
    const valCarta = getTab2UnitVal(2000, afiAcumulada);
    if (afiAcumulada + valCarta > AFINIDAD_MAX) {
      if (afiAcumulada < AFINIDAD_MAX) {
        afiAcumulada = AFINIDAD_MAX;
        cartasUsadas++;
      }
      break;
    }
    afiAcumulada += valCarta;
    cartasUsadas++;
  }
  if (cartasQty > 0 && cartasUsadas !== cartasQty) {
    cartasQty = cartasUsadas;
    if (cartasQtyElem) cartasQtyElem.value = cartasUsadas;
  }

  let boletosUsados = 0;
  for (let b = 0; b < boletosQty; b++) {
    if (afiAcumulada >= AFINIDAD_MAX) break;
    const valBoleto = getTab2UnitVal(400, afiAcumulada);
    if (afiAcumulada + valBoleto > AFINIDAD_MAX) {
      if (afiAcumulada < AFINIDAD_MAX) {
        afiAcumulada = AFINIDAD_MAX;
        boletosUsados++;
      }
      break;
    }
    afiAcumulada += valBoleto;
    boletosUsados++;
  }
  if (boletosQty > 0 && boletosUsados !== boletosQty) {
    boletosQty = boletosUsados;
    if (boletosQtyElem) boletosQtyElem.value = boletosUsados;
  }

  if (afiAcumulada > AFINIDAD_MAX) afiAcumulada = AFINIDAD_MAX;

  const levelContainer = document.getElementById('level-select-container');
  const affinityContainer = document.getElementById('affinity-input-container');

  if (levelContainer && affinityContainer && nivelSelect && afiActualInput) {
    if (afiAcumulada >= AFINIDAD_MAX) {
      nivelSelect.value = '10';
      nivelSelect.disabled = true;
      afiActualInput.disabled = true;
      levelContainer.classList.add('level-locked');
      affinityContainer.classList.add('input-locked');
    } else {
      nivelSelect.value = lastUserSelectedLevelTab2.toString();
      nivelSelect.disabled = false;
      afiActualInput.disabled = false;
      levelContainer.classList.remove('level-locked');
      affinityContainer.classList.remove('input-locked');
    }
  }

  const valorCartaSubLabel = getTab2UnitVal(2000, afiAcumulada);
  const valorBoletoSubLabel = getTab2UnitVal(400, afiAcumulada);

  const cartaSubLabel = document.getElementById('p2-carta-sublabel');
  const boletoSubLabel = document.getElementById('p2-boleto-sublabel');
  if (cartaSubLabel) cartaSubLabel.innerText = `+${valorCartaSubLabel.toLocaleString('en-US')}`;
  if (boletoSubLabel) boletoSubLabel.innerText = `+${valorBoletoSubLabel.toLocaleString('en-US')}`;

  const porcentaje = Math.min(100, Math.max(0, (afiAcumulada / AFINIDAD_MAX) * 100));
  const sparkbar = document.getElementById('sparkline-bar');
  const p2ProgressText = document.getElementById('p2-progress-text');
  const p2Necesita = document.getElementById('p2-necesita');

  if (sparkbar) {
    sparkbar.style.width = porcentaje + '%';
    sparkbar.style.backgroundColor = porcentaje < 30 ? '#ef4444' : (porcentaje < 70 ? '#f59e0b' : '#10b981');
  }
  if (p2ProgressText) {
    p2ProgressText.innerText = `${afiAcumulada.toLocaleString('en-US')} / ${AFINIDAD_MAX.toLocaleString('en-US')}`;
  }

  const afiFaltanteGeneral = Math.max(0, AFINIDAD_MAX - afiAcumulada);
  if (p2Necesita) p2Necesita.value = afiFaltanteGeneral.toLocaleString('en-US');

  const rawCita = selectedCharaTab2.nivelCita !== undefined && selectedCharaTab2.nivelCita !== null 
                  ? String(selectedCharaTab2.nivelCita).trim() 
                  : "";

  let tieneCita = true;
  let umbralCita = parseInt(rawCita, 10);

  const isZankou = selectedCharaTab2.chara && selectedCharaTab2.chara.toLowerCase().includes('zankou');
  const t = translations[currentLang];
  const labelAff = isZankou ? t.obsessionLabel : t.affinityLabel;

  if (rawCita.toLowerCase().includes("no") || rawCita === "") {
    tieneCita = false;
    umbralCita = 0;
  } else if (isNaN(umbralCita)) {
    tieneCita = true;
    umbralCita = 4;
  } else {
    tieneCita = true;
  }

  [1, 2, 3].forEach(idx => {
    const baseAfiUnit = Number(selectedCharaTab2['affinity' + idx]) || 0;
    const costUnit = Number(selectedCharaTab2['itemcost_' + idx]) || 0;
    const nubeElem = document.getElementById('p2-nube' + idx);
    const usaNube = nubeElem ? nubeElem.checked : false;

    const afiHeadValue = getTab2UnitVal(baseAfiUnit, afiAcumulada);

    const checkboxCita = document.getElementById(`p2-cita${idx}`);
    const cuentaCita = checkboxCita ? checkboxCita.checked : true;

    const resultadoCalculo = calcularRequisitosAfinidad(baseAfiUnit, costUnit, usaNube, cuentaCita, tieneCita, umbralCita, zeroLvlTab2, afiAcumulada);
    const diasReq = resultadoCalculo.diasReq;
    const cantRegalos = resultadoCalculo.cantRegalos;
    const costoTotal = resultadoCalculo.costoTotal;
    const nubesTotalesUsadas = resultadoCalculo.nubesTotalesUsadas;

    const headElem = document.getElementById(`p2-afi${idx}-head`);
    const cantElem = document.getElementById(`p2-cant${idx}`);
    const diasElem = document.getElementById(`p2-dias${idx}`);
    const costElem = document.getElementById(`p2-cost${idx}`);
    const costTotalElem = document.getElementById(`p2-costototal${idx}`);
    const nubesUsadasElem = document.getElementById(`p2-nubesusadas${idx}`);
    
    const citaWrapper = document.getElementById(`p2-cita-wrapper-${idx}`);

    if (headElem) headElem.innerHTML = `<img src="${AFFINITY_ICON_URL}" class="affinity-icon" alt="Afinidad"> ${afiHeadValue}`;
    if (cantElem) cantElem.innerText = cantRegalos;
    if (diasElem) diasElem.innerText = diasReq;
    if (costElem) costElem.innerHTML = costUnit.toLocaleString('en-US') + ` <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons">`;
    if (costTotalElem) costTotalElem.innerHTML = costoTotal.toLocaleString('en-US') + ` <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons">`;
    if (nubesUsadasElem) nubesUsadasElem.innerText = nubesTotalesUsadas;

    if (citaWrapper) {
      if (!tieneCita) {
        citaWrapper.className = "toggle-container";
        citaWrapper.style.cssText = "display: flex; background-color: rgba(239, 68, 68, 0.15); border: 1px solid #fecaca; color: #ef4444; font-weight: bold; justify-content: center; cursor: default; padding: 10px; border-radius: 8px; margin-bottom: 12px;";
        citaWrapper.innerHTML = `<span style="font-size: 11px; text-align: center;">${t.sinCitaMsg}</span>`;
      } else {
        citaWrapper.style.cssText = "";
        citaWrapper.className = "toggle-container";
        citaWrapper.setAttribute("onclick", `toggleCardCheckbox('p2-cita${idx}', event)`);

        const textoCitaLabel = isZankou ? t.contarDuelo : t.contarCita;
        
        let isChecked = true;
        const existingInput = document.getElementById(`p2-cita${idx}`);
        if (existingInput) {
          isChecked = existingInput.checked;
        } else {
          let savedData = tab2UserState[selectedCharaTab2.chara];
          if (savedData && savedData[`cita${idx}`] !== undefined) {
            isChecked = savedData[`cita${idx}`];
          }
        }

        citaWrapper.innerHTML = `
          <span>${textoCitaLabel}</span>
          <input type="checkbox" id="p2-cita${idx}" ${isChecked ? 'checked' : ''} onchange="onTab2CheckboxChange()" onclick="event.stopPropagation()">
        `;

        const inputCheck = document.getElementById(`p2-cita${idx}`);
        const spanTexto = citaWrapper.querySelector('span');

        if (inputCheck) {
          if (nivelSel >= umbralCita) {
            inputCheck.disabled = false;
            citaWrapper.classList.remove('locked-cita');
            if (spanTexto) spanTexto.innerText = textoCitaLabel;
          } else {
            inputCheck.disabled = true;
            inputCheck.checked = false;
            citaWrapper.classList.add('locked-cita');
            if (spanTexto) {
              if (isZankou) {
                spanTexto.innerText = currentLang === 'en' ? `Duel available at level ${umbralCita}` : `Duelo disponible en nivel ${umbralCita}`;
              } else {
                spanTexto.innerText = currentLang === 'en' ? `Date available at level ${umbralCita}` : `Cita disponible en nivel ${umbralCita}`;
              }
            }
          }
        }
      }
    }
  });
}

function recalculate() {
  recalculateTab1();
  recalculateTab2();
  simRecalcular();
}