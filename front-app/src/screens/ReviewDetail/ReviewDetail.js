import React from "react";
import GradeBox from '../../components/HosGrades/GradeBox'
import ReviewPrice from '../../components/ReviewPrice/ReviewPrice'
import styles from './mystyle.module.scss';
import ThumbIcon from '@material-ui/icons/ThumbUpAlt';
import SportsIcon from '@material-ui/icons/Sports';
import classNames from 'classnames/bind';
import { connect } from "react-redux";
import { review } from '../../actions';

const cx = classNames.bind(styles)

class ReviewDetail extends React.Component {
  componentDidMount () {
    review.getHosReview(10)
  }

  constructor(props) {
    super(props);
    const scorelist =  [0, 0, 0, 0]
    const scorelabel = ['적정한 치료', '친절함', '치료결과', '청결']
    const grade = scorelist.map((g, i) => ({name:scorelabel[i], score:g}))
    const totalgrade = this.calcTotalScore(scorelist)
    this.state = {
      grade: grade,
      totalgrade: totalgrade,
      editablegrade: false,
    };

  }

  calcTotalScore(scorelist) {
    const totalscore = Math.round(((scorelist.reduce((a, b) => a + b, 0) / scorelist.length) + Number.EPSILON) * 100)/100
    const totalgrade = [{name:'평균평점', score:totalscore}]
    return totalgrade
  }

  render() {
    const photolist = this.props.reviewData.r_photo.split(',')
    const photos = photolist.map(
      p => (
        <img className={cx('photo')} src={p} key={p} alt={p}/>
      )
    )

    const totallike = this.props.reviewData.Like.length
    const tags = []

    for (const [index, value] of this.props.reviewData.tags.entries()) {
      console.log(value)
      tags.push(<div className={cx('tag')} key={index}>#{value}</div>)
    }

    return (
      <div className={cx('container')}>
        <div className={cx('meta-box')}>
          <p>{this.props.reviewData.r_treatmentdata} 진료</p>
          <p>{this.props.reviewData.r_date} 작성</p>
        </div>
        <div className={cx('tag-box')}>
          {tags}
        </div>
        <div className={cx('number')}>
          <div className={cx('icon-box')}>
            <SportsIcon fontSize="small"/>
            <p>신고다옹</p>
          </div>
          <div className={cx('icon-box')}>
            <ThumbIcon fontSize="small"/>
            <p>좋다옹 {totallike}</p>
          </div>
        </div>
        <div className={cx('category')}><p>병원상세평가</p></div>
        <GradeBox 
          grade={this.state.grade} 
          dojang={this.props.reviewData.r_revisit} 
          totalgrade={this.state.totalgrade}
          editable={this.editablegrade}
          />
        <div className={cx('category')}><p>진료 후기 상세</p></div>
        <div className={cx('basic-box')}>
          <p>
            {this.props.reviewData.r_content}
          </p>
        </div>
        <div className={cx('category')}><p>사진후기</p></div>
        <div className={cx('photo-box')}>
          {photos}
        </div>
        <div className={cx('category')}><p>비용표</p></div>
        <div className={cx('price-box')}>
          <ReviewPrice careinfo={this.props.reviewData.careinfo}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    reviewData: state.review.hosReview,
  };
};

export default connect(mapStateToProps)(ReviewDetail);
 

 