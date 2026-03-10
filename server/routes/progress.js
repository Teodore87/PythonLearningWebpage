/**
 * PyLearn - Progress Routes
 * 
 * Hanterar sparande och hämtning av användarens framstegsdata.
 * Kräver autentisering via JWT-token i cookie.
 */

const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'pylearn_secret_key_v2_2026';

/**
 * Middleware: Kontrollera att användaren är inloggad.
 * Lägger till req.user med userId, username, isAdmin.
 */
function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.pylearn_token;
        if (!token) {
            return res.status(401).json({ error: 'Du måste vara inloggad.' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Ogiltig eller utgången session.' });
    }
}

/**
 * GET /api/progress
 * Hämta inloggad användares framstegsdata.
 */
router.get('/', requireAuth, (req, res) => {
    try {
        const row = db.prepare('SELECT data_json FROM progress WHERE user_id = ?').get(req.user.userId);

        if (row) {
            res.json({ progress: JSON.parse(row.data_json) });
        } else {
            // Om det inte finns progress-rad, skapa en
            const defaultProgress = {
                unlockedSections: [1],
                completedLessons: {},
                testScores: {},
                totalProgress: 0,
                lastActiveRoute: '#home'
            };
            db.prepare('INSERT INTO progress (user_id, data_json) VALUES (?, ?)').run(req.user.userId, JSON.stringify(defaultProgress));
            res.json({ progress: defaultProgress });
        }
    } catch (err) {
        console.error('Get progress error:', err);
        res.status(500).json({ error: 'Kunde inte hämta framsteg.' });
    }
});

/**
 * POST /api/progress
 * Spara inloggad användares framstegsdata.
 * Body: { progress: { ... } }
 */
router.post('/', requireAuth, (req, res) => {
    try {
        const { progress } = req.body;
        if (!progress) {
            return res.status(400).json({ error: 'Ingen framstegsdata skickades.' });
        }

        const jsonStr = JSON.stringify(progress);

        // Upsert: uppdatera om rad finns, annars skapa
        const existing = db.prepare('SELECT user_id FROM progress WHERE user_id = ?').get(req.user.userId);
        if (existing) {
            db.prepare('UPDATE progress SET data_json = ?, updated_at = datetime(\'now\') WHERE user_id = ?').run(jsonStr, req.user.userId);
        } else {
            db.prepare('INSERT INTO progress (user_id, data_json) VALUES (?, ?)').run(req.user.userId, jsonStr);
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Save progress error:', err);
        res.status(500).json({ error: 'Kunde inte spara framsteg.' });
    }
});

module.exports = router;
