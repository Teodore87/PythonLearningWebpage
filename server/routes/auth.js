/**
 * PyLearn - Auth Routes
 * 
 * Hanterar registrering, inloggning och utloggning via JWT-tokens.
 * Tokens sparas i httpOnly-cookies för säkerhet.
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// JWT-hemlighet (i produktion: använd .env-fil)
const JWT_SECRET = process.env.JWT_SECRET || 'pylearn_secret_key_v2_2026';
const TOKEN_EXPIRY = '7d'; // Token gäller i 7 dagar

/**
 * POST /api/auth/register
 * Registrera en ny användare.
 * Body: { username, password }
 */
router.post('/register', (req, res) => {
    try {
        const { username, password } = req.body;

        // Validering
        if (!username || !password) {
            return res.status(400).json({ error: 'Användarnamn och lösenord krävs.' });
        }
        if (username.length < 3) {
            return res.status(400).json({ error: 'Användarnamn måste vara minst 3 tecken.' });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: 'Lösenord måste vara minst 6 tecken.' });
        }

        // Kolla om användarnamnet redan finns
        const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
        if (existing) {
            return res.status(409).json({ error: 'Användarnamnet är redan taget.' });
        }

        // Hasha lösenordet och skapa användaren
        const hash = bcrypt.hashSync(password, 10);
        const result = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run(username, hash);

        // Skapa initial tom framstegsdata
        const defaultProgress = JSON.stringify({
            unlockedSections: [1],
            completedLessons: {},
            testScores: {},
            totalProgress: 0,
            lastActiveRoute: '#home'
        });
        db.prepare('INSERT INTO progress (user_id, data_json) VALUES (?, ?)').run(result.lastInsertRowid, defaultProgress);

        // Generera JWT-token
        const token = jwt.sign(
            { userId: result.lastInsertRowid, username, isAdmin: false },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        // Sätt cookie
        res.cookie('pylearn_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dagar
        });

        res.json({
            success: true,
            user: { id: result.lastInsertRowid, username, isAdmin: false }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ error: 'Serverfel vid registrering.' });
    }
});

/**
 * POST /api/auth/login
 * Logga in en befintlig användare.
 * Body: { username, password }
 */
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Användarnamn och lösenord krävs.' });
        }

        // Hämta användare
        const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
        if (!user) {
            return res.status(401).json({ error: 'Felaktigt användarnamn eller lösenord.' });
        }

        // Jämför lösenord
        const valid = bcrypt.compareSync(password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ error: 'Felaktigt användarnamn eller lösenord.' });
        }

        // Generera JWT-token
        const token = jwt.sign(
            { userId: user.id, username: user.username, isAdmin: !!user.is_admin },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRY }
        );

        // Sätt cookie
        res.cookie('pylearn_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            user: { id: user.id, username: user.username, isAdmin: !!user.is_admin }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Serverfel vid inloggning.' });
    }
});

/**
 * POST /api/auth/logout
 * Loggar ut användaren genom att rensa cookien.
 */
router.post('/logout', (req, res) => {
    res.clearCookie('pylearn_token');
    res.json({ success: true });
});

/**
 * GET /api/auth/me
 * Kontrollerar om användaren är inloggad (baserat på cookie).
 */
router.get('/me', (req, res) => {
    try {
        const token = req.cookies?.pylearn_token;
        if (!token) {
            return res.json({ loggedIn: false });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({
            loggedIn: true,
            user: { id: decoded.userId, username: decoded.username, isAdmin: decoded.isAdmin }
        });
    } catch (err) {
        // Token ogiltig eller utgången
        res.clearCookie('pylearn_token');
        res.json({ loggedIn: false });
    }
});

module.exports = router;
