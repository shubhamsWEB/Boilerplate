export const getRunRate = (score: number, overs: number) => {
    
    const oversStringArray = overs.toString().split('.')  
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    const currentOvers = oversStringArray.length===1?parseInt(oversStringArray[0]):parseFloat(parseInt(oversStringArray[0]) + (parseInt(oversStringArray[1]) / 6))
    const runRate = score / currentOvers
    return runRate.toFixed(2)
}