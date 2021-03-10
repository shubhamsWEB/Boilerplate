const db = require('../configs/db');
const users = db.users;
const matches = db.matches;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');
const routesHandlers = require('../helpers/routes.handler');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.crickboard@gmail.com',
    pass: 'Crickboard@123',
  },
});
// register user in db
exports.createUser = async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, salt);
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };
  try {
    const checkUser = await users.findOne({ where: { email: user.email } });
    if (!checkUser) {
      // Save note in the database
      users
        .create(user)
        .then((data) => {
          const emailBody = {
            from: 'noreply@crickboard.com',
            to: user.email,
            subject: 'verify your email from CrickBoard',
            html: `
              <h3>Hey ${req.body.name}, Thanks for choosing CrickBoard.</h3>
             ${
               !req.body.isNativeAppRequest
                 ? `<p>please visit the below link to verify your email.</p>
              <a href='https://crickboard.herokuapp.com/verifyemail/${data.id}'>click here...</a>`
                 : `<p>
                   please visit "crickboard://VerifyUser/${data.id}" to verify
                   your email.
                 </p>`
             }
              `,
          };
          transporter.sendMail(emailBody, function (error, info) {
            if (error) {
              const message =
                error.message || 'Some error occurred while creating the user.';
              routesHandlers.errorHandler(res, message, 500);
            } else {
              const message =
                'user signup successfull, please verify email to login!';
              routesHandlers.successHandler(res, null, message, 201);
            }
          });
        })
        .catch((err) => {
          const message =
            err.message || 'Some error occurred while creating the user.';
          routesHandlers.errorHandler(res, message, 500);
        });
    } else {
      const message = 'user already exists.';
      routesHandlers.successHandler(res, null, message, 200);
    }
  } catch (err) {
    const message =
      err.message || 'Some error occurred while connecting to database.';
    routesHandlers.errorHandler(res, message, 500);
  }
};

//* get user by id
exports.getUser = async (req, res) => {
  const id = req.params.id;
  const condition = { id: id };

  try {
    const user = await users.findOne({ where: condition });
    if (user) {
      const message = 'user retrieved successfully';
      routesHandlers.successHandler(res, user, message, 200);
    } else {
      const message = 'user not found in database';
      routesHandlers.errorHandler(res, message, 404);
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while retrieving user.';
    routesHandlers.errorHandler(res, message, 500);
  }
};

//* update user data
exports.updateUser = async (req, res) => {
  const id = req.params.id;

  users
    .update(req.body, {
      where: {
        [Op.and]: [{ id: id }, { is_verified: false }],
      },
    })
    .then((num) => {
      if (num[0] === 1) {
        const message = 'user was updated successfully.';
        routesHandlers.successHandler(res, null, message, 200);
      } else {
        const message = 'Cannot update user. Maybe user was not found';
        routesHandlers.errorHandler(res, message, 404);
      }
    })
    .catch((err) => {
      const message = err.message || 'Error updating user';
      routesHandlers.errorHandler(res, message, 500);
    });
};
//* delete user
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  const condition = id ? { id: id } : null;

  users
    .destroy({
      where: condition,
    })
    .then((num) => {
      if (num === 1) {
        const message = 'user was deleted successfully.';
        routesHandlers.successHandler(res, null, message, 200);
      } else {
        const message = 'Cannot delete user. Maybe user was not found';
        routesHandlers.errorHandler(res, message, 404);
      }
    })
    .catch((err) => {
      const message = err.message || 'Error deleting user';
      routesHandlers.errorHandler(res, message, 500);
    });
};
