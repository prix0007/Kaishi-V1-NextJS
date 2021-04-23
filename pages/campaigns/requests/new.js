import React, { Component } from "react";

import styles from "./new.module.scss";

import {
  Grid,
  OutlinedInput,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import Layout from "../../../components/Layout";

import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

class RequestNew extends Component {
  state = {
    value: "",
    description: "",
    recipient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  handleSubmit = async () => {
    this.setState({
      loading: true,
      errorMessage: "",
    });

    const CONTRACT_ADDRESS = this.props.address;
    console.log(CONTRACT_ADDRESS);
    const campaign = Campaign(CONTRACT_ADDRESS);
    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`/campaigns/${CONTRACT_ADDRESS}/requests`);
    } catch (err) {
      console.log(err);
      this.setState({
        errorMessage: err.message,
      });
    }

    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <Layout>
        <Grid container>
          <Grid item xs={12} sm={3} />
          <Grid item xs={12} sm={6}>
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <div className={styles.backButton}>
                <IconButton variant="contained" color="default">
                  <ChevronLeftIcon color="primary" />
                  <Typography color="primary" component="p">
                    Back
                  </Typography>
                </IconButton>
              </div>
            </Link>
            <Typography variant="h4" gutterBottom>
              Create a Request
            </Typography>
            <Grid container>
              <Grid item xs={12} className={styles.inputWrapper}>
                <Typography gutterBottom className={styles.inputLabel}>
                  Description
                </Typography>
                <OutlinedInput
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  fullWidth
                  error={!!this.state.errorMessage}
                />
              </Grid>
              <Grid item xs={12} className={styles.inputWrapper}>
                <Typography gutterBottom className={styles.inputLabel}>
                  Value (in ether)
                </Typography>
                <OutlinedInput
                  value={this.state.value}
                  onChange={(e) => this.setState({ value: e.target.value })}
                  fullWidth
                  error={!!this.state.errorMessage}
                />
              </Grid>
              <Grid item xs={12} className={styles.inputWrapper}>
                <Typography gutterBottom className={styles.inputLabel}>
                  Recipient
                </Typography>
                <OutlinedInput
                  value={this.state.recipient}
                  onChange={(e) => this.setState({ recipient: e.target.value })}
                  fullWidth
                  error={!!this.state.errorMessage}
                />
              </Grid>
            </Grid>

            <Typography
              gutterBottom
              color="error"
              className={styles.errorMessage}
            >
              {this.state.errorMessage}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}
              className={styles.submitRequest}
            >
              {this.state.loading ? (
                <CircularProgress
                  className={styles.circularProgress}
                  size={24}
                />
              ) : (
                "Create !"
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sm={3} />
        </Grid>
      </Layout>
    );
  }
}

export default RequestNew;
