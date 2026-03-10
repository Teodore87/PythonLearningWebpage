/**
 * PyLearn - Section Test Component
 * 
 * Hanterar det kritiska sektionsprovet där man måste uppnå 90%
 * för att låsa upp nästa sektion i kursplanen.
 */

import { t } from '../i18n.js';

export default class SectionTest {
  constructor(storage, section, questions) {
    this.storage = storage;
    this.section = section;
    this.questions = questions; // Array av frågor
    this.answers = new Array(questions.length).fill(null);
    this.currentQuestionIndex = 0;
    this.testStarted = false;
    this.testFinished = false;
  }

  render() {
    const container = document.createElement('div');
    container.className = 'lesson-wrapper';

    if (!this.testStarted) {
      container.appendChild(this._renderIntro());
    } else if (this.testFinished) {
      container.appendChild(this._renderResults());
    } else {
      container.appendChild(this._renderActiveQuestion());
    }

    return container;
  }

  _renderIntro() {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.style.borderTop = '5px solid var(--accent-secondary)';

    card.innerHTML = `
      <h1 style="color: var(--accent-secondary); margin-bottom: 0;">${t('test.title')} ${this.section.title}</h1>
      <p style="margin-top: var(--spacing-sm); color: var(--text-muted);">
        ${t('test.intro')}
      </p>
      
      <div style="background: rgba(255,255,255,0.05); padding: var(--spacing-lg); border-radius: var(--border-radius-sm); margin: var(--spacing-lg) 0;">
        <ul style="list-style-position: inside; color: var(--text-main);">
          <li>${t('test.questionCount')} <strong>${this.questions.length}</strong></li>
          <li>${t('test.passingGrade')} <strong>90%</strong> (${t('test.minCorrect')} ${Math.ceil(this.questions.length * 0.9)} ${t('test.right')})</li>
          <li>${t('test.retryInfo')}</li>
        </ul>
      </div>
      
      <button id="start-test-btn" class="btn-primary" style="background: var(--accent-secondary); font-size: 1.1rem; padding: 1rem 2rem;">${t('test.startBtn')}</button>
    `;

    // Wait for DOM insertion before adding listener (or delegate)
    setTimeout(() => {
      const btn = document.getElementById('start-test-btn');
      if (btn) btn.onclick = () => {
        this.testStarted = true;
        this._reRender();
      };
    }, 0);

    return card;
  }

  _renderActiveQuestion() {
    const q = this.questions[this.currentQuestionIndex];
    const card = document.createElement('div');
    card.className = 'lesson-card';

    const progressText = `${t('test.questionOf').charAt(0).toUpperCase() + t('test.questionOf').slice(1) === 'Of' ? 'Question' : 'Fråga'} ${this.currentQuestionIndex + 1} ${t('test.questionOf')} ${this.questions.length}`;
    const progressPercent = ((this.currentQuestionIndex) / this.questions.length) * 100;

    // Huvudinnehåll (Fråga och Svarsalternativ)
    let optionsHtml = '';
    q.options.forEach((opt, idx) => {
      const isSelected = this.answers[this.currentQuestionIndex] === idx;
      optionsHtml += `
        <button class="option-btn test-option ${isSelected ? 'selected' : ''}" data-idx="${idx}" style="border-width: 2px; ${isSelected ? 'border-color: var(--accent-secondary); background: rgba(187, 154, 247, 0.1);' : ''}">
          ${opt}
        </button>
      `;
    });

    const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-sm);">
        <span>${progressText}</span>
      </div>
      <div class="progress-bar" style="margin-bottom: var(--spacing-xl);">
        <div class="progress-fill" style="width: ${progressPercent}%; background: var(--accent-secondary);"></div>
      </div>
      
      <h2 style="margin-bottom: var(--spacing-md); line-height: 1.4;">${q.question}</h2>
      
      <div id="options-container">
        ${optionsHtml}
      </div>
      
