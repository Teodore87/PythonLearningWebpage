/**
 * PyLearn - Exercise Component
 * 
 * Renderar inline-övningar i slutet av eller inuti lektioner.
 * För tillfället stödjer den "multiple-choice" (flerval) och "fill-in-blank".
 * Anpassad för ADHD med omedelbar, tydlig visuell feedback.
 */

export default class Exercise {
    /**
     * Renderar en flervalsfråga.
     * @param {Object} data Övningens data (fråga, alternativ, rätt svar, förklaring)
     * @param {Function} onComplete Callback när användaren svarar rätt
     */
    static renderMultipleChoice(data, onComplete = null) {
        const container = document.createElement('div');
        container.className = 'exercise-container multiple-choice';

        // Frågetext
        const questionEl = document.createElement('h3');
        questionEl.textContent = data.question;
        questionEl.style.marginBottom = 'var(--spacing-md)';
        container.appendChild(questionEl);

        // Lista med alternativ
        const optionsList = document.createElement('div');
        optionsList.className = 'options-list';

        // Feedback-meddelande
        const feedbackEl = document.createElement('div');
        feedbackEl.className = 'feedback-message';

        let isAnsweredCorrectly = false;

        data.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            // Använd index för jämförelse med correctIndex
            btn.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${option}`;

            btn.addEventListener('click', () => {
                if (isAnsweredCorrectly) return; // Förhindra fler klick om redan rätt

                // Återställ alla knappar först
                Array.from(optionsList.children).forEach(child => {
                    child.classList.remove('correct', 'wrong');
                });

                if (index === data.correctIndex) {
                    btn.classList.add('correct');
                    feedbackEl.className = 'feedback-message success';
                    feedbackEl.innerHTML = `<strong>🟢 Rätt!</strong> ${data.explanation || 'Bra jobbat.'}`;
                    isAnsweredCorrectly = true;

                    if (onComplete) onComplete(true);
                } else {
                    btn.classList.add('wrong');
                    feedbackEl.className = 'feedback-message error';
                    feedbackEl.innerHTML = `<strong>🔴 Fel.</strong> Försök igen.`;

                    // Skakeffekt för felaktigt svar (mikro-animation)
                    btn.style.transform = 'translate(-5px, 0)';
                    setTimeout(() => btn.style.transform = 'translate(5px, 0)', 100);
                    setTimeout(() => btn.style.transform = 'translate(-5px, 0)', 200);
                    setTimeout(() => btn.style.transform = 'translate(0, 0)', 300);
                }
            });

            optionsList.appendChild(btn);
        });

        container.appendChild(optionsList);
        container.appendChild(feedbackEl);

        return container;
    }
}
