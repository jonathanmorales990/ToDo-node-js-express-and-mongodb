const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
       return done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            return done(err, user);
        });
    });
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },(req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({ 'email' :  email }, function(err, user) {
                if (err){
                    return done(err);
                }
                if (!user){
                    return done(null, false, req.flash('loginMessage', 'Usuário não encontrado'));
                }
                if (!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage', 'Oops! Senha inválida'));
                }
                else{
                    return done(null, user);
                }
            });
        });
    }));
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },(req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({'email': email}, (err, existingUser) => {
                if (err)
                    return done(err);

                if (existingUser)
                    return done(null, false, req.flash('signupMessageError', 'Este email já está em uso'));


                if(req.user) {
                    let user = req.user;
                    user.email = email;
                    user.password = user.generateHash(password);
                    newUser.nome = req.body.nome;
                    newUser.sobrenome = req.body.sobrenome;

                    user.save((err) => {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

                else {
                    let newUser = new User();

                    newUser.email= email;
                    newUser.password = newUser.generateHash(password);
                    newUser.nome = req.body.nome;
                    newUser.sobrenome = req.body.sobrenome;
                    newUser.nomecompleto = req.body.nome + " " + req.body.sobrenome;
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser, req.flash('signupMessageSucess', 'Cadastrado com sucesso!'));
                    });
                }

            });
        });

    }));
};