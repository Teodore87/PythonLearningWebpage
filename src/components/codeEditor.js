/**
 * PyLearn - Code Editor Exercise Component
 * 
 * Ett jättesimpelt gränssnitt för att låta användaren "skriva kod".
 * Eftersom vi inte kör en riktig Python-tolk i webbläsaren (som Pyodide)
 * validerar vi koden genom snabba sträng-/Regex-kontroller baserat på `expectedTokens` 
 * eller `expectedOutput`.
 */

import { t } from '../i18n.js';

export default class CodeEditorExercise {
    /**
     * Renderar en enkel kodeditorövning.
     * @param {Object} data { question, setupCode, expectedTokens, expectedText }
     * @param {Function} onComplete 
     */
    static render(data, onComplete = null) {
        const container = document.createElement('div');
        container.className = 'exercise-container code-editor-exercise';

        const questionEl = document.createElement('h3');
        questionEl.textContent = data.question;
        container.appendChild(questionEl);

        if (data.context) {
            const p = document.createElement('p');
            p.innerHTML = data.context;
            p.style.fontSize = '0.9rem';
            p.style.color = 'var(--text-muted)';
            container.appendChild(p);
        }

        // Editor-textarea
        const editorWrapper = document.createElement('div');
        editorWrapper.style.position = 'relative';
        editorWrapper.style.marginTop = 'var(--spacing-md)';

        const textarea = document.createElement('textarea');
        textarea.className = 'code-input';
        textarea.value = data.setupCode || '';
        textarea.spellcheck = false;

        // Editor Styling
        textarea.style.width = '100%';
        textarea.style.minHeight = '150px';
        textarea.style.backgroundColor = '#11121d';
        textarea.style.color = '#c0caf5';
        textarea.style.fontFamily = 'var(--font-mono)';
        textarea.style.fontSize = '1rem';
        textarea.style.padding = 'var(--spacing-md)';
        textarea.style.border = '1px solid rgba(255,255,255,0.1)';
        textarea.style.borderRadius = 'var(--border-radius-sm)';
        textarea.style.resize = 'vertical';
        textarea.style.outline = 'none';

        textarea.addEventListener('focus', () => textarea.style.borderColor = 'var(--accent-primary)');
        textarea.addEventListener('blur', () => textarea.style.borderColor = 'rgba(255,255,255,0.1)');

        // Stöd för Tab-knappen i textarea
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                textarea.value = textarea.value.substring(0, start) + "    " + textarea.value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 4;
            }
        });

        editorWrapper.appendChild(textarea);
        container.appendChild(editorWrapper);

        // KONTROLL-KNAPP OCH FEEDBACK
        const btnSection = document.createElement('div');
        btnSection.style.display = 'flex';
        btnSection.style.alignItems = 'center';
        btnSection.style.gap = 'var(--spacing-md)';
        btnSection.style.marginTop = 'var(--spacing-md)';

        const runBtn = document.createElement('button');
        runBtn.className = 'btn-primary';
        runBtn.innerHTML = t('exercise.checkCode');

        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'feedback-message';
        feedbackEl.style.flex = '1';
        feedbackEl.style.margin = '0'; // Ta bort default margin-top

        runBtn.addEventListener('click', () => {
            const code = textarea.value.trim();
            let isCorrect = true;
            let errorMsg = t('exercise.missing');

            // Valideringslogik
            if (!code) {
                isCorrect = false;
                errorMsg = t('exercise.writeCode');
            } else if (data.expectedTokens && data.expectedTokens.length > 0) {
                // Kolla så att strängen innehåller specifika tokens
                for (const token of data.expectedTokens) {
                    if (!code.includes(token)) {
                        isCorrect = false;
                        errorMsg = `${t('exercise.missing')} <code>${token}</code>`;
                        break;
                    }
                }
            } else if (data.customValidator) {
                // Gör det möjligt att skicka in en eval-funktion i framtiden
                isCorrect = data.customValidator(code);
            }

            if (isCorrect) {
                textarea.style.borderColor = 'var(--accent-success)';
                feedbackEl.className = 'feedback-message success';
                feedbackEl.innerHTML = `<strong>${t('exercise.correct')}</strong> ${data.successMsg || t('exercise.goodCode')}`;
                feedbackEl.style.display = 'block';
                if (onComplete) onComplete(true);
            } else {
                textarea.style.borderColor = 'var(--accent-error)';
                feedbackEl.className = 'feedback-message error';
                feedbackEl.innerHTML = `<strong>${t('exercise.wrong')}</strong> ${errorMsg}`;
                feedbackEl.style.display = 'block';

                // Mikro-animation på knappen för att indikera fel
                runBtn.style.transform = 'translate(-4px, 0)';
                setTimeout(() => runBtn.style.transform = 'translate(4px, 0)', 100);
                setTimeout(() => runBtn.style.transform = 'translate(0, 0)', 200);
            }
        });

        btnSection.appendChild(runBtn);
        btnSection.appendChild(feedbackEl);
        container.appendChild(btnSection);

        return container;
    }
}
