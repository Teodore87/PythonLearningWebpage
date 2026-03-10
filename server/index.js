/**
 * PyLearn - Express Server (Huvudingångspunkt)
 * 
 * Denna server hanterar:
 * 1. Serverar det statiska frontend-bygget (index.html, src/)
 * 2. API-routes för autentisering (/api/auth)
 * 3. API-routes för framstegsdata (/api/progress)
 * 
 * Konfigurerad för enkel deployment till Render.
 */

const express = require('express');
const cors = require('cors');
const path = require('path');

// Cookie-parser behövs för att läsa JWT-cookies
// Vi implementerar en enkel version inline istället för att lägga till ytterligare dependencies
const cookieParser = (req, res, next) => {
    const cookies = {};
    const cookieHeader = req.headers.cookie;
    if (cookieHeader) {
        cookieHeader.split(';').forEach(cookie => {
            const [name, ...rest] = cookie.trim().split('=');
            cookies[name] = decodeURIComponent(rest.join('='));
        });
    }
    req.cookies = cookies;
    next();
};

const app = express();
const PORT = process.env.PORT || 3000;

// --- MIDDLEWARE ---
app.use(cors({
    origin: true, // Tillåt alla origins i dev
    credentials: true
}));
app.use(express.json()); // Parsar JSON-body
app.use(cookieParser); // Parsar cookies

// --- STATISKA FILER ---
// Serverar frontend-filer från projektets rot (en nivå upp från /server)
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

// --- API ROUTES ---
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

// --- FALLBACK: Skicka index.html för alla okända routes (SPA-support) ---
app.get('*', (req, res) => {
    // Undvik att skicka index.html för API-anrop
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API-endpoint hittades inte.' });
    }
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// --- STARTA SERVERN ---
app.listen(PORT, () => {
    console.log(`🐍 PyLearn server körs på http://localhost:${PORT}`);
    console.log(`   Frontend: http://localhost:${PORT}`);
    console.log(`   API: http://localhost:${PORT}/api/auth, /api/progress`);
});
