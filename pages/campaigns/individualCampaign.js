import React from "react";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button
} from "@material-ui/core";
import Layout from "../../components/Layout";
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";

import styles from "./individualCampaign.module.scss";

class IndividualCampaign extends React.Component {
  static async getInitialProps(props) {
    const CONTRACT_ADDRESS = props.query.address;
    const contract = Campaign(CONTRACT_ADDRESS);

    const summary = await contract.methods.getSummary().call();
    // console.log(summary);

    return {
      address: CONTRACT_ADDRESS,
      minimumContribution: summary[0],
      contractBalance: summary[1],
      numberOfRequests: summary[2],
      numberOfApprovers: summary[3],
      manager: summary[4],
    };
  }

  renderCards = () => {
    const {
      minimumContribution,
      contractBalance,
      numberOfRequests,
      numberOfApprovers,
      
    } = this.props;

    const items = [
      {
        name: "Minimum Contribution (ether)",
        value: web3.utils.fromWei(minimumContribution, "ether") ,
        description: "It is the minimum amount which is requried to back this project. You will recieve a approver status after that backing this project."
      },
      {
        name: "Currently Raised (ether)",
        value: web3.utils.fromWei(contractBalance, "ether") ,
        description: "It is the amount which this project contract currently holds for project expenses."
      },
      {
        name: "Requests",
        value: numberOfRequests,
        description: "It is the no. of requests which have been made to withdraw from this account by contract manager. Each request requires a mojority to actually finalize any withdrawl to other address from contract."
      },
      {
        name: "Campaign Backers",
        value: numberOfApprovers,
        description: "It is the no. of backer who had supported this project as of now."
      },
    ];

    const UIItems = items.map((item, index) => {
      return (
        <Card elevation={4} key={item.name + index} className={styles.cardRoot}>
          <CardContent>
            <Typography variant="h4">{item.value}</Typography>
            <Typography
              color="primary"
              gutterBottom
              style={{ fontWeight: 700 }}
            >
              {item.name}
            </Typography>
            <Typography>{item.description}</Typography>
          </CardContent>
        </Card>
      );
    });

    return UIItems;
  };

  render() {
    const { minimumContribution, manager, address } = this.props;
    return (
      <Layout>
        <Grid container>
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={7} className={styles.mainContent}>
            <Typography variant="h4" gutterBottom>Campaign Details</Typography>
            <Card variant="outlined">
              <CardContent>
                <Typography gutterBottom variant="h6">{manager}</Typography>
                <Typography gutterBottom variant="h5">Manager</Typography>
                <Typography variant="body2">The manager created this campaign and can create requests to withdraw money.</Typography>
              </CardContent>
            </Card>
            <div className={styles.cardsWrapper}>{this.renderCards()}</div>
            <Link route={`/campaigns/${address}/requests`}>
              <Button variant="contained" color="primary">
                View Requests
              </Button>
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <ContributeForm minAmount={minimumContribution} contractAddress={address}/>
          </Grid>
          <Grid item xs={12} sm={1} />
        </Grid>
      </Layout>
    );
  }
}

export default IndividualCampaign;
