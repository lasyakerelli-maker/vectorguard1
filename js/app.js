/**
 * VectorGuard - Master Application Controller
 * Minimalist, Bryan Johnson-inspired monochromatic interface.
 */

class VectorGuardApp {
  constructor() {
    this.currentLat = 17.4239;
    this.currentLng = 78.4738;
    this.currentLocationName = 'Telangana Central (Hyderabad)';
    this.hasRequestedLocation = false;
  }

  async init() {
    console.log('Initializing VectorGuard Platform...');

    // 1. Immediately request location upfront
    this.requestLocationUpfront();

    // 2. Setup interactive offering toggle listeners
    this.bindInteractiveOfferings();

    // 3. Populate Telangana district fallbacks
    this.populatePresets();

    // 4. Update grievance pre-filled details
    this.updateGrievanceText();
  }

  requestLocationUpfront() {
    const statusEl = document.getElementById('upfront-location-status');
    const triggerBtn = document.getElementById('btn-request-location');

    if (statusEl) {
      statusEl.innerText = 'Requesting browser location permission...';
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          this.currentLat = pos.coords.latitude;
          this.currentLng = pos.coords.longitude;
          this.currentLocationName = 'Your Live Detected Location';
          this.hasRequestedLocation = true;

          if (statusEl) {
            statusEl.innerHTML = `&bull; Live GPS Connected: <strong class="text-white">${this.currentLat.toFixed(4)}&deg;N, ${this.currentLng.toFixed(4)}&deg;E</strong>`;
          }
          if (triggerBtn) {
            triggerBtn.innerText = 'GPS Synchronized';
            triggerBtn.classList.add('opacity-75');
          }

          await this.analyzeCurrentLocation();
        },
        async (err) => {
          console.warn('Geolocation denied or timed out:', err.message);
          if (statusEl) {
            statusEl.innerHTML = '&bull; Location access not granted. Showing <strong>Hyderabad / Telangana Central</strong>. Select district or click "Detect GPS"';
          }
          // Default to Central Hyderabad
          await this.analyzeCurrentLocation();
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      if (statusEl) {
        statusEl.innerText = 'Geolocation not supported by browser. Using Telangana baseline.';
      }
      this.analyzeCurrentLocation();
    }
  }

  async analyzeCurrentLocation() {
    // 1. Fetch live Open-Meteo weather
    const weather = await window.vectorRiskEngine.fetchLiveWeather(this.currentLat, this.currentLng);

    // 2. Find nearby water bodies
    const nearbyWaterBodies = VectorRiskEngine.getNearbyWaterBodies(this.currentLat, this.currentLng, 4);

    // 3. Compute Risk Score
    const risk = window.vectorRiskEngine.computeRiskScore(weather, nearbyWaterBodies);

    // 4. Render minimal, monochromatic risk details
    this.renderRiskDetails(weather, risk, nearbyWaterBodies);

    // 5. Initialize or update Leaflet map if container exists
    if (window.vectorMapEngine) {
      if (!window.vectorMapEngine.map) {
        window.vectorMapEngine.initMap('vector-map');
      }
      window.vectorMapEngine.updateUserLocation(this.currentLat, this.currentLng, risk);
    }

    // 6. Update Grievance Dispatch text
    this.updateGrievanceText(risk);
  }

  renderRiskDetails(weather, risk, waterBodies) {
    const riskScoreEl = document.getElementById('risk-score-val');
    const riskLevelEl = document.getElementById('risk-level-val');
    const tempEl = document.getElementById('weather-temp-val');
    const humEl = document.getElementById('weather-hum-val');
    const rainEl = document.getElementById('weather-rain-val');
    const waterbodyEl = document.getElementById('nearest-waterbody-val');
    const treatmentEl = document.getElementById('targeted-treatment-val');
    const waterbodyListEl = document.getElementById('interactive-waterbodies-list');

    if (riskScoreEl) riskScoreEl.innerText = `${risk.score}/100`;
    if (riskLevelEl) {
      riskLevelEl.innerHTML = `<span class="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest ${risk.level === 'HIGH' ? 'bg-white text-[#0f1626]' : 'bg-[#2c3a59] text-white'}">${risk.level} RISK</span>`;
    }

    // Also update top bar and overview card badge
    const topRiskBadge = document.getElementById('top-risk-badge');
    if (topRiskBadge) {
      topRiskBadge.innerHTML = `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${risk.level === 'HIGH' ? 'bg-white text-[#0f1626]' : 'bg-[#2c3a59] text-white'}"><span class="w-1.5 h-1.5 rounded-full ${risk.level === 'HIGH' ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}"></span>${risk.level} RISK</span>`;
    }

    const cardRiskBadge = document.getElementById('card-risk-badge');
    if (cardRiskBadge) {
      cardRiskBadge.innerHTML = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${risk.level === 'HIGH' ? 'bg-white text-[#0f1626]' : 'bg-[#2c3a59] text-white'}"><span class="w-2 h-2 rounded-full ${risk.level === 'HIGH' ? 'bg-red-500 animate-pulse' : 'bg-emerald-400'}"></span>Current Status: ${risk.level} RISK</span>`;
    }

    if (tempEl) tempEl.innerText = `${weather.temperature}°C`;
    if (humEl) humEl.innerText = `${weather.humidity}%`;
    if (rainEl) rainEl.innerText = `${weather.precipitation} mm`;

    const nearest = waterBodies && waterBodies.length > 0 ? waterBodies[0] : null;
    if (waterbodyEl) {
      waterbodyEl.innerText = nearest ? `${nearest.name} (${nearest.distanceKm} km away)` : 'Local Urban Catchment Basin';
    }

    if (treatmentEl) {
      treatmentEl.innerHTML = nearest ? `
        <div class="space-y-1 text-sm text-[#8b9bb4]">
          <p><strong class="text-white">Identified Site:</strong> ${nearest.name} &bull; ${nearest.surfaceCondition}</p>
          <p><strong class="text-white">What Needs To Be Treated:</strong> ${nearest.recommendedBiotechAction}</p>
          <p><strong class="text-white">Physical Intervention:</strong> ${nearest.physicalRemediation}</p>
        </div>
      ` : '<p class="text-sm text-[#8b9bb4]">Routine household source reduction and container clearance.</p>';
    }

    if (waterbodyListEl && waterBodies) {
      waterbodyListEl.innerHTML = waterBodies.map(wb => `
        <div class="border-b border-[#2c3a59] pb-3 mb-3 last:border-0 last:mb-0 flex items-start justify-between gap-4">
          <div>
            <div class="font-bold text-white text-sm">${wb.name}</div>
            <div class="text-xs text-[#8b9bb4]">${wb.region} &bull; ${wb.distanceKm} km away</div>
            <div class="text-xs text-[#8b9bb4] mt-1"><strong class="text-white">Remediation:</strong> ${wb.recommendedBiotechAction}</div>
          </div>
          <button onclick="window.vectorGuardApp.fillGrievanceFor('${wb.name}')" class="text-xs text-white underline hover:opacity-80 whitespace-nowrap pt-1">
            Report Site &rarr;
          </button>
        </div>
      `).join('');
    }
  }

