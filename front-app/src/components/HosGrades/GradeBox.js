import React from "react";
import HosGrade from '../../components/HosGrades/HosGrades'
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

import { connect } from 'react-redux'

const cx = classNames.bind(styles)

class GradeBox extends React.Component {

  render() {
    const dojangMark = require("../../assets/visitnyang.png")
    const { grade, editable, totalgrade, dojang } = this.props.hosGrade
    return (
        <div className={cx('basic-box', 'relative')}>
          <HosGrade 
            grade={grade}
            editable={!editable}
            />
          <div className={cx('divider')}></div>
          <HosGrade grade={totalgrade}/>
          <img 
            className={dojang? cx('show') : cx('hide')} 
            src={dojang? dojangMark : undefined }
            alt='dojang' 
          />
        </div>
    );
  }
}




const mapStateToProps = state => {
  return {
    hosGrade: state.hosGrade,
  };
};


export default connect(
  mapStateToProps
)(GradeBox)