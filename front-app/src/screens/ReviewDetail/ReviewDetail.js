import React from "react";
import HosGrades from '../../components/HosGrades/HosGrades';
import ReviewPrice from '../../components/ReviewPrice/ReviewPrice';
import styles from './mystyle.module.scss';
import ThumbIcon from '@material-ui/icons/ThumbUpAlt';
import SportsIcon from '@material-ui/icons/Sports';
import classNames from 'classnames/bind';
import { connect } from "react-redux";
import {getReviewData} from '../../actions';

const cx = classNames.bind(styles)

const reviewData = {
  r_no: 0,
  u_id: 'aestas',
  r_nickname: '익명의 코끼리',
  r_photo: 'https://lh3.googleusercontent.com/proxy/QYikpOM5d8B4H0_YTn1sfYzEQcGYjKwUtseoQXBpXqhjh3bsn04ZdeNL533bsCyivn3OzERLxq2zBPl5l9rt_UU_B6PlMBkQHef624cQ8DI0TjJkozUb8Qyhs8kYkTGclUI-uGs83FjcgEo,http://www.busan.com/nas/wcms/wcms_data/photos/2020/02/12/2020021209194665170_l.jpg,https://modo-phinf.pstatic.net/20160629_37/1467141681611RHSrJ_JPEG/mosaazDVas.jpeg?type=w1100',
  r_content: '2010년부터 다니던 병원입니다. 고양이에게 중성화 수술은 꼭 필요한 것 같아요. 계속 힘들어해서 몇 차례 검진 받고 선생님과 상담후에 중성화 수술을 하게되었습니다. 선생님 정말 친절하시고요 여기 애견용 풀도 있는 것 같아서 상처 부위 치료되면 또 오려고요!',
  r_reciept: true,
  r_treatmentdata: '2020-05-10',
  r_date: '2020-05-10',
  tags: ['중성화수술', "고양이", "15kg",'정기적', "친절", "전용풀장", "감사"],
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
    },
    {
      ci_no: 4,
      h_code: 1,
      ci_vet: '고양이',
      ci_price:50000,
      CareList: {
        c_code: 2,
        c_name: '마취약',
        c_category: '주사'
      },
      r_no: 0
    }
  ],
  h_code: 1
}

class ReviewDetail extends React.Component {
  componentDidMount() {
    //리뷰데이터 불러오기
    this.props.getReviewData();

    console.log(this.props.reviewData);
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
    //=============리덕스에서 불러온 값================
    console.log(this.props.review_data.info)
    console.log(this.props)
    //===============================================
    const photolist = reviewData.r_photo.split(',')
    const photos = photolist.map(
      p => (
        <img className={cx('photo')} src={p} key={p}/>
      )
    )
    const scorelist =  this.state.grade.map(g => g.score)
    const totalscore = Math.round(((scorelist.reduce((a, b) => a + b, 0) / scorelist.length) + Number.EPSILON) * 100)/100
    const scorelabel = ['적정한 치료', '친절함', '치료결과', '청결']
    const grade = this.state.grade.map((g, i) => ({name: scorelabel[i], score: g.score}))
    const totalgrade = [{name:'평균평점', score:totalscore}]
    const totallike = reviewData.Like.length
    const dojang = require("../../assets/visitnyang.png")
    const tags = []
    for (const [index, value] of reviewData.tags.entries()) {
      console.log(value)
      tags.push(<div className={cx('tag')} key={index}>#{value}</div>)
    }
    return (
      <div className={cx('container')}>
        <div className={cx('meta-box')}>
          <p>{reviewData.r_treatmentdata} 진료</p>
          <p>{reviewData.r_date} 작성</p>
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
        <div className={cx('basic-box', 'relative')}>
          <HosGrades grade={grade}/>
          <div className={cx('divider')}></div>
          <HosGrades grade={totalgrade}/>
          <img src={dojang}/>
        </div>
        <div className={cx('category')}><p>진료 후기 상세</p></div>
        <div className={cx('basic-box')}>
          <p>
            {reviewData.r_content}
          </p>
        </div>
        <div className={cx('category')}><p>사진후기</p></div>
        <div className={cx('photo-box')}>
          {photos}
        </div>
        <div className={cx('category')}><p>비용표</p></div>
        <div className={cx('price-box')}>
          <ReviewPrice careinfo={reviewData.careinfo}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    review_data: state.review_info,
  };
};

export default connect(mapStateToProps, {
  getReviewData,
 })(ReviewDetail);
 

 