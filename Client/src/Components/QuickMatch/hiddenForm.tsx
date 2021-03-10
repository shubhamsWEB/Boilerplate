import { Button, CircularProgress, Grid, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import {
    numberValidator,
    textFormValidator,
} from '../../FormValidators/FormValidator'
import useStyles from '../../Containers/QuickMatch/style'

type Iprops = {
  matchFormDetails : Array<
        {
            name: string,
            numberType: boolean,
            label: string,
            error: boolean,
            helperText: string|null
        } >,
  register:Function,
  loading:boolean
}

function HiddenForm({
  matchFormDetails,
  register,
  loading
}: Iprops) {
    const classes = useStyles()
    return (
    
      <Grid item xs={12} md={4} className={classes.wrapper}>
          <Paper elevation={0} className={classes.paperMiddle}>
            {matchFormDetails.map((detail: any, key: any) => (
            
              <Grid
                key={key}
                container
                item
                justify='center'
                alignItems='center'
                className={
                  key === 0 ? classes.middleFirstItem : classes.teamItem
                }
              >
                      <TextField
                  variant='outlined'
                  fullWidth
                  name={detail.name}
                  type={detail.numberType ? 'number' : 'text'}
                  label={detail.label}
                  autoComplete='off'
                  inputRef={
                    detail.numberType
                      ? register(numberValidator())
                      : register(textFormValidator())
                  }
                  error={detail.error}
                  helperText={detail.helperText}
                />
              </Grid>
            ))}
              <Button
              size='large'
              fullWidth
              variant='contained'
              color='secondary'
              type='submit'
            className={classes.teamItem}
            disabled={loading}
            >
                  <CircularProgress
                  color='primary'
                  size='17px'
                  className={classes.loading}
                  style={
                    loading
                      ? { display: 'block' }
                      : { display: 'none' }
                  }
                />
                  <Typography variant='caption' component='span'>
                
                Start Match
              </Typography>
            </Button>
          </Paper>
        </Grid>
    );
}

export default HiddenForm
