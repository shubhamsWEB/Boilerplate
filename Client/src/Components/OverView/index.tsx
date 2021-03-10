import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import Loader from '../Loader'
import { Grid, Paper, Typography } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from '../../Containers/SingleMatch/OverView/style'

type Iprops = {
  highlights: {
    firstInnings: Array<{
      id: number
      innings: number
      ball_number: number
      ball_summary: string
      commentary: string
    }>
    secondInnings: Array<{
      id: number
      innings: number
      ball_number: number
      ball_summary: string
      commentary: string
    }>
  }
}

export default function OverView({
  highlights
}: Iprops) {
  const classes = useStyles()
  if (highlights) {
    return (
      <Grid container>
        {Object.entries(highlights).map((innings:any,index:number) => {
          
          return (
                  <Grid key={index} item xs={12}>
              <Paper elevation={0}>
                  <Divider />
               
                      <Typography
                      align="center"
                    style={{
                      textTransform: 'capitalize',
                      color: 'navy',
                      marginTop: '10px',
                      textAlign: 'center'
                    }}
                    variant='h5'
                  >
                    {innings[0] === 'firstInnings'
                      ? 'first innings highlights'
                      : 'second innings highlights'}
                  </Typography>
                {' '}
                  <List className={classes.root}>
                
                  {innings[1].length !== 0 ? (
                
                    innings[1].map((value:{
                      id: number
                      innings: number
                      ball_number: number
                      ball_summary: string
                      commentary: string
                    }) => {
                      const color =
                        value.ball_summary === 'W'
                          ? classes.orange
                          : value.ball_summary.includes('6')
                          ? classes.blue
                          : value.ball_summary.includes('4')
                          ? classes.green
                          : classes.normalBall
                      return (
                                          <>
                                      <Divider />
                                      <ListItem key={value.id}>
                                          <ListItemAvatar>
                                              <Avatar
                                className={clsx(classes.avatarPadding, color)}
                              >
                                {value.ball_summary}
                              </Avatar>
                            </ListItemAvatar>
                                          <ListItemText
                              primary={value.ball_number}
                              secondary={value.commentary}
                            />
                          </ListItem>
                        </>
                      )
                    })
                  ) : (
                                  <ListItem>
                              <ListItemText primary='Yet To Start...' />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    );
  } else {
    return <Loader />
  }
}
