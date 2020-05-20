import React, { Component } from "react";
import styles from './mystyle.module.scss';

class ReviewPrice extends Component {
  componentDidMount() {
  
  }
  constructor(props) {
    super(props);
  }
 
  render() {
    const price = this.props.careinfo.map(
      ci => (
        <div className={styles.div__pricebox} key={ci.ci_no}>
          <p className={styles.p__name}>{ci.CareList.c_name}</p>
          <p className={styles.p__price}>{ci.ci_price}원</p>
        </div>
      )
    )
    return (
      <div>
        {price}
      </div>
    );
  }
}



export default ReviewPrice;
