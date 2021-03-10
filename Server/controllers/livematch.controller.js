const { teams } = require('../configs/db');
const db = require('../configs/db');
const playerdata = db.playersdata;
const Op = db.Sequelize.Op;
const matches = db.matches;
const matchdata = db.matchdata;
const ballsdata = db.ballsdata;
const routesHandlers = require('../helpers/routes.handler');
exports.getLiveMatch = async (req, res) => {
  const matchId = req.params.matchId;
  const responseData = {};
  try {
    const liveMatchData = await matchdata.findOne({
      where: { matchId },
      attributes: [
        'score',
        'overs',
        'wickets',
        'strickerId',
        'nonStrickerId',
        'bowlerId',
        'current_innings',
        'current_batting_team',
        'current_bowling_team',
        'team_a_score',
        'isCompleted'
      ],
    });
    if (!liveMatchData) {
      const message = 'No match found with given match id!';
      routesHandlers.successHandler(res, [], message, 200);
      return;
    }
    const playingTeams = await teams.findAll({
      attributes:['team_name','id'],
      where: {
        [Op.or]: [{
          id:liveMatchData.current_batting_team
        },
          {
          id:liveMatchData.current_bowling_team
        }]
      }
    })
    if (!playingTeams) {
      const message = 'No teams found with given team id!';
      routesHandlers.successHandler(res,null, message, 200);
      return;
    }
    
    //entering livematch data into data
    
    (responseData.score = liveMatchData.score);
    (responseData.overs = liveMatchData.overs);
    (responseData.wickets = liveMatchData.wickets);
    (responseData.strickerId = liveMatchData.strickerId);
    (responseData.nonStrickerId = liveMatchData.nonStrickerId);
    (responseData.currentInnings = liveMatchData.current_innings);
    (responseData.bowlerId = liveMatchData.bowlerId);
    (responseData.battingTeam = liveMatchData.current_batting_team);
    (responseData.bowlingTeam = liveMatchData.current_bowling_team);
    (responseData.inningOneScore = liveMatchData.team_a_score);
    (responseData.isCompleted = liveMatchData.isCompleted);
    (responseData.battingTeamName = playingTeams[0].id === liveMatchData.current_batting_team ? playingTeams[0].team_name : playingTeams[1].team_name);
    (responseData.bowlingTeamName = playingTeams[0].id === liveMatchData.current_bowling_team ? playingTeams[0].team_name : playingTeams[1].team_name);
    
    const playersData = await playerdata.findAll({
      attributes: [
        'playerId',
        'player_name',
        'runs',
        'balls_faced',
        'fours',
        'sixs',
        'overs_bowled',
        'runs_given',
        'wickets',
        'extras',
      ],
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ playerId: liveMatchData.strickerId }, { matchId }],
          },
          {
            [Op.and]: [{ playerId: liveMatchData.nonStrickerId }, { matchId }],
          },
          {
            [Op.and]: [{ playerId: liveMatchData.bowlerId }, { matchId }],
          },
        ],
      },
    });
    if (!playersData) {
      const message = 'No players for given match!';
      routesHandlers.successHandler(res, [], message, 200);
      return;
    }
    const batting = [];
    const bowling = [];
    //entering player data into response data
    playersData.forEach((playerData) => {
      if (
        playerData.playerId === liveMatchData.strickerId ||
        playerData.playerId === liveMatchData.nonStrickerId
      ) {
        batting.push(playerData);
      } else {
        bowling.push(playerData);
      }
    });
    responseData.batting = batting;
    responseData.bowling = bowling;
    const message = 'live match data retrieved successfully!';
    routesHandlers.successHandler(res, responseData, message, 200);
  } catch (err) {
    const message =
      err.message || 'some error occured while fetching data in database!';
    routesHandlers.errorHandler(res, message, 500);
  }
};
exports.getLiveMatchData = async (req, res) => {
  const matchId = req.params.matchId;
  //can take user id from request object after user login
  try {
    const liveMatchData = await matches.findOne({
      where: { id: matchId },
      attributes: ['venue', 'max_overs', 'match_name', 'toss'],
    });
    if (!liveMatchData) {
      const message = 'you are not authorized to view this page!';
      routesHandlers.errorHandler(res, message, 401);
      return;
    }
    routesHandlers.successHandler(
      res,
      liveMatchData,
      'match data retrieved successfully',
      200
    );
  } catch (err) {
    const message =
      err.message || 'some error occured while fetching data in database!';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.adminMatchUpdate = async (req, res) => {
  const matchData = req.body.matchData;
  const batsmanData = req.body.batsmanData;
  const bowlerData = req.body.bowlerData;
  const ballData = req.body.ballData;
  const matchId = ballData.matchId;
  const batsmanId = req.body.batsmanId;
  const bowlerId = req.body.bowlerId;
  try {
    let updatedMatchData = await matchdata.update(matchData, {
      where: { matchId },
    });
    if (updatedMatchData[0] !== 1) {
      const message =
        'Cannot update match data. Maybe match data was not found';
      routesHandlers.errorHandler(res, message, 404);
      return;
    }
    let updatedbatsmanData = await playerdata.update(batsmanData, {
      where: {
        [Op.and]: [{ matchId }, { playerId: batsmanId }],
      },
    });
    if (updatedbatsmanData[0] !== 1) {
      const message =
        'Cannot update player data. Maybe player data was not found';
      routesHandlers.errorHandler(res, message, 404);
      return;
    }
    let updatedBowlerData = await playerdata.update(bowlerData, {
      where: {
        [Op.and]: [{ matchId }, { playerId: bowlerId }],
      },
    });
    if (updatedBowlerData[0] !== 1) {
      const message =
        'Cannot update player data. Maybe player data was not found';
      routesHandlers.errorHandler(res, message, 404);
      return;
    }

    let createdBall = await ballsdata.create(ballData);
    if (!createdBall) {
      const message = 'error while creating ball!';
      routesHandlers.errorHandler(res, message, 500);
      return;
    }
    const message = 'live match updated successfully';
    routesHandlers.successHandler(res, [], message, 201);
  } catch (error) {
    const message =
      error.message || 'some error occured while fetching data in database!';
    routesHandlers.errorHandler(res, message, 500);
  }
};

exports.updateMatchAndPlayerData = async (req, res) => {
  const strickerId = req.body.strickerId?req.body.strickerId:null
  const nonStrickerId = req.body.nonStrickerId?req.body.nonStrickerId:null
  const matchId = req.params.matchId
  matchdata.update(req.body, {
    where :{matchId}
  })
  .then(num => {
    if (num[0] === 1 && (strickerId!==null || nonStrickerId!==null)) {
      playerdata.update({out_summary:"NOT OUT"}, {
        where: {
          [Op.and]:
          [
            {
              matchId
            },
            {
              [Op.or]: [
                {
                  playerId: strickerId
                },
                {
                  playerId: nonStrickerId
                  }
                ]
              }
            ]
        }
      })
        .then(num => {
          if (num[0]===2 || num[0]===1) {
            const message = 'player data was updated successfully.'
            routesHandlers.successHandler(res, null, message, 200)
          } else {
            const message = 'Cannot update player data. Maybe player data was not found'
            routesHandlers.errorHandler(res, message, 404)
          }
        })
        .catch(err => {
          const message = err.message || 'Error updating player data'
          routesHandlers.errorHandler(res, message, 500)
        })
    }
    else {
      const message = 'match data was updated successfully.'
            routesHandlers.successHandler(res, null, message, 200)
    }
  }).catch(err => {
    const message = err.message || 'Error updating match data'
    routesHandlers.errorHandler(res, message, 500)
  })
}

exports.adminMatchUndo = async (req, res) => {

  const matchData = req.body.matchData;
  const batsmanData = req.body.batsmanData;
  const bowlerData = req.body.bowlerData;
  const ballId = req.params.ballId;
  const matchId = req.body.matchId;
  const batsmanId = req.body.batsmanId;
  const bowlerId = req.body.bowlerId;
  const isWicket = req.body.isWicket? true: false;
  const undoBatsmanId = isWicket ? req.body.undoBatsmanId : ''
  const nonStrickerId = req.body.nonStrickerId?req.body.nonStrickerId:null
    try {
    let updatedMatchData = await matchdata.update(matchData, {
      where: { matchId },
    });
    if (updatedMatchData[0] !== 1) {
      const message =
        'Cannot update match data. Maybe match data was not found';
      routesHandlers.errorHandler(res, message, 404);
      return;
    }
    if(batsmanId!==null || nonStrickerId!==null){
    let updatedbatsmanData = await playerdata.update(batsmanData, {
      where: {
        [Op.and]:
        [
          {
            matchId
          },
          {
            [Op.or]: [
              {
                playerId: batsmanId
              },
              {
                playerId: nonStrickerId
                }
              ]
            }
          ]
      },
    });

    if (updatedbatsmanData[0] === 0 ) {
      
      const message ='Cannot update player data. Maybe player data was not found';
      routesHandlers.errorHandler(res, message, 404);
      return;
    }
    let updatedBowlerData = await playerdata.update(bowlerData, {
      where: {
        [Op.and]: [{ matchId }, { playerId: bowlerId }],
      },
    });
    if (updatedBowlerData[0] !== 1) {
      const message =
        'Cannot update player data. Maybe player data was not found';
      routesHandlers.errorHandler(res, message, 404);
      return;
    }
      if (isWicket) {
        let undoBatsmanRes = await playerdata.update({ out_summary: "Yet to bat" }, {
          where: {[Op.and]: [{ matchId }, { playerId: undoBatsmanId }]}
        })
        if (undoBatsmanRes[0] !== 1) {
          const message =
            'Cannot update player data. Maybe player data was not found';
          routesHandlers.errorHandler(res, message, 404);
          return;
        }
      }

    let deletedBall = await ballsdata.destroy({
      where: { id:ballId }
    });
    if (deletedBall!==1) {
      const message = 'error while delete ball!';
      routesHandlers.errorHandler(res, message, 404);
      return;
    }
    const message = 'live match undo successfull';
      routesHandlers.successHandler(res, null, message, 200);
  }
  } catch (error) {
    const message =
      error.message || 'some error occured while fetching data in database!';
    routesHandlers.errorHandler(res, message, 500);
  }
};
