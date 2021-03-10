const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./configs/db')
const users = db.users

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async function (email, password, done) {
  try {
    const user = await users.findOne({ where: { email: email } })
    if (!user) {
      return done(null, false, { message: 'email is not registered!' })
    }
    await bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return done(err)
      }
      if (!isMatch) {
        return done(null, false, { message: 'invalid user or password!' })
      }
      else if (user.is_verified) {
        return done(null, user)
      }
      else {
        return done(null,false,{message:'please verify your email to login!'})
      }
    })
  } catch (err) {
    done(err)
  }
}))
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await users.findOne({ where: { id } })
    return done(null, user)
  } catch (err) {
    done(err)
  }
})
