import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { Link } from "react-router-dom";
import clsx from "clsx";
import JWTRegisterTab from "./tabs/JWTRegisterTab";
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
    color: "white",
    padding: theme.spacing(2)
  }
}));

function Register() {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.root,
        "flex flex-col flex-1 flex-shrink-0 p-24 md:flex-row md:p-0"
      )}
    >
      <div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
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
      </div>

      <FuseAnimate animation={{ translateX: [0, "100%"] }}>
        <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
          <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
            <Typography variant="h6" className="md:w-full mb-32">
              CREATE AN ACCOUNT
            </Typography>

            <JWTRegisterTab />

            <div className="flex flex-col items-center justify-center pt-32 pb-24">
              <span className="font-medium">Already have an account?</span>
              <Link className="font-medium" to="/login">
                Login
              </Link>
              <Link className="font-medium mt-8" to="/">
                Back to Dashboard
              </Link>
            </div>

            <div className="flex flex-col items-center" />
          </CardContent>
        </Card>
      </FuseAnimate>
    </div>
  );
}

export default Register;
