import React from "react";

import { TableRow, TableCell, Button } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";

import CheckmarkIcon from '@material-ui/icons/Check'

import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

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
      backgroundColor: theme.palette.common.white,
    },
  },
}))(TableRow);

const RequestRow = ({
  index,
  description,
  value,
  recipient,
  approvalCount,
  approversCount,
  address,
  complete,
}) => {
  const onApprove = async () => {
    const campaign = Campaign(address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequests(index).send({
      from: accounts[0],
    });
  };

  const onFinalize = async () => {
    const campaign = Campaign(address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(index).send({
      from: accounts[0],
    });
  };

  return (
    <StyledTableRow key={index} selected={complete}>
      <StyledTableCell component="th" scope="row">
        {index}
      </StyledTableCell>
      <StyledTableCell align="center">{description}</StyledTableCell>
      <StyledTableCell align="center">{value}</StyledTableCell>
      <StyledTableCell align="center">{recipient}</StyledTableCell>
      <StyledTableCell align="center">
        {approvalCount}/{approversCount}
      </StyledTableCell>
      <StyledTableCell align="center">
        {complete ? <CheckmarkIcon /> : (
          <Button variant="outlined" onClick={onApprove}>
            Approve
          </Button>
        )}
      </StyledTableCell>
      <StyledTableCell align="center">
        {complete ? <CheckmarkIcon /> : (
          <Button variant="outlined" color="primary" onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RequestRow;
