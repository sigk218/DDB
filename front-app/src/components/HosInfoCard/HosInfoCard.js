import React from 'react';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';
import history from'../../history';

const cx = classNames.bind(styles)

const HosInfoCard = props => {
  let {hname, haddress, hospitalPicture, hstarrating, hreviewCount} = props.hospitalData;
  const localhos= props.hospitalData;
  function handleOnClick() {
    history.push("/HosDetail", { localhos })
  }

  const hosImage = ((hospitalPicture !== null) && (hospitalPicture.length > 0)) ? 
  <img className={cx('hos-photo')} src={hospitalPicture[1].himage}/>
  : <img className={cx('hos-photo')} src={require('../../assets/imgA.png')}/>
  return (
      <div className={cx('container-box')} onClick={() => handleOnClick()}>
        <div className={cx('box-header')}>
          <div className={cx('hos-name')}>
            <p>{hname}</p>
          </div>
          <div className={cx('box-body')}>

            <div className={cx('meta-box')}>
              <img className={cx('hos-icon')} src={require('../../assets/star.png')}/>
              <p>평점 : {hstarrating}점</p>
              <img className={cx('hos-icon')} src={require('../../assets/review4.png')}/>
              <p>리뷰 : {hreviewCount === null ? 0 : hreviewCount}개</p>
            </div>

            <div className={cx('tag-box')}>
              <div className={cx('tag')} >#중성화</div>
              <div className={cx('tag')} >#광견병</div>
              <div className={cx('tag')} >#예방접종</div>
            </div>
            <p className={cx('hos-address')}>{haddress}</p>

        </div>


        </div>
          <div className={cx('hos-photo-box')}>
            {hosImage}
          </div>
      </div>
  );
}

export default HosInfoCard