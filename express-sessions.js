const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const Admins = require('./models/admins')
const stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd')

module.exports = app => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj)
  })

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/google'
      },
      (accessToken, refreshToken, profile, done) => {
        process.nextTick(async () => {
          console.log({ profile })
          let admin = await Admins.findOne({ google_id: profile.id })
          if (!admin) {
            throw 'Access Denied'
          }
          return done(null, admin)
        })
      }
    )
  )

  const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URL,
    collection: 'sessions'
  })

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      unset: 'destroy',
      store: sessionStore,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week in milliseconds
      }
    })
  )

  app.use(
    passport.initialize({
      userProperty: 'user'
    })
  )
  app.use(passport.session())
}

// app.use(express.static('public'))
// app.use(express.json())
