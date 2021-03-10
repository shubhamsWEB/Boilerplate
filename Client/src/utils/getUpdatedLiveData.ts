import { updatedScore } from './getUpdatedScoreData';
import { convertBall } from './convertBalls';
export const updatedLiveData = (liveData: any, commentary: any, ballsData: any, runs: any, extras: any, wickets: any, matchId: any) => {
    const updatedData = {};
    const { ballCount, ballSummary, batsmanRuns, extraRuns, isWicket, isFour, isSix, outSummary, } = updatedScore(runs, extras, wickets);
    let stricker = {};
    liveData.batting.map((st: any) => {
        if (st.playerId === liveData.strickerId) {
            stricker = st;
        }
    });
    (updatedData as any).batsmanId = liveData.strickerId;
    (updatedData as any).bowlerId = liveData.bowlerId;
    (updatedData as any).matchData = {
        score: liveData.score + batsmanRuns + extraRuns,
        overs: ballCount ? convertBall(liveData.overs) : liveData.overs,
        wickets: isWicket ? liveData.wickets + 1 : liveData.wickets,
    };
    (updatedData as any).batsmanData = {
        balls_faced: parseInt(ballCount ? (stricker as any).balls_faced + 1 : (stricker as any).balls_faced),
        runs: parseInt((stricker as any).runs + batsmanRuns),
        fours: parseInt(isFour ? (stricker as any).fours + 1 : (stricker as any).fours),
        sixs: parseInt(isSix ? (stricker as any).sixs + 1 : (stricker as any).sixs),
        out_summary: outSummary,
    };
    (updatedData as any).bowlerData = {
        overs_bowled: parseFloat(ballCount
            ? convertBall(liveData.bowling[0].overs_bowled)
            : liveData.bowling[0].overs_bowled),
        runs_given: parseInt(liveData.bowling[0].runs_given + batsmanRuns + extraRuns),
        wickets: parseInt(wickets !== 'Run Out'
            ? isWicket
                ? liveData.bowling[0].wickets + 1
                : liveData.bowling[0].wickets
            : liveData.bowling[0].wickets),
        extras: parseInt(extraRuns !== 0
            ? liveData.bowling[0].extras + extraRuns
            : liveData.bowling[0].extras),
    };
    (updatedData as any).ballData = {
        ball_number: parseFloat(ballCount
            ? ballsData.length !== 0
                ? convertBall(ballsData[0].ball_number)
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
                : parseFloat(0.1)
            : ballsData[0].ball_number),
        ball_summary: ballSummary,
        innings: liveData.currentInnings,
        commentary: `${liveData.bowling[0].player_name} to ${(stricker as any).player_name} for ${batsmanRuns + extraRuns} runs ${commentary !== '' ? `, ${commentary}.` : '.'}`,
        score_summary: `${(updatedData as any).matchData.score}/${(updatedData as any).matchData.wickets},${(stricker as any).player_name}`,
        matchId: parseInt(matchId),
    };
    return {
        updatedData,
        isWicket,
        batsmanRuns,
        extraRuns,
        oldData: liveData
    };
};
