/**
 * PyLearn - Huvudapplikation (Möjliggör inlärning)
 * 
 * Denna fil är startpunkten för webbapplikationen. Den initialiserar:
 * 1. Lagringssystemet (för att spara framsteg)
 * 2. Routern (för att byta vy/lektion)
 * 3. Sidofältet (enklare mobil-vänlighet)
 */

// Importera kärnsystem (Dessa moduler skapas i nästa steg)
import Storage from './storage.js';
import Router from './router.js';
import Sidebar from './components/sidebar.js';

class App {
    constructor() {
        console.log("🚀 PyLearn initieras...");

        // 1. Starta lagringssystemet för att hämta användarens framsteg
        this.storage = new Storage();

        // 2. Starta routern för att hantera vyer (vad som ska visas)
        this.router = new Router(this.storage);

        // 3. Starta sidonavigeringen (menyn till vänster)
        this.sidebar = new Sidebar(this.storage, this.router);


        // 3. Konfigurera UI-element (som mobilmeny)
        this.setupUI();

        // Lägg ut datan så andra skript enkelt kan nå progress
        window.app = this;
    }

    setupUI() {
        // Sätt upp mobilmenyns hamburgerknapp
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');

        if (menuToggle && sidebar && overlay) {
            // Öppna/stäng meny vid klick
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
                overlay.classList.toggle('active');
            });

            // Stäng meny vid klick utanför
            overlay.addEventListener('click', () => {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }

        // Global Event Listener för att stänga mobilmenyn när en ny länk klickas
        window.addEventListener('hashchange', () => {
            if (sidebar && overlay && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            }
        });
    }
}

// Starta applikationen när DOM:en är färdigladdad
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
