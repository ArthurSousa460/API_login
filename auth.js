const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const users = require('./users');

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
}, function verify(name, password, done) {
    const user = users.find(user => user.name === name);

    if (!user) {
        return done(null, false, { message: 'Usuário ou senha inválidos' });
    }

    if (user.password !== password) {
        return done(null, false, { message: 'Usuário ou senha inválidos' });
    }

    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user);
});

module.exports = passport;
