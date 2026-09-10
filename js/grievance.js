/**
 * VectorGuard - Telangana Municipal Grievance & Civic Escalation Desk
 * Connects citizens directly to GHMC, Prajavani, and C&DMA systems.
 */

class VectorGrievanceEngine {
  constructor() {
    this.selectedWaterBody = null;
    this.currentLocation = { lat: 17.4239, lng: 78.4738, name: 'Central Hyderabad' };
  }

  init() {
    this.renderPortalCards();
    this.renderCategoryOptions();
    this.bindEvents();
    this.updatePreview();
  }

  renderPortalCards() {
    const container = document.getElementById('official-portals-list');
    if (!container) return;

    container.innerHTML = TELANGANA_DATA.grievancePortals.map(p => `
      <div class="border-b border-stone-200 pb-4 mb-4 last:border-0">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h4 class="font-serif font-bold text-stone-900 text-base mb-1">
              <a href="${p.url}" target="_blank" rel="noopener" class="text-blue-900 hover:underline inline-flex items-center gap-1">
                ${p.name}
                <svg class="w-3.5 h-3.5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </h4>
            <p class="text-xs text-stone-600 leading-relaxed mb-2">${p.description}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
          <span><strong>Helpline:</strong> <a href="tel:${p.helpline.replace(/[^0-9]/g, '')}" class="text-stone-800 font-mono hover:underline">${p.helpline}</a></span>
          <span><strong>Jurisdiction:</strong> ${p.coverage}</span>
          <span><strong>Target SLA:</strong> ${p.avgResolutionHours}</span>
        </div>
      </div>
    `).join('');
  }

  renderCategoryOptions() {
    const select = document.getElementById('grievance-category');
    if (!select) return;

    select.innerHTML = TELANGANA_DATA.grievanceCategories.map((c, i) => `
      <option value="${c.id}" ${i === 0 ? 'selected' : ''}>${c.label} (${c.dept})</option>
    `).join('');
  }

  bindEvents() {
    const categorySelect = document.getElementById('grievance-category');
    const citizenNotes = document.getElementById('grievance-notes');
    const citizenWard = document.getElementById('grievance-ward');
    const citizenName = document.getElementById('grievance-name');
    const citizenPhone = document.getElementById('grievance-phone');

    [categorySelect, citizenNotes, citizenWard, citizenName, citizenPhone].forEach(el => {
      if (el) el.addEventListener('input', () => this.updatePreview());
    });
  }

  openGrievanceForWaterBody(wbId) {
    const wb = TELANGANA_DATA.waterBodies.find(w => w.id === wbId);
    if (!wb) return;

    this.selectedWaterBody = wb;

    // Set form fields
    const catSelect = document.getElementById('grievance-category');
    if (catSelect) catSelect.value = 'cat-mosquito-infestation';

    const wardInput = document.getElementById('grievance-ward');
    if (wardInput) wardInput.value = `${wb.name}, ${wb.region} (${wb.jurisdiction})`;

    const notesInput = document.getElementById('grievance-notes');
    if (notesInput) {
      notesInput.value = `Critical vector breeding observed at ${wb.name}. Surface status: ${wb.surfaceCondition}. Immediate bio-larvicide spraying (${wb.recommendedBiotechAction}) and anti-larval measures requested.`;
    }

    this.updatePreview();

    // Scroll smoothly to grievance desk
    const deskSection = document.getElementById('grievance-section');
    if (deskSection) {
      deskSection.scrollIntoView({ behavior: 'smooth' });
      deskSection.classList.add('ring-2', 'ring-blue-800', 'transition-all', 'duration-500');
      setTimeout(() => {
        deskSection.classList.remove('ring-2', 'ring-blue-800');
      }, 2000);
    }
  }

  generateFormattedText() {
    const categoryId = document.getElementById('grievance-category')?.value;
    const cat = TELANGANA_DATA.grievanceCategories.find(c => c.id === categoryId) || TELANGANA_DATA.grievanceCategories[0];
    const ward = document.getElementById('grievance-ward')?.value.trim() || 'Telangana Urban Municipal Ward';
    const notes = document.getElementById('grievance-notes')?.value.trim() || cat.defaultDescription;
    const citizenName = document.getElementById('grievance-name')?.value.trim() || 'Concerned Resident';
    const citizenPhone = document.getElementById('grievance-phone')?.value.trim() || 'Not Disclosed';

    const risk = window.vectorRiskEngine?.currentRiskAnalysis;
    const riskLevel = risk ? `${risk.level} (Risk Index: ${risk.score}/100)` : 'Elevated Surveillance';
    const tempHum = risk?.weather ? `${risk.weather.temperature}°C, ${risk.weather.humidity}% RH` : 'Live Telemetry Active';
    const nearbyWb = risk?.nearestWaterBody ? `${risk.nearestWaterBody.name} (${risk.nearestWaterBody.distanceKm} km)` : 'Local Catchment Basin';

    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    return `================================================
TELANGANA CIVIC & VECTOR GRIEVANCE DISPATCH
Smart India Hackathon 2026 | VectorGuard Platform
================================================
Timestamp: ${timestamp}
Responsible Wing: ${cat.dept}
Expected SLA: ${cat.sla}

GRIEVANCE CATEGORY:
${cat.label}

LOCALITY & JURISDICTION:
Location/Ward: ${ward}
Coordinates: ${this.currentLocation.lat.toFixed(4)}°N, ${this.currentLocation.lng.toFixed(4)}°E
Nearest Water Body: ${nearbyWb}

SCIENTIFIC RISK ASSESSMENT (VECTORGUARD AI ENGINE):
Breeding Vulnerability: ${riskLevel}
Environmental Telemetry: ${tempHum}

DETAILS OF GRIEVANCE / ACTION REQUIRED:
${notes}

REQUESTED ESCALATION:
1. Urgent on-ground inspection by Municipal Entomology/Sanitation Unit.
2. Deployment of Bti microbial larvicide or mechanical de-weeding as appropriate.
3. Written resolution acknowledgment to applicant.

COMPLAINANT DETAILS:
Name: ${citizenName}
Contact: ${citizenPhone}
Platform: VectorGuard (SIH 2026 Problem Statement SIH26200)
================================================`;
  }

  updatePreview() {
    const previewEl = document.getElementById('grievance-preview-text');
    if (previewEl) {
      previewEl.innerText = this.generateFormattedText();
    }
  }

  copyGrievance() {
    const text = this.generateFormattedText();
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('Grievance report copied to clipboard. Ready to paste into Prajavani or GHMC portal.');
    }).catch(err => {
      console.error(err);
      this.showToast('Could not copy automatically. Please select text manually.');
    });
  }

  sendViaWhatsApp() {
    const text = this.generateFormattedText();
    // GHMC WhatsApp grievance number or official municipal desk format
    const phone = '918008888000'; // Official GHMC grievance WhatsApp line
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    window.open(url, '_blank');
  }

  openOfficialPortal() {
    // Open Prajavani or GHMC portal
    window.open('https://prajavani.telangana.gov.in/', '_blank');
  }

  showToast(message) {
    let toast = document.getElementById('vg-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'vg-toast';
      toast.className = 'fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-5 py-3 rounded shadow-2xl text-xs font-sans max-w-sm transition-all duration-300 transform translate-y-10 opacity-0 border-l-4 border-emerald-500';
      document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.remove('translate-y-10', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
    }, 4000);
  }
}

// Global instance
window.vectorGrievanceEngine = new VectorGrievanceEngine();
