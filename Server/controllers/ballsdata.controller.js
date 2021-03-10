const db = require('../configs/db')
const ballsdata = db.ballsdata
const Op = db.Sequelize.Op
const routesHandlers = require('../helpers/routes.handler')
// create ball in db
exports.createBall = async (req, res) => {
  if (!req.body.ball_number || !req.body.ball_summary || !req.body.commentary || !req.body.score_summary || !req.body.innings || !req.body.matchId) {
    const message = 'Content can not be empty!'
    routesHandlers.errorHandler(res, message, 400)
    return
  }
  const ball = {
    ball_number: req.body.ball_number,
    ball_summary: req.body.ball_summary,
    innings: req.body.innings,
    commentary: req.body.commentary,
    score_summary: req.body.score_summary,
    matchId: req.body.matchId
  }
  ballsdata.create(ball)
    .then(data => {
      const message = 'ball created successfull!'
      routesHandlers.successHandler(res, data, message, 201)
    })
    .catch(err => {
      const message = err.message || 'some error occured while connecting to database!'
      routesHandlers.errorHandler(res, message, 500)
    })
}

//* get one ball by id
exports.getBall = async (req, res) => {
  const id = req.params.id
  const condition = { id: id }

  try {
    const ball = await ballsdata.findOne({ where: condition })
    if (ball) {
      const message = 'ball retrieved successfully'
      routesHandlers.successHandler(res, ball, message, 200)
    } else {
      const message = 'ball was not found or req.body is empty!'
      routesHandlers.successHandler(res,[], message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}

//* update ball data
exports.updateBall = async (req, res) => {
  const id = req.params.id
  const condition = id ? { id: id } : null

  ballsdata.update(req.body, {
    where: condition
  })
    .then(num => {
 
      if (num[0] === 1) {
        const message = 'ball was updated successfully'
        routesHandlers.successHandler(res, null, message, 200)
      } else {
        const message = 'ball was not found in database'
        routesHandlers.successHandler(res,[], message, 404)
      }
    })
    .catch(err => {
      const message = err.message || 'Some error occurred while connecting to database.'
      routesHandlers.errorHandler(res, message, 500)
    })
}
//* get ballsdata by current Match id

exports.getAllballsByMatch = async (req, res) => {
  const matchId = req.params.matchId
  const condition = { matchId: matchId }

  try {
    const balls = await ballsdata.findAll({ where: condition, order: [['createdAt', 'DESC']], })
    if (balls) {
      const message = 'balls retrieved successfully'
      routesHandlers.successHandler(res, balls, message, 200)
    } else {
      const message = 'no balls were found for given match'
      routesHandlers.successHandler(res,[], message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}

exports.getAllballsByMatchAndInnings = async (req, res) => {
  const matchId = req.params.matchId
  const innings = req.params.innings
  const condition = { matchId: matchId, innings: innings }

  try {
    const balls = await ballsdata.findAll({ where: condition, order: [['ball_number', 'DESC']] })
    if (balls) {
      const message = 'balls retrieved successfully'
      routesHandlers.successHandler(res, balls, message, 200)
    } else {
      const message = 'no balls were found for given match or innings'
      routesHandlers.successHandler(res,[], message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}

// find last 10 balls for admin dashboard
exports.findLastTenballs = async (req, res) => {
  const matchId = req.params.matchId
  const condition = { matchId: matchId }

  try {
    const balls = await ballsdata.findAll({
      attributes: ['ball_number', 'ball_summary',"id",'innings'],
      where: condition,
      order: [['createdAt', 'DESC']],
      limit: 10,
      offset: 0
    })
    if (balls) {
      const message = 'balls retrieved successfully'
      routesHandlers.successHandler(res, balls, message, 200)
    } else {
      const message = 'no balls were found for given match'
      routesHandlers.successHandler(res,[], message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}

exports.deleteBall = (req, res) => {
  const id = req.params.id
  const condition = id ? { id: id } : null

  ballsdata.destroy({
    where: condition
  }).then(num => {
    if (num === 1) {
      const message = 'ball was deleted successfully'
      routesHandlers.successHandler(res, null, message, 200)
    } else {
      const message = 'ball was not found in database'
      routesHandlers.successHandler(res,[], message, 404)
    }
  })
    .catch(err => {
      const message = err.message || 'Some error occurred while connecting to database.'
      routesHandlers.errorHandler(res, message, 500)
    })
}

exports.getHighlightBalls = async (req, res) => {
  const matchId = req.params.matchId

  try {
    const highlightBalls = await ballsdata.findAll({
      attributes: {
        exclude:['createdAt','updatedAt','matchId','score_summary']
      },
      where: {
        [Op.and]: [{ matchId },
          {
            [Op.or]: [{ ball_summary: "4nb" },
              { ball_summary: "4w" },
              { ball_summary: "4" },
              { ball_summary: "W" },
              { ball_summary: "6w" },
              { ball_summary: "6nb" },
              {ball_summary:"6"}
            ]
          }]
    } })
    if (highlightBalls) {
      const firstInningsHighlights = []
      const secondInningsHighlights = []
      highlightBalls.forEach((ball) => {
        if (ball.innings === 1) {
          firstInningsHighlights.push(ball)
        }
        else {
          secondInningsHighlights.push(ball)
        }
      })
      const highlightsData = {
        firstInnings: firstInningsHighlights,
        secondInnings:secondInningsHighlights
      }
      const message = 'highlight balls retrieved successfully'
      routesHandlers.successHandler(res, highlightsData, message, 200)
    } else {
      const message = 'no highlight balls were not found'
      routesHandlers.successHandler(res,[], message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}
exports.getFallOfWickets = async (req, res) => {
  const matchId = req.params.matchId

  try {
    const fallOfWickets = await ballsdata.findAll({
      attributes: {
        exclude:['createdAt','updatedAt','matchId']
      },
      where: {
        [Op.and]: [
          {
            matchId
          },
          {
            ball_summary:"W"
          }
        ]
    } })
    if (fallOfWickets) {
      const firstInningsHighlights = []
      const secondInningsHighlights = []
      fallOfWickets.forEach((ball) => {
        if (ball.innings === 1) {
          firstInningsHighlights.push(ball)
        }
        else {
          secondInningsHighlights.push(ball)
        }
      })
      const fallOfWicketsData = {
        firstInnings: firstInningsHighlights,
        secondInnings:secondInningsHighlights
      }
      const message = 'fall of wickets balls retrieved successfully'
      routesHandlers.successHandler(res, fallOfWicketsData, message, 200)
    } else {
      const message = 'no fall of wickets balls were not found'
      routesHandlers.successHandler(res,[], message, 404)
    }
  } catch (err) {
    const message = err.message || 'Some error occurred while connecting to database.'
    routesHandlers.errorHandler(res, message, 500)
  }
}
