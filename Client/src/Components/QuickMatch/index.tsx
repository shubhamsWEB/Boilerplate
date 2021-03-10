import React from 'react'
import useStyles from '../../Containers/QuickMatch/style'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import {
  Button,
  Divider,
  Hidden,
  TextField,
  Typography,
  CircularProgress,
} from '@material-ui/core'
import {
  numberValidator,
  textFormValidator,
} from '../../FormValidators/FormValidator'
import TossModal from '../TossModal'
import HiddenForm from './hiddenForm'

type Iprops = {
  handleSubmit: Function
  onFormSubmit: Function
  formFieldDetails: {
    teamAFormDetails: Array<{
      name: string
      label: string
      error: boolean
      helperText: string | null
      validate: boolean
      firstElement: boolean
    }>
    teamBFormDetails: Array<{
      name: string
      label: string
      error: boolean
      helperText: string | null
      validate: boolean
    }>
    matchFormDetails: Array<{
      name: string
      numberType: boolean
      label: string
      error: boolean
      helperText: string | null
    }>
  }
  register: Function
  loading: boolean
  tossModal: boolean
  setTossModal: React.Dispatch<React.SetStateAction<boolean>>
  matchId: number | undefined
  teams: {
    TeamA: string
    TeamAId: string
    TeamBId: string
    TeamB: string
  }
  history: { push: Function }
}

type Iparams = {
  teamAFormDetailsObject: {
    name: string
    label: string
    error: boolean
    helperText: string | null
    validate: boolean
    firstElement: boolean
  }
  teamBFormDetailsObject: {
    name: string
    label: string
    error: boolean
    helperText: string | null
    validate: boolean
  }
}

function Index({
  handleSubmit,
  onFormSubmit,
  formFieldDetails,
  register,
  loading,
  tossModal,
  setTossModal,
  matchId,
  teams,
  history,
}: Iprops) {
  const classes = useStyles()
  return (
    <form className={classes.root} onSubmit={handleSubmit(onFormSubmit)}>
      <Divider />
      <Typography
        className={classes.heading}
        align='center'
        color='primary'
        variant='h4'
        component='h1'
      >
        Quick Match
      </Typography>
      <Divider />
      <Grid container justify='space-between' spacing={2}>
        <Grid item xs={12} md={4} lg={4} className={classes.wrapper}>
          <Paper elevation={0} className={classes.paper}>
            {formFieldDetails.teamAFormDetails.map(
              (detail: Iparams['teamAFormDetailsObject'], key: number) => (
                <Grid
                  key={key}
                  container
                  item
                  justify='center'
                  alignItems='center'
                  className={key === 0 ? '' : classes.teamItem}
                >
                  <TextField
                    variant='outlined'
                    fullWidth
                    name={detail.name}
                    type='text'
                    label={detail.label}
                    autoComplete='off'
                    inputRef={
                      detail.validate ? register(textFormValidator()) : register
                    }
                    error={detail.error}
                    helperText={detail.helperText}
                  />
                </Grid>
              )
            )}
          </Paper>
        </Grid>
        <Hidden only={['xs', 'sm']}>
          <HiddenForm
            matchFormDetails={formFieldDetails.matchFormDetails}
            register={register}
            loading={loading}
          />
        </Hidden>
        <TossModal
          isOpen={tossModal}
          action={setTossModal}
          matchId={matchId}
          teams={teams}
          history={history}
        />
        <Grid item xs={12} md={4} lg={4} className={classes.wrapper}>
          <Paper elevation={0} className={classes.paper}>
            {formFieldDetails.teamBFormDetails.map(
              (detail: Iparams['teamBFormDetailsObject'], key: number) => (
                <Grid
                  key={key}
                  container
                  item
                  justify='center'
                  alignItems='center'
                  className={key === 0 ? '' : classes.teamItem}
                >
                  <TextField
                    variant='outlined'
                    fullWidth
                    name={detail.name}
                    type='text'
                    label={detail.label}
                    autoComplete='off'
                    inputRef={
                      detail.validate ? register(textFormValidator()) : register
                    }
                    error={detail.error}
                    helperText={detail.helperText}
                  />
                </Grid>
              )
            )}
          </Paper>
        </Grid>
        <Hidden only={['md', 'lg', 'xl']}>
          <HiddenForm
            matchFormDetails={formFieldDetails.matchFormDetails}
            register={register}
            loading={loading}
          />
        </Hidden>
      </Grid>
    </form>
  )
}

export default Index
