const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4o42FhIcR4mcGG1chHjHDjBu0IMTqyeCsUMrC-XHM_tdfp_QyfzQuZ1p-su4qMjksAA/exec';

let charactersData = [];
let selectedCharaTab1 = null;
let selectedCharaTab2 = null;
let reporteGuardado = [];

const FONS_ICON_URL = 'https://lh3.googleusercontent.com/d/1eFSFZPncsRkZU-yORmU10zoxF5zwjt7T';
const AFFINITY_ICON_URL = 'https://lh3.googleusercontent.com/d/16Yzy8DsFN4jdaacXLffYAI3MnZAxmmmT';
const CARD_WRITE_IMG_URL = 'https://lh3.googleusercontent.com/d/1C9x-jmc4PuFCqtxZh8xinbZj-oTKR6TX';
const MOVIE_TICKET_IMG_URL = 'https://lh3.googleusercontent.com/d/14PzrxqsRtv8vZU3cnme0eC2d40PinhVr';

const REQUISITOS_NIVEL = [100, 500, 1000, 2000, 3500, 5000, 7000, 9000, 12000, 16000, 0];
const ACUMULADO_HASTA_NIVEL = [0, 100, 600, 1600, 3600, 7100, 12100, 19100, 28100, 40100, 56100];
const AFINIDAD_MAX = 56100;
const AFINIDAD_ITEMS_MAX = 56000;

const translations = {
  es: {
    tabPersonajes: "Personajes",
    tabCalcular: "Calcular Afinidad",
    bonoAfinidad: "Bono de afinidad nivel 10",
    outfit: "Outfit",
    itemLabel: "Item",
    affinityLabel: "Afinidad",
    icono: "[ Icono ]",
    avatar: "[ Avatar ]",
    necesita: "Se necesita",
    ingreseAfinidad: "Ingrese su afinidad actual",
    nivel: "Nivel",
    cantRegalos: "Cantidad de regalos",
    diasFaltantes: "Días faltantes",
    precioUnidad: "Precio por unidad",
    costoTotalFons: "Costo total de Fons",
    nubesUsar: "Nubes a usar",
    cita: "¿Cita?",
    contarCita: "¿Contar cita?",
    usarNube: "Usar nube del mueble",
    sinCitaMsg: "Este personaje no cuenta con sistema de citas",
    reporteTitulo: "Reporte de Recursos Guardados",
    limpiarReporte: "Limpiar todo",
    exportarPng: "Descargar",
    costoTotalLv10: "COSTO TOTAL A NIVEL 10",
    bondLevelText: "NIVEL DE AFINIDAD",
    giftsAmountText: "Regalos faltantes:",
    datesUsedText: "Cita restantes:",
    cloudsUsedText: "Nubes faltantes:",
    daysRemainingText: "Días restantes:",
    regalosSinCondicion: "Regalos sin condición",
    cartaEscritaMano: "Carta escrita a mano",
    boletoCineFloe: "Boleto del cine Floe",
    simularDesdeCero: "Simular nivel y afinidad final desde cero"
  },
  en: {
    tabPersonajes: "Characters",
    tabCalcular: "Calculate Affection",
    bonoAfinidad: "Level 10 Affection Bonus",
    outfit: "Outfit",
    itemLabel: "Item",
    affinityLabel: "Affection",
    icono: "[ Icon ]",
    avatar: "[ Avatar ]",
    necesita: "Required",
    ingreseAfinidad: "Enter current affection",
    nivel: "Level",
    cantRegalos: "Gifts required",
    diasFaltantes: "Days to go",
    precioUnidad: "Cost",
    costoTotalFons: "Total Fons cost",
    nubesUsar: "Fluffy Cotton required",
    cita: "Date?",
    contarCita: "Date?",
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
    regalosSinCondicion: "Unconditional Gifts",
    cartaEscritaMano: "Handwritten Letter",
    boletoCineFloe: "Floe Cinema Ticket",
    simularDesdeCero: "Simulate level and final affection from scratch"
  }
};

let currentLang = 'es';

window.onload = function() {
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
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
      initWeb(parsedData);
    } catch (e) {
      console.error('Error al leer la caché local:', e);
    }
  }

  fetch(SCRIPT_URL)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('charactersData_cache', JSON.stringify(data));
      initWeb(data);
    })
    .catch(error => {
      console.error('Error al cargar los datos de Google Sheets:', error);
      if (!cachedData) {
        alert('Hubo un error al conectar con la base de datos.');
      }
    });
};

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  aplicarTraducciones();
  recalculate();
  renderReporte();
  
  if (selectedCharaTab1) onCharacterChangeTab1(selectedCharaTab1.chara);
  if (selectedCharaTab2) onCharacterChangeTab2(selectedCharaTab2.chara);
}

