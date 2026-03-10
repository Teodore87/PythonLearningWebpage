/**
 * PyLearn - Auth Component
 * 
 * Renderar inloggnings- och registreringsformulär.
 * Kommunicerar med backend API:et (/api/auth).
 */

import { t } from '../i18n.js';

export default class Auth {
    /**
     * Renderar login-formuläret.
     * @param {Function} onSuccess Callback vid lyckad inloggning (user-objekt)
     * @param {Function} onSwitchToRegister Callback för att byta till registrering
     */
    static renderLogin(onSuccess, onSwitchToRegister) {
        const container = document.createElement('div');
        container.className = 'lesson-card';
        container.style.maxWidth = '450px';
        container.style.margin = '0 auto';
        container.style.animation = 'slideUp 0.4s ease';

        container.innerHTML = `
            <h2 style="color: var(--accent-primary); text-align: center; margin-bottom: var(--spacing-lg);">🔑 Logga in</h2>
            
            <form id="login-form" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                <div>
                    <label style="display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-xs);">Användarnamn</label>
                    <input type="text" id="login-username" required autocomplete="username"
                        style="width: 100%; padding: 0.8rem; background: var(--bg-surface); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--border-radius-sm); color: var(--text-heading); font-family: var(--font-sans); font-size: 1rem; outline: none; transition: border-color 0.2s;"
                    />
                </div>
                <div>
                    <label style="display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-xs);">Lösenord</label>
                    <input type="password" id="login-password" required autocomplete="current-password"
                        style="width: 100%; padding: 0.8rem; background: var(--bg-surface); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--border-radius-sm); color: var(--text-heading); font-family: var(--font-sans); font-size: 1rem; outline: none; transition: border-color 0.2s;"
                    />
                </div>
                
                <div id="login-error" style="display: none; color: var(--accent-error); font-size: 0.9rem; padding: 0.5rem; background: rgba(247,118,142,0.1); border-radius: var(--border-radius-sm);"></div>
                
                <button type="submit" class="btn-primary" style="padding: 0.9rem; font-size: 1rem; border-radius: var(--border-radius-sm); margin-top: var(--spacing-sm);">
                    Logga in
                </button>
            </form>
            
            <div style="text-align: center; margin-top: var(--spacing-lg); padding-top: var(--spacing-md); border-top: 1px solid rgba(255,255,255,0.05);">
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">Har du inget konto?</p>
                <button id="switch-to-register" class="option-btn" style="width: auto; display: inline-block;">Skapa konto</button>
            </div>
            
            <div style="text-align: center; margin-top: var(--spacing-md);">
                <a href="#home" id="skip-login-btn" style="color: var(--text-muted); font-size: 0.85rem; opacity: 0.7;">Fortsätt utan konto →</a>
            </div>
        `;

        // Event listeners (deferred to allow DOM insertion)
        setTimeout(() => {
            const form = document.getElementById('login-form');
            const errorEl = document.getElementById('login-error');

            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const username = document.getElementById('login-username').value.trim();
                    const password = document.getElementById('login-password').value;

                    errorEl.style.display = 'none';

                    try {
                        const res = await fetch('/api/auth/login', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({ username, password })
                        });
                        const data = await res.json();

                        if (data.success) {
                            onSuccess(data.user);
                        } else {
                            errorEl.textContent = data.error || 'Inloggningen misslyckades.';
                            errorEl.style.display = 'block';
                        }
                    } catch (err) {
                        errorEl.textContent = 'Kunde inte kontakta servern.';
                        errorEl.style.display = 'block';
                    }
                });
            }

            const switchBtn = document.getElementById('switch-to-register');
            if (switchBtn) {
                switchBtn.addEventListener('click', onSwitchToRegister);
            }
        }, 0);

        return container;
    }

    /**
     * Renderar registreringsformuläret.
     * @param {Function} onSuccess Callback vid lyckad registrering (user-objekt)
     * @param {Function} onSwitchToLogin Callback för att byta till inloggning
     */
    static renderRegister(onSuccess, onSwitchToLogin) {
        const container = document.createElement('div');
        container.className = 'lesson-card';
        container.style.maxWidth = '450px';
        container.style.margin = '0 auto';
        container.style.animation = 'slideUp 0.4s ease';

        container.innerHTML = `
            <h2 style="color: var(--accent-secondary); text-align: center; margin-bottom: var(--spacing-lg);">✨ Skapa konto</h2>
            
            <form id="register-form" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                <div>
                    <label style="display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-xs);">Användarnamn (minst 3 tecken)</label>
                    <input type="text" id="register-username" required minlength="3" autocomplete="username"
                        style="width: 100%; padding: 0.8rem; background: var(--bg-surface); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--border-radius-sm); color: var(--text-heading); font-family: var(--font-sans); font-size: 1rem; outline: none;"
                    />
                </div>
                <div>
                    <label style="display: block; font-size: 0.9rem; color: var(--text-muted); margin-bottom: var(--spacing-xs);">Lösenord (minst 6 tecken)</label>
                    <input type="password" id="register-password" required minlength="6" autocomplete="new-password"
                        style="width: 100%; padding: 0.8rem; background: var(--bg-surface); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--border-radius-sm); color: var(--text-heading); font-family: var(--font-sans); font-size: 1rem; outline: none;"
                    />
                </div>
                
                <div id="register-error" style="display: none; color: var(--accent-error); font-size: 0.9rem; padding: 0.5rem; background: rgba(247,118,142,0.1); border-radius: var(--border-radius-sm);"></div>
                
                <button type="submit" class="btn-primary" style="padding: 0.9rem; font-size: 1rem; border-radius: var(--border-radius-sm); margin-top: var(--spacing-sm); background: var(--accent-secondary);">
                    Skapa konto
                </button>
            </form>
            
            <div style="text-align: center; margin-top: var(--spacing-lg); padding-top: var(--spacing-md); border-top: 1px solid rgba(255,255,255,0.05);">
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: var(--spacing-sm);">Har du redan ett konto?</p>
                <button id="switch-to-login" class="option-btn" style="width: auto; display: inline-block;">Logga in</button>
            </div>
        `;

        setTimeout(() => {
            const form = document.getElementById('register-form');
            const errorEl = document.getElementById('register-error');

            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const username = document.getElementById('register-username').value.trim();
                    const password = document.getElementById('register-password').value;

                    errorEl.style.display = 'none';

                    try {
                        const res = await fetch('/api/auth/register', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({ username, password })
                        });
                        const data = await res.json();

                        if (data.success) {
                            onSuccess(data.user);
                        } else {
                            errorEl.textContent = data.error || 'Registreringen misslyckades.';
                            errorEl.style.display = 'block';
                        }
                    } catch (err) {
                        errorEl.textContent = 'Kunde inte kontakta servern.';
                        errorEl.style.display = 'block';
                    }
                });
            }

            const switchBtn = document.getElementById('switch-to-login');
            if (switchBtn) {
                switchBtn.addEventListener('click', onSwitchToLogin);
            }
        }, 0);

        return container;
    }
}
