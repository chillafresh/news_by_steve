/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const useStyles = makeStyles(styles);

const watson_script =
  "window.watsonAssistantChatOptions = {" +
  "integrationID: 'c947c3a0-7a64-4fe7-841f-817ee2d4b2b7'," +
  "region: 'eu-gb'," +
  "serviceInstanceID: '0b081cf6-7d42-45fb-937f-c507cc976130'," +
  "onLoad: function(instance) { instance.render(); }" +
  "};" +
  "setTimeout(function(){" +
  "const t=document.createElement('script');" +
  "t.src='https://web-chat.global.assistant.watson.appdomain.cloud/versions/' + (window.watsonAssistantChatOptions.clientVersion || 'latest') + '/WatsonAssistantChatEntry.js';" +
  "document.head.appendChild(t);" +
  "});";

export default function Notifications() {
  const classes = useStyles();
  const [tl, setTL] = React.useState(false);
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);

  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  React.useEffect(() => {
    var script = document.createElement("script");
    script.innerHTML = watson_script;
    document.body.appendChild(script);
  }, []);
  const showNotification = (place) => {
    switch (place) {
      case "tl":
        if (!tl) {
          setTL(true);
          setTimeout(function () {
            setTL(false);
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function () {
            setTC(false);
          }, 6000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function () {
            setTR(false);
          }, 6000);
        }
        break;
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function () {
            setBL(false);
          }, 6000);
        }
        break;
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function () {
            setBC(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function () {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };

  const [state, setState] = React.useState({
    Tech: false,
    Entertainment: false,
    Sports: false,
    Politics: false,
    Business: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { Tech, Entertainment, Sports, Politics, Business } = state;
  const error = [Tech, Entertainment, Sports, Politics, Business].filter((v) => v).length !== 2;

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>Welcome to News by Steve</h4>
        <p className={classes.cardCategoryWhite}>
          Let's get started by selecting a few of your favorite articles down below
        </p>
      </CardHeader>
      <CardBody>
        <GridContainer>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={10} lg={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
              <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Articles</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={Tech} onChange={handleChange} name="Tech" />
            }
            label="Tech"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Entertainment} onChange={handleChange} name="Entertainment" />
            }
            label="Entertainment"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Sports} onChange={handleChange} name="Sports" />
            }
            label="Sports"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Politics} onChange={handleChange} name="Politics" />
            }
            label="Politics"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Business} onChange={handleChange} name="Business" />
            }
            label="Business"
          />
        </FormGroup>
      </FormControl>
      <Button
                color="info"
                onClick={(e) => {
                  e.preventDefault();
                  sleep(1500);
                  window.location.href = "/admin/dashboard";
                }}
              >
                Submit Articles
              </Button>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </CardBody>
    </Card>
  );
}
