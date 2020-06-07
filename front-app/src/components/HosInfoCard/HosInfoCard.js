import React from 'react';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';
import history from'../../history';

const cx = classNames.bind(styles)

const HosInfoCard = props => {
  let {hname, haddress, hospitalPicture} = props.hospitalData;
  var localhos= props.hospitalData;
    function HandleOnClick() {
      console.log(localhos)
      history.push("/HosDetail", { localhos })
    }

  const hosImage = ((hospitalPicture !== null) && (hospitalPicture.length > 0)) ? 
  <img className={cx('photo')} src={hospitalPicture[1].himage}/>
  : <img className={cx('photo')} src={require('../../assets/imgA.png')}/>
  return (
    <>
      <div className={cx('container-box')} onClick={() => HandleOnClick()}>
        <div className={cx('photo-box')}>
          {hosImage}
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