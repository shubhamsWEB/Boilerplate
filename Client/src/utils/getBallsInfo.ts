export const computeExtras = (balls: any) => {
  let extras = 0
  let wide = 0
  let noBall = 0
  let byes = 0
  let legByes = 0
  let fallOfWickets: any = []
  balls.map((ball: any) => {
    let ballSummary = ball.ball_summary
  
    if (ballSummary === 'W') {
      fallOfWickets.push(ball)
    } else if (ballSummary.includes('wd')) {
      wide = wide + 1
      if (ballSummary.length > 2)
        extras = extras + parseInt(ballSummary.charAt(0))
    } else if (ballSummary.includes('lb')) {
      legByes = legByes + 1
      if (ballSummary.length > 2)
        extras = extras + parseInt(ballSummary.charAt(0))
    } else if (ballSummary.includes('nb')) {
      noBall = noBall + 1
    } else if (ballSummary.includes('b')) {
      byes = byes + 1
      if (ballSummary.length > 1)
        extras = extras + parseInt(ballSummary.charAt(0))
    }
  })
  return {
    wide: wide,
    noBall: noBall,
    fallOfWickets: fallOfWickets,
    totalExtras: extras + wide + noBall,
    byes: byes,
    legByes: legByes,
  }
}
