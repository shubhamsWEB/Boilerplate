const db = require('../configs/db');
const teams = db.teams;
const players = db.players;
const playerdata = db.playersdata;
const matches = db.matches;
const matchdata = db.matchdata;
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
exports.createCompleteMatch = async (req, res) => {
  const teamsData = req.body.teamsDetails;
  const teamsDetails = [];
  teamsData.forEach((team) => {
    const { players, ...teamData } = team;
    teamsDetails.push(teamData);
  });
  const matchDetails = req.body.matchDetails;
  const teamAplayersData = teamsData[0].players;
  const teamBplayersData = teamsData[1].players;
  try {
    const teamsData = await teams.bulkCreate(teamsDetails);
    teamAplayersData.forEach((player) => (player.teamId = teamsData[0].id));
    teamBplayersData.forEach((player) => (player.teamId = teamsData[1].id));
    matchDetails[0].team_a_id = teamsData[0].id;
    matchDetails[0].team_b_id = teamsData[1].id;
    matchDetails[0].is_verified = true;
    const match = await matches.create(matchDetails[0]);
    const matchId = match.id;
    const allPlayersData = [...teamAplayersData, ...teamBplayersData];
    const playersDetails = await players.bulkCreate(allPlayersData);
    const playerData = [];
    playersDetails.forEach((player) => {
      playerData.push({
        playerId: player.id,
        matchId: matchId,
        player_name: player.player_name,
        teamId: player.teamId,
      });
    });
    await playerdata.bulkCreate([...playerData]);
    const matchDataDetails = {
      current_batting_team: teamsData[0].id,
      current_bowling_team: teamsData[1].id,
      matchId: matchId,
      strickerId: playerData[0].playerId,
      nonStrickerId: playerData[1].playerId,
      bowlerId: playerData[playerData.length - 1].playerId,
    };
    await matchdata.create(matchDataDetails);
    const message = 'match created successfully!';
    routesHandlers.successHandler(
      res,
      {
        matchId,
        teamAId: teamsData[0].id,
        teamBId: teamsData[1].id,
        teamAName: teamsData[0].team_name,
        teamBName: teamsData[1].team_name,
      },
      message,
      201
    );
  } catch (err) {
    const message =
      err.message || 'some error occured while fetching data in database!';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.createChallengeMatch = async (req, res) => {
  const matchDetails = req.body.matchDetails;
  const matchData = req.body.matchData;
  const playersData = req.body.playersData;
  try {
    const match = await matches.create(matchData);
    matchDetails.matchId = match.id;
    playersData.forEach((player) => (player.matchId = match.id));

    await playerdata.bulkCreate(playersData);
    await matchdata.create(matchDetails);
    const teamDetails = await teams.findAll({
      attributes: ['id', 'ownerId', 'team_name'],
      where: {
        [Op.or]: [{ id: matchData.team_a_id }, { id: matchData.team_b_id }],
      },
    });
    if (!teamDetails) {
      const message = 'failed to retrieve team owner data from given team id.';
      routesHandlers.errorHandler(res, message, 404);
      return;
    }
    if (teamDetails[0].ownerId !== teamDetails[1].ownerId) {
      const teamBOwnerId =
        teamDetails[0].id === matchData.team_a_id
          ? teamDetails[1].ownerId
          : teamDetails[0].ownerId;
      const userData = await users.findOne({
        attributes: ['id', 'email', 'name'],
        where: {
          id: teamBOwnerId,
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
        subject: 'new challenge match',
        html: `
        <h3>Hey ${userData.name}, you got a new challenge from team ${
          teamDetails[0].id === matchData.team_a_id
            ? teamDetails[0].team_a_id
            : teamDetails[1].team_name
        }.</h3>${
          req.body.isNativeAppRequest
            ? `<p>please visit "crickboard://Respond/challenge/${match.id}/${
                teamDetails[0].id === matchData.team_a_id
                  ? teamDetails[0].team_name
                  : teamDetails[1].team_name
              }/${matchData.team_a_id}/${
                matchData.team_b_id
              }" to know match details and accept.</p>`
            : `<p>please visit the below link to know match details and accept.</p>
        <a href="http://localhost:3001/respond/challenge/${match.id}/${
                teamDetails[0].id === matchData.team_a_id
                  ? teamDetails[0].team_name
                  : teamDetails[1].team_name
              }/${matchData.team_a_id}/${
                matchData.team_b_id
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
          const message = 'match created successfully!';
          routesHandlers.successHandler(
            res,
            {
              matchId: match.id,
            },
            message,
            201
          );
        }
      });
    } else {
      const message = 'match created successfully!';
      routesHandlers.successHandler(
        res,
        {
          matchId: match.id,
        },
        message,
        201
      );
    }
  } catch (err) {
    const message =
      err.message || 'some error occured while fetching data in database!';
    routesHandlers.errorHandler(res, message, 500);
  }
};
