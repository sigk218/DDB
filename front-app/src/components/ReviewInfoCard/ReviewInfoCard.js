import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';

import SkipNextIcon from '@material-ui/icons/SkipNext';
import BookmarkIcon from '@material-ui/icons/Bookmark';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,

  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  MarkContainer: {
    display: 'flex',
    alignItems: 'right',
    textAlign: "right",
    paddingLeft: theme.spacing(5),
  },
  BookmarkIcon: {
    height: 38,
    width: 38,

  },
}));

const ReviewInfoCard = props => {
  const classes = useStyles();
  const theme = useTheme();
  console.log(props.hospitalData)
  let hosData = props.hospitalData
  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={hosData.h_image}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h8" variant="h8">
              {hosData.h_name}
            </Typography>
            <br />
            <Typography component="h8" variant="h8" color="textSecondary">
              #tag #tag #tag
          </Typography>
            
          </CardContent>

        </div>


        <Typography className={classes.MarkContainer}>
          <BookmarkIcon className={classes.BookmarkIcon} />
        </Typography>
      </Card>
      <br />
    </div>


  );
}

export default ReviewInfoCard