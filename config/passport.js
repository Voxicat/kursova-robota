const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;

module.exports = function() {
  passport.use('steam', new SteamStrategy({  // Явно указываем имя стратегии
    returnURL: `${process.env.DOMAIN}/auth/steam/return`,
    realm: process.env.DOMAIN,
    apiKey: process.env.STEAM_API_KEY,
    profile: true
  }, (identifier, profile, done) => {
    console.log('Steam profile:', profile);
    return done(null, profile);
  }));

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};