import React, { Component } from "react";

import {
  TextField,
  Grid,
  Typography,
  InputAdornment,
  Button,
  CircularProgress,
} from "@material-ui/core";

import styles from "./Contribute.module.scss";

import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

import { Router } from "../routes";

const ContributeForm = ({ minAmount, contractAddress }) => {
  const [amount, setAmount] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    const campaign = Campaign(contractAddress);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(amount, "ether"),
      });
      setAmount("");
      Router.replaceRoute(`/campaigns/${contractAddress}`);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Grid container className={styles.root}>
      <Typography gutterBottom variant="h5" className={styles.mainHeading}>
        Back this project
      </Typography>
      <TextField
        label={`Min. Amount - ${web3.utils.fromWei(minAmount, "ether")}`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        error={!!error}
        helperText={error}
        InputProps={{
          endAdornment: <InputAdornment position="start">ether</InputAdornment>,
        }}
      />
      {loading ? (
        <CircularProgress size={32} className={styles.circularProgress}/>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={styles.contributeButton}
          onClick={handleSubmit}
        >
          Contribute
        </Button>
      )}
    </Grid>
  );
};

export default ContributeForm;
