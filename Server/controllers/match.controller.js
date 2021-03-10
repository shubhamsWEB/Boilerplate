// const passport = require('passport')
const { matchdata, playersdata, teams } = require('../configs/db');
const db = require('../configs/db');
const matches = db.matches;
const Op = db.Sequelize.Op;
const routesHandlers = require('../helpers/routes.handler');
var nodemailer = require('nodemailer');
const { users } = require('../configs/db');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreply.crickboard@gmail.com',
    pass: 'Crickboard@123',
  },
});
exports.createMatch = (req, res) => {
  if (
    !req.body.adminId ||
    !req.body.match_name ||
    !req.body.team_a_id ||
    !req.body.team_b_id ||
    !req.body.overs
  ) {
    const message = 'Content can not be empty!';
    routesHandlers.errorHandler(res, message, 400);
    return;
  }
  const newMatch = {
    match_name: req.body.match_name,
    team_a_id: req.body.team_a_id,
    team_b_id: req.body.team_b_id,
    overs: req.body.overs,
    venue: req.body.venue,
    // StartTime: '2018-01-01T08:00:00.000Z',
    result: 'Not Started Yet',
    toss: 'yet to happen',
    adminId: req.body.adminId,
  };
  matches
    .create(newMatch)
    .then((data) => {
      const message = 'match created successfull!';
      routesHandlers.successHandler(res, data, message, 201);
    })
    .catch((err) => {
      const message =
        err.message || 'Some error occurred while creating the match.';
      routesHandlers.errorHandler(res, message, 500);
    });
};

exports.getMatch = (req, res) => {
  matches
    .findOne({
      where: {
        [Op.and]: [{ id: req.params.matchId }, { adminId: req.user.id }],
      },
    })
    .then((data) => {
      if (data) {
        const message = 'match retrieved successfully';
        routesHandlers.successHandler(res, data, message, 200);
      } else {
        const message = 'No match found or you are un authorized';
        routesHandlers.errorHandler(res, message, 403);
      }
    })
    .catch((err) => {
      const message =
        err.message || 'Some error occurred while connecting to database.';
      routesHandlers.errorHandler(res, message, 500);
    });
};

exports.updateMatch = async (req, res) => {
  const id = req.params.matchId;
  const condition = id ? { id: id } : null;

  matches
    .update(req.body, {
      where: condition,
      returning: true,
    })
    .then((num) => {
      if (num[0] === 1) {
        const message = 'match was updated successfully.';
        routesHandlers.successHandler(res, num[1][0], message, 200);
      } else {
        const message = 'Cannot update match. Maybe match was not found';
        routesHandlers.errorHandler(res, message, 404);
      }
    })
    .catch((err) => {
      const message = err.message || 'Error updating match';
      routesHandlers.errorHandler(res, message, 500);
    });
};
exports.isAdminCheck = (req, res) => {
  matches
    .findOne({
      attributes: ['adminId'],
      where: {
        id: req.params.matchId,
      },
    })
    .then((data) => {
      if (data) {
        if (JSON.stringify(data.adminId) === req.params.userId) {
          const message = 'user is the admin of this match';
          routesHandlers.successHandler(res, { isAdmin: true }, message, 200);
        } else {
          const message = 'user is not admin of this match';
          routesHandlers.successHandler(res, { isAdmin: false }, message, 200);
        }
      } else {
        const message = 'No match found or you are un authorized';
        routesHandlers.errorHandler(res, message, 403);
      }
    })
    .catch((err) => {
      const message =
        err.message || 'Some error occurred while connecting to database.';
      routesHandlers.errorHandler(res, message, 500);
    });
};

