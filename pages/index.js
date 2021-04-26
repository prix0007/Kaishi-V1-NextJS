import React, { Component } from "react";
import factory from "../ethereum/factory";

import Layout from "../components/Layout";

import styles from "./index.module.scss";

import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  makeStyles,
  CardActions,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";

import { Link } from "../routes";
import { OpenInBrowser } from "@material-ui/icons";

export default class Index extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return {
      campaigns,
    };
  }

  renderCampaigns() {
    const UIItems = this.props.campaigns.map((address) => {
      return (
        <Card elevation={4} key={address} className={styles.cardRoot}>
          <CardContent>
            <Typography variant="caption" color="textPrimary" gutterBottom>
              Campaing Address
            </Typography>
            <Typography
              color="textPrimary"
              gutterBottom
              style={{ fontWeight: 700 }}
            >
              {address}
            </Typography>
            <Typography>
              <Link route={`/campaigns/${address}`}>
                <a>View Campaign</a>
              </Link>
            </Typography>
          </CardContent>
          <CardActions>
            <Tooltip title="View on Rinkeby">
              <IconButton
                onClick={() => {
                  window.open(
                    `https://rinkeby.etherscan.io/address/${address}`
                  );
                }}
              >
                <OpenInBrowser />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      );
    });
    return UIItems;
  }

  render() {
    return (
      <Layout>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={7}>
            <Typography component="h5" variant="h5" gutterBottom>
              Open campaigns
            </Typography>
            {this.renderCampaigns()}
            <Typography>
              Currently the Contract factory is at address{" "}
              <a href="https://rinkeby.etherscan.io/address/0x547F2777219dC09F2eD8640ddf6104cA7fAF05F1">0x547F2777219dC09F2eD8640ddf6104cA7fAF05F1</a>
            </Typography>
            <Typography>
              Please do make sure if you want to contribute then you have metamask or crypto wallet setup already.{" "}
              <a href="https://blog.wetrust.io/how-to-install-and-use-metamask-7210720ca047?gi=c502f15f1f7d">Click here to know more</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} className={styles.rightContent}>
            <Link route="/campaigns/new">
              <Button
                variant="contained"
                color="primary"
                className={styles.createCampaign}
              >
                <AddIcon />
                <Typography>Create Campaign</Typography>
              </Button>
            </Link>
            <Typography variant="caption">
             📄📄 Create a brand new contract 📄📄
            </Typography>
          </Grid>
          <Grid item xs={12} sm={1} />
        </Grid>
        
      </Layout>
    );
  }
}
