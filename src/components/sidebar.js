/**
 * PyLearn - Sidebar Navigation Component
 * 
 * Renderar navigationsmenyn dynamiskt baserat på sections.js
 * och låser sektioner utifrån användarens localStorage-framsteg.
 * Innehåller även språkväxlingsknapp (svenska/engelska).
 */

import { sections } from '../data/sections.js';
import { t, toggleLanguage } from '../i18n.js';

export default class Sidebar {
    constructor(storage, router) {
        this.storage = storage;
        this.router = router;
        this.container = document.getElementById('section-nav');

        // Lyssna på hash-ändringar för att markera aktiv flik
        window.addEventListener('hashchange', () => this.render());

        this.render();
    }

    render() {
        if (!this.container) return;

        // Rensa tidigare navigering
        this.container.innerHTML = '';

        const currentHash = window.location.hash || '#home';

        sections.forEach(section => {
            const isUnlocked = this.storage.isSectionUnlocked(section.id);

            // Bygg behållare för sektionen
            const sectionGroup = document.createElement('div');
            sectionGroup.className = 'nav-section-group';
            sectionGroup.style.marginBottom = 'var(--spacing-md)';

            // Huvudlänk för sektionen
            const sectionLink = document.createElement('a');
            sectionLink.href = isUnlocked ? `#section/${section.id}` : '#';
            sectionLink.className = `nav-item ${isUnlocked ? '' : 'locked'}`;

            // Kolla om vi är inne på denna sektion och dess underlektioner
            const isCurrentSection = currentHash.startsWith(`#section/${section.id}`);
            if (isCurrentSection) {
                sectionLink.classList.add('active');
                sectionLink.style.paddingBottom = '0.25rem'; // tightare om underlektioner ska visas
            }

            // Ikon för låst/upplåst status
            const icon = isUnlocked ? '📖' : '🔒';
            sectionLink.innerHTML = `<strong>${icon} ${t('nav.section')} ${section.id}:</strong> ${section.title}`;

            if (!isUnlocked) {
                sectionLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Ge en visuell återkoppling att den är låst (t.ex. skaka eller visa tooltips)
                    sectionLink.style.transform = 'translateX(5px)';
                    setTimeout(() => sectionLink.style.transform = 'none', 100);
                });
            }

            sectionGroup.appendChild(sectionLink);

            // Om sektionen är upplåst OCH aktiv öppnar vi trädvyn med lektioner
            if (isUnlocked && isCurrentSection) {
                const lessonsList = document.createElement('div');
                lessonsList.className = 'lessons-list';
                lessonsList.style.paddingLeft = 'var(--spacing-xl)';
                lessonsList.style.fontSize = '0.9rem';

                section.lessons.forEach(lesson => {
                    const lessonLink = document.createElement('a');
                    lessonLink.href = `#section/${section.id}/lesson/${lesson.id}`;

                    const isCurrentLesson = currentHash === `#section/${section.id}/lesson/${lesson.id}`;
                    lessonLink.className = `nav-item ${isCurrentLesson ? 'active' : ''}`;
                    lessonLink.style.padding = '0.2rem var(--spacing-md)';
                    lessonLink.style.borderLeft = isCurrentLesson ? '2px solid var(--accent-primary)' : '2px solid transparent';

                    // Lägg till bock för avklarade lektioner
                    const checks = this.storage.isLessonComplete(section.id, lesson.id) ? ' <span style="color:var(--accent-success)">✓</span>' : '';
                    lessonLink.innerHTML = `${lesson.id}. ${lesson.title}${checks}`;

                    lessonsList.appendChild(lessonLink);
                });

                // Lägg till sektionsprovet längst ner
                const testLink = document.createElement('a');
                testLink.href = `#section/${section.id}/test`;
                const isCurrentTest = currentHash === `#section/${section.id}/test`;
                testLink.className = `nav-item ${isCurrentTest ? 'active' : ''}`;
                testLink.style.padding = '0.4rem var(--spacing-md)';
                testLink.style.marginTop = '0.5rem';
                testLink.style.borderLeft = isCurrentTest ? '2px solid var(--accent-secondary)' : '2px solid transparent';
                testLink.style.color = 'var(--accent-secondary)';
                testLink.innerHTML = `<strong>${t('nav.sectionTest')}</strong>`;
                lessonsList.appendChild(testLink);

                sectionGroup.appendChild(lessonsList);
            }

            this.container.appendChild(sectionGroup);
        });

        // Lägg till resurslänk längst ner
        const resourcesGroup = document.createElement('div');
        resourcesGroup.style.marginTop = 'var(--spacing-lg)';
        resourcesGroup.style.paddingTop = 'var(--spacing-md)';
        resourcesGroup.style.borderTop = '1px solid rgba(255,255,255,0.05)';

        const resourcesLink = document.createElement('a');
        resourcesLink.href = '#resources';
        const isResourcesActive = currentHash === '#resources';
        resourcesLink.className = `nav-item ${isResourcesActive ? 'active' : ''}`;
        resourcesLink.innerHTML = `<strong>📚 ${t('resources.title')}</strong>`;
        resourcesGroup.appendChild(resourcesLink);

        this.container.appendChild(resourcesGroup);

        // Lägg till språkväxlingsknapp längst ner
        const langGroup = document.createElement('div');
        langGroup.style.padding = 'var(--spacing-md) var(--spacing-lg)';
        langGroup.style.marginTop = 'var(--spacing-sm)';

        const langBtn = document.createElement('button');
        langBtn.className = 'lang-switcher-btn';
        langBtn.textContent = t('lang.switch');
        langBtn.style.width = '100%';
        langBtn.style.padding = '0.5rem';
        langBtn.style.fontSize = '0.85rem';
        langBtn.style.background = 'rgba(255,255,255,0.05)';
        langBtn.style.border = '1px solid rgba(255,255,255,0.1)';
        langBtn.style.borderRadius = 'var(--border-radius-sm)';
        langBtn.style.color = 'var(--text-muted)';
        langBtn.style.cursor = 'pointer';
        langBtn.style.transition = 'all 0.2s ease';

        langBtn.addEventListener('mouseenter', () => {
            langBtn.style.background = 'rgba(255,255,255,0.1)';
            langBtn.style.color = 'var(--text-heading)';
        });
        langBtn.addEventListener('mouseleave', () => {
            langBtn.style.background = 'rgba(255,255,255,0.05)';
            langBtn.style.color = 'var(--text-muted)';
        });

        langBtn.addEventListener('click', () => {
            toggleLanguage();
            // Rendera om sidebar + aktiv route för att applicera det nya språket
            this.render();
            this.router.handleRoute();
        });

        langGroup.appendChild(langBtn);
        this.container.appendChild(langGroup);
    }
}
