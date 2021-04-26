import React from 'react';

import {IconButton, Typography} from '@material-ui/core';

import styles from './Footer.module.scss';

import Github from '@material-ui/icons/GitHub';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Typography>
                This is a Open Campaign Application build on Ethereum Smart Contract. Deployed on Rinkeby Testnet.
            </Typography>
            <IconButton onClick={() => {window.open("https://github.com/prix0007/Kaishi-V1-NextJS.git")}}>
                <Github color="primary" />
            </IconButton>
        </div>
    )
}

export default Footer