function aplicarTraducciones() {
  const t = translations[currentLang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.innerText = t[key];
  });
  
  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.innerText = currentLang === 'es' ? '🇪🇸 ES' : '🇺🇸 EN';
  }
}

function initWeb(data) {
  charactersData = data;
  const sel1 = document.getElementById('select-chara-1');
  const sel2 = document.getElementById('select-chara-2');

  sel1.innerHTML = '';
  sel2.innerHTML = '';

  data.forEach(c => {
    let opt1 = document.createElement('option');
    opt1.value = c.chara; opt1.text = c.chara;
    sel1.appendChild(opt1);

    let opt2 = document.createElement('option');
    opt2.value = c.chara; opt2.text = c.chara;
    sel2.appendChild(opt2);
  });

  if (data.length > 0) {
    onCharacterChangeTab1(data[0].chara);
    onCharacterChangeTab2(data[0].chara);
  }
  aplicarTraducciones();
  renderReporte();
}

function switchTab(tabId, btnElement) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById(tabId).classList.add('active');
  btnElement.classList.add('active');
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
  document.getElementById('modal-img').src = imgUrl;
  document.getElementById('image-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('image-modal').style.display = 'none';
}

function toggleCardCheckbox(checkboxId, event) {
  event.stopPropagation();
  const checkbox = document.getElementById(checkboxId);
  if (checkbox && !checkbox.disabled) {
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event('change'));
  }
}

