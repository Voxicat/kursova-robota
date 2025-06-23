const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

module.exports = function(passport) {
    passport.use(new SteamStrategy({
        returnURL: 'http://localhost:3000/auth/steam/return',
        realm: 'http://localhost:3000/',
        apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
        console.log('Steam profile received:', profile.displayName);
        return done(null, profile);
    }));

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));
};
