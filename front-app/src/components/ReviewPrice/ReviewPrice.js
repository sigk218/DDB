import React, { Component } from "react";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class ReviewPrice extends Component {
  render() {
    const price = this.props.careinfo.map(
      ci => (
        <div className={cx('price-box')} key={ci.ci_no}>
          <p className={cx('menu')}>{ci.CareList.c_name}</p>
          <p className={cx('price')}>{ci.ci_price}원</p>
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