      <div class="lesson-navigation" style="border-top: none; padding-top: 0;">
        <button id="test-prev-btn" class="option-btn" style="width: auto; visibility: ${this.currentQuestionIndex > 0 ? 'visible' : 'hidden'};">${t('test.prevQuestion')}</button>
        <button id="test-next-btn" class="btn-primary" style="background: var(--accent-secondary);" disabled>
          ${isLastQuestion ? t('test.submit') : t('test.nextQuestion')}
        </button>
      </div>
    `;

    setTimeout(() => {
      // Hantera val
      const options = card.querySelectorAll('.test-option');
      const nextBtn = document.getElementById('test-next-btn');

      // Om man har svarat tidigare, aktivera knappen
      if (this.answers[this.currentQuestionIndex] !== null) {
        nextBtn.disabled = false;
      }

      options.forEach(opt => {
        opt.onclick = (e) => {
          // Rensa visually
          options.forEach(o => {
            o.style.borderColor = 'rgba(255,255,255,0.1)';
            o.style.background = 'var(--bg-surface)';
            o.classList.remove('selected');
          });

          // Markera aktiv
          const target = e.currentTarget;
          target.style.borderColor = 'var(--accent-secondary)';
          target.style.background = 'rgba(187, 154, 247, 0.1)';
          target.classList.add('selected');

          // Spara val
          this.answers[this.currentQuestionIndex] = parseInt(target.getAttribute('data-idx'), 10);
          nextBtn.disabled = false;
        };
      });

      // Hantera nästa/föregående
      const prevBtn = document.getElementById('test-prev-btn');
      if (prevBtn) prevBtn.onclick = () => {
        this.currentQuestionIndex--;
        this._reRender();
      };

      if (nextBtn) nextBtn.onclick = () => {
        if (this.currentQuestionIndex === this.questions.length - 1) {
          this.testFinished = true;
          this._reRender();
        } else {
          this.currentQuestionIndex++;
          this._reRender();
        }
      };
    }, 0);

    return card;
  }

  _renderResults() {
    let correctCount = 0;
    this.answers.forEach((ans, idx) => {
      if (ans === this.questions[idx].correctIndex) correctCount++;
    });

    const percentage = Math.round((correctCount / this.questions.length) * 100);
    const passed = percentage >= 90;

    // SPARA RESULTAT OCH LÅS UPP NÄSTA
    this.storage.saveTestScore(this.section.id, percentage);

    const card = document.createElement('div');
    card.className = 'lesson-card';
    card.style.textAlign = 'center';

    card.innerHTML = `
      <div style="font-size: 4rem; margin-bottom: var(--spacing-sm);">
        ${passed ? '🏆' : '💪'}
      </div>
      <h1 style="color: ${passed ? 'var(--accent-success)' : 'var(--accent-warning)'};">
        ${passed ? t('test.passed') : t('test.almostThere')}
      </h1>
      <p style="font-size: 1.2rem; max-width: 100%;">${t('test.score')} <strong>${percentage}%</strong> (${correctCount} ${t('test.of')} ${this.questions.length} ${t('test.right')}).</p>
      
      <div style="background: rgba(255,255,255,0.05); text-align: left; padding: var(--spacing-lg); border-radius: var(--border-radius-sm); margin: var(--spacing-lg) 0;">
        <h3 style="margin-bottom: var(--spacing-md);">${t('test.yourAnswers')}</h3>
        ${this.questions.map((q, idx) => {
      const isCorrect = this.answers[idx] === q.correctIndex;
      return `
            <div style="margin-bottom: var(--spacing-sm); padding-bottom: var(--spacing-sm); border-bottom: 1px solid rgba(255,255,255,0.05);">
              <div style="color: ${isCorrect ? 'var(--accent-success)' : 'var(--accent-error)'}; font-weight: bold;">
                ${idx + 1}. ${isCorrect ? t('test.correctAnswer') : t('test.wrongAnswer')}
              </div>
              <div style="color: var(--text-muted); font-size: 0.9rem;">${q.question}</div>
            </div>
          `;
    }).join('')}
      </div>
      
      <div style="display: flex; gap: var(--spacing-md); justify-content: center; margin-top: var(--spacing-xl);">
        <button id="retry-btn" class="option-btn" style="width: auto;">${t('test.retry')}</button>
        ${passed ? `<button id="continue-btn" class="btn-primary" style="background: var(--accent-success);">${t('test.continue')}</button>` : ''}
      </div>
    `;

    setTimeout(() => {
      document.getElementById('retry-btn').onclick = () => {
        this.answers = new Array(this.questions.length).fill(null);
        this.currentQuestionIndex = 0;
        this.testFinished = false;
        this.testStarted = false;
        this._reRender();
      };

      if (passed) {
        document.getElementById('continue-btn').onclick = () => {
          // Ladda nästa sektion
          window.location.hash = `#section/${this.section.id + 1}`;
        };
      }
    }, 0);

    return card;
  }

  _reRender() {
    const mountPoint = document.getElementById('content-area');
    mountPoint.innerHTML = '';
    mountPoint.appendChild(this.render());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
