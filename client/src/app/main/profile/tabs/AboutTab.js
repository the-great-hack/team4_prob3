import React, { useEffect, useState } from "react";
import {
  Avatar,
  AppBar,
  Button,
  Card,
  CardContent,
  Icon,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import { FuseAnimateGroup } from "@fuse";
import axios from "axios";

function AboutTab() {
  const [data, setData] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    axios.get("/api/profile/about").then(res => {
      setData(res.data);
    });
    axios.get("/api/profile/timeline").then(res => {
      setReviews(res.data);
    });
  }, []);

  if (!data || !reviews) {
    return null;
  }

  const { general, contact } = data;

  return (
    <div className="md:flex max-w-2xl">
      <div className="flex flex-col flex-1 md:pr-32">
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn"
          }}
        >
          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  General Information
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Gender
                </Typography>
                <Typography>{general.gender}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Birthday
                </Typography>
                <Typography>{general.birthday}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Locations
                </Typography>

                {general.locations.map(location => (
                  <div className="flex items-center" key={location}>
                    <Typography>{location}</Typography>
                    <Icon className="text-16 ml-4" color="action">
                      location_on
                    </Icon>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  About Me
                </Typography>
                <Typography>{general.about}</Typography>
              </div>
            </CardContent>
          </Card>

          <Card className="w-full mb-16">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  Contact
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Address
                </Typography>
                <Typography>{contact.address}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">Tel.</Typography>

                {contact.tel.map(tel => (
                  <div className="flex items-center" key={tel}>
                    <Typography>{tel}</Typography>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Website
                </Typography>

                {contact.websites.map(website => (
                  <div className="flex items-center" key={website}>
                    <Typography>{website}</Typography>
                  </div>
                ))}
              </div>

              <div className="mb-24">
                <Typography className="font-bold mb-4 text-15">
                  Emails
                </Typography>

                {contact.emails.map(email => (
                  <div className="flex items-center" key={email}>
                    <Typography>{email}</Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FuseAnimateGroup>
      </div>

      <div className="flex flex-col md:w-320">
        <FuseAnimateGroup
          enter={{
            animation: "transition.slideUpBigIn"
          }}
        >
          <Card className="w-full">
            <AppBar position="static" elevation={0}>
              <Toolbar className="pl-16 pr-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1"
                >
                  Reviews
                </Typography>
                <Button color="inherit" size="small">
                  See All
                </Button>
              </Toolbar>
            </AppBar>
            <CardContent className="p-0">
              <List>
                {reviews.activities.map(activity => (
                  <ListItem key={activity.id} className="">
                    <Avatar
                      alt={activity.user.name}
                      src={activity.user.avatar}
                    />
                    <ListItemText
                      className="flex-1"
                      primary={
                        <div className="truncate">
                          <Typography
                            className="inline font-medium"
                            color="primary"
                            paragraph={false}
                          >
                            {activity.user.name}
                          </Typography>

                          <Typography
                            className="inline ml-4"
                            paragraph={false}
                            variant="caption"
                          >
                            {activity.message}
                          </Typography>
                        </div>
                      }
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </FuseAnimateGroup>
      </div>
    </div>
  );
}

export default AboutTab;
