require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const fetch = require('node-fetch');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//подключаем конфиг passport
const configurePassport = require('./config/passport');
configurePassport(passport);

//роуты

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/auth/steam', (req, res, next) => {
    req.session.returnTo = req.headers.referer || '/';
    passport.authenticate('steam')(req, res, next);
});

app.get('/auth/steam/return',
    passport.authenticate('steam', { failureRedirect: '/' }),
    (req, res) => {
        console.log('User authenticated:', req.user.displayName);
        const returnTo = req.session.returnTo || '/';
        delete req.session.returnTo;
        res.redirect(returnTo);
    }
);

app.get('/api/user', (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    const userData = {
        name: req.user.displayName,
        avatar: req.user.photos[2]?.value || req.user.photos[0]?.value,
        steamId: req.user._json.steamid,
    };
    console.log('Sending /api/user data:', userData);
    res.json(userData);
});

app.post('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.sendStatus(200);
        });
    });
});

app.get('/api/steam', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        const steamId = req.user._json.steamid;
        const apiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (!data.response || !data.response.players) {
            throw new Error('Invalid Steam API response');
        }

        const result = {
            success: true,
            player: data.response.players[0],
        };

        console.log('Sending /api/steam data:', result);
        res.json(result);

    } catch (error) {
        console.error('Steam API Error:', error.message);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
