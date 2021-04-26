import React from 'react';

import {AppBar, Typography} from '@material-ui/core';

import styles from './Footer.module.scss';

const Footer = () => {
    return (
        <div  className={styles.footer}>
            <Typography>
                This is a Open Campaign Application build on Ethereum Smart Contract. Deployed on Rinkeby Testnet.
            </Typography>
        </div>
    )
}

export default Footer
