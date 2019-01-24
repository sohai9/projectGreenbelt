import React, { Component } from "react";
import Post from "../components/Post/Post";
import "../App.css";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Card from "@material-ui/core/Card";
import CardMedia from '@material-ui/core/CardMedia';


//Material UI Icons for Menu
import AccountBalance from "@material-ui/icons/AccountBalance";
import LocationOn from "@material-ui/icons/LocationOn";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Person from "@material-ui/icons/Person";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
    overflow: "hidden"
  },
  posts: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 500,
    minwidth: 275
  },
  list: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
    maxWidth: 800,
    minwidth: 275,
    height: 600
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2
  },
  inline: {
    display: 'inline',
  },
  postStyle: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  menuItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    },
    menuButton: {
      marginLeft: -10,
      marginRight: 0
    }
  },
  grow: {
    flexGrow: 1
  },
  media: {
    height: 0,
    /* paddingTop: '56.25%', // 16:9 */
  },
  text: {
    marginTop: 10,
    marginLeft: 15,
    width: '95%',
    maxWidth: 450,
    minWidth: 150
  }
});
class Social extends Component {
  state = {
    otherPosts: [],
    post: "",
    anchorEl: null,
    toProfile: false,
    // emailInput: "", //set name of input taking in email to name='emailInput'
    date: Date.now(),
    currentUser: {}
  };
  getUserInfo = user => {
    let token;
    token = localStorage.getItem("access_token");
    this.props.auth.lock.getUserInfo(token, (err, profile) => {
      if (err) {
        console.log("problem with getting user data");
      } else {
        this.setState({ currentUser: profile });
      }
    });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //handleEmailChange
  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    this.getPosts();
    this.getUserInfo();
  }
  
  handleFormSubmit = event => {
    const { post, date } = this.state;
    let userName = this.state.currentUser.nickname;
    API.savePost({
      post,
      date,
      userName
    })
      .then(
        res => alert(`Your post has been added to Green Toad.`),
        window.location.reload()
      )
      .catch(err => console.log(err));
  };
  
  getPosts = props => {
    API.getPosts()
      .then(res => this.setState({ otherPosts: res.data }))
      .catch(err => console.log(err));
    console.log(this.props);
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfile = () => {
    this.setState({ toProfile: true });
  };

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }


  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;
    console.log(isAuthenticated());
    const { anchorEl } = this.state;
    if (this.state.toProfile === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <div>
        {withStyles}
        <AppBar position="static">
          <Toolbar className="theme">
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Project GreenBelt
            </Typography>
            {isAuthenticated() && (
              <Button onClick={this.logout.bind(this)} color="inherit">
                Logout
              </Button>
            )}
            {!isAuthenticated() && (
              <Button onClick={this.login.bind(this)} color="inherit">
                Login
              </Button>
            )}

            <IconButton
              className={styles.menuButton}
              color="inherit"
              aria-label="Menu"
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              {isAuthenticated() && (
                <MenuItem
                  onClick={this.handleClose}
                  className={classes.menuItem}
                >
                  <ListItemIcon className={classes.icon}>
                    <Person />
                  </ListItemIcon>

                  <ListItemText
                    classes={{ primary: classes.primary }}
                    inset
                    primary="Profile"
                    onClick={() => this.handleProfile()}
                  />
                </MenuItem>
              )}

              <MenuItem
                onClick={this.handleClose}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.icon}>
                  <AccountBalance />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  inset
                  primary="Home"
                />
              </MenuItem>
              <MenuItem
                onClick={this.handleClose}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.icon}>
                  <LocationOn />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  inset
                  primary="Location"
                />
              </MenuItem>
              <MenuItem
                onClick={this.handleClose}
                className={classes.menuItem}
              >
                <ListItemIcon className={classes.icon}>
                  <Fingerprint />
                </ListItemIcon>
                <ListItemText
                  classes={{ primary: classes.primary }}
                  inset
                  primary="Logout"
                />
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Card className="card">
          <CardMedia
            className="cardText"
            image="../assets/img/Social.jpg"
            height="140"
            title="Hot Chicks"
            >
            <Typography className={classes.text} variant="h4" component="h3" color="secondary">
              Greenbelt Happenings
            </Typography>
            <Typography className={classes.text} variant="body1" component="h3" color="secondary">
              Looking for something to do or wondering where all the action is at? 
              Here you can checkout the latest status updates and activities at all the access points 
              on the trails provided in real-time by fellow Greenbelters. The posts are updated daily to keep you informed
              and aware. You can also post to the page if you would like to add your own status updates. 
              Post about anything. How's the water? Is the Trail muddy? Parking? Crowds? Mega hippie drum circles? 
              Let us know!
            </Typography>
          </CardMedia>
        </Card>
        <Paper className={classes.paper} elevation={20}>
          <Post
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
          />
          <br />
          <Paper className={classes.posts} elevation={20}>
            <Grid container wrap="nowrap" spacing={16}>
              <Grid item xs>
                <Typography variant="h5" component="h3">
                  Current Location Updates:
                </Typography>
                <hr />
                <Paper className={classes.list} elevation={20}>
                  <List className={classes.postStyle} id="list">
                    {this.state.otherPosts.map(post => {
                      return (
                        <Typography>
                          <ListItem key={post._id} alignItems="flex-start">
                            <ListItemAvatar>
                              <Avatar
                                src={this.state.currentUser.picture}
                              />
                            </ListItemAvatar>
                            <ListItemText
                            primary={''}
                            secondary={
                              <React.Fragment>
                                <Typography component="span" className={classes.inline} color="textPrimary">
                                  {this.state.currentUser.nickname}
                                </Typography>
                                 - {post.post}
                              </React.Fragment>
                            }
                            />
                          </ListItem>
                        </Typography>
                      );
                    })}
                  </List>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Paper>
        <div className="footer">
          <div>
            <List>
              <ListItem>
                <div>
                  &copy; {1900 + new Date().getYear()} ,{" "}
                  Project Greenbelt
                </div>
                <IconButton
                  justIcon
                  color="primary"
                >
                  <a 
                    href="https://github.com/projectGreenbelt/projectGreenbelt"
                    classname="iconButton"
                  >
                    <i className="fab fa-github-square" id="icon" aria-hidden="true" color="secondary" />
                  </a>
                </IconButton>
              </ListItem>
            </List>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Social);
