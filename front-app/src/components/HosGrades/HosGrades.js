import React, { Component } from "react";
import Rating from '@material-ui/lab/Rating';
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

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
        <div className={cx('rating-box')} key={r.name}>
          <p className={cx('box-item')}>{r.name}</p>
          <Rating 
            name="read-only" 
            value={r.score} 
            readOnly
            size="small"
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
