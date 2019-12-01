import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { Link } from "react-router-dom";
import clsx from "clsx";
import JWTLoginTab from "./tabs/JWTLoginTab";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: "url('/assets/images/backgrounds/indoor-gym.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    color: theme.palette.primary.dark
  },
  text: {
    color: "white",
    padding: theme.spacing(2),
    fontFamily: "Julius Sans One",
    textShadowColor: "white",
    fontWeight: "bold"
  },
  subText: {
    //color: "white",
    padding: theme.spacing(2),
    fontFamily: "Julius Sans One"
  }
}));

function Login() {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0"
      )}
    >
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
        {/* <FuseAnimate animation="transition.expandIn">
          <img
            className="w-128 mb-32"
            src="assets/images/logos/fuse.svg"
            alt="logo"
          />
        </FuseAnimate> */}

        <FuseAnimate animation="transition.slideUpIn" delay={400}>
          <Typography
            variant="h2"
            color="primary"
            fontWeight="fontWeightBold"
            className={classes.text}
          >
            Welcome to Hackathon!
          </Typography>
        </FuseAnimate>
        <div />
        {/* <FuseAnimate delay={400}>
          <Typography variant="h4" color="primary" className={classes.subText}>
            The world is your gym
          </Typography>
        </FuseAnimate> */}
      </div>

      <FuseAnimate animation={{ translateX: [0, "100%"] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="text-center md:w-full mb-48">
              LOGIN TO YOUR ACCOUNT
            </Typography>

            <JWTLoginTab />

            <div className="flex flex-col items-center justify-center pt-32">
              <span className="font-medium">Don't have an account?</span>
              <Link className="font-medium" to="/register">
                Create an account
              </Link>
              <Link className="font-medium mt-8" to="/dashboard">
                Back to Dashboard
              </Link>
            </div>
          </CardContent>
        </Card>
      </FuseAnimate>
    </div>
  );
}

export default Login;
