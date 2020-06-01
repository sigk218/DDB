import React from "react";
import DatePicker from '../../components/DatePicker/DatePicker'
import GradeBox from '../../components/HosGrades/GradeBox'
import Pets from '@material-ui/icons/Pets'
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import recieptHelper from '@ming822/ocr-reciept-helper'
import test from './test.json'
import axios from 'axios'
const cx = classNames.bind(styles)

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    const scorelist =  [0, 0, 0, 0, 0]
    const scorelabel = ['청결', '친절함', '치료결과', '전문성', '적정한 치료']
    const grade = scorelist.map((g, i) => ({name:scorelabel[i], score:g}))
    const totalgrade = this.calcTotalScore(scorelist)
    const reciept = new recieptHelper(test, '스토리동물병원')
    const priceTable = reciept.priceTable

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
      priceTable: priceTable
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

  async submitForm() {
    const review = {
      hospital : {
        hcode : 10
      },
      rcontent: this.state.content,
      rdeleted: false,
      rclean: this.state.grade[0].score,
      rkindness: this.state.grade[1].score,
      rresult: this.state.grade[2].score,
      rprofessionality: this.state.grade[3].score,
      rovertreatment: this.state.grade[4].score,
      rstarrating: this.state.totalgrade[0].score,
      rrevisit: this.state.revisitbtn,
      rphoto1: '1',
      rphoto2: '2',
      rphoto3: '3',
      rpurpose: '발열',
      rreceipt: true,
      rreport: 0,
      rdate: new Date(),
      rtreatmentdate: new Date(),
      user: {
        uid: "sim"
      }
    }

    const careinfos = [
      {
        animal: {
          acode: 3
        }
        ,
        carelist: {
          ccode: 1
        },
        ciOpen: true,
        ciPrice: 1000,
        cname: "혈액검사",
        hospital: {
          hcode: 10
        }
        // "review": {
        //   "rcode": 0
        // }
      }
    ]
    const config = {headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }}
    await axios.post('http://192.168.1.193:7888/review/insert',review, config)
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
            onClick={this.submitForm.bind(this)}
            >
            <p>제출하기</p>
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