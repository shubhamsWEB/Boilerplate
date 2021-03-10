export const convertBall = (ball: any) => {
    let nextBall = ball + 0.1
    // @ts-expect-error ts-migrate(2365) FIXME: Operator '>' cannot be applied to types 'string' a... Remove this comment to see the full error message
    if ((nextBall % 1).toFixed(1) > 0.5) {
      const num = ball - 0.5
      return (num + 1).toFixed(1)
    } else {
      return nextBall.toFixed(1)
    }
  }