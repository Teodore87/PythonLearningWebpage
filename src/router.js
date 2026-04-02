import LessonRenderer from './components/lesson.js';
import SectionTest from './components/sectionTest.js';
import ResourcesView from './components/resourcesView.js';
import { getSectionMetadata, getLessonMetadata, getLessonContent, getSectionTest } from './data/provider.js';
import { t } from './i18n.js';

/**
 * PyLearn - Router (Navigeringshanterare)
 * 
 * Hanterar hash-baserad navigering (t.ex. #section/1/lesson/2).
 * Detta gör att vi kan bygga en Single Page Application utan en server.
 * Den tittar på URL:en och bestämmer vilket innehåll som ska ritas ut i .content-area.
 */

export default class Router {
  constructor(storage) {
    this.storage = storage;
    this.contentArea = document.getElementById('content-area');
    this.lessonRenderer = new LessonRenderer(this, storage);

    // Lyssna på när URL:ens hash ändras (när användaren klickar på länkar eller backar i webbläsaren)
    window.addEventListener('hashchange', () => this.handleRoute());

    // Kör hanteraren direkt vid start för att visa rätt sida
    this.handleRoute();
  }

  /**
   * Hanterar routing-logiken baserat på aktuell hash
   */
  async handleRoute() {
    const hash = window.location.hash || '#home';

    // Rensa nuvarande innehåll
    this.contentArea.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-muted);">${t('loading')}</div>`;

    // Rulla upp till toppen av sidan vid nytt sidbyte
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      if (hash === '#home') {
        this.renderHome();
      } else if (hash === '#resources') {
        this.renderResources();
      } else if (hash.startsWith('#section/')) {
        // Förväntat format: #section/1/lesson/2 eller #section/1/test
        const parts = hash.split('/');
        const sectionId = parseInt(parts[1], 10);

        // --- SÄKERHETSKONTROLL: Är sektionen upplåst? ---
        if (!this.storage.isSectionUnlocked(sectionId)) {
          this.renderLocked(sectionId);
          return;
        }

        const type = parts[2]; // 'lesson' eller 'test' eller undefined (visar introduktion för section)

        if (type === 'test') {
          this.renderTest(sectionId);
        } else if (type === 'lesson') {
          const lessonId = parseInt(parts[3], 10);
          this.renderLesson(sectionId, lessonId);
        } else {
          this.renderSectionIntro(sectionId);
        }
      } else {
        this.renderNotFound();
      }
    } catch (error) {
      console.error("Kunde inte ladda routen:", error);
      this.contentArea.innerHTML = `<div class="feedback-message error">${t('error.loadFailed')}</div>`;
    }
  }

  // --- RENDERING METODER ---

  renderHome() {
    this.contentArea.innerHTML = `
      <div class="lesson-card" style="text-align: center; padding: var(--spacing-xl);">
        <h1 style="color: var(--accent-primary); font-size: 3.5rem; margin-bottom: 0;">${t('home.title')}</h1>
        <h2 style="font-weight: 300; font-size: 1.5rem; color: var(--text-muted); margin-bottom: var(--spacing-xl);">${t('home.subtitle')}</h2>
        <p style="margin: 0 auto var(--spacing-xl) auto; max-width: 600px;">
          ${t('home.description')}
        </p>
        <div style="display: flex; justify-content: center; gap: var(--spacing-md); flex-wrap: wrap;">
          <a href="#section/1" class="btn-primary" style="padding: 1.2rem 2.5rem; border-radius: 8px; font-weight: bold; font-size: 1.2rem; box-shadow: 0 10px 25px rgba(122, 162, 247, 0.4);">
            ${t('home.startBtn')}
          </a>
          <a href="#resources" class="option-btn" style="display: inline-block; width: auto; padding: 1.2rem 2.5rem; border-radius: 8px; font-size: 1.1rem; text-align: center;">
            📚 ${t('resources.title')}
          </a>
        </div>
      </div>
    `;
  }

  renderLocked(sectionId) {
    this.contentArea.innerHTML = `
      <div class="lesson-card" style="text-align: center; border-color: var(--accent-error);">
        <h2 style="color: var(--accent-error);">${t('locked.title')}</h2>
        <p>${t('locked.msg', { prev: sectionId - 1, current: sectionId })}</p>
        <a href="#section/${sectionId - 1}/test" class="btn-primary" style="background: var(--accent-error); margin-top: var(--spacing-md);">${t('locked.goToTest')}</a>
      </div>
    `;
  }

  renderSectionIntro(sectionId) {
    const section = getSectionMetadata(sectionId);
    if (!section) return this.renderNotFound();

    this.contentArea.innerHTML = `
      <div class="lesson-card" style="animation: slideUp 0.4s ease;">
        <h1 style="color: var(--accent-primary);">${t('nav.section')} ${section.id}: ${section.title}</h1>
        <p style="font-size: 1.2rem; color: var(--text-muted);">${section.description}</p>
        
        <h3 style="margin-top: var(--spacing-xl);">${t('sectionIntro.content')}</h3>
        <ol style="margin-top: var(--spacing-sm); margin-bottom: var(--spacing-xl); padding-left: var(--spacing-lg); color: var(--text-main);">
          ${section.lessons.map(l => `<li style="margin-bottom: 0.5rem; font-size: 1.1rem;">${l.title}</li>`).join('')}
        </ol>
        
        <div class="lesson-navigation">
          <a href="#section/${section.id}/lesson/1" class="btn-primary" style="padding: 1rem 2rem; border-radius: 6px; font-size: 1.1rem;">
            ${t('sectionIntro.startBtn')}
          </a>
        </div>
      </div>
    `;
  }

  renderLesson(sectionId, lessonId) {
    const section = getSectionMetadata(sectionId);
    const lesson = getLessonMetadata(sectionId, lessonId);
    const contentBlocks = getLessonContent(sectionId, lessonId);

    if (!section || !lesson || !contentBlocks) return this.renderNotFound();

    const lessonDOM = this.lessonRenderer.render(section, lesson, contentBlocks);
    this.contentArea.innerHTML = '';
    this.contentArea.appendChild(lessonDOM);
  }

  renderTest(sectionId) {
    const section = getSectionMetadata(sectionId);
    if (!section) return this.renderNotFound();

    const testQuestions = getSectionTest(sectionId);
    const testComponent = new SectionTest(this.storage, section, testQuestions);

    this.contentArea.innerHTML = '';
    this.contentArea.appendChild(testComponent.render());
  }

  renderNotFound() {
    this.contentArea.innerHTML = `
      <div class="lesson-card">
        <h2 style="color: var(--accent-error);">${t('notFound.title')}</h2>
        <p>${t('notFound.msg')}</p>
        <a href="#home" class="option-btn" style="display: inline-block; width: auto; margin-top: var(--spacing-md);">${t('notFound.back')}</a>
      </div>
    `;
  }

  renderResources() {
    const resourcesComponent = new ResourcesView();
    this.contentArea.innerHTML = '';
    this.contentArea.appendChild(resourcesComponent.render());
  }
}
