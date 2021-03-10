const passport = require('passport')

module.exports = app => {
  const router = require('express').Router()
  const authHelper = require('../helpers/auth.helpers')
  const userControllers = require('../controllers/user.controller')
  const routeHandlers = require('../helpers/routes.handler')
  //* user registration
  router.post('/user', userControllers.createUser)

  //* failed redirect
  router.get('/failed', (req, res) => {
    const message = req.flash('error')[0]
    routeHandlers.successHandler(res,null, message, 200)
  })

  //* user login with email password
  router.post('/user/login', passport.authenticate('local', { failureRedirect: '/api/failed', failureFlash: true }),
    function (req, res) {
      const message = 'logged in successfully!'
      const userData = {
        userId: req.user.id,
        userName: req.user.name,
      }
      routeHandlers.successHandler(res,userData, message, 200)
    })
  //* google auth login
  router.get('/google',authHelper.isNotLoggedIn, passport.authenticate('google', { scope: ['profile', 'email'] }))

  router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed', failureFlash: true }),
    function (req, res) {
      const message = 'logged in successfully!'
      routeHandlers.successHandler(res,req.user, message, 200)
    })
  //* user Logout
  router.get('/logout',authHelper.isLoggedIn,(req, res) => {
    req.session = null
    req.logOut()
    const message = 'user logged out successfully'
    routeHandlers.successHandler(res, null, message, 200) 
  })
  //* get user by user id
  router.get('/user/:id', userControllers.getUser)
  //* update user
  router.patch('/user/:id', userControllers.updateUser)
  //* delete user
  router.delete('/user/:id', userControllers.deleteUser)
  
  app.use('/api', router)
}
