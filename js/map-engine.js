/**
 * VectorGuard - Interactive GIS Hydrology & Vector Map Engine
 * Powered by Leaflet.js with high-contrast editorial styling.
 */

class VectorMapEngine {
  constructor() {
    this.map = null;
    this.userMarker = null;
    this.riskCircle = null;
    this.waterBodyMarkers = [];
    this.currentCoords = [17.4239, 78.4738]; // Default to Hyderabad Central / Hussain Sagar
  }

  initMap(containerId = 'vector-map') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Check if map already initialized
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    // Initialize Leaflet map
    this.map = L.map(containerId, {
      center: this.currentCoords,
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // High-contrast, clean CartoDB Positron tiles for authoritative editorial aesthetic
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    // Render all Telangana water bodies
    this.renderWaterBodies();
  }

  updateUserLocation(lat, lng, riskAnalysis) {
    this.currentCoords = [lat, lng];
    if (!this.map) return;

    // Update map view
    this.map.flyTo([lat, lng], 13, { duration: 1.2 });

    // Remove existing user marker & circle
    if (this.userMarker) this.map.removeLayer(this.userMarker);
    if (this.riskCircle) this.map.removeLayer(this.riskCircle);

    // Create custom Pulse Icon for User Location
    const userIcon = L.divIcon({
      className: 'user-pin-container',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-7 h-7 bg-blue-600 rounded-full animate-ping opacity-60"></div>
          <div class="relative w-5 h-5 bg-blue-800 border-2 border-white rounded-full shadow-lg flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    this.userMarker = L.marker([lat, lng], { icon: userIcon })
      .addTo(this.map)
      .bindPopup(`
        <div class="font-sans p-1 text-stone-800">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-900 border-b pb-1 mb-1">Your Assessed Location</div>
          <p class="text-xs text-stone-600 mb-1"><strong>Coords:</strong> ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E</p>
          <p class="text-xs text-stone-600"><strong>Status:</strong> <span class="font-semibold text-stone-900">${riskAnalysis ? riskAnalysis.label : 'Active'}</span></p>
        </div>
      `);

    // Add Risk Radius Buffer Circle (1.5 km critical vector flight radius)
    const riskColor = riskAnalysis ? riskAnalysis.color : '#1d70b8';
    this.riskCircle = L.circle([lat, lng], {
      color: riskColor,
      fillColor: riskColor,
      fillOpacity: 0.12,
      weight: 2,
      dashArray: '4, 4',
      radius: 1500 // 1.5 km
    }).addTo(this.map);

    this.riskCircle.bindTooltip('1.5 km Vector Active Flight Radius', {
      permanent: false,
      direction: 'top'
    });
  }

  renderWaterBodies() {
    if (!this.map) return;

    // Clear existing markers
    this.waterBodyMarkers.forEach(m => this.map.removeLayer(m));
    this.waterBodyMarkers = [];

    TELANGANA_DATA.waterBodies.forEach(wb => {
      // Risk badge color
      let badgeColor = '#00703c';
      if (wb.vectorBreedingRisk.toLowerCase().includes('high') || wb.vectorBreedingRisk.toLowerCase().includes('critical')) {
        badgeColor = '#d4351c';
      } else if (wb.vectorBreedingRisk.toLowerCase().includes('mod')) {
        badgeColor = '#f47738';
      }

      // Custom SVG Pin for Water Body
      const markerIcon = L.divIcon({
        className: 'waterbody-pin-wrapper',
        html: `
          <div class="w-8 h-8 rounded-full shadow-md flex items-center justify-center border-2 border-white cursor-pointer transition-transform hover:scale-110" style="background-color: ${badgeColor};">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([wb.lat, wb.lng], { icon: markerIcon }).addTo(this.map);

      // Detailed Editorial Popup
      const popupHtml = `
        <div class="font-sans text-stone-900 max-w-xs p-1">
          <div class="flex items-center justify-between border-b pb-1 mb-2">
            <h4 class="font-serif font-bold text-sm text-stone-900 m-0">${wb.name}</h4>
            <span class="text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wide text-white rounded" style="background-color: ${badgeColor}">${wb.vectorBreedingRisk}</span>
          </div>
          <p class="text-xs text-stone-600 mb-1 leading-snug"><strong>Location:</strong> ${wb.region}</p>
          <p class="text-xs text-stone-600 mb-1 leading-snug"><strong>Condition:</strong> ${wb.surfaceCondition}</p>
          
          <div class="bg-stone-50 border-l-2 border-stone-800 p-2 my-2 text-xs">
            <span class="font-bold text-stone-900 block mb-0.5">Biotech Intervention:</span>
            <span class="text-stone-700">${wb.recommendedBiotechAction}</span>
          </div>

          <div class="text-[11px] text-stone-500 mb-2">
            <strong>Jurisdiction:</strong> ${wb.jurisdiction}
          </div>

          <button onclick="window.vectorGrievanceEngine.openGrievanceForWaterBody('${wb.id}')" class="w-full text-xs font-semibold py-1.5 px-2 bg-stone-900 text-white rounded hover:bg-stone-800 transition text-center block">
            File Grievance for this Site &rarr;
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);
      this.waterBodyMarkers.push(marker);
    });
  }

  panToWaterBody(id) {
    const wb = TELANGANA_DATA.waterBodies.find(w => w.id === id);
    if (wb && this.map) {
      this.map.flyTo([wb.lat, wb.lng], 14, { duration: 1 });
      const marker = this.waterBodyMarkers.find(m => {
        const pos = m.getLatLng();
        return Math.abs(pos.lat - wb.lat) < 0.0001 && Math.abs(pos.lng - wb.lng) < 0.0001;
      });
      if (marker) {
        setTimeout(() => marker.openPopup(), 1000);
      }
    }
  }
}

// Global instance
window.vectorMapEngine = new VectorMapEngine();