function onCharacterChangeTab1(name) {
  selectedCharaTab1 = charactersData.find(c => c.chara === name);
  if (!selectedCharaTab1) return;
  
  document.getElementById('select-chara-1').value = name;
  document.getElementById('p1-bonus').innerText = selectedCharaTab1.bonus;
  document.getElementById('p1-outfit-name').innerText = selectedCharaTab1.outfit_name || translations[currentLang].outfit;
  
  const isEn = currentLang === 'en';
  document.getElementById('p1-item1-name').innerText = isEn ? (selectedCharaTab1.itemname1en || selectedCharaTab1.itemname1) : selectedCharaTab1.itemname1;
  document.getElementById('p1-item2-name').innerText = isEn ? (selectedCharaTab1.itemname2en || selectedCharaTab1.itemname2) : selectedCharaTab1.itemname2;
  document.getElementById('p1-item3-name').innerText = isEn ? (selectedCharaTab1.itemname3en || selectedCharaTab1.itemname3) : selectedCharaTab1.itemname3;

  const avatarUrl = getDirectImageUrl(selectedCharaTab1.img);
  const avatarContainer = document.getElementById('p1-avatar-container');
  if (avatarUrl) {
    avatarContainer.innerHTML = `<img src="${avatarUrl}" alt="Avatar" onclick="openModal('${avatarUrl}')">`;
  } else {
    avatarContainer.innerHTML = `<span style="font-size:12px;">${translations[currentLang].avatar}</span>`;
  }

  const outfitUrl = getDirectImageUrl(selectedCharaTab1.outfit_img);
  const outfitContainer = document.getElementById('p1-outfit-container');
  if (outfitUrl) {
    outfitContainer.innerHTML = `<img src="${outfitUrl}" alt="Outfit" onclick="openModal('${outfitUrl}')">`;
  } else {
    outfitContainer.innerHTML = `<span style="font-size:12px;">${translations[currentLang].outfit}</span>`;
  }

  [1, 2, 3].forEach(idx => {
    const itemImgUrl = getDirectImageUrl(selectedCharaTab1['itemimg_' + idx]);
    const itemContainer1 = document.getElementById(`p1-itemimg-${idx}-container`);
    if (itemContainer1) {
      if (itemImgUrl) {
        itemContainer1.innerHTML = `<img src="${itemImgUrl}" alt="Item" onclick="openModal('${itemImgUrl}')">`;
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
  
  document.getElementById('select-chara-2').value = name;
  document.getElementById('p2-afiactual').value = '0';
  document.getElementById('p2-nivel').value = '0';
  document.getElementById('p2-cartas-qty').value = '0';
  document.getElementById('p2-boletos-qty').value = '0';
  const simCheckbox = document.getElementById('p2-modo-simulacion');
  if (simCheckbox) simCheckbox.checked = false;

  const isEn = currentLang === 'en';
  document.getElementById('p2-item1-name').innerText = isEn ? (selectedCharaTab2.itemname1en || selectedCharaTab2.itemname1) : selectedCharaTab2.itemname1;
  document.getElementById('p2-item2-name').innerText = isEn ? (selectedCharaTab2.itemname2en || selectedCharaTab2.itemname2) : selectedCharaTab2.itemname2;
  document.getElementById('p2-item3-name').innerText = isEn ? (selectedCharaTab2.itemname3en || selectedCharaTab2.itemname3) : selectedCharaTab2.itemname3;

  const iconAfiUrl = getDirectImageUrl(selectedCharaTab2.icon_afi || selectedCharaTab2.img);
  const avatarContainer2 = document.getElementById('p2-avatar-container');
  if (iconAfiUrl) {
    avatarContainer2.innerHTML = `<img src="${iconAfiUrl}" alt="Avatar" onclick="openModal('${iconAfiUrl}')">`;
  } else {
    avatarContainer2.innerHTML = `<span style="font-size:12px;">${translations[currentLang].avatar}</span>`;
  }

  [1, 2, 3].forEach(idx => {
    const itemImgUrl = getDirectImageUrl(selectedCharaTab2['itemimg_' + idx]);
    const itemContainer2 = document.getElementById(`p2-itemimg-${idx}-container`);
    if (itemContainer2) {
      if (itemImgUrl) {
        itemContainer2.innerHTML = `<img src="${itemImgUrl}" alt="Item" onclick="openModal('${itemImgUrl}')">`;
      } else {
        itemContainer2.innerHTML = `<span>${translations[currentLang].icono}</span>`;
      }
    }
  });

  onNivelChangeTab2();
}

function validarRestriccionCitaTab1() {
  if (!selectedCharaTab1) return;
  const nivelCitaRaw = selectedCharaTab1.nivelCita;

  [1, 2, 3].forEach(idx => {
    const checkboxCita = document.getElementById(`p1-cita${idx}`);
    if (checkboxCita) {
      if (nivelCitaRaw === "No" || nivelCitaRaw === "" || nivelCitaRaw === undefined) {
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

  const nivelSel = Number(document.getElementById('p2-nivel').value) || 0;
  const nivelCitaRaw = selectedCharaTab2.nivelCita;

  [1, 2, 3].forEach(idx => {
    const checkboxCita = document.getElementById(`p2-cita${idx}`);
    if (checkboxCita) {
      if (nivelCitaRaw === "No" || nivelCitaRaw === "" || nivelCitaRaw === undefined) {
        checkboxCita.disabled = true;
        checkboxCita.checked = false;
      } else {
        const umbralRequerido = parseInt(nivelCitaRaw, 10);
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
  const nivel = Number(document.getElementById('p2-nivel').value) || 0;
  const maxPermitido = ACUMULADO_HASTA_NIVEL[nivel + 1] ? (ACUMULADO_HASTA_NIVEL[nivel + 1] - ACUMULADO_HASTA_NIVEL[nivel]) : 0;
  const rawAfiInput = document.getElementById('p2-afiactual');
  
  let actualVal = Number(rawAfiInput.value.replace(/,/g, '')) || 0;
  if (actualVal > maxPermitido && maxPermitido > 0) {
    actualVal = maxPermitido;
    rawAfiInput.value = actualVal.toLocaleString('en-US');
  }
  
  recalculateTab2();
}

function formatAndValidateAffinity(input) {
  let rawValue = input.value.replace(/[^0-9]/g, '');
  if (rawValue === '') {
    input.value = '0';
    recalculateTab2();
    return;
  }
  let num = parseInt(rawValue, 10);
  const nivel = Number(document.getElementById('p2-nivel').value) || 0;
  const maxPermitido = ACUMULADO_HASTA_NIVEL[nivel + 1] ? (ACUMULADO_HASTA_NIVEL[nivel + 1] - ACUMULADO_HASTA_NIVEL[nivel]) : 0;

  if (num > maxPermitido && maxPermitido > 0) {
    num = maxPermitido;
  }
  input.value = num.toLocaleString('en-US');
  recalculateTab2();
}

function syncCitas(itemIdx, isChecked) {
  const p1Check = document.getElementById('p1-cita' + itemIdx);
  const p2Check = document.getElementById('p2-cita' + itemIdx);
  
  if (p1Check && !p1Check.disabled) p1Check.checked = isChecked;
  if (p2Check && !p2Check.disabled) p2Check.checked = isChecked;
  
  recalculateTab1();
  recalculateTab2();
}

function syncNubes(itemIdx, isChecked) {
  const p1Nube = document.getElementById('p1-nube' + itemIdx);
  const p2Nube = document.getElementById('p2-nube' + itemIdx);
  if (p1Nube) p1Nube.checked = isChecked;
  if (p2Nube) p2Nube.checked = isChecked;
  recalculateTab1();
  recalculateTab2();
}

function guardarEnReporte(idx) {
  if (!selectedCharaTab2) return;

  const bgCharaImg = getDirectImageUrl(selectedCharaTab2.img_default || selectedCharaTab2.img);
  const avatarImg = getDirectImageUrl(selectedCharaTab2.icon_afi || selectedCharaTab2.img);

  const nivelSel = document.getElementById('p2-nivel').value;
  const rawAfiInput = document.getElementById('p2-afiactual').value.replace(/,/g, '');
  const afiIngresada = Number(rawAfiInput) || 0;

  const qtyCartas = Number(document.getElementById('p2-cartas-qty').value) || 0;
  const qtyBoletos = Number(document.getElementById('p2-boletos-qty').value) || 0;
  const afiExtraRegalos = (qtyCartas * 2000) + (qtyBoletos * 400);
  const modoSimulacion = document.getElementById('p2-modo-simulacion').checked;

  let afiAcumulada = 0;
  if (modoSimulacion) {
    afiAcumulada = afiExtraRegalos;
    if (afiAcumulada > AFINIDAD_MAX) afiAcumulada = AFINIDAD_MAX;
  } else {
    const afiBaseNivel = ACUMULADO_HASTA_NIVEL[Number(nivelSel)] || 0;
    afiAcumulada = afiBaseNivel + afiIngresada + afiExtraRegalos;
    if (afiAcumulada > AFINIDAD_MAX) afiAcumulada = AFINIDAD_MAX;
  }

  const porcentaje = Math.min(100, Math.max(0, (afiAcumulada / AFINIDAD_MAX) * 100));

  const cantRegalos = document.getElementById(`p2-cant${idx}`).innerText;
  const diasFaltantes = document.getElementById(`p2-dias${idx}`).innerText;
  const costoTotalFons = document.getElementById(`p2-costototal${idx}`).innerText;
  const afiValor = selectedCharaTab2['affinity' + idx];
  const usaNube = document.getElementById(`p2-nube${idx}`).checked;
  const citaCheck = document.getElementById(`p2-cita${idx}`);
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

  const btn = event.target;
  const originalText = btn.innerText;
  btn.innerText = "✓";
  setTimeout(() => { btn.innerText = originalText; }, 1200);
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

  html2canvas(container, {
    scale: 2,
    width: 1050,
    windowWidth: 1050,
    backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-color').trim(),
    useCORS: true
  }).then(canvas => {
    deleteButtons.forEach(btn => btn.style.display = 'flex');

    const link = document.createElement('a');
    link.download = 'reporte-afinidad.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => {
    console.error("Error al generar la imagen:", err);
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
    const textoProgreso = item.afiAcumuladaTexto || `0 / 56,100`;
    
    const charaObj = charactersData.find(c => c.chara === item.chara);
    let itemName = item.itemName || '';
    let itemImg = item.itemImg || '';

    if (charaObj && item.itemIndex) {
      const isEn = currentLang === 'en';
      itemName = isEn ? (charaObj['itemname' + item.itemIndex + 'en'] || charaObj['itemname' + item.itemIndex]) : charaObj['itemname' + item.itemIndex];
      itemImg = getDirectImageUrl(charaObj['itemimg_' + item.itemIndex]);
    }
    
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
          <img src="${itemImg}" class="report-card-img" alt="Item">
          <div class="report-item-details">
            <div class="report-card-itemline">${itemName}</div>
            <div class="report-card-affinity-gain">
              <img src="${AFFINITY_ICON_URL}" class="affinity-icon" alt="Affinity"> +${item.afiValor} AFFECTION
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

  const nivelCitaRaw = selectedCharaTab1.nivelCita;
  let tieneCita = true;
  let umbralCita = parseInt(nivelCitaRaw, 10);

  if (isNaN(umbralCita)) {
    const texto = String(nivelCitaRaw).toLowerCase();
    if (texto.includes("no") || texto === "") {
      tieneCita = false;
      umbralCita = 0;
    } else {
      umbralCita = 4;
    }
  }

  let afnTramo1 = 0;
  if (tieneCita) {
    for (let i = 0; i <= umbralCita && i < REQUISITOS_NIVEL.length; i++) {
      afnTramo1 += REQUISITOS_NIVEL[i];
    }
  }

  let afnTramo2 = Math.max(0, AFINIDAD_ITEMS_MAX - afnTramo1);

  [1, 2, 3].forEach(idx => {
    const detailsEl = document.getElementById(`p1-details-${idx}`);
    const isDetailsOpen = detailsEl ? detailsEl.open : false;

    const afiBase = selectedCharaTab1['affinity' + idx];
    const costUnit = selectedCharaTab1['itemcost_' + idx];
    
    const container = document.getElementById(`p1-tables-container-${idx}`);
    if (!container) return;

    const usaNube = document.getElementById('p1-nube' + idx) ? document.getElementById('p1-nube' + idx).checked : false;
    const t = translations[currentLang];

    if (!tieneCita) {
      const regalosComprados = usaNube ? 2 : 3;
      const afiRegalosDia = usaNube ? (afiBase * 2 + 400) : (afiBase * 3);
      const diasReq = afiRegalosDia > 0 ? Math.ceil(AFINIDAD_ITEMS_MAX / afiRegalosDia) : 0;
      let cantRegalos = diasReq * regalosComprados;
      
      let afiTotalGenerada = diasReq * afiRegalosDia;
      if (afiTotalGenerada - AFINIDAD_ITEMS_MAX >= afiBase && (diasReq > 0)) {
        cantRegalos -= 1;
      }

      const costoTotal = cantRegalos * costUnit;
      const nubesTotalesUsadas = usaNube ? diasReq : 0;

      container.innerHTML = `
        <div class="metric-row"><span class="metric-label">${t.affinityLabel}</span><span class="metric-value">${afiBase} <img src="${AFFINITY_ICON_URL}" class="affinity-icon" alt="Afinidad"></span></div>
        <div class="metric-row"><span class="metric-label">${t.precioUnidad}</span><span class="metric-value">${costUnit.toLocaleString('en-US')} <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons"></span></div>
        <div class="toggle-container-nube" onclick="toggleCardCheckbox('p1-nube${idx}', event)">
          <span>${t.usarNube}</span>
          <input type="checkbox" id="p1-nube${idx}" ${usaNube ? 'checked' : ''} onchange="syncNubes(${idx}, this.checked)" onclick="event.stopPropagation()">
        </div>
        <div style="background-color: rgba(239, 68, 68, 0.15); border: 1px solid #fecaca; color: #ef4444; padding: 8px; border-radius: 6px; font-size: 11px; text-align: center; margin-top: 8px; font-weight: bold;">
          ${t.sinCitaMsg}
        </div>
        <div class="highlight-box">
          <div class="metric-row"><span class="metric-label">${t.diasFaltantes}</span><span class="metric-value">${diasReq}</span></div>
          ${usaNube ? `<div class="metric-row"><span class="metric-label">${t.nubesUsar}</span><span class="metric-value">${nubesTotalesUsadas}</span></div>` : ''}
          <div class="metric-row"><span class="metric-label">${t.cantRegalos}</span><span class="metric-value">${cantRegalos}</span></div>
          <div class="metric-row total-cost-row"><span class="metric-label">${t.costoTotalFons}</span><span class="metric-value">${costoTotal.toLocaleString('en-US')} <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons"></span></div>
        </div>
      `;
      return;
    }

    const checkboxCita = document.getElementById(`p1-cita${idx}`);
    const cuentaCita = checkboxCita && checkboxCita.checked && !checkboxCita.disabled;

    const regalosCompradosT1 = usaNube ? 2 : 3;
    const afiRegalosDiaT1 = usaNube ? (afiBase * 2 + 400) : (afiBase * 3);
    const diasTramo1 = afiRegalosDiaT1 > 0 ? Math.ceil(afnTramo1 / afiRegalosDiaT1) : 0;
    let cantRegalosT1 = diasTramo1 * regalosCompradosT1;
    let afiGenT1 = diasTramo1 * afiRegalosDiaT1;
    if (afiGenT1 - afnTramo1 >= afiBase && diasTramo1 > 0) {
      cantRegalosT1 -= 1;
    }
    const fonsTramo1 = cantRegalosT1 * costUnit;

    const regalosCompradosT2 = usaNube ? 2 : 3; 
    const afiRegalosDiaT2 = usaNube ? (afiBase * 2 + 400) : (afiBase * 3);
    const afiCitaDia = cuentaCita ? 200 : 0;
    const afiTotalDiaT2 = afiRegalosDiaT2 + afiCitaDia;
    
    let diasTramo2 = 0;
    let cantRegalosT2 = 0;
    let fonsTramo2 = 0;
    if (afnTramo2 > 0) {
      diasTramo2 = afiTotalDiaT2 > 0 ? Math.ceil(afnTramo2 / afiTotalDiaT2) : 0;
      cantRegalosT2 = diasTramo2 * regalosCompradosT2;
      let afiGenT2 = diasTramo2 * afiTotalDiaT2;
      if (afiGenT2 - afnTramo2 >= afiBase && diasTramo2 > 0) {
        cantRegalosT2 -= 1;
      }
      fonsTramo2 = cantRegalosT2 * costUnit;
    }

    const diasReq = diasTramo1 + diasTramo2;
    const cantRegalos = cantRegalosT1 + cantRegalosT2;
    const costoTotal = fonsTramo1 + fonsTramo2;
    const nubesTotalesUsadas = usaNube ? diasReq : 0;
    const verDetallesTexto = currentLang === 'en' ? 'View tier details' : 'Ver detalles por tramos';

    container.innerHTML = `
      <div class="metric-row"><span class="metric-label">${t.affinityLabel}</span><span class="metric-value">${afiBase} <img src="${AFFINITY_ICON_URL}" class="affinity-icon" alt="Afinidad"></span></div>
      <div class="metric-row"><span class="metric-label">${t.precioUnidad}</span><span class="metric-value">${costUnit.toLocaleString('en-US')} <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons"></span></div>
      
      <div class="toggle-container" onclick="toggleCardCheckbox('p1-cita${idx}', event)">
        <span>${t.contarCita}</span>
        <input type="checkbox" id="p1-cita${idx}" ${cuentaCita ? 'checked' : ''} onchange="syncCitas(${idx}, this.checked)" onclick="event.stopPropagation()">
      </div>
      <div class="toggle-container-nube" onclick="toggleCardCheckbox('p1-nube${idx}', event)">
        <span>${t.usarNube}</span>
        <input type="checkbox" id="p1-nube${idx}" ${usaNube ? 'checked' : ''} onchange="syncNubes(${idx}, this.checked)" onclick="event.stopPropagation()">
      </div>

      <div class="highlight-box">
        <div class="metric-row"><span class="metric-label">${t.diasFaltantes}</span><span class="metric-value">${diasReq}</span></div>
        ${usaNube ? `<div class="metric-row"><span class="metric-label">${t.nubesUsar}</span><span class="metric-value">${nubesTotalesUsadas}</span></div>` : ''}
        <div class="metric-row"><span class="metric-label">${t.cantRegalos}</span><span class="metric-value">${cantRegalos}</span></div>
        <div class="metric-row total-cost-row"><span class="metric-label">${t.costoTotalFons}</span><span class="metric-value">${costoTotal.toLocaleString('en-US')} <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons"></span></div>
      </div>

      <details class="details-accordion" id="p1-details-${idx}" ${isDetailsOpen ? 'open' : ''}>
        <summary>${verDetallesTexto}</summary>
        <div class="accordion-content">
          <table class="excel-table">
            <tr><th colspan="2">${currentLang === 'en' ? 'Affection details level 0 to ' + umbralCita : 'Detalles de afinidad nivel 0 a ' + umbralCita}</th></tr>
            <tr><td>${currentLang === 'en' ? 'Affection required:' : 'Afinidad necesaria:'}</td><td style="text-align:right;">${afnTramo1.toLocaleString('en-US')}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Daily 400 gifts:' : 'Regalos de 400 diario:'}</td><td style="text-align:right;">${regalosCompradosT1}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Fluffy Cotton?' : '¿Regalo por nube?'}</td><td style="text-align:right;">${usaNube ? 1 : 0}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Gifts cost (day):' : 'Costo de regalos (día):'}</td><td style="text-align:right;">${(regalosCompradosT1 * costUnit).toLocaleString('en-US')}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Fons spent in ' + diasTramo1 + ' days:' : 'Total gastado en ' + diasTramo1 + ' días:'}</td><td style="text-align:right;">${fonsTramo1.toLocaleString('en-US')}</td></tr>
          </table>

          <table class="excel-table" style="margin-top: 6px;">
            <tr><th colspan="2">${currentLang === 'en' ? 'Affection details level ' + umbralCita + ' to 10' : 'Detalles de afinidad nivel ' + umbralCita + ' al 10'}</th></tr>
            <tr><td>${currentLang === 'en' ? 'Daily 400 gifts:' : 'Regalos de 400 diario:'}</td><td style="text-align:right;">${regalosCompradosT2}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Fluffy Cotton?' : '¿Regalo por nube?'}</td><td style="text-align:right;">${usaNube ? 1 : 0}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Gifts cost (day):' : 'Costo de regalos (día):'}</td><td style="text-align:right;">${(regalosCompradosT2 * costUnit).toLocaleString('en-US')}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Total spent in ' + diasTramo2 + ' days:' : 'Total gastado en ' + diasTramo2 + ' días:'}</td><td style="text-align:right;">${fonsTramo2.toLocaleString('en-US')}</td></tr>
          </table>

          <table class="excel-table" style="margin-top: 6px;">
            <tr><td>${currentLang === 'en' ? 'Daily affection (gifts):' : 'Afinidad por día (regalos):'}</td><td style="text-align:right;">${afiRegalosDiaT2}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Include date?' : '¿Contar cita?:'}</td><td style="text-align:right;">${afiCitaDia}</td></tr>
            <tr><td>${currentLang === 'en' ? 'Total daily affection:' : 'Afinidad total por día:'}</td><td style="text-align:right; font-weight:bold;">${afiTotalDiaT2}</td></tr>
          </table>
        </div>
      </details>
    `;
  });
}

function calcularNivelYRestante(puntosTotales) {
  if (puntosTotales <= 0) return { nivel: 0, sobra: 0 };
  if (puntosTotales >= AFINIDAD_MAX) return { nivel: 9, sobra: 0 };

  let nivelEncontrado = 0;
  for (let i = 0; i < ACUMULADO_HASTA_NIVEL.length - 1; i++) {
    if (puntosTotales >= ACUMULADO_HASTA_NIVEL[i] && puntosTotales < ACUMULADO_HASTA_NIVEL[i+1]) {
      nivelEncontrado = i;
      break;
    }
  }
  const baseNivelActual = ACUMULADO_HASTA_NIVEL[nivelEncontrado] || 0;
  const sobra = puntosTotales - baseNivelActual;
  return { nivel: nivelEncontrado, sobra: sobra };
}

function recalculateTab2() {
  if (!selectedCharaTab2) return;

  validarRestriccionCitaTab2();

  const modoSimulacion = document.getElementById('p2-modo-simulacion').checked;
  const nivelSelect = document.getElementById('p2-nivel');
  const afiActualInput = document.getElementById('p2-afiactual');

  nivelSelect.disabled = modoSimulacion;
  afiActualInput.disabled = modoSimulacion;

  const qtyCartas = Number(document.getElementById('p2-cartas-qty').value) || 0;
  const qtyBoletos = Number(document.getElementById('p2-boletos-qty').value) || 0;
  const afiExtraRegalos = (qtyCartas * 2000) + (qtyBoletos * 400);

  let afiAcumulada = 0;

  if (modoSimulacion) {
    afiAcumulada = afiExtraRegalos;
    if (afiAcumulada > AFINIDAD_MAX) afiAcumulada = AFINIDAD_MAX;

    const resultadoSimulado = calcularNivelYRestante(afiAcumulada);
    nivelSelect.value = resultadoSimulado.nivel;
    const maxPermitido = ACUMULADO_HASTA_NIVEL[resultadoSimulado.nivel + 1] ? (ACUMULADO_HASTA_NIVEL[resultadoSimulado.nivel + 1] - ACUMULADO_HASTA_NIVEL[resultadoSimulado.nivel]) : 0;
    let sobraFinal = resultadoSimulado.sobra;
    if (sobraFinal > maxPermitido && maxPermitido > 0) sobraFinal = maxPermitido;
    afiActualInput.value = sobraFinal.toLocaleString('en-US');
  } else {
    const nivelSel = Number(nivelSelect.value) || 0;
    const rawAfiInput = afiActualInput.value.replace(/,/g, '');
    const afiIngresada = Number(rawAfiInput) || 0;

    const afiBaseNivel = ACUMULADO_HASTA_NIVEL[nivelSel] || 0;
    afiAcumulada = afiBaseNivel + afiIngresada + afiExtraRegalos;
    if (afiAcumulada > AFINIDAD_MAX) afiAcumulada = AFINIDAD_MAX;
  }

  const porcentaje = Math.min(100, Math.max(0, (afiAcumulada / AFINIDAD_MAX) * 100));
  const sparkbar = document.getElementById('sparkline-bar');
  sparkbar.style.width = porcentaje + '%';
  sparkbar.style.backgroundColor = porcentaje < 30 ? '#ef4444' : (porcentaje < 70 ? '#f59e0b' : '#10b981');
  document.getElementById('p2-progress-text').innerText = `${afiAcumulada.toLocaleString('en-US')} / ${AFINIDAD_MAX.toLocaleString('en-US')}`;

  const afiFaltanteGeneral = Math.max(0, AFINIDAD_MAX - afiAcumulada);
  document.getElementById('p2-necesita').value = afiFaltanteGeneral.toLocaleString('en-US');

  const nivelCitaRaw = selectedCharaTab2.nivelCita;
  let tieneCita = true;
  let umbralCita = parseInt(nivelCitaRaw, 10);

  if (isNaN(umbralCita)) {
    const texto = String(nivelCitaRaw).toLowerCase();
    if (texto.includes("no") || texto === "") {
      tieneCita = false;
      umbralCita = 0;
    } else {
      umbralCita = 4;
    }
  }

  let afnTramo1Meta = 0;
  if (tieneCita) {
    for (let i = 0; i <= umbralCita && i < REQUISITOS_NIVEL.length; i++) {
      afnTramo1Meta += REQUISITOS_NIVEL[i];
    }
  }

  [1, 2, 3].forEach(idx => {
    const afiBase = selectedCharaTab2['affinity' + idx];
    const costUnit = selectedCharaTab2['itemcost_' + idx];
    const usaNube = document.getElementById('p2-nube' + idx).checked;

    const checkboxCita = document.getElementById(`p2-cita${idx}`);
    const cuentaCita = checkboxCita && checkboxCita.checked && !checkboxCita.disabled;

    let diasReq = 0;
    let cantRegalos = 0;
    let costoTotal = 0;

    if (!tieneCita) {
      const afiFaltanteItems = Math.max(0, AFINIDAD_ITEMS_MAX - afiAcumulada);
      const regalosComprados = usaNube ? 2 : 3;
      const afiRegalosDia = usaNube ? (afiBase * 2 + 400) : (afiBase * 3);
      diasReq = afiRegalosDia > 0 ? Math.ceil(afiFaltanteItems / afiRegalosDia) : 0;
      cantRegalos = diasReq * regalosComprados;
      let afiTotalGenerada = diasReq * afiRegalosDia;
      if (afiTotalGenerada - afiFaltanteItems >= afiBase && diasReq > 0) {
        cantRegalos -= 1;
      }
      costoTotal = cantRegalos * costUnit;
    } else {
      let afnFaltanteTramo1 = Math.max(0, afnTramo1Meta - afiAcumulada);
      let afiAcumuladaDespuesTramo1 = Math.max(afnTramo1Meta, afiAcumulada);
      let afnFaltanteTramo2 = Math.max(0, AFINIDAD_ITEMS_MAX - afiAcumuladaDespuesTramo1);

      let diasT1 = 0, cantT1 = 0, fonsT1 = 0;
      if (afnFaltanteTramo1 > 0) {
        const regalosCompradosT1 = usaNube ? 2 : 3;
        const afiRegalosDiaT1 = usaNube ? (afiBase * 2 + 400) : (afiBase * 3);
        diasT1 = afiRegalosDiaT1 > 0 ? Math.ceil(afnFaltanteTramo1 / afiRegalosDiaT1) : 0;
        cantT1 = diasT1 * regalosCompradosT1;
        let afiGenT1 = diasT1 * afiRegalosDiaT1;
        if (afiGenT1 - afnFaltanteTramo1 >= afiBase && diasT1 > 0) {
          cantT1 -= 1;
        }
        fonsT1 = cantT1 * costUnit;
      }

      let diasT2 = 0, cantT2 = 0, fonsT2 = 0;
      if (afnFaltanteTramo2 > 0) {
        const regalosCompradosT2 = usaNube ? 2 : 3;
        const afiRegalosDiaT2 = usaNube ? (afiBase * 2 + 400) : (afiBase * 3);
        const afiCitaDia = cuentaCita ? 200 : 0;
        const afiTotalDiaT2 = afiRegalosDiaT2 + afiCitaDia;

        diasT2 = afiTotalDiaT2 > 0 ? Math.ceil(afnFaltanteTramo2 / afiTotalDiaT2) : 0;
        cantT2 = diasT2 * regalosCompradosT2;
        let afiGenT2 = diasT2 * afiTotalDiaT2;
        if (afiGenT2 - afnFaltanteTramo2 >= afiBase && diasT2 > 0) {
          cantT2 -= 1;
        }
        fonsT2 = cantT2 * costUnit;
      }

      diasReq = diasT1 + diasT2;
      cantRegalos = cantT1 + cantT2;
      costoTotal = fonsT1 + fonsT2;
    }

    const nubesTotalesUsadas = usaNube ? diasReq : 0;

    document.getElementById(`p2-afi${idx}-head`).innerHTML = `${afiBase} <img src="${AFFINITY_ICON_URL}" class="affinity-icon" alt="Afinidad">`;
    document.getElementById(`p2-cant${idx}`).innerText = cantRegalos;
    document.getElementById(`p2-dias${idx}`).innerText = diasReq;
    document.getElementById(`p2-cost${idx}`).innerHTML = costUnit.toLocaleString('en-US') + ` <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons">`;
    document.getElementById(`p2-costototal${idx}`).innerHTML = costoTotal.toLocaleString('en-US') + ` <img src="${FONS_ICON_URL}" class="fons-icon" alt="Fons">`;
    document.getElementById(`p2-nubesusadas${idx}`).innerText = nubesTotalesUsadas;
  });
}

function recalculate() {
  recalculateTab1();
  recalculateTab2();
}