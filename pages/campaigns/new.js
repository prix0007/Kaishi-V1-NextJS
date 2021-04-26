import React from "react";
import styles from "./new.module.scss";
import factory from "../../ethereum/factory";

import {
  OutlinedInput,
  Typography,
  Grid,
  FormControl,
  FormHelperText,
  InputAdornment,
  Button,
  CircularProgress,
} from "@material-ui/core";

import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";

import { Router } from "../../routes";

const NewCampaign = () => {
  const [minimumContribution, setMinimumContribution] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setErrorMessage("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(web3.utils.toWei(minimumContribution, "ether"))
        .send({
          from: accounts[0],
        });
      setLoading(false);
      Router.pushRoute('/');
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={7} className={styles.contentRoot}>
          <Typography variant="h4" gutterBottom>
            Create a Campaign
          </Typography>
          <FormControl variant="outlined" fullWidth>
            <FormHelperText className={styles.inputLabel}>
              Minimum Contribution
            </FormHelperText>
            <OutlinedInput
              fullWidth
              value={minimumContribution}
              onChange={(e) => {
                setMinimumContribution(e.target.value);
              }}
              endAdornment={<InputAdornment position="end">ETH</InputAdornment>}
              className={styles.input}
            />
          </FormControl>
          <br />
          <Typography className={styles.error}>{errorMessage}</Typography>
          {loading ? <CircularProgress size={24} /> : <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create
          </Button>}
          
          <br />
          <Typography>
            Anyone can create a new Campaign with setting a limit on minimumContribution.
          </Typography>
          <Typography variant="body2">
            It can take a few seconds to few minutes to create a contract and deploy on rinkby testnet. Please be patient
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} />
        <Grid item xs={12} sm={1} />
      </Grid>
    </Layout>
  );
};

export default NewCampaign;
