import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ShareIcon from '@material-ui/icons/Share'
import CardHeader from '@material-ui/core/CardHeader'
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import getAvatar from '../../utils/createAvatar'
import clsx from 'clsx'
import { Chip } from '@material-ui/core'
import Snackbar from '../SnackBar'
import Badge from '@material-ui/core/Badge'
import useStyles from './style'
import { Favorite, FavoriteBorder } from '@material-ui/icons'
// import { subscribeToMatch, removeSubscription } from '../../api/subscription'
import {apiCalls} from 'crickboardapi';
import AxiosContext from '../../context/axios';
import { useCrickStore } from '../../store'
import moment from 'moment';
type Iprops = {
  matchData: {
    currentBattingTeam: string
    currentInnings: number
    matchId: number
    matchName: string
    max_overs: number
    overs: number
    result: string
    score: number
    startTime: null
    target: number
    teamOneName: string
    teamTwoName: string
    toss: string
    venue: string
    wickets: number
    teamAImageUrl: string
    teamBImageUrl: string
  }
  loggedinUser: { userName: string; userId: string; expiredDate: Date },
  history:{push:Function}
}

export default function MediaCard({ matchData, loggedinUser,history }: Iprops) {
  let axios = React.useContext(AxiosContext);
  const {subscribeToMatch, removeSubscription} = apiCalls(axios);
  let teamAAvatar: string | undefined = ''
  let teamBAvatar: string | undefined = ''
  if (!matchData.teamAImageUrl) {
    teamAAvatar = getAvatar(matchData.teamOneName)
  }
  if (!matchData.teamBImageUrl) {
    teamBAvatar = getAvatar(matchData.teamTwoName)
  }
  const [snackBar, setSnackBar] = React.useState({
    value: false,
    message: '',
    type: '',
  })
  const handleCloseSnakeBar = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }
    setSnackBar({ value: false, message: '', type: '' })
  }
  const { subscriptions, addSubscription, deleteSubscription } = useCrickStore()
  const [isSubscribed, setIsSubscribed] = React.useState(() => {
    if (subscriptions.length !== 0) {
      const matchIndex = subscriptions.findIndex(
        (subscription: { id: number; matchId: number }) =>
          subscription.matchId === matchData.matchId
      )
      if (matchIndex !== -1) {
        return { value: true, subscriptionId: subscriptions[matchIndex].id }
      } else {
        return { value: false, subscriptionId: 0 }
      }
    } else {
      return { value: false, subscriptionId: 0 }
    }
  })
  const handleSubscribeChange = async () => {
    if (Object.keys(loggedinUser).length!==0) {
      if (isSubscribed.value) {
        //get subscription id of respective match
        const subscribedMatch = subscriptions.find(
          (subscription: { id: any; matchId: any }) =>
            subscription.matchId === matchData.matchId
        )
        //api call to delete subscription
        await removeSubscription(subscribedMatch.id)
        //dispatch event to redux
        deleteSubscription(subscribedMatch.id)
      } else {
        const subscriptionData = {
          matchId: matchData.matchId,
          userId: loggedinUser.userId,
        }
        const response = await subscribeToMatch(subscriptionData)
        console.log(response)
        //dispatch call to store matchid and respective subscription id
        addSubscription({
          id: response.data.id,
          matchId: response.data.matchId,
        })
      }
      setIsSubscribed((prevState) => {
        let newState = { ...prevState }
        newState.value = !prevState.value
        return newState
      })
    }
    else {
      history.push('/login')
    }
  }

  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <Link
        to={
          matchData.currentInnings === 1 &&
          matchData.result === 'Match yet to start'
            ? ''
            : { pathname: `match/${matchData.matchId}` }
        }
        className={classes.link}
      >
        <CardActionArea>
          <CardHeader
            className={classes.title}
            subheader={
              matchData.result !== 'Match yet to start'
                ? 'Live Score: ' + matchData.matchName
                :moment(matchData.startTime).format('MMMM Do YYYY, h:mm a')
            }
          />

          <Typography
            className={classes.textCenter}
            variant='caption'
            component='p'
          >
            {matchData.result === 'Match yet to start' ? (
              <p>
                Venue:
                <span style={{ color: '#2196F3' }}> {matchData.venue}</span>
              </p>
            ) : matchData.currentInnings === 1 ? (
              <Chip
                size='small'
                label={matchData.toss}
                clickable
                className={classes.toss}
              />
            ) : parseFloat(matchData.max_overs.toString()) !==
                parseFloat(matchData.overs.toString()) &&
              matchData.wickets !== 10 &&
              matchData.score < matchData.target ? (
              <Chip
                size='small'
                label={
                  getAvatar(matchData.currentBattingTeam) +
                  ' need ' +
                  matchData.target +
                  ' runs in ' +
                  matchData.max_overs * 6 +
                  ' balls to win'
                }
                clickable
                className={classes.toss}
              />
            ) : (
              <Chip
                size='small'
                label={matchData.result}
                clickable
                className={classes.toss}
              />
            )}
          </Typography>

          <CardContent className={classes.cardBody}>
            {[0, 1].map((index) => {
              return (
                <>
                  <Badge
                    color='primary'
                    invisible={
                      matchData.currentBattingTeam ===
                      (index === 0
                        ? matchData.teamTwoName
                        : matchData.teamOneName)
                    }
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: index === 0 ? 'right' : 'left',
                    }}
                    overlap='circle'
                    badgeContent='🏏'
                  >
                    <Avatar
                      className={clsx(
                        classes.large,
                        index === 0 ? classes.orange : classes.purple
                      )}
                      src={
                        index === 0
                          ? matchData.teamAImageUrl
                          : matchData.teamBImageUrl
                      }
                    >
                      {index === 0 ? teamAAvatar : teamBAvatar}
                    </Avatar>
                  </Badge>
                  {index === 0 ? (
                    <Grid
                    container
                      className={classes.scoring}
                      justifycontent='space-between'
                      alignItems='center'
                    >
                      <Typography
                        className={classes.vs}
                        gutterBottom
                        variant='h5'
                        component='h2'
                      >
                        VS
                      </Typography>
                      {matchData.result !== 'Match yet to start' ? (
                        <>
                          <Typography
                            gutterBottom
                            variant='subtitle1'
                            component='p'
                          >
                            Score: {matchData.score}/{matchData.wickets}
                          </Typography>

                          <Typography
                            gutterBottom
                            variant='subtitle2'
                            component='p'
                          >
                            Overs: {matchData.overs}/{matchData.max_overs}
                          </Typography>
                        </>
                      ) : null}
                    </Grid>
                  ) : null}
                </>
              )
            })}
          </CardContent>
        </CardActionArea>
      </Link>

      <CardActions disableSpacing className={classes.cardBottom}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isSubscribed.value}
              icon={<FavoriteBorder className={classes.favIcon} />}
              checkedIcon={<Favorite className={classes.favIconChecked} />}
              name='subscribe'
            />
          }
          label={null}
          labelPlacement='end'
          onChange={handleSubscribeChange}
        />
        <IconButton aria-label='share'>
          <CopyToClipboard
            text={`${window.location.href}match/${matchData.matchId}`}
            onCopy={() =>
              setSnackBar({
                value: true,
                message: 'Link Copied to Clipboard',
                type: 'green',
              })
            }
          >
            <ShareIcon />
          </CopyToClipboard>
        </IconButton>
      </CardActions>
      <Snackbar
        isOpen={snackBar.value}
        message={snackBar.message}
        setIsOpen={setSnackBar}
        type={snackBar.type}
      />
    </Card>
  )
}
