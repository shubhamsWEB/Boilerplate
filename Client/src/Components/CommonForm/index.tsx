import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import useStyles from './style'
import { CircularProgress } from '@material-ui/core'

type Iprops = {
  isLoading: boolean,
  formHeading: string,
  submitButtonName: string,
  submitFunction:Function,
  formDetails:{
    name:string,
	type:string,
	label:string,
	error:any,
	validator:Function,
	helperText:string

  },
}

export default function Login({
  isLoading,
  formHeading,
  submitFunction,
  formDetails,
  submitButtonName,
}: any) {
  const classes = useStyles()

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />

      <div className={(classes as any).paper}>
        <Avatar className={(classes as any).avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component='h1' variant='h5'>
          {formHeading}
        </Typography>

        <form className={(classes as any).form} onSubmit={submitFunction}>
          <Grid container spacing={2}>
            {formDetails.map((detail: any, key: any) => (
              <Grid key={key} item xs={12}>
                <TextField
                  variant='outlined'
                  fullWidth
                  id={detail.name}
                  label={detail.label}
                  name={detail.name}
                  type={detail.type}
                  autoComplete='off'
                  inputRef={detail.validator}
                  error={detail.error}
                  helperText={detail.helperText}
                />
              </Grid>
            ))}
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={(classes as any).submit}
            disabled={isLoading}
          >
            <CircularProgress
              color='primary'
              size='17px'
              className={(classes as any).loading}
              style={isLoading ? { display: 'block' } : { display: 'none' }}
            />

            <Typography variant='caption' component='span'>
              {submitButtonName}
            </Typography>
          </Button>
        </form>
      </div>
    </Container>
  )
}
