import React from "react";

import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "styles/components/Spinner";

const useStyles = makeStyles(styles);

const Spinner = props => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <CircularProgress
                className={props.noMargin ? classes.downloadProgress : classes.progress}
                variant="indeterminate"
                disableShrink
                {...props}
            />
        </div>
    );
};

export default Spinner;
