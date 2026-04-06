 * Kräver ingen backend eller databas (men stöder nu Supabase-integrering).
 */

import { supabase } from './supabase.js';

export default class Storage {
    constructor() {
        const lsKey = 'pylearn_progress';
        this.storageKey = lsKey;
        this.currentUser = null;

        // Grundstruktur för användardata
        this.defaultState = {
            unlockedSections: [1], // Sektion 1 är alltid upplåst
            completedLessons: {},  // Format: "sectionId_lessonId": true
            testScores: {},        // Format: "sectionId": scoreProc
            totalProgress: 0,
            lastActiveRoute: '#home'
        };

        // Initialisera state
        this.state = this._loadData();
        
        // Lyssna på Auth-ändringar via Supabase
        this._initSupabaseAuth();
    }

    /** Initialisera och lyssna på inloggningsstatus */
    async _initSupabaseAuth() {
        const { data: { session } } = await supabase.auth.getSession();
        this._handleUserChange(session?.user || null);

        supabase.auth.onAuthStateChange((_event, session) => {
            this._handleUserChange(session?.user || null);
        });
    }

    /** Hantera användarstatus och synkronisering */
    async _handleUserChange(user) {
        const wasLoggedOut = !this.currentUser && user;
        this.currentUser = user;

        if (user) {
            console.log("👤 Inloggad användare:", user.email);
            await this.syncWithSupabase(wasLoggedOut);
        } else {
            console.log("👤 Utloggad / Gästläge");
            this.state = this._loadData(); // Ladda om lokal data
        }

        this.updateProgressCalculation();
        // Trigga omrendering av UI genom en global händelse eller liknande
        window.dispatchEvent(new CustomEvent('auth-change'));
    }

    /** 
     * Synkronisera med Supabase.
     * @param {boolean} migrateIfEmpty Om sant, spara lokal data till Supabase om profilen är tom.
     */
    async syncWithSupabase(migrateIfEmpty = false) {
        if (!this.currentUser) return;

        try {
            // Hämta profil från Supabase
            const { data, error } = await supabase
                .from('profiles')
                .select('progress_json')
                .eq('id', this.currentUser.id)
                .single();

            if (data && data.progress_json) {
                // VIKTIGT: Vi slår ihop molndata med lokal data om molndata finns
                this.state = { ...this.defaultState, ...data.progress_json };
            } else if (migrateIfEmpty) {
                // Om ingen data finns i molnet, skicka upp nuvarande lokal data
                await this._saveToSupabase();
            }
        } catch (e) {
            console.error("Kunde inte synkronisera med Supabase", e);
        }
    }

    /** Ladda data från LocalStorage */
    _loadData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                return { ...this.defaultState, ...JSON.parse(data) };
            }
        } catch (e) {
            console.warn("Kunde inte läsa från localStorage", e);
        }
        return this.defaultState;
    }

    /** Spara data till LocalStorage och Supabase */
    async _saveData() {
        try {
            // Spara alltid lokalt för offline-stöd
            localStorage.setItem(this.storageKey, JSON.stringify(this.state));
            
            // Spara i molnet om vi är inloggade
            if (this.currentUser) {
                await this._saveToSupabase();
            }

            // Uppdatera UI när vi sparar
            this.updateUI();
        } catch (e) {
            console.warn("Kunde inte spara data", e);
        }
    }

    async _saveToSupabase() {
        if (!this.currentUser) return;
        
        try {
            const { error } = await supabase
                .from('profiles')
                .upsert({ 
                    id: this.currentUser.id, 
                    progress_json: this.state,
                    updated_at: new Date()
                });
            
            if (error) throw error;
        } catch (e) {
            console.warn("Kunde inte spara till Supabase", e);
        }
    }

    /** Logga ut */
    async logout() {
        await supabase.auth.signOut();
        // Rensa även lokal data om man vill starta helt rent (valfritt, här behåller vi guest-progress för nästa gång)
        // localStorage.removeItem(this.storageKey);
    }

    /** 
     * Kontrollera om en sektion är upplåst.
     * Förutsättningen för att Sektion N ska vara upplåst är att Sektion N-1 är klar (med 90%+ i provet).
     */
    isSectionUnlocked(sectionId) {
        // Sektion 1 är alltid upplåst, och return true om ID finns i upplåsta listan
        return sectionId === 1 || this.state.unlockedSections.includes(parseInt(sectionId, 10));
    }

    /** Markera en specifik lektion som klar */
    markLessonComplete(sectionId, lessonId) {
        const key = `${sectionId}_${lessonId}`;
        if (!this.state.completedLessons[key]) {
            this.state.completedLessons[key] = true;
            this._saveData();
        }
    }

    /** Kontrollera om lektion är klar */
    isLessonComplete(sectionId, lessonId) {
        return !!this.state.completedLessons[`${sectionId}_${lessonId}`];
    }

    /** 
     * Spara poäng från ett sektionsprov. 
     * Om score >= 90%, lås upp nästa sektion.
     */
    saveTestScore(sectionId, percentageScore) {
        sectionId = parseInt(sectionId, 10);
        this.state.testScores[sectionId] = Math.max(
            percentageScore,
            this.state.testScores[sectionId] || 0
        ); // Spara bara det bästa resultatet

        // Enligt krav: 90% rätt innan man kan gå vidare
        const passingGrade = 90;

        if (percentageScore >= passingGrade) {
            const nextSection = sectionId + 1;
            if (!this.state.unlockedSections.includes(nextSection) && nextSection <= 15) {
                this.state.unlockedSections.push(nextSection);
            }
            this._saveData();
            return true; // Pass
        }

        this._saveData();
        return false; // Fail
    }

    /** Uppdatera totalt "overall" framsteg */
    updateProgressCalculation() {
        // Förenklad uträkning av totalt framsteg baserat på upplåsta sektioner (av totalt 15)
        // Detta kommer att förfinas när vi har exakt antal lektioner
        const totalSections = 15;
        const completed = this.state.unlockedSections.length - 1; // Sektion 1 räknas ej förrän sektion 2 är upplåst osv

        this.state.totalProgress = Math.min(100, Math.round((completed / totalSections) * 100));
        this.updateUI();
    }

    /** Uppdatera progressbaren i UI (Sidofältet) */
    updateUI() {
        const bar = document.getElementById('total-progress-bar');
        const text = document.getElementById('total-progress-text');

        if (bar && text) {
            bar.style.width = `${this.state.totalProgress}%`;
            text.textContent = `${this.state.totalProgress}%`;
        }
    }
}
