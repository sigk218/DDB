import React from 'react';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles)

const HosInfoCard = props => {
  let {hname, haddress} = props.hospitalData;
  return (
    <>
      <div className={cx('container-box')}>
        <div className={cx('photo-box')}>
          {/* <img className={cx('photo')} src={} /> */}
        </div>
        <div className={cx('column-box')}>
          <div className={cx('hos-name')}>
            {hname}
          </div>
          <div className={cx('tag-box')}>
            <div className={cx('tag')} >#중성화</div>
            <div className={cx('tag')} >#광견병</div>
            <div className={cx('tag')} >#예방접종</div>
          </div>
          <p>{haddress}</p>
        </div>
        <br />
      </div>

    </>

  );
}

export default HosInfoCard