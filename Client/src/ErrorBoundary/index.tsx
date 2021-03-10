import React from 'react'
import { Typography } from '@material-ui/core'

type State = any;
class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: any) {
    return { error }
  }
  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <Typography component='h1' color='secondary' variant='h6' align="center">
            Some thing went wrong, Please reload!
          </Typography>
        </div>
      )
    }
    return this.props.children
  }
}
export default ErrorBoundary
