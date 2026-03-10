/**
 * PyLearn - Drag and Drop Exercise Component
 * 
 * Tillåter användaren att matcha "termer" (dragbara) med "definitioner" (släppmål).
 * Interaktivt och taktilt för bättre inlärning. Inbyggt med HTML5 Drag and Drop API.
 */

import { t } from '../i18n.js';

export default class DragDropExercise {
    /**
     * Renderar en dra-och-släpp-övning (matcha par).
     * @param {Object} data Övningsdata ({ question, pairs: [{ term, definition }] })
     * @param {Function} onComplete Callback när allt är rätt
     */
    static render(data, onComplete = null) {
        const container = document.createElement('div');
        container.className = 'exercise-container drag-drop-exercise';

        const questionEl = document.createElement('h3');
        questionEl.textContent = data.question;
        container.appendChild(questionEl);

        // För att stilen ska bli snygg och konsekvent, lägg till lite CSS direkt här eller
        // tänk på att det ligger i en generisk exercise-container
        const layout = document.createElement('div');
        layout.style.display = 'flex';
        layout.style.gap = 'var(--spacing-lg)';
        layout.style.marginTop = 'var(--spacing-md)';
        layout.style.flexWrap = 'wrap';

        // 1. Skapa en "bank" med termer som kan dras
        const termBank = document.createElement('div');
        termBank.className = 'term-bank';
        termBank.style.flex = '1';
        termBank.style.minWidth = '250px';
        termBank.style.padding = 'var(--spacing-md)';
        termBank.style.background = 'rgba(0,0,0,0.2)';
        termBank.style.borderRadius = 'var(--border-radius-sm)';
        termBank.innerHTML = `<h4 style="margin-bottom: var(--spacing-sm); color: var(--text-muted); font-size: 0.9em;">${t('dragdrop.dragThese')}</h4>`;

        // 2. Skapa målen (definitionerna)
        const targetArea = document.createElement('div');
        targetArea.className = 'target-area';
        targetArea.style.flex = '2';
        targetArea.style.minWidth = '300px';

        // Blanda termerna så de inte ligger i rätt ordning!
        const shuffledTerms = [...data.pairs].sort(() => Math.random() - 0.5);

        let correctMatches = 0;
        const totalPairs = data.pairs.length;

        // Feedback text
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'feedback-message success';
        feedbackEl.style.display = 'none';
        feedbackEl.innerHTML = `<strong>${t('dragdrop.allCorrect')}</strong> ${t('exercise.goodJob')}`;

        // Sätt upp Drag-API:et
        let draggedElement = null;

        shuffledTerms.forEach((pair, idx) => {
            // Skapa dragbar term
            const termItem = document.createElement('div');
            termItem.className = 'draggable-term option-btn';
            termItem.draggable = true;
            termItem.textContent = pair.term;
            termItem.dataset.matchId = pair.term; // Använd texten som ID
            termItem.style.cursor = 'grab';
            termItem.style.marginBottom = 'var(--spacing-sm)';
            termItem.style.textAlign = 'center';

            // Drag events
            termItem.addEventListener('dragstart', (e) => {
                draggedElement = termItem;
                e.dataTransfer.effectAllowed = 'move';
                // En temporär klass för att visa att den dras
                setTimeout(() => termItem.style.opacity = '0.5', 0);
            });
            termItem.addEventListener('dragend', () => {
                termItem.style.opacity = '1';
                draggedElement = null;
            });

            termBank.appendChild(termItem);
        });

        data.pairs.forEach((pair) => {
            // Skapa dropp-mål
            const targetBox = document.createElement('div');
            targetBox.className = 'drop-target';
            targetBox.style.display = 'flex';
            targetBox.style.alignItems = 'center';
            targetBox.style.marginBottom = 'var(--spacing-md)';
            targetBox.style.background = 'var(--bg-card)';
            targetBox.style.padding = 'var(--spacing-sm)';
            targetBox.style.borderRadius = 'var(--border-radius-sm)';
            targetBox.style.border = '1px solid rgba(255,255,255,0.1)';

            const definitionText = document.createElement('div');
            definitionText.style.flex = '1';
            definitionText.textContent = pair.definition;

            const dropSlot = document.createElement('div');
            dropSlot.className = 'drop-slot';
            dropSlot.dataset.matchId = pair.term; // Rätt svar
            dropSlot.style.width = '150px';
            dropSlot.style.minHeight = '40px';
            dropSlot.style.border = '2px dashed rgba(255,255,255,0.2)';
            dropSlot.style.borderRadius = '4px';
            dropSlot.style.marginLeft = 'var(--spacing-md)';
            dropSlot.style.display = 'flex';
            dropSlot.style.alignItems = 'center';
            dropSlot.style.justifyContent = 'center';
            dropSlot.style.transition = 'all 0.2s ease';

            // Drop events
            dropSlot.addEventListener('dragover', (e) => {
                e.preventDefault(); // Nödvändigt anrop för att tillåta drop
                e.dataTransfer.dropEffect = 'move';
                dropSlot.style.borderColor = 'var(--accent-primary)';
                dropSlot.style.background = 'rgba(122, 162, 247, 0.1)';
            });

            dropSlot.addEventListener('dragleave', () => {
                dropSlot.style.borderColor = 'rgba(255,255,255,0.2)';
                dropSlot.style.background = 'transparent';
            });

            dropSlot.addEventListener('drop', (e) => {
                e.preventDefault();
                dropSlot.style.borderColor = 'rgba(255,255,255,0.2)';
                dropSlot.style.background = 'transparent';

                if (!draggedElement) return;

                // Kontrollera om det är rätt term
                const droppedId = draggedElement.dataset.matchId;
                const targetId = dropSlot.dataset.matchId;

                if (droppedId === targetId) {
                    // Rätt!
                    dropSlot.appendChild(draggedElement);
                    // Ta bort draggable efter lyckat drop
                    draggedElement.draggable = false;
                    draggedElement.style.margin = '0';
                    draggedElement.style.border = 'none';
                    draggedElement.style.background = 'rgba(158, 206, 106, 0.2)';
                    draggedElement.style.color = 'var(--accent-success)';
                    draggedElement.style.cursor = 'default';

                    dropSlot.style.border = '1px solid var(--accent-success)';

                    correctMatches++;
                    if (correctMatches === totalPairs) {
                        feedbackEl.style.display = 'block';
                        if (onComplete) onComplete(true);
                    }
                } else {
                    // Fel! Visualisera misstaget med en snabb animation, lämna termen kvar i banken
                    dropSlot.style.borderColor = 'var(--accent-error)';
                    dropSlot.style.background = 'rgba(247, 118, 142, 0.1)';
                    setTimeout(() => {
                        dropSlot.style.borderColor = 'rgba(255,255,255,0.2)';
                        dropSlot.style.background = 'transparent';
                    }, 400);
                }
            });

            targetBox.appendChild(definitionText);
            targetBox.appendChild(dropSlot);
            targetArea.appendChild(targetBox);
        });

        layout.appendChild(termBank);
        layout.appendChild(targetArea);

        container.appendChild(layout);
        container.appendChild(feedbackEl);

        return container;
    }
}
