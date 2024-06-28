const { loginModel } = require("../models/blog_model");
const localStrategy = require('passport-local').Strategy

const localAuth = (passport) => {
    passport.use(new localStrategy(async (username, password, done) => {
        let user = await loginModel.findOne({ username: username })

        try {
            if (!user) {
                return done(null, false)
            }
            if (user.password != password) {
                return done(null, false)
            }
            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    }))

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await loginModel.findById(id)
        return done(null, user)
    })
}

module.exports = localAuth