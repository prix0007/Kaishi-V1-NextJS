import React from 'react'
import Header from './Header';
import Footer from './Footer';

import Grid from '@material-ui/core/Grid';

import styles from './Layout.module.scss';

const Layout = (props) => {
  return (
    <Grid container className={styles.root}>
      <Header />
      {props.children}
      <Footer />
    </Grid>
  )
}


export default Layout
