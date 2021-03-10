import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { getRunRate } from '../../utils/getRunRate'
import useStyle from '../../Containers/SingleMatch/Banner/style'
import getAvatar from '../../utils/createAvatar'
import { Button, Hidden } from '@material-ui/core'

type Iprops = {
  matchId: number,
  data: {
    battingTeam: { team_name: string; id: number },
    bowlingTeam: { team_name: string; id: number },
    matchData: {
      current_batting_team: number,
      current_bowling_team: number,
      current_innings: number,
      
      match: {
        venue: string,
        toss: string,
        max_overs: number,
        result: string,
        isCompleted: number,
      },
      matchId: number,
      overs: number,
      score: number,
      team_a_overs: number,
      team_a_score: number,
      team_a_wickets: number,
      team_b_overs: number,
      team_b_score: number,
      team_b_wickets: number,
      wickets: number
    }
  }
  isAdmin: boolean
}

export default function OutlinedCard({
  matchId,
  data,
  isAdmin
}: Iprops) {
  const classes = useStyle()
  const renderBanner = () => {
    const currentInnings = data.matchData.current_innings
    return (
      
      <>
      
        <Grid container xs={12} className={classes.wrapper}>
        
          <Grid item xs={5} className={classes.textBlack}>
          
            <Typography variant='h6'>
              {currentInnings === 2
                ? `${data.bowlingTeam.team_name}`
                : `${data.battingTeam.team_name}`}
            </Typography>
          
            <Typography variant='h3' className={classes.bold}>
              {currentInnings === 1
                ? `${data.matchData.score}/${data.matchData.wickets}`
                : `${data.matchData.team_a_score}/${data.matchData.team_a_wickets}`}
            </Typography>
          
            <Typography variant='subtitle2' className={classes.bold}>
              Run Rate:{' '}
            
              <span style={{ fontSize: '15px' }}>
                {currentInnings === 1
                  ? `${
                      data.matchData.score === 0 && data.matchData.overs === 0
                        ? '0.0'
                        : getRunRate(data.matchData.score, data.matchData.overs)
                    }`
                  : `${
                      data.matchData.team_a_score === 0 &&
                      data.matchData.team_a_overs === 0
                        ? '0.0'
                        : getRunRate(
                            data.matchData.team_a_score,
                            data.matchData.team_a_overs
                          )
                    }`}
              </span>
            </Typography>
          
            <Typography variant='subtitle2' className={classes.bold}>
              Overs:{' '}
            
              <span style={{ fontSize: '15px' }}>
                {' '}
                {currentInnings === 1
                  ? `${data.matchData.overs}/${data.matchData.match.max_overs}`
                  : `${data.matchData.team_a_overs}/${data.matchData.match.max_overs}`}
              </span>
            </Typography>
          </Grid>
        
          <Grid item xs={2}>
          
            <Typography
              className={classes.vs}
              gutterBottom
              variant='h4'
              component='h2'
            >
              VS
            </Typography>
          </Grid>
        
          <Grid
            item
            xs={5}
            className={currentInnings === 1 ? '' : classes.textBlack}
          >
          
            <Typography variant='h6'>
              {currentInnings === 1
                ? `${data.bowlingTeam.team_name}`
                : `${data.battingTeam.team_name}`}
            </Typography>
          
            <Typography variant='h3' className={classes.bold}>
              {currentInnings === 1
                ? 'Yet to Bat'
                : `${data.matchData.score}/${data.matchData.wickets}`}
            </Typography>
          
            <Typography variant='subtitle2' className={classes.bold}>
              Run Rate:{' '}
            
              <span style={{ fontSize: '15px' }}>
                {currentInnings === 1
                  ? '0.0'
                  : `${
                      data.matchData.score === 0 && data.matchData.overs === 0
                        ? '0.0'
                        : getRunRate(data.matchData.score, data.matchData.overs)
                    }`}
              </span>
            </Typography>
          
            <Typography variant='subtitle2' className={classes.bold}>
              Overs:{' '}
            
              <span style={{ fontSize: '15px' }}>
                {' '}
                {currentInnings === 1
                  ? `0/${data.matchData.match.max_overs}`
                  : `${data.matchData.overs}/${data.matchData.match.max_overs}`}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    
    <>
    
      <Hidden only={['md', 'lg', 'xl']}>
      
        <Paper elevation={0} className={classes.paper}>
        
          <Link
            style={
              isAdmin
                ? { display: 'block', margin: 'auto' }
                : { display: 'none' }
            }
            className={classes.link}
            to={`/quickmatch/${matchId}`}
          >
          
            <Button color='secondary' variant='contained'>
              Edit Match
            </Button>
          </Link>
        
          <Grid container>
          
            <Grid item xs={12}>
            
              <h6 className={classes.vanueHeading}>
                Venue: {data.matchData.match.venue}
              </h6>
            
              <span className={clsx(classes.bold, classes.textBlack)}>
                {data.matchData.current_innings === 1
                  ? data.matchData.match.result
                  : data.matchData.match.isCompleted !== 0
                  ? data.matchData.match.result
                  : `Target ${data.matchData.team_a_score + 1} runs in ${
                      data.matchData.match.max_overs * 6
                    } balls`}
              </span>
            </Grid>
          
            <Grid
              item
              xs={6}
              className={clsx(classes.avatarWrapper, classes.marginRight)}
            >
            
              <Avatar
                variant='circle'
                className={clsx(classes.large, classes.orange)}
                alt='Remy Sharp'
              >
              
                <Typography component='h2' variant='h4'>
                  {getAvatar(data.bowlingTeam.team_name)}
                </Typography>
              </Avatar>
            </Grid>
          
            <Grid
              item
              xs={6}
              className={clsx(classes.avatarWrapper, classes.marginLeft)}
            >
            
              <Avatar
                variant='circle'
                className={clsx(classes.large, classes.purple)}
                alt='Remy Sharp'
              >
              
                <Typography component='h2' variant='h4'>
                  {getAvatar(data.battingTeam.team_name)}
                </Typography>
              </Avatar>
            </Grid>

            {renderBanner()}
          </Grid>
        </Paper>
      </Hidden>
    
      <Hidden only={['sm', 'xs']}>
      
        <Paper elevation={0} className={classes.paper}>
        
          <Link
            style={
              isAdmin
                ? { display: 'block', margin: 'auto' }
                : { display: 'none' }
            }
            className={classes.link}
            to={`/quickmatch/${matchId}`}
          >
          
            <Button color='secondary' variant='contained'>
              Edit Match
            </Button>
          </Link>
        
          <Grid container>
          
            <Grid item xs={12} sm={3}>
            
              <Avatar
                className={clsx(classes.newLarge, classes.orange)}
                alt='Remy Sharp'
              >
              
                <Typography component='h2' variant='h3'>
                  {getAvatar(data.bowlingTeam.team_name)}
                </Typography>
              </Avatar>
            </Grid>
          
            <Grid item xs={12} sm={6}>
            
              <Grid container>
              
                <Grid item xs={12}>
                
                  <h6 className={classes.vanueHeading}>
                    Venue: {data.matchData.match.venue}
                  </h6>
                
                  <span className={clsx(classes.bold, classes.textBlack)}>
                    {data.matchData.current_innings === 1
                      ? data.matchData.match.result
                      : data.matchData.match.isCompleted !== 0
                      ? data.matchData.match.result
                      : `Target ${data.matchData.team_a_score + 1} runs in ${
                          data.matchData.match.max_overs * 6
                        } balls`}
                  </span>
                </Grid>
                {renderBanner()}
              </Grid>
            </Grid>
          
            <Grid item xs={12} sm={3}>
            
              <Avatar
                className={clsx(classes.newLarge, classes.purple)}
                alt='Remy Sharp'
              >
              
                <Typography component='h2' variant='h3'>
                  {getAvatar(data.battingTeam.team_name)}
                </Typography>
              </Avatar>
            </Grid>
          </Grid>
        </Paper>
      </Hidden>
    </>
  )
}
