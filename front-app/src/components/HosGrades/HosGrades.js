import React, { Component } from "react";
import Rating from '@material-ui/lab/Rating';
import styles from './mystyle.module.scss';

class HosGrades extends Component {
  componentDidMount() {
  
  }
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  render() {
    const ratings = this.props.grade.map(
      r => (
        <div className={styles.div__ratingbox} key={r.name}>
          <p className={styles.p__boxitem}>{r.name}</p>
          <Rating 
            className={styles.score} 
            name="read-only" 
            value={r.score} 
            readOnly
            precision={0.5}
          />
        </div>
      )
    )
    return (
      <div>
        {ratings}
      </div>
    );
  }
}



export default HosGrades;
