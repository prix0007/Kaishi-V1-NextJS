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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddCircleOutline";

import { Link } from "../routes";

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
          </Grid>
          <Grid item xs={12} sm={3}>
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
          </Grid>
          <Grid item xs={12} sm={1} />
        </Grid>
      </Layout>
    );
  }
}
