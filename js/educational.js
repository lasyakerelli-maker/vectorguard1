/**
 * VectorGuard - Dedicated Educational Knowledge Base & Creators Note
 * Clean editorial article reader matching GOV.UK / UK Health Security Agency format.
 */

class VectorEducationalEngine {
  constructor() {
    this.articles = TELANGANA_DATA.educationalArticles;
    this.creatorsNote = TELANGANA_DATA.creatorsNote;
    this.currentArticle = null;
  }

  init() {
    this.renderTopicDirectory();
    this.renderCreatorsNote();
    this.bindSearch();
  }

  renderTopicDirectory(filtered = null) {
    const container = document.getElementById('educational-topics-list');
    if (!container) return;

    const list = filtered || this.articles;

    if (list.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-stone-500 font-sans border border-dashed border-stone-300">
          <p class="text-sm">No vector science or prevention topics matched your query.</p>
          <button onclick="window.vectorEducationalEngine.renderTopicDirectory()" class="mt-2 text-xs text-blue-800 underline font-semibold">
            Reset search and view all topics
          </button>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(art => `
      <article class="border-b border-stone-200 pb-6 mb-6 last:border-0">
        <div class="flex items-center gap-3 text-xs text-stone-500 mb-1.5 font-sans">
          <span class="font-bold text-blue-900 tracking-wide uppercase text-[11px]">${art.category}</span>
          <span>&bull;</span>
          <span>${art.readTime}</span>
        </div>

        <h3 class="font-serif text-xl font-bold text-stone-900 leading-tight mb-2 hover:text-blue-900 transition cursor-pointer" onclick="window.vectorEducationalEngine.openArticle('${art.id}')">
          ${art.title}
        </h3>

        <p class="text-stone-600 text-sm leading-relaxed mb-3">
          ${art.excerpt}
        </p>

        <div class="flex items-center justify-between">
          <button onclick="window.vectorEducationalEngine.openArticle('${art.id}')" class="inline-flex items-center text-xs font-bold text-stone-900 hover:text-blue-900 underline underline-offset-4 gap-1">
            Read full scientific guide
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <span class="text-[11px] text-stone-400 font-sans">${art.publishedDate}</span>
        </div>
      </article>
    `).join('');
  }

  bindSearch() {
    const searchInput = document.getElementById('educational-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        this.renderTopicDirectory();
        return;
      }

      const filtered = this.articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      );

      this.renderTopicDirectory(filtered);
    });
  }

  openArticle(articleId) {
    const article = this.articles.find(a => a.id === articleId);
    if (!article) return;

    this.currentArticle = article;

    const modal = document.getElementById('article-modal');
    const modalContent = document.getElementById('article-modal-body');
    if (!modal || !modalContent) return;

    // Convert simple markdown headings and lists to HTML
    let formattedBody = article.content
      .replace(/### (.*)/g, '<h4 class="font-serif text-lg font-bold text-stone-900 mt-6 mb-2">$1</h4>')
      .replace(/---/g, '<hr class="my-4 border-stone-200">')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-stone-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-stone-800">$1</em>')
      .replace(/- (.*)/g, '<li class="ml-4 list-disc text-stone-700 text-sm mb-1 leading-relaxed">$1</li>')
      .split('\n\n')
      .map(p => {
        if (p.trim().startsWith('<h') || p.trim().startsWith('<hr') || p.trim().startsWith('<li')) {
          return p;
        }
        return `<p class="text-stone-700 text-sm leading-relaxed mb-4">${p}</p>`;
      })
      .join('');

    // Action points checklist
    const actionPointsHtml = article.actionPoints && article.actionPoints.length > 0 ? `
      <div class="mt-6 p-4 bg-emerald-50 border-l-4 border-emerald-700">
        <h5 class="font-serif font-bold text-emerald-950 text-sm uppercase tracking-wide mb-2 flex items-center gap-1.5">
          <svg class="w-4 h-4 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Key Action Protocol
        </h5>
        <ul class="space-y-1.5">
          ${article.actionPoints.map(pt => `
            <li class="text-xs text-emerald-900 leading-snug flex items-start gap-2">
              <span class="text-emerald-700 font-bold">&check;</span>
              <span>${pt}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    ` : '';

    modalContent.innerHTML = `
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-stone-500 font-sans mb-4 border-b border-stone-200 pb-3">
        <button onclick="window.vectorEducationalEngine.closeArticle()" class="hover:text-stone-900 underline">Knowledge Hub</button>
        <span>/</span>
        <span class="text-blue-900 font-semibold">${article.category}</span>
      </nav>

      <!-- Header Title & Metadata -->
      <header class="mb-6">
        <span class="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-900 mb-1">${article.category}</span>
        <h2 class="font-serif text-2xl md:text-3xl font-bold text-stone-900 leading-tight mb-3">
          ${article.title}
        </h2>
        
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500 border-y border-stone-200 py-2.5">
          <span><strong>Published by:</strong> ${article.author}</span>
          <span>&bull;</span>
          <span><strong>Date:</strong> ${article.publishedDate}</span>
          <span>&bull;</span>
          <span><strong>Reading Duration:</strong> ${article.readTime}</span>
        </div>
      </header>

      <!-- Main Article Text -->
      <div class="prose max-w-none text-stone-800">
        ${formattedBody}
        ${actionPointsHtml}
      </div>

      <!-- Footer Navigation -->
      <div class="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
        <button onclick="window.vectorEducationalEngine.closeArticle()" class="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition">
          &larr; Back to Knowledge Hub
        </button>
        <button onclick="window.print()" class="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-sans">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print this Guide
        </button>
      </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeArticle() {
    const modal = document.getElementById('article-modal');
    if (modal) modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  renderCreatorsNote() {
    const container = document.getElementById('creators-note-container');
    if (!container) return;

    const note = this.creatorsNote;

    container.innerHTML = `
      <div class="border-t-4 border-blue-900 pt-6 mt-12 bg-white">
        <!-- Official Banner Header -->
        <div class="mb-4">
          <span class="text-xs font-bold uppercase tracking-wider text-blue-900">Official Submission & Team Mission</span>
          <h2 class="font-serif text-2xl md:text-3xl font-bold text-stone-900 mt-1 mb-2">Note from the Creators</h2>
          <p class="text-xs text-stone-500 font-sans">
            <strong>${note.teamName}</strong> &bull; ${note.hackathon} &bull; Problem Statement: <strong>${note.problemStatementId}</strong> (${note.theme})
          </p>
        </div>

        <!-- Editorial Mottos Callout -->
        <div class="bg-blue-50/70 border-l-4 border-blue-900 p-4 mb-6">
          <div class="font-serif italic text-lg text-blue-950 font-bold uppercase tracking-wide">
            &ldquo;${note.motto}&rdquo;
          </div>
          <div class="text-sm font-sans font-semibold text-blue-900 mt-1">
            ${note.subMotto}
          </div>
        </div>

        <!-- Paragraphs -->
        <div class="space-y-4 text-stone-700 text-sm leading-relaxed">
          ${note.paragraphs.map(p => `
            <p>${p.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900">$1</strong>').replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')}</p>
          `).join('')}
        </div>

        <!-- Core Mission Pillars -->
        <div class="mt-8 pt-6 border-t border-stone-200">
          <h4 class="font-serif font-bold text-base text-stone-900 mb-4">Core Pillars of VectorGuard</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${note.missionValues.map(v => `
              <div class="border-l-2 border-stone-300 pl-3">
                <h5 class="font-serif font-bold text-sm text-stone-900 mb-1">${v.title}</h5>
                <p class="text-xs text-stone-600 leading-relaxed">${v.description}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Signoff -->
        <div class="mt-8 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <div>
            <strong>Team VectorGuard</strong> &bull; Smart India Hackathon 2026<br>
            <span class="text-stone-400">MedTech / BioTech / HealthTech Category</span>
          </div>
          <div class="inline-flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded font-mono text-[11px] text-stone-700">
            <span>Verified SIH26200</span>
            <span class="text-emerald-600">&bull; Active</span>
          </div>
        </div>
      </div>
    `;
  }
}

// Global instance
window.vectorEducationalEngine = new VectorEducationalEngine();
