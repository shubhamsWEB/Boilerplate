import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ScoreCard from '../../Containers/SingleMatch/MatchScorecard'
import Teams from '../../Containers/SingleMatch/Teams'
import Commentery from '../../Containers/SingleMatch/Commentery'
import Live from '../../Containers/SingleMatch/LiveScoreCard'
import OverView from '../../Containers/SingleMatch/OverView'

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
            <Box mt={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}))

type Iprops = {
  matchId: number,
  data: {
    battingTeam: { team_name: string; id: number },
    bowlingTeam: { team_name: string; id: number },
    matchData: {
      current_batting_team: number,
      current_bowling_team: number,
      current_innings: number,
      isCompleted: number,
      match: {
        isCompleted: number,
        venue: string,
        toss: string,
        max_overs: number,
        result: string
      },
      matchId: number,
      overs: number,
      score: number,
      team_a_overs: number,
      team_a_score: number,
      team_a_wickets: number,
      team_b_overs: number,
      team_b_score: number,
      team_b_wickets: number,
      wickets: number
    }
  }
}
export default function ScrollableTabsButtonAuto({
  matchId,
  data,
}: Iprops) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
          <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          <Tab label='Live' {...a11yProps(0)} />
          <Tab label='Scorecard' {...a11yProps(1)} />
          <Tab label='Commentery' {...a11yProps(2)} />
          <Tab label='Teams' {...a11yProps(3)} />
          <Tab label='Overview' {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
          <Live matchId={matchId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <ScoreCard matchId={matchId} data={data}  />
      </TabPanel>
      <TabPanel value={value} index={2}>
          <Commentery id={matchId} />
      </TabPanel>
      <TabPanel value={value} index={3}>
          <Teams matchId={matchId}  />
      </TabPanel>
      <TabPanel value={value} index={4}>
          <OverView matchId={matchId} />
      </TabPanel>
    </div>
  )
}
