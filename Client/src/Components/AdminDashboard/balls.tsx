import React from 'react'
import { Avatar, Grid, Typography } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from '../../Containers/AdminDashboard/LastTenBalls/style'

type Iprops = {
  ballsInfo: Array<{
    ball_number: number
    ball_summary: string
    commentary: string
    id: number
    innings: number
    matchId: number
    score_summary: string
  }>
  currentInnings: number
}

function Index({ ballsInfo, currentInnings }: Iprops) {
  const classes = useStyles()

  const RenderBalls = () => {
    if (ballsInfo) {
      if (ballsInfo.length === 0) {
        return (
          <Grid item xs={12} sm={8} className={classes.gridsTopRight}>
            <Grid item container xs={12} className={classes.gridsTopRightTitle}>
              <Typography component='p' variant='subtitle1'>
                No Balls to Display...
              </Typography>
            </Grid>
          </Grid>
        )
      } else {
        return (
          <Grid item xs={12} sm={8} className={classes.gridsTopRight}>
            <Grid item container xs={12} className={classes.gridsTopRightTitle}>
              <Typography color='primary' component='p' variant='subtitle1'>
                Previous ten balls
              </Typography>
            </Grid>

            <Grid
              item
              container
              xs={12}
              className={classes.gridsTopRightBottom}
            >
              {ballsInfo.slice(0, 10).map(
                (
                  ball: {
                    ball_number: number
                    ball_summary: string
                    commentary: string
                    id: number
                    innings: number
                    matchId: number
                    score_summary: string
                  },
                  key: number
                ) => {
                  const color =
                    ball.ball_summary === 'W'
                      ? classes.orange
                      : ball.ball_summary.includes('6')
                      ? classes.blue
                      : ball.ball_summary.includes('4')
                      ? classes.green
                      : classes.normalBall
                  if (ball.innings === currentInnings) {
                    return (
                      <Grid
                        xs={1}
                        item
                        key={key}
                        className={classes.ballScoreWrapper}
                      >
                        <Typography
                          color='primary'
                          component='p'
                          variant='caption'
                        >
                          {ball.ball_number.toFixed(1)}
                        </Typography>

                        <Avatar className={clsx(classes.ballScore, color)}>
                          <Typography component='span' variant='caption'>
                            {ball.ball_summary}
                          </Typography>
                        </Avatar>
                      </Grid>
                    )
                  } else {
                    return
                  }
                }
              )}
            </Grid>
          </Grid>
        )
      }
    } else {
      return (
        <Typography component='p' variant='subtitle1'>
          Match Yet to Start
        </Typography>
      )
    }
  }
  return (
    <>
      <RenderBalls />
    </>
  )
}

export default Index
