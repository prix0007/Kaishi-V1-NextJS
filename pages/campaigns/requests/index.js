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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;

    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    console.log(requestCount);

    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

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
              <Typography variant="caption">
                Found {requestCount} Requests
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
