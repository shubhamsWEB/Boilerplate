const routesHandler = require('./routes.handler') 
exports.isLoggedIn = async(req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        const message = "you are not authorized to view this page!"
        return routesHandler.errorHandler(res,message,401)
    }
}
exports.isNotLoggedIn = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const message = "you are already logged in with us!"
          routesHandler.errorHandler(res,message,401)
    } else {
          next()
      }
  }
