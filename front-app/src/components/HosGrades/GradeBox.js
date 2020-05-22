import React from "react";
import HosGrade from '../../components/HosGrades/HosGrades'
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class GradeBox extends React.Component {

  componentDidMount() {
  }

  render() {

    return (
        <div className={cx('basic-box', 'relative')}>
          <HosGrade 
            grade={this.props.grade}
            onChange={this.props.onChange.bind(this)}
            />
          <div className={cx('divider')}></div>
          <HosGrade grade={this.props.totalgrade}/>
          <img className={this.props.dojang? cx('show') : cx('hide')} src={this.props.dojang}/>
        </div>
    );
  }
}



export default GradeBox;