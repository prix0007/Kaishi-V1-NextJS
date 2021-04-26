import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import Grid from "@material-ui/core/Grid";

import Head from "next/head";

import styles from "./Layout.module.scss";

const Layout = (props) => {
  return (
    <React.Fragment>
      <Head>
        <title>Kaishi</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="./start-up.png" type="image/x-icon"></link>
      </Head>
      <Grid container className={styles.root}>
        <Header />
        {props.children}
        <Footer />
      </Grid>
    </React.Fragment>
  );
};

export default Layout;
