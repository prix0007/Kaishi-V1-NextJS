import React from "react";

import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import styles from "./Header.module.scss";
import { Link } from "../routes";

const Header = () => {
  return (
    <AppBar position="static" className={styles.root}>
      <Toolbar className={styles.contentRoot}>
        <Link route="/">
          <Typography component="h5" variant="h5" className={styles.headerIcon}>
            Kaishi
          </Typography>
        </Link>
        <div className={styles.rightContent}>
          <Link route="/campaigns/new">
            <Tooltip title="Create a new Campaign">
              <IconButton>
                <AddIcon className={styles.addIcon} />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
