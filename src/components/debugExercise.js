/**
 * PyLearn - Debugging Exercise Component
 * 
 * Visar en kodsnutt med ett eller flera avsiktliga fel.
 * Användaren presenteras med alternativ på vad felet är och hur det ska åtgärdas.
 * Särskilt bra för att träna upp förmågan att läsa felmeddelanden (Exceptions).
 */

import { t } from '../i18n.js';

export default class DebugExercise {
    /**
     * Renderar en felsökningsövning (debug).
     * @param {Object} data { question, brokenCode, errorOutput, options, correctIndex, explanation }
     * @param {Function} onComplete 
     */
    static render(data, onComplete = null) {
        const container = document.createElement('div');
        container.className = 'exercise-container debug-exercise';
        container.style.borderColor = 'var(--accent-warning)'; // Använd en varningsfärg (gul/orange)

        // Label
        const label = document.createElement('div');
        label.style.position = 'absolute';
        label.style.top = '-12px';
        label.style.left = '20px';
        label.style.background = 'var(--bg-main)';
        label.style.padding = '0 10px';
        label.style.color = 'var(--accent-warning)';
        label.style.fontSize = '0.8rem';
        label.style.fontWeight = '800';
        label.style.letterSpacing = '1px';
        label.textContent = t('debug.label');
        container.appendChild(label);

        const questionEl = document.createElement('h3');
        questionEl.textContent = data.question;
        questionEl.style.marginBottom = 'var(--spacing-md)';
        container.appendChild(questionEl);

        // Trasig kod block
        const pre = document.createElement('pre');
        pre.className = 'code-block';
        pre.style.borderLeft = '3px solid var(--accent-error)'; // Markera att koden är felaktig

        const code = document.createElement('code');
        code.innerHTML = data.brokenCode; // Kan innehålla <span> med färg om manuellt formaterat i datafilen
        pre.appendChild(code);
        container.appendChild(pre);

        // Felets utdata (console error emulering) - ibland visar terminalen i Python röda felmeddelanden
        if (data.errorOutput) {
            const errorPre = document.createElement('pre');
            errorPre.style.background = 'rgba(247, 118, 142, 0.1)';
            errorPre.style.color = 'var(--accent-error)';
            errorPre.style.padding = 'var(--spacing-sm) var(--spacing-md)';
            errorPre.style.borderRadius = 'var(--border-radius-sm)';
            errorPre.style.fontFamily = 'var(--font-mono)';
            errorPre.style.fontSize = '0.85rem';
            errorPre.style.marginBottom = 'var(--spacing-lg)';
            errorPre.textContent = data.errorOutput;
            container.appendChild(errorPre);
        }

        const instrEl = document.createElement('p');
        instrEl.textContent = t('debug.fixPrompt');
        instrEl.style.fontWeight = '600';
        container.appendChild(instrEl);

        // Alternativ-lista (samma UI som MultipleChoice men specifik logik/styling)
        const optionsList = document.createElement('div');
        optionsList.className = 'options-list';

        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'feedback-message';

        let isAnsweredCorrectly = false;

        data.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<code style="background:transparent; padding:0; font-size:1em;">${option}</code>`;

            btn.addEventListener('click', () => {
                if (isAnsweredCorrectly) return;

                Array.from(optionsList.children).forEach(child => {
                    child.classList.remove('correct', 'wrong');
                });

                if (index === data.correctIndex) {
                    btn.classList.add('correct');
                    feedbackEl.className = 'feedback-message success';
                    feedbackEl.innerHTML = `<strong>${t('debug.bugFixed')}</strong> ${data.explanation || ''}`;
                    isAnsweredCorrectly = true;

                    if (onComplete) onComplete(true);
                } else {
                    btn.classList.add('wrong');
                    feedbackEl.className = 'feedback-message error';
                    feedbackEl.innerHTML = `<strong>${t('debug.stillWrong')}</strong> ${t('exercise.tryAgain')}`;
                }
            });
            optionsList.appendChild(btn);
        });

        container.appendChild(optionsList);
        container.appendChild(feedbackEl);

        return container;
    }
}
