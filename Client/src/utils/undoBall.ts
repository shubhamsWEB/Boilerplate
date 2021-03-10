export const undoBall = async (prevScore: any, liveData: any, matchId: any) => {
    if (prevScore.length >= 2) {
        const { ballData, ...restData } = prevScore[prevScore.length - 2];
        if (prevScore[prevScore.length - 1].ballData.ball_summary === "W") {
            restData.batsmanData.out_summary = 'Not Out';
            restData.matchData.strickerId = restData.batsmanId;
            restData.undoBatsmanId = liveData.strickerId;
            restData.isWicket = true;
        }
        restData.matchData.bowlerId = restData.bowlerId;
        restData.matchId = ballData.matchId;
        return restData;
    }
    else {
        let undoData = {};
        (undoData as any).batsmanId = liveData.strickerId;
        (undoData as any).bowlerId = liveData.bowlerId;
        (undoData as any).batsmanData = { balls_faced: 0, runs: 0, fours: 0, sixs: 0 };
        (undoData as any).bowlerData = { overs_bowled: 0, runs_given: 0, wickets: 0, extras: 0 };
        (undoData as any).matchId = matchId;
        (undoData as any).nonStrickerId = liveData.nonStrickerId;
        (undoData as any).matchData = { score: 0, overs: 0, wickets: 0, bowlerId: (undoData as any).bowlerId, batsmanId: (undoData as any).batsmanId, nonStrickerId: liveData.nonStrickerId };
        return undoData;
    }
};
