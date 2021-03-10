import React, { useEffect } from 'react';
// import { getLiveData } from '../../../api/actions';
import {apiCalls} from 'crickboardapi';
import Loader from '../../../Components/Loader';
import { socket } from '../../../socket';
import { updateOpeningData } from '../../../utils/setOpeningData';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import Commentery from '../Commentery';
import LiveScorecard from '../../../Components/LiveScore';
import AxiosContext from '../../../context/axios';
import { LIVE_UPDATE, JOIN_MATCH, LEAVE_MATCH, BALL_UPDATED, STRICK_CHANGED,NEW_OPENING_PLAYERS } from '../../../Constants/socketEvents';
type Iprops = {
    matchId:number
}

type IstateProps = {
    liveData:	{
        batting: Array<{
        balls_faced: number,extras: number,fours: number,overs_bowled: number,playerId: number,player_name: string,runs: number,runs_given: number,sixs: number,wickets: number
        }>,
        battingTeam: number, battingTeamName: string, bowlerId: number, bowling: Array<{
        balls_faced: number,extras: number,fours: number,overs_bowled: number,playerId: number,player_name: string,runs: number,runs_given: number,sixs: number,wickets: number
        }>,bowlingTeam: number,bowlingTeamName: string,currentInnings: number,inningOneScore: number,isCompleted: number,nonStrickerId: number,overs: number,score: number,strickerId: number,wickets: number
        }
}

type IsocketData = {
    ballUpdated: {
        ballData: {
          ball_number: number,
          ball_summary: string,
          commentary: string,
          innings: number,
          matchId: number,
          score_summary: string
        },
        batsmanData: {
          balls_faced: number,
          fours: number,
          playerId: number,
          runs: number,
          sixs: number
        },
        batsmanId: number,
        bowlerData: {
          extras: number,
          overs_bowled: number,
          playerId: number,
          runs_given: number,
          wickets: number
        },
        bowlerId: number,
        matchData: {
          overs: string,
          score: number,
          wickets: number,
        },
        room: string
    },
    openingPlayers:{  bowlerData: {
        extras: number,
        overs_bowled: number,
        playerId: number,
        runs_given: number,
        wickets: number
      },strickerData:{
        balls_faced: number,
        fours: number,
        playerId: number,
        runs: number,
        sixs: number
      }, nonStrickerData:{
        balls_faced: number,
        fours: number,
        playerId: number,
        runs: number,
        sixs: number
      }, bowlerId:number, strickerId:number, nonStrickerId:number }
}

export default function BasicTable({ matchId }: Iprops) {
    let axios = React.useContext(AxiosContext);
    const {getLiveData} = apiCalls(axios);
    const classes = useStyles();
    const [data, setData] = React.useState<IstateProps['liveData']>({} as IstateProps['liveData']);
    useEffect(() => {
        socket.emit(JOIN_MATCH, matchId);
        let mounted = true;
        const getData = async () => {
            const LiveData = await getLiveData(matchId);
            if (!mounted) {
                return;
            }
            setData(LiveData.data);
        };
        getData();
        return () => {
            mounted = false;
            socket.emit(LEAVE_MATCH, matchId);
        };
    }, [matchId]);
    useEffect(() => {
        socket.on(STRICK_CHANGED, () => {
            setData((prevData) => {
                const newState = { ...prevData };
                (newState).strickerId = (newState).nonStrickerId;
                (newState).nonStrickerId = (newState).strickerId;
                return newState;
            });
        });
        socket.on(BALL_UPDATED, (newData: IsocketData['ballUpdated']) => {
            const { batsmanData, batsmanId, bowlerData, bowlerId } = newData;
            bowlerData.playerId = bowlerId;
            batsmanData.playerId = batsmanId;
            setData((prevData) => {
                const newStateData = { ...prevData };
                const updateBatsmanIndex = (newStateData).batting.findIndex((batsman) => batsman.playerId === batsmanId);
                (newStateData).batting[updateBatsmanIndex] = {
                    ...(newStateData).batting[updateBatsmanIndex],
                    ...batsmanData,
                };
                (newStateData).bowling[0] = { ...(newStateData).bowling[0], ...bowlerData };
                return newStateData;
            });
        });
        socket.on(LIVE_UPDATE, (newData: IstateProps['liveData']) => setData(newData));
        socket.on(NEW_OPENING_PLAYERS, (newData: IsocketData['openingPlayers']) => {
            const { bowlerData, strickerData, nonStrickerData, bowlerId, strickerId, nonStrickerId } = newData;
            bowlerData.playerId = bowlerId;
            strickerData.playerId = strickerId;
            nonStrickerData.playerId = nonStrickerId;
            setData((prevData) => {
                return updateOpeningData(prevData, bowlerData, strickerData, nonStrickerData, bowlerId, strickerId, nonStrickerId);
            });
        });
    }, []);
    if (data) {
        if ((data).batting) {
            return (<>
          <LiveScorecard matchId={matchId} data={data}/>
          <Grid container>
            <Grid item xs={12} className={classes.marginTop}>
              <Commentery id={matchId}/>
            </Grid>
          </Grid>
        </>);
        }
        else {
            return <Loader />;
        }
    }
    else {
        return <Loader />;
    }
}