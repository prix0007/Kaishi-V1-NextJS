import React from 'react'
import Header from './Header';

import Grid from '@material-ui/core/Grid';

const Layout = (props) => {
  return (
    <Grid container>
      <Header />
      {props.children}
    </Grid>
  )
}


export default Layout
