import React, { Component } from "react";

import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Layout from "../../../components/Layout";
import styles from "./index.module.scss";

import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

import RequestRow from '../../../components/RequestRow';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    console.log(requestCount);
    let requests = [];
    for (let i=0; i < requestCount; ++i){
      const res = await campaign.methods.requests(i).call();
      requests.push(res);
    }

    return { address, requests, approversCount, requestCount };
  }

  render() {
    const { address, requests, approversCount, requestCount } = this.props;
    return (
      <Layout>
        <Grid container>
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={10}>
            <Grid container justify="space-between">
              <Typography variant="h4">Requests</Typography>
              <Link route={`/campaigns/${address}/requests/new`}>
                <Button variant="contained" color="primary">
                  Add Request
                </Button>
              </Link>
            </Grid>
            <Grid container className={styles.tableWrapper}>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>S.No.</StyledTableCell>
                      <StyledTableCell align="center">
                        Description
                      </StyledTableCell>
                      <StyledTableCell align="center">Amount</StyledTableCell>
                      <StyledTableCell align="center">
                        Recipient
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Approval Count
                      </StyledTableCell>
                      <StyledTableCell align="center">Approve</StyledTableCell>
                      <StyledTableCell align="center">Finalize</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requests.map((request, index) => (
                      <RequestRow
                        key={index+request.recipient}
                        index={index}
                        description={request.description}
                        value={web3.utils.fromWei(request.value,'ether')}
                        recipient={request.recipient}
                        address={address}
                        complete={request.completed}
                        approvalCount={request.approvalsCount}
                        approversCount={approversCount}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="body2" className={styles.bottomInfo}>
                Found {requestCount} Requests
              </Typography>
              <Typography gutterBottom>
                In this page Users conrtributors can approve a request to withdraw balance from smart contract to the designated address as specified by campaign manager.
              </Typography>
              <Typography variant="caption" >
                Requires a majority of approvals to be finalized by manager to transact the money.
              </Typography>
              <Typography variant="caption" >
                If a request has been already approved it will be shown as approved and finalized
              </Typography>
              <Typography variant="caption" >
                If a user is not a conrtributor in current campaign he can't approve the requests.
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1} />
        </Grid>
      </Layout>
    );
  }
}

export default RequestIndex;
