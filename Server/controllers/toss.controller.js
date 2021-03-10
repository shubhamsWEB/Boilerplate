const db = require('../configs/db');
const matches = db.matches;
const matchdata = db.matchdata;
const routesHandlers = require('../helpers/routes.handler');
exports.updateToss = async (req, res) => {
  const matchId = req.params.matchId;
  const matchDetails = req.body.matchDetails;
  const matchDataDetails = req.body.matchDataDetails;
  matches
    .update(matchDetails, {
      where: { id: matchId },
    })
    .then((num) => {
      if (num[0] === 1) {
        matchdata
          .update(matchDataDetails, {
            where: { matchId },
            returning: true,
          })
          .then((num) => {
            if (num[0] === 1) {
              const message = 'toss was updated successfully.';

              routesHandlers.successHandler(
                res,
                {
                  currentBattingTeam: num[1][0].current_batting_team,
                  currentBowlingTeam: num[1][0].current_bowling_team,
                },
                message,
                200
              );
              return;
            } else {
              const message = 'failed to update toss';
              routesHandlers.errorHandler(res, message, 404);
              return;
            }
          })
          .catch((err) => {
            const message = err.message || 'Error updating toss';
            routesHandlers.errorHandler(res, message, 500);
          });
      } else {
        const message = 'failed to update toss';
        routesHandlers.errorHandler(res, message, 404);
        return;
      }
    })
    .catch((err) => {
      const message = err.message || 'Error updating toss';
      routesHandlers.errorHandler(res, message, 500);
    });
};
