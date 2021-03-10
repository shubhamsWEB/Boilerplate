// import React from 'react'
// import { Grid, makeStyles, Typography } from '@material-ui/core'
// import Loader from '../../../components/Loader';
// import useStyles from './style';


// function Index({ liveInfo, hasError ,maxOvers}) {
//   const classes = useStyles()
//   const reanderBatsman = () => {
//     if (liveInfo.batting) {
  
//       return liveInfo.batting.map((player,key) => {
//         return (
//           <Grid key={key} item container xs={12} className={classes.tBody} key={player.playerId}>
//             <Grid item xs={4}>
//               <Typography align='center' component='span' variant='subtitle2'>
//                 {player.player_name} {liveInfo.strickerId === player.playerId ? '🏏' : ''}
//               </Typography>
//             </Grid>
//             <Grid item xs={8} className={classes.playerBoard}>
//               <Typography align='center' component='span' variant='caption'>
//                 {player.runs}
//               </Typography>
//               <Typography align='center' component='span' variant='caption'>
//                 {player.balls_faced}
//               </Typography>
//               <Typography align='center' component='span' variant='caption'>
//                 {player.fours}
//               </Typography>
//               <Typography align='center' component='span' variant='caption'>
//                 {player.sixs}
//               </Typography>
//               <Typography align='center' component='span' variant='caption'>
//                 {(player.runs / player.balls_faced * 100).toFixed(2)|| 0}
//               </Typography>
//             </Grid>
//           </Grid>
//         )
//       })
//     } else {
//       return <Loader/>
//     }
//   }

//   const reanderBowler = () => {
//     if (liveInfo.bowling) {
//       return liveInfo.bowling.map((player,key) => {
//         return (
//           <Grid key={key} item container xs={12} className={classes.tBody}>
//             <Grid item xs={4}>
//               <Typography align='center' component='span' variant='subtitle2'>
//                 {player.player_name}
//               </Typography>
//             </Grid>
//             <Grid item xs={8} className={classes.playerBoard}>
//               <Typography align='center' component='span' variant='caption'>
//                 {player.overs_bowled}
//               </Typography>
//               <Typography align='center' component='span' variant='caption'>
//                 {player.runs_given}
//               </Typography>
//               <Typography align='center' component='span' variant='caption'>
//                 {player.wickets}
//               </Typography>
//               <Typography align='center' component='span' variant='caption'>
//                 {player.extras}
//               </Typography>
//               <Typography align='center' component='span' variant='caption'>
//                 {(player.runs_given / player.overs_bowled).toFixed(2) || 0}
//               </Typography>
//             </Grid>
//           </Grid>
//         )
//       })
//     } else {
//       return <Loader/>
//     }
//   }
//   if (liveInfo) {
//       return (
//         <>
//           <Grid item xs={12} sm={5} className={classes.gridsMiddleLeft}>
//             <Grid item container xs={12} className={classes.tHead}>
//               <Grid item xs={4}>
//                 <Typography align='center' component='span' variant='subtitle1'>
//                   Batting
//                 </Typography>
//               </Grid>
//               <Grid item xs={8} className={classes.playerBoard}>
//                 <Typography align='center' component='span' variant='subtitle2'>
//                   R
//                 </Typography>
//                 <Typography
//                   className={classes.marginLeft}
//                   align='center'
//                   component='span'
//                   variant='subtitle2'
//                 >
//                   B
//                 </Typography>
//                 <Typography
//                   className={classes.marginLeft}
//                   align='center'
//                   component='span'
//                   variant='subtitle2'
//                 >
//                   4's
//                 </Typography>
//                 <Typography align='center' component='span' variant='subtitle2'>
//                   6's
//                 </Typography>
//                 <Typography align='center' component='span' variant='subtitle2'>
//                   S/R
//                 </Typography>
//               </Grid>
//             </Grid>
//             {reanderBatsman()}
//             <Grid item container xs={12} className={classes.tHead}>
//               <Grid item xs={4}>
//                 <Typography align='center' component='span' variant='subtitle1'>
//                   Bowling
//                 </Typography>
//               </Grid>
//               <Grid item xs={8} className={classes.playerBoard}>
//                 <Typography align='left' component='span' variant='subtitle2'>
//                   O
//                 </Typography>
//                 <Typography
//                   className={classes.marginLeft}
//                   align='left'
//                   component='span'
//                   variant='subtitle2'
//                 >
//                   R
//                 </Typography>
//                 <Typography
//                   className={classes.marginLeft}
//                   align='left'
//                   component='span'
//                   variant='subtitle2'
//                 >
//                   W
//                 </Typography>
//                 <Typography align='left' component='span' variant='subtitle2'>
//                   Extra
//                 </Typography>
//                 <Typography align='left' component='span' variant='subtitle2'>
//                   Eco
//                 </Typography>
//               </Grid>
//             </Grid>
//             {reanderBowler()}
//           </Grid>
//           <Grid item xs={12} sm={3} className={classes.gridsMiddleMid}>
//             <Grid item container xs={12} className={classes.inningsTitle}>
//               <Typography component='p' variant='subtitle1'>
//                 1st Innings
//               </Typography>
//             </Grid>
//             <Grid
//               item
//               container
//               xs={12}
//               justify='space-around'
//               alignItems='center'
//               className={classes.inningsBoard}
//             >
//               <Grid xs={4} className={classes.innings}>
//                 <Typography component='p' variant='subtitle1'>
//                   Score
//                 </Typography>
//                 <Grid>
//                   <Typography component='p' variant='subtitle1'>
//                     {liveInfo.score}/{liveInfo.wickets}
//                   </Typography>
//                 </Grid>
//               </Grid>
//               <Grid xs={4} className={classes.innings}>
//                 <Typography component='p' variant='subtitle1'>
//                   CRR
//                 </Typography>
//                 <Grid>
//                   <Typography component='p' variant='subtitle1'>
//                     {liveInfo.score / liveInfo.overs ? (liveInfo.score / liveInfo.overs).toFixed(2) : 0}
//                   </Typography>
//                 </Grid>
//               </Grid>
//               <Grid xs={4} className={classes.innings}>
//                 <Typography component='p' variant='subtitle1'>
//                   Overs
//                 </Typography>
//                 <Grid>
//                   <Typography component='p' variant='subtitle1'>
//                     {liveInfo.overs}/{maxOvers}
//                   </Typography>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </>
//       )
//     } else {
//       return <Loader/>
//     }
// }

// export default Index
