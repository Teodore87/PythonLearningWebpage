/**
 * PyLearn - Resources View Component
 * 
 * Visar externa länkar och boktips i ett snyggt rutnät.
 */

import { resources } from '../data/content/resources.js';
import { t } from '../i18n.js';

export default class ResourcesView {
    render() {
        const container = document.createElement('div');
        container.className = 'lesson-wrapper';

        // Header
        const header = document.createElement('div');
        header.className = 'lesson-card';
        header.style.borderTop = '5px solid var(--accent-secondary)';
        header.innerHTML = `
            <h1 style="color: var(--accent-secondary); margin-bottom: 0;">📚 ${t('nav.resources') || 'Resurser & Boktips'}</h1>
            <p style="margin-top: var(--spacing-sm); color: var(--text-muted);">
                Här har vi samlat de bästa externa källorna för att fördjupa dina kunskaper i Python. 
                Alla dessa är gratis att läsa online och rekommenderas varmt av communityn.
            </p>
        `;
        container.appendChild(header);

        // Grid för resurser
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        grid.style.gap = 'var(--spacing-lg)';
        grid.style.marginTop = 'var(--spacing-xl)';

        resources.forEach(res => {
            const card = document.createElement('div');
            card.className = 'lesson-card';
            card.style.height = '100%';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.cursor = 'pointer';
            card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            card.style.margin = '0'; // Ta bort bottenmarginal från lesson-card

            card.onmouseenter = () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 12px 24px rgba(187, 154, 247, 0.15)';
                card.style.borderColor = 'var(--accent-secondary)';
            };
            card.onmouseleave = () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                card.style.borderColor = 'rgba(255, 255, 255, 0.03)';
            };

            card.onclick = () => window.open(res.url, '_blank');

            const tagsHtml = res.tags.map(tag => 
                `<span style="font-size: 0.7rem; background: rgba(187, 154, 247, 0.1); color: var(--accent-secondary); padding: 2px 8px; border-radius: 10px; margin-right: 5px;">${tag}</span>`
            ).join('');

            card.innerHTML = `
                <div style="flex: 1;">
                    <div style="height: 120px; display: flex; align-items: center; justify-content: center; margin-bottom: var(--spacing-md); background: rgba(255,255,255,0.02); border-radius: 8px; overflow: hidden;">
                       <img src="${res.image}" alt="${res.title}" style="max-height: 100px; max-width: 90%; object-fit: contain;">
                    </div>
                    <h3 style="margin-bottom: var(--spacing-xs);">${res.title}</h3>
                    <div style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-sm);">av ${res.author}</div>
                    <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-main); margin-bottom: var(--spacing-md);">${res.description}</p>
                </div>
                <div style="margin-top: auto;">
                    <div style="margin-bottom: var(--spacing-md);">${tagsHtml}</div>
                    <button class="btn-primary" style="width: 100%; background: var(--accent-secondary); border: none;">Läs Mer ↗</button>
                </div>
            `;
            grid.appendChild(card);
        });

        container.appendChild(grid);

        return container;
    }
}
