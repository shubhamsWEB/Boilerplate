import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import useStyles from './style'

function Index({
  ballsInfo
}: any) {
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
              <Typography component='p' variant='subtitle1'>
                Previous ten balls
              </Typography>
            </Grid>
            <Grid
                  item
                  container
                  xs={12}
                  className={classes.gridsTopRightBottom}
                  
            >
              
            {ballsInfo.slice(0,10).map((ball: any,key: any) => {
              return (
              
                  <Grid xs={1} key={key} item className={classes.ballScoreWrapper}>
                    <Typography component='p' variant='caption'>
                      {(ball.ball_number).toFixed(1)}
                    </Typography>
                    <Grid item className={classes.ballScore}>
                      <Typography component='span' variant='caption'>
                        {ball.ball_summary}
                      </Typography>
                    </Grid>
                  </Grid>
              )
            })}
             
            </Grid>
          </Grid>
        );
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