exports.clearChallengeMatch = async (req, res) => {
  const matchId = req.params.matchId;
  const teamAId = req.params.teamAId;
  const teamBId = req.params.teamBId;
  try {
    const num = await matchdata.destroy({
      where: { matchId },
    });
    if (num === 1) {
      const num2 = await playersdata.destroy({
        where: { matchId },
      });

      if (num2 === 22) {
        const num1 = await matches.destroy({
          where: {
            id: matchId,
          },
        });
        if (num1 === 1) {
          const teamDetails = await teams.findAll({
            attributes: ['id', 'ownerId', 'team_name'],
            where: { [Op.or]: [{ id: teamAId }, { id: teamBId }] },
          });
          if (!teamDetails) {
            const message =
              'failed to retrieve team owner data from given team id.';
            routesHandlers.errorHandler(res, message, 404);
            return;
          }
          const teamAOwnerId =
            teamDetails[0].id === teamAId
              ? teamDetails[0].ownerId
              : teamDetails[1].ownerId;

          const userData = await users.findOne({
            attributes: ['id', 'email', 'name'],
            where: {
              id: teamAOwnerId,
            },
          });
          if (!userData) {
            const message = 'failed to retrieve user data from given id.';
            routesHandlers.errorHandler(res, message, 404);
            return;
          }
          const emailBody = {
            from: 'noreply@crickboard.com',
            to: userData.email,
            subject: 'challenge response',
            html: `
                  <h3>Hey ${userData.name}, ${
              teamDetails[0].id === teamAId
                ? teamDetails[1].team_name
                : teamDetails[0].team_name
            } has rejected your challenge!.</h3>
                  <p>try challenging other teams and happy challenging!.</p>
                  `,
          };
          transporter.sendMail(emailBody, function (error, info) {
            if (error) {
              const message =
                error.message ||
                'Some error occurred while creating the match.';
              routesHandlers.errorHandler(res, message, 500);
            } else {
              const message = 'challenge match deleted successfully.';
              routesHandlers.successHandler(res, null, message, 200);
            }
          });
        } else {
          const message =
            'error while deleting match or no match found with given match id';
          routesHandlers.errorHandler(res, message, 404);
        }
      } else {
        const message =
          'error while deleting team players or no players found with given team id';
        routesHandlers.errorHandler(res, message, 404);
      }
    } else {
      const message =
        'error while deleting match data or no match data found with given match id';
      routesHandlers.errorHandler(res, message, 404);
    }
  } catch (err) {
    const message = err.message || 'Error while deleting match';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.getMatchIsVerified = (req, res) => {
  matches
    .findOne({
      attributes: ['is_verified'],
      where: {
        id: req.params.matchId,
      },
    })
    .then((data) => {
      if (data) {
        const message = 'isVerified of this match retrieved successfully.';
        routesHandlers.successHandler(res, data, message, 200);
      } else {
        const message = 'No match found or you are un authorized';
        routesHandlers.errorHandler(res, message, 403);
      }
    })
    .catch((err) => {
      const message =
        err.message || 'Some error occurred while connecting to database.';
      routesHandlers.errorHandler(res, message, 500);
    });
};

exports.verifyMatch = async (req, res) => {
  const id = req.params.matchId;
  const matchUpdate = req.body.matchUpdate;
  const challengeData = req.body.challengeData;
  const condition = id ? { id: id } : null;
  try {
    const num = await matches.update(matchUpdate, {
      where: condition,
      returning: true,
    });
    if (num[0] === 1) {
      const teamDetails = await teams.findAll({
        attributes: ['id', 'ownerId', 'team_name'],
        where: {
          [Op.or]: [
            { id: challengeData.teamAId },
            { id: challengeData.teamBId },
          ],
        },
      });
      if (!teamDetails) {
        const message =
          'failed to retrieve team owner data from given team id.';
        routesHandlers.errorHandler(res, message, 404);
        return;
      }
      const teamAOwnerId =
        teamDetails[0].id === challengeData.teamAId
          ? teamDetails[0].ownerId
          : teamDetails[1].ownerId;

      const userData = await users.findOne({
        attributes: ['id', 'email', 'name'],
        where: {
          id: teamAOwnerId,
        },
      });
      if (!userData) {
        const message = 'failed to retrieve user data from given id.';
        routesHandlers.errorHandler(res, message, 404);
        return;
      }
      const emailBody = {
        from: 'noreply@crickboard.com',
        to: userData.email,
        subject: 'challenge response',
        html: `
            <h3>Hey ${userData.name}, ${
          teamDetails[0].id === challengeData.teamAId
            ? teamDetails[1].team_name
            : teamDetails[0].team_name
        } has accepted your challenge!.</h3>
            ${
              req.body.isNativeAppRequest
                ? `<p>please visit the "crickboard://Challenge/callback/${id}/${
                    teamDetails[0].id === challengeData.teamAId
                      ? teamDetails[0].team_name
                      : teamDetails[1].team_name
                  }/${
                    teamDetails[0].id === challengeData.teamAId
                      ? teamDetails[1].team_name
                      : teamDetails[0].team_name
                  }/${challengeData.teamAId}/${
                    challengeData.teamBId
                  }" to update the toss Details.</p>`
                : `<p>please visit the below link to update the toss Details.</p>
            <a href="http://localhost:3001/challenge/callback/${id}/${
                    teamDetails[0].id === challengeData.teamAId
                      ? teamDetails[0].team_name
                      : teamDetails[1].team_name
                  }/${
                    teamDetails[0].id === challengeData.teamAId
                      ? teamDetails[1].team_name
                      : teamDetails[0].team_name
                  }/${challengeData.teamAId}/${
                    challengeData.teamBId
                  }">click here...</a>`
            }
            
           
            `,
      };
      transporter.sendMail(emailBody, function (error, info) {
        if (error) {
          const message =
            error.message || 'Some error occurred while creating the match.';
          routesHandlers.errorHandler(res, message, 500);
        } else {
          const message = 'match was updated successfully.';
          routesHandlers.successHandler(res, num[1][0], message, 200);
        }
      });
    } else {
      const message = 'Cannot update match. Maybe match was not found';
      routesHandlers.errorHandler(res, message, 404);
    }
  } catch (err) {
    const message = err.message || 'Error updating match';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.isValidChallengePage = async (req, res) => {
  const matchId = req.params.matchId;
  const teamId = req.params.teamId;
  const userId = req.params.userId;
  try {
    const tossStatus = await matches.findOne({
      attributes: ['toss'],
      where: { id: matchId },
    });
    if (tossStatus.toss === 'Waiting for toss') {
      const matchData = await matches.findOne({
        attributes: ['is_verified', 'adminId'],
        where: {
          id: matchId,
        },
      });
      console.log(matchData.is_verified);
      if (
        matchData.is_verified &&
        JSON.stringify(matchData.adminId) === userId
      ) {
        const teamData = await teams.findOne({
          attributes: ['ownerId'],
          where: {
            id: teamId,
          },
        });
        if (JSON.stringify(teamData.ownerId) === userId) {
          const message = 'this user has access to this component.';
          routesHandlers.successHandler(res, { isValid: true }, message, 200);
        } else {
          const message = 'this user has no access to this component.';
          routesHandlers.successHandler(res, { isValid: false }, message, 200);
        }
      } else {
        const message = 'isVerified of this match retrieved successfully.';
        routesHandlers.successHandler(res, { isValid: false }, message, 200);
        return;
      }
    } else {
      const message = 'cannot update toss match currently in progress.';
      routesHandlers.successHandler(res, { isValid: false }, message, 200);
      return;
    }
  } catch (err) {
    const message = err.message || 'Error occured while retrieving data';
    routesHandlers.errorHandler(res, message, 500);
  }
};
