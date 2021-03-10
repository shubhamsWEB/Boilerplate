const {
  JOIN_MATCH,
  LEAVE_MATCH,
  STRICK_CHANGED,
  BALL_UPDATED,
  LIVE_MATCHES_ROOM,
  CHANGE_INNINGS,
  MATCH_CREATED,
  TOSS_UPDATED,
  NEW_BATSMANN,
  NEW_BOWLER,
  LIVE_UPDATE,
  NEW_OPENING_PLAYERS,
} = require('../Constants/socketEvents');

exports.socketConfig = (io) => {
  io.on('connection', (Socket) => {
    Socket.on(JOIN_MATCH, (room) => {
      Socket.join(room);
    });

    Socket.on(LEAVE_MATCH, (room) => {
      Socket.leave(room);
    });

    Socket.on(STRICK_CHANGED, (data) => {
      Socket.to(data.room).emit(STRICK_CHANGED, data);
    });
    Socket.on(BALL_UPDATED, (data) => {
      Socket.to(data.room).emit(BALL_UPDATED, data);
      Socket.to(LIVE_MATCHES_ROOM).emit(BALL_UPDATED, {
        matchData: data.matchData,
        matchId: parseInt(data.room),
      });
    });

    Socket.on(MATCH_CREATED, (data) => {
      Socket.to(LIVE_MATCHES_ROOM).emit(MATCH_CREATED, {
        matchData: data,
      });
    });

    Socket.on(TOSS_UPDATED, (data) => {
      Socket.to(LIVE_MATCHES_ROOM).emit(TOSS_UPDATED, {
        matchId: data.matchId,
        toss: data.toss,
        result: data.result,
      });
    });
    Socket.on(LIVE_UPDATE, (data) => {
      Socket.to(data.room).emit(LIVE_UPDATE, data.newData);
    });
    Socket.on(NEW_BATSMANN, (data) => {
      Socket.to(data.room).emit(NEW_BATSMANN, data.batsmanData);
    });
    Socket.on(NEW_BOWLER, (data) => {
      Socket.to(data.room).emit(NEW_BOWLER, data.bowlerData);
    });
    Socket.on(NEW_OPENING_PLAYERS, (data) => {
      Socket.to(data.room).emit(NEW_OPENING_PLAYERS, data);
      Socket.to(data.room).emit(CHANGE_INNINGS, data.currentInnings);
    });
  });
};
