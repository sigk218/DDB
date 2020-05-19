import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Avatar from "@material-ui/core/Avatar";
import history from "../../history";


class HosInfoCard extends Component {
  render() {
    console.log("========HosInfoCard========")
    //console.log(this.props.hospitalData)
    const gotoHosDetail = e => {
      history.push(
        `/Main`
      );
    };
    const styles = {
      container: {
        textAlign: "left",
        marginBottom: 12,
        marginTop: 12,
        marginLeft: 12,
        marginRight: 12,
        minWidth: this.props.widthPer,
        cursor: "pointer"
      },

      address: {
        textAlign: "right"
      },

    };
    let hosData = this.props.hospitalData;
    
    if (hosData) {
      console.log("========info===")
      return (
        <Card style={styles.container} variant="outlined" onClick={gotoHosDetail}>
          <CardContent>
            <Typography variant="body2" component="p" style={styles.address}>
              {hosData.h_name}
            </Typography>
          </CardContent>
        </Card>
      );
    } else {
      return null;
    }
  }
}

export default HosInfoCard;
