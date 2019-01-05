import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
    overflow: 'hidden',
  },
  paper: {
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
  },
});


function PaperSheet(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.paper} elevation={15}>
        <Grid container wrap="nowrap" spacing={16} >
          <Grid item xs>
            <Typography variant="h5" component="h3">
              Location Description
            </Typography>
            <Typography component="p">
              This will be the information describing the certain Access Point.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);