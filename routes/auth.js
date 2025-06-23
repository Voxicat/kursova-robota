const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/steam', passport.authenticate('steam'));

router.get('/steam/return', 
  passport.authenticate('steam', { failureRedirect: '/login' }),
  async (req, res) => {
    // Обработка успешной авторизации
    res.redirect('/profile');
  }
);

module.exports = router;