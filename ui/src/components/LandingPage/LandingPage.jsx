import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Hero from './Hero';
import AboutUs from './AboutUs';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    page: {
  
    }
}))

const LandingPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.page}>
     
        </div>
    )
}
export default LandingPage;