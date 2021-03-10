const db = require('../configs/db');
const playersdata = db.playersdata;
const matches = db.matches;
const matchdata = db.matchdata;
const ballsdata = db.ballsdata;
const teams = db.teams;
const Op = db.Sequelize.Op;
const routesHandlers = require('../helpers/routes.handler');
//* create players from array of player data

exports.createPlayersData = (req, res) => {
  const playersData = req.body;
  playersdata
    .bulkCreate(playersData)
    .then((data) => {
      const message = 'players data created successfully';
      routesHandlers.successHandler(res, data, message, 200);
    })
    .catch((err) => {
      const message =
        err.message || 'Some error occurred while connecting to database.';
      routesHandlers.errorHandler(res, message, 500);
    });
};

//* get players by current team id

exports.findPlayersDataByPlayerAndMatchId = async (req, res) => {
  const playerid = req.params.playerid;
  const matchid = req.params.matchid;

  try {
    const players = await playersdata.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id'],
      },
      where: {
        playerId: playerid,
        matchId: matchid,
      },
    });
    if (players) {
      const message = 'players data retrieved successfully';
      routesHandlers.successHandler(res, players, message, 200);
    } else {
      const message = 'players data not found in database';
      routesHandlers.errorHandler(res, message, 404);
    }
  } catch (err) {
    const message =
      err.message || 'Some error occurred while connecting to database.';
    routesHandlers.errorHandler(res, message, 500);
  }
};
exports.findPlayersDataByMatchId = async (req, res) => {
  const matchid = req.params.matchid;

  try {
    const players = await playersdata.findAll({
      attributes: ['teamId', 'player_name', 'playerId', 'out_summary'],
      where: {
        matchId: matchid,
      },
    });
    if (players) {
      const teamIds = [];
      teamIds.push(players[0].teamId);
      players.forEach((player) => {
        if (player.teamId !== teamIds[0]) {
          teamIds.push(player.teamId);
          return;
        }
      });
      let teamsDetails = await teams.findAll({
        attributes: ['id', 'team_name'],
        where: {
          [Op.or]: [{ id: teamIds[0] }, { id: teamIds[1] }],
        },
      });
      const teamPlayers = [];
      if (teamsDetails) {
        teamPlayers.push({
          teamName: teamsDetails[0].team_name,
          teamId: teamsDetails[0].id,
        });
        teamPlayers.push({
          teamName: teamsDetails[1].team_name,
          teamId: teamsDetails[1].id,
        });
        const playersDetails1 = [];
        const playersDetails2 = [];
        players.forEach((player) => {
          if (player.teamId === teamsDetails[0].id) {
            playersDetails1.push({
              playerId: player.playerId,
              playerName: player.player_name,
              outSummary: player.out_summary,
            });
            teamPlayers[0].players = playersDetails1;
          } else {
            playersDetails2.push({
              playerId: player.playerId,
              playerName: player.player_name,
              outSummary: player.out_summary,
            });

            teamPlayers[1].players = playersDetails2;
          }
        });
      }
      const message = 'players data retrieved successfully';
      routesHandlers.successHandler(res, teamPlayers, message, 200);
    } else {
      const message = 'players data not found in database';
      routesHandlers.errorHandler(res, message, 404);
    }
  } catch (err) {
    const message =
      err.message || 'Some error occurred while connecting to database.';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.updatePlayerData = async (req, res) => {
  const playerid = req.params.playerid;
  const matchid = req.params.matchid;
  const condition =
    playerid && matchid ? { playerId: playerid, matchId: matchid } : null;

  playersdata
    .update(req.body, {
      where: condition,
    })
    .then((num) => {
      if (num[0] === 1) {
        const message = 'player data was updated successfully.';
        routesHandlers.successHandler(res, null, message, 200);
      } else {
        const message =
          'Cannot update player data. Maybe player data was not found';
        routesHandlers.errorHandler(res, message, 404);
      }
    })
    .catch((err) => {
      const message = err.message || 'Error updating player data';
      routesHandlers.errorHandler(res, message, 500);
    });
};
exports.getBattingScoreCard = async (req, res) => {
  const matchId = req.params.matchId;

  try {
    const matchScoreCard = await playersdata.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id'],
      },
      where: {
        [Op.and]: [
          { matchId },
          {
            [Op.or]: [
              {
                overs_bowled: {
                  [Op.ne]: 0,
                },
              },
              {
                out_summary: {
                  [Op.ne]: 'Yet to bat',
                },
              },
            ],
          },
        ],
      },
    });
    if (matchScoreCard) {
      const message = 'score card playerdata retrieved successfully';
      routesHandlers.successHandler(res, matchScoreCard, message, 200);
    } else {
      const message = 'no score card playerdata were not found';
      routesHandlers.successHandler(res, [], message, 404);
    }
  } catch (err) {
    const message =
      err.message || 'Some error occurred while connecting to database.';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.getScoreCardData = async (req, res) => {
  const matchId = req.params.matchId;

  try {
    const matchData = await matchdata.findOne({
      attributes: ['score'],
      where: { matchId },
      include: {
        model: matches,
        as: 'match',
        attributes: ['max_overs'],
      },
    });
    if (!matchData) {
      const message = 'match was not found';
      routesHandlers.successHandler(res, null, message, 404);
      return;
    }
    const matchScoreCard = await playersdata.findAll({
      order: [['updatedAt', 'ASC']],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'id'],
      },
      where: {
        [Op.and]: [
          { matchId },
          {
            [Op.or]: [
              {
                overs_bowled: {
                  [Op.ne]: 0,
                },
              },
              {
                out_summary: {
                  [Op.ne]: 'Yet to bat',
                },
              },
            ],
          },
        ],
      },
    });
    if (!matchScoreCard) {
      const message = 'no players score data was found for given match';
      routesHandlers.successHandler(res, null, message, 404);
      return;
    }
    const matchExtrasAndWickets = await ballsdata.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'matchId'],
      },
      where: {
        [Op.and]: [
          {
            matchId,
          },
          {
            [Op.or]: [
              {
                ball_summary: 'W',
              },
              {
                ball_summary: {
                  [Op.like]: '%wd%',
                },
              },
              {
                ball_summary: {
                  [Op.like]: '%b%',
                },
              },
              {
                ball_summary: {
                  [Op.like]: '%lb%',
                },
              },
              {
                ball_summary: {
                  [Op.like]: '%nb%',
                },
              },
            ],
          },
        ],
      },
    });
    if (!matchExtrasAndWickets) {
      const message = 'balls data was not found';
      routesHandlers.successHandler(res, null, message, 404);
      return;
    }
    const firstInningsHighlights = [];
    const secondInningsHighlights = [];
    matchExtrasAndWickets.forEach((ball) => {
      if (ball.innings === 1) {
        firstInningsHighlights.push(ball);
      } else {
        secondInningsHighlights.push(ball);
      }
    });
    const fallOfWicketsData = {
      matchData: {
        totalScore: matchData.score,
        totalOvers: matchData.match.max_overs,
      },
      matchScoreCard: matchScoreCard,
      firstInningsHighlights: firstInningsHighlights,
      secondInningsHighlights: secondInningsHighlights,
    };
    const message = 'score card playerdata retrieved successfully';
    routesHandlers.successHandler(res, fallOfWicketsData, message, 200);
  } catch (err) {
    const message =
      err.message || 'Some error occurred while connecting to database.';
    routesHandlers.errorHandler(res, message, 500);
  }
};
