import React, { Component } from "react";
import Rating from '@material-ui/lab/Rating';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

class HosGrades extends Component {
  // constructor(props) {
  //   super(props)
  // }

  handleGradeChange(e) {
    this.props.onChange(e.target.name, parseInt(e.target.value))
  }
 
  render() {
    const ratings = this.props.grade.map(
      r =>
        <div className={cx('rating-box')} key={r.name}>
          <p className={cx('box-item')}>{r.name}</p>
          <Rating 
            name={r.name} 
            value={r.score} 
            size="small"
            precision={0.5}
            onChange={this.handleGradeChange.bind(this)}
          />
        </div>
    )
    return (
      <div>
        {ratings}
      </div>
    );
  }
}



export default HosGrades;
