export const updatedScore = (runs: any, extras: any, wickets: any) => {
  const batsmanRuns = 0
  const extraRuns = 0
  const isWicket = false
  const ballCount = false
  const isSix = false
  const isFour = false
  const outSummary = ''

  switch (extras) {
    case 0: {
      if (wickets === 'Not Out') {
        return {
          extraRuns: 0,
          batsmanRuns: runs,
          isWicket: false,
          ballCount: true,
          ballSummary: `${runs}`,
          isFour: runs === 4 ? true : false,
          isSix: runs === 6 ? true : false,
        }
      } else {
        return {
          extraRuns: 0,
          batsmanRuns: runs,
          isWicket: true,
          ballCount: true,
          ballSummary: 'W',
          isFour: runs === 4 ? true : false,
          isSix: runs === 6 ? true : false,
          outSummary: `${wickets}`
        }
      }
    }
    case 1: {
      if (wickets === 'Not Out') {
        return {
          extraRuns: runs + 1,
          batsmanRuns: 0,
          isWicket: false,
          ballCount: false,
          ballSummary: runs !== 0 ? `${runs}wd` : 'wd',
          isFour: false,
          isSix: false,
        }
      } else {
        return {
          extraRuns: runs + 1,
          batsmanRuns: 0,
          isWicket: true,
          ballCount: false,
          ballSummary: runs !== 0 ? `${runs}W` : 'W',
          isFour: false,
          isSix: false,
          outSummary: `${wickets}`
        }
      }
    }
    case 2: {
      if (wickets === 'Run Out') {
        return {
          extraRuns: 1,
          batsmanRuns: runs,
          isWicket: true,
          ballCount: false,
          ballSummary: 'W',
          isFour: runs === 4 ? true : false,
          isSix: runs === 6 ? true : false,
          outSummary: `${wickets}`
        }
      } else {
        return {
          extraRuns: 1,
          batsmanRuns: runs,
          isWicket: false,
          ballCount: false,
          ballSummary: runs !== 0 ? `${runs}nb` : 'nb',
          isFour: runs === 4 ? true : false,
          isSix: runs === 6 ? true : false,
          outSummary: `${wickets}`
        }
      }
    }
    case 3: {
      if (wickets === 'Not Out') {
        return {
          extraRuns: runs,
          batsmanRuns: 0,
          isWicket: false,
          ballCount: true,
          ballSummary: runs !== 0 ? `${runs}b` : 'b',
          isFour: false,
          isSix: false,
        }
      } else {
        return {
          extraRuns: runs,
          batsmanRuns: 0,
          isWicket: true,
          ballCount: true,
          ballSummary: 'W',
          isFour: false,
          isSix: false,
          outSummary: `${wickets}`
        }
      }
    }
    case 4: {
      if (wickets === 'Not Out') {
        return {
          extraRuns: runs,
          batsmanRuns: 0,
          isWicket: false,
          ballCount: true,
          ballSummary: runs !== 0 ? `${runs}lb` : 'lb',
          isFour: false,
          isSix: false,
        }
      } else {
        return {
          extraRuns: runs,
          batsmanRuns: 0,
          isWicket: true,
          ballCount: true,
          ballSummary: 'W',
          isFour: false,
          isSix: false,
          outSummary: `${wickets}`
        }
      }
    }
    default: {
      return {
        batsmanRuns,
        extraRuns,
        isWicket,
        isFour,
        isSix,
        outSummary,
        ballCount
      }
    }
  }
}
