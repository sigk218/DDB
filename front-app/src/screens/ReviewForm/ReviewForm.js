import React from "react";
import DatePicker from '../../components/DatePicker/DatePicker'
import GradeBox from '../../components/HosGrades/GradeBox'
import Pets from '@material-ui/icons/Pets'
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'

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

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    const scorelist =  [0, 0, 0, 0]
    const scorelabel = ['적정한 치료', '친절함', '치료결과', '청결']
    const grade = scorelist.map((g, i) => ({name:scorelabel[i], score:g}))
    const totalgrade = this.calcTotalScore(scorelist)

    this.state = {
      date : new Date(),
      grade: grade,
      totalgrade: totalgrade,
      visitdate: new Date(),
      editablegrade: true,
      revisitbtn: false,
      recieptbtn: false,
      isphoto:false,
      photos: [],
      photoname: [],
      tempphotos: [],
      content: "",
    }
  }


  calcTotalScore(scorelist) {
    const totalscore = Math.round(((scorelist.reduce((a, b) => a + b, 0) / scorelist.length) + Number.EPSILON) * 100)/100
    const totalgrade = [{name:'평균평점', score:totalscore}]
    return totalgrade
  }

  onGradeChange(field, value) {
    this.setState({
      grade: this.state.grade.map(
        g => {
          if(g.name === field) {
            return {...g, score:value}
          }
          return { ...g }
        }
      )
    }, () => {
      this.setState({
        totalgrade: this.calcTotalScore(this.state.grade.map(g => g.score))
      })
    })
  }

  togglerevisit() {
    this.setState({
      revisitbtn: !this.state.revisitbtn
    })
  }

  handleText(e) {
    this.setState({content: e.target.value})
  }

  async handleFiles(e) {
    const files = [...e.target.files]
    const names = files.map(f => f.name)
    const checked = names.filter(n => !(this.state.photoname.includes(n))).map((n, i) => files[i]).slice(0, 4)
    await this.setState({photos:this.state.photos.concat(...checked)})
    await this.setState({photoname:this.state.photoname.concat(...names)})
    await this.setState({tempphotos: this.state.photos.map(
      f => URL.createObjectURL(f)
    )})
    if (this.state.photos) {
      await this.setState({isphoto:true})
    }
  }

  render() {
    const animal = ['rabbit', 'turtle', 'hamster', 'cat', 'dog', 'bird']
    const animalsrc = animal.map( a => require(`../../assets/${a}.png`))
    const animalimg = animalsrc.map( url => 
      {return <img key={url} src={url} alt={url}/>}
    )

    const reviewimg = this.state.tempphotos.map(
      url => {return <img className={cx('photo')} key={url} src={url} alt='사진후기'/>}
    )

    return (
        <div>
          <div className={cx('row')}>
            <div className={cx('small-category')}><p>방문 날짜</p></div>
            <div className={cx('spacer')}></div>
            <div className={cx('small-category')}><p>진료 대상</p></div>
          </div>
          <div className={cx('row')}>
            <div className={cx('small-col')}>
              <DatePicker 
                value={this.state.visitdate}
              />
            </div>
            <div className={cx('spacer')}></div>
            <div className={cx('small-col','animal-box')}>
              {animalimg}
            </div>
          </div>
          <div className={cx('category')}>
            <p>병원 상세 평가</p>
          </div>
          <GradeBox 
            totalgrade={this.state.totalgrade} 
            grade={this.state.grade}
            editable={this.state.editablegrade}
            onChange={this.onGradeChange.bind(this)}
            dojang={this.state.revisitbtn}
            />
          <div 
            className={this.state.revisitbtn? cx('border-button', 'active') : cx('border-button')}
            onClick={this.togglerevisit.bind(this)}
            >
            <p>다시 방문할 의사 {this.state.revisitbtn? '없다옹': '있다옹'}</p>
            <Pets style={{ fontSize: 15 }}/>
          </div>
          <div className={cx('category')}>
            <p>비용표</p>
          </div>
          <div 
            className={cx('border-button')}
            >
            <p>영수증으로 입력하기</p>
          </div>
          <div className={cx('category')}>
            <p>진료 후기 상세</p>
          </div>
          <div className={cx('box')}>
            <textarea
              placeholder={'후기를 작성해 주세요.'}
              rows="7"
              value={this.state.content}
              onChange={this.handleText.bind(this)}
            />
          </div>
          <div className={cx('category')}>
            <p>사진 후기</p>
          </div>
          <div 
            className={
              this.state.isphoto
              ? cx('hide')
              : cx('border-button', 'upload-btn-wrapper')}
            >
            <p>사진 첨부하기<span>최대 4장</span></p>
            <input
              type="file"
              name="file"
              accept="image/*"
              multiple
              onChange={this.handleFiles.bind(this)}
            />
          </div>
          <div
            className={
              this.state.isphoto
              ? cx('photo-box')
              : cx('hide')
            }
          >
            {reviewimg}
          </div>
          <div 
            className={
              this.state.isphoto && (this.state.photos.length < 4)
              ?  cx('border-button', 'upload-btn-wrapper')
              : cx('hide')}
            >
            <p>사진 추가하기<span>최대 4장</span></p>
            <input
              type="file"
              name="file"
              accept="image/*"
              multiple
              onChange={this.handleFiles.bind(this)}
            />
          </div>
          <div
            className={cx('border-button')}
          >
            <p>선택한 사진 삭제하기</p>
          </div>
        </div>
    );
  }
}



export default ReviewForm;