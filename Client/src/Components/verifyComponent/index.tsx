import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import useStyles from './style'
import Loader from '../Loader'

type Iprops = {
  headingText: string
  buttonDetails: Array<{ name: string; handler: () => void }>
  loading: boolean
}

const Index = ({ headingText, buttonDetails, loading }: Iprops) => {
  const classes = useStyles()
  return (
    <>
      <Grid container className={classes.root}>
        <Paper className={classes.paper}>
        {loading?<Loader />:null}
          <Typography
            component='p'
            variant='subtitle1'
            className={classes.heading}
          >
            Note: {headingText}
          </Typography>
          <div className={classes.buttonHolder}>
            {buttonDetails.map((button, index) => (
              <Button
                disabled={loading}
                className={classes.button}
                size='small'
                color={index === 0 ? 'primary' : 'secondary'}
                variant='contained'
                onClick={button.handler}
              >
                {button.name}
              </Button>
            ))}
          </div>
        </Paper>
      </Grid>
    </>
  )
}

export default Index
