/**
 * PyLearn - Lesson Renderer
 * 
 * Hanterar ihopbyggandet av en enskild lektionssida.
 * Tar emot datastruktur (textblock, kodexempel, övningar)
 * och genererar DOM-element för inlärningsgränssnittet.
 */

import Exercise from './exercise.js';
import { t } from '../i18n.js';

export default class LessonRenderer {
    constructor(router, storage) {
        this.router = router;
        this.storage = storage;
    }

    /**
     * Renderar en hel lektion i content-arean
     * @param {Object} section Sektionens metadata
     * @param {Object} lesson Lektionens metadata
     * @param {Array} content Array av content-block (p, code, exercise, etc)
     */
    render(section, lesson, contentBlocks) {
        const container = document.createElement('div');
        container.className = 'lesson-wrapper';

        // Lektionshuvud
        const headerCard = document.createElement('div');
        headerCard.className = 'lesson-card';
        headerCard.innerHTML = `
      <div style="color: var(--text-muted); font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: var(--spacing-sm);">
        ${t('nav.section')} ${section.id}: ${section.title}
      </div>
      <h1 style="color: var(--accent-primary); margin-bottom: 0;">${lesson.id}. ${lesson.title}</h1>
    `;
        container.appendChild(headerCard);

        // Innehåll (dynamiskt genererat)
        const contentCard = document.createElement('div');
        contentCard.className = 'lesson-card';

        contentBlocks.forEach(block => {
            if (block.type === 'text') {
                const p = document.createElement('p');
                p.innerHTML = block.content;
                contentCard.appendChild(p);
            }
            else if (block.type === 'code') {
                const pre = document.createElement('pre');
                pre.className = 'code-block';
                const code = document.createElement('code');
                code.textContent = block.content;
                pre.appendChild(code);
                contentCard.appendChild(pre);
            }
            else if (block.type === 'exercise_mcq') {
                contentCard.appendChild(Exercise.renderMultipleChoice(block.data));
            }
        });

        container.appendChild(contentCard);

        // Navigering i botten
        const navDiv = document.createElement('div');
        navDiv.className = 'lesson-navigation';

        // Hitta index för denna lektion
        const lessonIndex = section.lessons.findIndex(l => l.id === lesson.id);
        const hasNext = lessonIndex < section.lessons.length - 1;
        const hasPrev = lessonIndex > 0;

        // Föregående knapp
        const prevBtn = document.createElement('button');
        prevBtn.textContent = t('lesson.prev');
        if (hasPrev) {
            prevBtn.className = 'option-btn';
            prevBtn.style.width = 'auto';
            prevBtn.onclick = () => window.location.hash = `#section/${section.id}/lesson/${section.lessons[lessonIndex - 1].id}`;
        } else {
            prevBtn.style.visibility = 'hidden';
        }
        navDiv.appendChild(prevBtn);

        // Nästa knapp eller Avsluta (Gå till prov)
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn-primary';

        if (hasNext) {
            nextBtn.textContent = t('lesson.next');
            nextBtn.onclick = () => {
                this.storage.markLessonComplete(section.id, lesson.id);
                window.location.hash = `#section/${section.id}/lesson/${section.lessons[lessonIndex + 1].id}`;
            };
        } else {
            nextBtn.textContent = t('lesson.finishAndTest');
            nextBtn.style.background = 'var(--accent-secondary)';
            nextBtn.onclick = () => {
                this.storage.markLessonComplete(section.id, lesson.id);
                window.location.hash = `#section/${section.id}/test`;
            };
        }
        navDiv.appendChild(nextBtn);

        container.appendChild(navDiv);

        return container;
    }
}
