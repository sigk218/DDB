import React from "react";
import HosGrades from '../../components/HosGrades/HosGrades'
import ReviewPrice from '../../components/ReviewPrice/ReviewPrice'
import styles from './mystyle.module.scss';
import StarIcon from '@material-ui/icons/Star'
import ThumbIcon from '@material-ui/icons/ThumbUpAlt'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const reviewData = {
  r_no: 0,
  u_id: 'aestas',
  r_nickname: '익명의 코끼리',
  r_photo: 'https://image.dongascience.com/Photo/2016/11/14787852197048.jpg,https://image.edaily.co.kr/images/Photo/files/NP/S/2019/01/PS19010200963.jpg,https://image.dongascience.com/Photo/2016/11/14787852197048.jpg',
  r_content: '2010년부터 다니던 병원입니다. 고양이가 아파해서 정기적으로 검진받다가 중성화 수술을 하게되었습니다. 감사합니다~',
  r_reciept: true,
  r_treatmentdata: '2020-05-10',
  r_date: '2020-05-10',
  tags: ['중성화수술', "고양이", "샴", "15kg",'중성화수술', "고양이", "샴", "15kg",],
  r_overtreatement: 1,
  r_kindness: 4,
  r_result: 4,
  r_clean: 4,
  r_report: 0,
  r_deleted: false,
  Like: [{u_id:1}, {u_id:2}, {u_id:3}],
  careinfo: [
    {
      ci_no: 2,
      h_code: 1,
      ci_vet: '고양이',
      ci_price:25000,
      CareList: {
        c_code: 3,
        c_name: '중성화수술',
        c_category: '수술'
      },
      r_no: 0
    },
    {
      ci_no: 3,
      h_code: 1,
      ci_vet: '고양이',
      ci_price:30000,
      CareList: {
        c_code: 4,
        c_name: '붕대',
        c_category: '시술'
      },
      r_no: 0
    }],
  h_code: 1
}

class ReviewDetail extends React.Component {
  componentDidMount() {
  }
  constructor(props) {
    super(props);
    this.state = {
      grade: [
        {
          name: '적절한 치료',
          score:reviewData.r_overtreatement
        },
        {
          name: '친절함',
          score:reviewData.r_kindness
        },
        {
          name: '치료결과',
          score:reviewData.r_result
        },
        {
          name: '청결',
          score:reviewData.r_clean
        }
      ]
    };
  }
  users() {

  }
  render() {
    const photolist = reviewData.r_photo.split(',')
    const photos = photolist.map(
      p => (
        <img className={cx('photo')} src={p} key={p}/>
      )
    )
    const scorelist =  this.state.grade.map(g => g.score)
    const totalscore = Math.round(((scorelist.reduce((a, b) => a + b, 0) / scorelist.length) + Number.EPSILON) * 100)/100
    const totallike = reviewData.Like.length
    const tags = []
    for (const [index, value] of reviewData.tags.entries()) {
      console.log(value)
      tags.push(<div className={cx('tag')} key={index}>#{value}</div>)
    }
    return (
      <div className={cx('container')}>
        <div className={cx('basic','meta')}>
          <p>진료날짜:{reviewData.r_treatmentdata}</p>
          <p>작성날짜:{reviewData.r_date}</p>
        </div>
        <div className={cx('tagBox')}>
          {tags}
        </div>
        <div className={cx('basic', 'number')}>
          <div className={cx('iconBox')}>
            <StarIcon/>
            <p>{totalscore}</p>
          </div>
          <div className={cx('iconBox')}>
            <ThumbIcon/>
            <p>{totallike}</p>
          </div>
        </div>
        <div className={cx('sticker')}>병원 세부 평가</div>
        <div className={cx('box')}>
          <HosGrades grade={this.state.grade}/>
        </div>
        <div className={cx('sticker')}>진료 후기 상세</div>
        <div className={cx('basic')}>
          <p>
            {reviewData.r_content}
          </p>
        </div>
        <div className={cx('sticker')}>사진 후기</div>
        <div className={cx('photoBox')}>
          {photos}
        </div>
        <div className={cx('sticker')}>비용표</div>
        <div className={cx('transBox')}>
          <ReviewPrice careinfo={reviewData.careinfo}/>
        </div>
      </div>
    )
  }
}



export default ReviewDetail;
