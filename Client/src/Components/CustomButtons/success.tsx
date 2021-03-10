import React from 'react'
import {
  withStyles
} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

type Iprops = {
  text:string,
  onClick ?:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  color:string,
  hoverColor:string
}

function success ({
  text,
  onClick,
  color,
  hoverColor
}: Iprops) {
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(color),
      backgroundColor: color,
      '&:hover': {
        backgroundColor: hoverColor
      }
    },
  }))(Button)
  return (
  
    <ColorButton fullWidth variant='contained' color='primary' onClick={onClick}>
      {text}
    </ColorButton>
  )
}

export default success
