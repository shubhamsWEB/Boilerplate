import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Loader from '../Loader'
import clsx from 'clsx'
import useStyles from '../../Containers/SingleMatch/Commentery/style'

type Iprops = {
  data:Array<{
  ball_number: number,
  ball_summary: string,
  commentary: string,
  innings: number,
  score_summary: string
}>
}

type IfunctionParams = {
ballType:{
ball_number: number,
ball_summary: string,
commentary: string,
innings: number,
score_summary: string
}
}
export default function Commentery({
  data,
}: Iprops) {
  const classes = useStyles()

  const renderOverCompleted = (ball: IfunctionParams["ballType"], prevBall:IfunctionParams["ballType"]) => {
    if (prevBall && ball.innings !== prevBall.innings) {
      return (
     
        <Paper className={classes.paperBlue}>
         
          <Grid container>
           
            <Grid item xs={12} sm={6}>
             
              <Typography variant='h5' component='p'>
                End of Innings 1
              </Typography>
            </Grid>
           
            <Grid item xs={12} sm={6}>
             
              <Typography variant='h6' component='p'>
                Target: {ball.score_summary}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )
    }
    if (Number.isInteger(ball.ball_number)) {
      if (Number.isInteger(prevBall.ball_number)) {
        return
      }
      return (
     
        <Paper className={classes.paper}>
         
          <Grid container>
           
            <Grid item xs={12} sm={6}>
             
              <Typography variant='h6' component='p'>
                End of Over: {ball.ball_number}
              </Typography>
            </Grid>
           
            <Grid item xs={12} sm={6}>
             
              <Typography variant='h6' component='p'>
                Score: {ball.score_summary}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )
    } else {
      return
    }
  }
  const renderBallsData = () => {
    return data.map((ball:IfunctionParams["ballType"] , key: number, arr:Iprops["data"]) => {
      let previousBall = {...ball}
      if (key !== 0) {
        previousBall = arr[key - 1]
      }
      const color =
        ball.ball_summary === 'W'
          ? classes.orange
          : ball.ball_summary.includes('6')
          ? classes.blue
          : ball.ball_summary.includes('4')
          ? classes.green
          : classes.normalBall
      return (
     
        <div key={key}>
          {renderOverCompleted(ball, previousBall)}
         
          <Divider />
         
          <ListItem>
           
            <ListItemAvatar>
             
              <Avatar className={clsx(color, classes.avatarPadding)}>
                {ball.ball_summary}
              </Avatar>
            </ListItemAvatar>
           
            <ListItemText
              primary={ball.ball_number.toFixed(1)}
              secondary={ball.commentary}
            />
          </ListItem>
        </div>
      )
    });
  }
  if (data) {
    return (
   
      <div className={classes.root}>
       
        <Paper elevation={0}>
         
          <Typography
            color='primary'
            variant='h5'
            component='p'
            className={classes.padding15}
          >
            Live Cricket Commentery
          </Typography>
         
          <List className={classes.root}>{renderBallsData()}</List>
        </Paper>
      </div>
    )
  } else {
 
    return <Loader />
  }
}
