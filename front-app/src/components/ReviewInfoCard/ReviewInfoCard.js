import React from 'react';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles)

const ReviewInfoCard = props => {

  let hosData = props.hospitalData;
  return (
    <>
      <div className={cx('container-box')}>
        <div>
          <p>sdfasdfa</p>
        </div>
        <br />
      </div>
    </>
  );
}

export default ReviewInfoCard