  bindInteractiveOfferings() {
    const tabRisk = document.getElementById('tab-risk');
    const tabIssue = document.getElementById('tab-issue');
    const panelRisk = document.getElementById('panel-risk-details');
    const panelIssue = document.getElementById('panel-issue-details');

    if (tabRisk && panelRisk) {
      tabRisk.addEventListener('click', () => {
        panelRisk.classList.toggle('hidden');
        if (!panelRisk.classList.contains('hidden')) {
          panelRisk.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.vectorMapEngine && window.vectorMapEngine.map) {
            setTimeout(() => window.vectorMapEngine.map.invalidateSize(), 300);
          }
        }
      });
    }

    if (tabIssue && panelIssue) {
      tabIssue.addEventListener('click', () => {
        panelIssue.classList.toggle('hidden');
        if (!panelIssue.classList.contains('hidden')) {
          panelIssue.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  }

  populatePresets() {
    const select = document.getElementById('preset-district-select');
    if (!select) return;

    select.innerHTML = `
      <option value="" disabled selected>-- Select a Location / Hotspot --</option>
      ${TELANGANA_DATA.telanganaPresets.map((p, idx) => `
        <option value="${idx}">${p.name}</option>
      `).join('')}
    `;

    select.addEventListener('change', (e) => {
      const idx = parseInt(e.target.value, 10);
      const preset = TELANGANA_DATA.telanganaPresets[idx];
      if (preset) {
        this.currentLat = preset.lat;
        this.currentLng = preset.lng;
        this.currentLocationName = preset.name;
        
        const statusEl = document.getElementById('upfront-location-status');
        if (statusEl) {
          statusEl.innerHTML = `&bull; Selected: <strong class="text-white">${preset.name}</strong> (${preset.lat.toFixed(4)}&deg;N, ${preset.lng.toFixed(4)}&deg;E)`;
        }

        this.analyzeCurrentLocation();
      }
    });
  }

  fillGrievanceFor(siteName) {
    const panelIssue = document.getElementById('panel-issue-details');
    if (panelIssue) {
      panelIssue.classList.remove('hidden');
      panelIssue.scrollIntoView({ behavior: 'smooth' });
    }
    const remarksInput = document.getElementById('grievance-notes-input');
    if (remarksInput) {
      remarksInput.value = `Severe mosquito breeding and stagnant water observed at ${siteName}. Immediate municipal inspection and biological larvicide treatment requested.`;
      this.updateGrievanceText();
    }
  }

  updateGrievanceText(risk = null) {
    const outputEl = document.getElementById('generated-grievance-text');
    if (!outputEl) return;

    const notesInput = document.getElementById('grievance-notes-input');
    const notes = notesInput && notesInput.value.trim() ? notesInput.value.trim() : 'Severe vector breeding and standing water observed in public area. Requires urgent municipal inspection and anti-larval treatment.';

    const riskScore = risk ? `${risk.score}/100 (${risk.level})` : 'Active Microclimate Surge';
    const time = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    outputEl.innerText = `TELANGANA MUNICIPAL SERVICES GRIEVANCE
Direct Link: https://municipalservices.in/complaint_form.php?id=259
Timestamp: ${time}
Location Coordinates: ${this.currentLat.toFixed(4)}°N, ${this.currentLng.toFixed(4)}°E (${this.currentLocationName})
AI Vector Risk Level: ${riskScore}

Details of Issue:
${notes}

Action Requested:
1. Immediate field inspection by Municipal Corporation / Ward Sanitation team.
2. Deployment of Bti microbial larvicide or mechanical drainage clearance.
3. Official resolution notification.

Submitted via VectorGuard Platform (SIH 2026)`;
  }

  copyGrievanceDispatch() {
    const outputEl = document.getElementById('generated-grievance-text');
    if (!outputEl) return;

    navigator.clipboard.writeText(outputEl.innerText).then(() => {
      alert('Grievance text copied to clipboard. You can now paste it directly into the Municipal Services complaint form.');
    }).catch(() => {
      alert('Could not copy automatically. Please select and copy the text manually.');
    });
  }
}

window.vectorGuardApp = new VectorGuardApp();
document.addEventListener('DOMContentLoaded', () => {
  window.vectorGuardApp.init();
});
