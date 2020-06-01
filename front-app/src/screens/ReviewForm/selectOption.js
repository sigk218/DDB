import React from "react";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import Modal from '@material-ui/core/Modal';
import SearchIcon from '@material-ui/icons/Search'
import recieptHelper from '@ming822/ocr-reciept-helper'
import vision from 'react-cloud-vision-api'
// import resJson from './test2.json'

import { connect } from 'react-redux'
import { 
  uploadReciept, 
  setHosInfo, 
  getHosSearchList,
  toggleSearchModal,
  selectHos,
  hasReciept
} from '../../actions'
import history from "../../history";



const cx = classNames.bind(styles)

class selectOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reciept: null,
      searchWord: ''
    }
  }

  async handleEnter(e) {
    if (e.key === 'Enter') {
      this.showList()
    }
  }
  
  async showList() {
    await this.props.getHosSearchList()
  }

  async handleHos(l) {
    await this.props.selectHos(true)
    await this.props.setHosInfo(l.id, l.name, l.address)
    await this.props.toggleSearchModal(true)
    await this.setState({searchWord: ''})
  }

  async handleHosFirst(e) {
    if (!this.props.status.hosSelected) {
      alert('동물 병원을 먼저 검색해주세요')
      e.preventDefault()
    }
  }
  
  async handleReciept(e) {
    const files = [...e.target.files]
    await this.setState({reciept:files[0]})
    await this.processFile(files[0])
  }

  async ocrApi(file, recieptBase64) {
    const key = ''
    await vision.init({ auth: key })
    const req = await new vision.Request({
      image: new vision.Image({
        base64: recieptBase64
      }),
      features: [
        new vision.Feature('TEXT_DETECTION', 4)
      ]
    })
    const res = await vision.annotate(req)
    const resJson = res.responses[0]
    const reciept = new recieptHelper(resJson[0], '스토리동물병원')
    const isDate = reciept.dateInfo.length > 0
    const hasPlace = reciept.isPlaceName
    if (isDate & hasPlace) {
      await this.props.uploadReciept(file, isDate, hasPlace, reciept.priceTable)
      await this.props.hasReciept(true)
      history.push("/ReviewForm");
    } else {
      alert('영수증의 날짜 정보나 병원 이름이 보이지 않습니다 8-8')
    }
  }

  async processFile(file) {
    const reader = new FileReader()
    const context = this
    await reader.readAsDataURL(file)
    reader.onload = await async function () {
      await context.ocrApi(file, reader.result)
    }
  }

  render() {
    const hosSearch = this.props.status.hosSelected ? '동물병원 재검색하기' : '동물병원 검색하기'
    
    const searchResult = this.props.hosSearchList? 
      this.props.hosSearchList.map(l =>
        <div
          className={cx('search-list-box')}
          onClick={() => this.handleHos(l)}
          key={l.id}
        >
          <p>{l.name}</p>
          <p className={cx('small-text')}>{l.address}</p>
        </div>
      ) 
      : null

    const body = (
      <div className={cx('modal')}>
        <h3 className={cx('modal-header')}>동물병원 검색하기</h3>
        <div className={cx('search-box')}>
          <input 
            type='text'
            className={cx('modal-search-bar')} 
            value={this.state.searchWord} 
            onChange={e => this.setState({searchWord: e.target.value})}
            onKeyPress={this.handleEnter.bind(this)}
            />
          <div 
            className={cx('search-btn')}
            onClick={this.showList.bind(this)}
            >
            <SearchIcon style={{fontSize:15}}/>
          </div>
        </div>
        <div className={cx('h-spacer')}></div>
        <div className={cx('modal-body')}>
          {searchResult}
        </div>
        <div className={cx('h-spacer')}></div>
      </div>
    );

    return (
        <div>
          <div className={cx('h-spacer')}></div>
          <div className={cx('category')}>
            <p>리뷰 작성 가이드</p>
          </div>
          <div className={cx('indented-row')}>
            <p>
              <span className={cx('stress-text')}>발바닥</span>
              은 사용자분들의 정보 공유를 통해 이루어지는 서비스로  
              <span className={cx('stress-text')}> 신뢰성</span> 
              있는 리뷰를 위해 다음과 같은 
              <span className={cx('stress-text')}>2 단계의 인증 절차</span>
              를 두었습니다.
            </p>
          </div>
          <div className={cx('row')}>
            <div className={cx('small-col', 'step-box')}>
              <div className={cx('box-header')}>
                <img 
                  className={cx('num-icon', 'one-icon')}
                  src={require('../../assets/one.png')} 
                  alt='one'/>
                <p>본인 인증</p>
              </div>
              <div className={cx('box-content')}>
                <img 
                  className={cx('info-icon')}
                  src={require('../../assets/smartphone.png')} 
                  alt='smartphone'/>
                <div className={cx('small-divider')}></div>
                <p className={cx('content-header')}>[ 중복 리뷰 방지 목적 ]</p>
                <p>이름, 생년월일, 핸드폰 번호로 본인 인증</p>
                <p>최초 한번의 인증만 필요</p>
              </div>

            </div>
            <div className={cx('spacer')}></div>
            <div className={cx('small-col', 'step-box')}>
              <div className={cx('box-header')}>
                <img 
                  className={cx('num-icon', 'two-icon')}
                  src={require('../../assets/two.png')} 
                  alt='two'/>
                <p>영수증 인증</p>
              </div>
              <div className={cx('box-content')}>
                <img 
                  className={cx('info-icon')}
                  src={require('../../assets/reciept.png')} 
                  alt='reciept'/>
                <div className={cx('small-divider')}></div>
                <p className={cx('content-header')}>[ 진실한 리뷰 목적 ]</p>
                <p>날짜와 동물병원 이름이 표기된 영수증으로 인증</p>
                <p>영수증 비용 자동 입력</p>
              </div>
            </div>
          </div>

          <div className={cx('h-spacer')}></div>
          <div className={cx('row')}>
            <p className={cx('small-text')}>
              리뷰는 <span className={cx('red-text')}>객관적</span>이고 <span className={cx('red-text')}>진실</span>하며 <span className={cx('red-text')}>공공의 이익</span>을 위해야하며 
              특정인이나 단체를 <span className={cx('red-text')}>비방</span>할 목적이 아니어야합니다. 
              이를 지키지 않을 경우 <span className={cx('red-text')}>명예훼손</span> 등의 법적 문제가 사용자에게 발생할 수 있으며, 
              다른 사용자로부터 신고요청이 들어올 경우 <span className={cx('red-text')}>서비스 이용이 중지</span>될 수 있습니다.
            </p>
          </div>
          <div className={cx('border-button')} onClick={() => this.props.toggleSearchModal(this.props.status.isSearching)}>
            {hosSearch}
          </div>
          <div className={this.props.status.hosSelected ? cx('hos-box') : cx('hide')}>
            <p>{this.props.hosInfo.name}</p>
            <p className={cx('small-text')}>{this.props.hosInfo.address}</p>
          </div>
          <div className={cx('h-small-spacer')}></div>

          <div 
            className={cx('border-button', 'upload-btn-wrapper')}
            >
            <p>영수증 인증하고 리뷰 작성하기</p>
            <input
              type="file"
              name="file"
              accept="image/*"
              onClick={this.handleHosFirst.bind(this)}
              onChange={this.handleReciept.bind(this)}
            />
          </div>
          <Modal
            open={this.props.status.isSearching}
            onClose={() => this.props.toggleSearchModal(this.props.status.isSearching)}
          >
            {body}
          </Modal>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hosSearchList: state.hos_info.searchList,
    status: state.status,
    hosInfo: state.new_Review.hosInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    uploadReciept: (file, dateIs, hasHos, items) => dispatch(uploadReciept(
      file,
      dateIs,
      hasHos,
      items
    )),
    setHosInfo: (id, name, address) => dispatch(setHosInfo(id, name, address)),
    getHosSearchList: () => dispatch(getHosSearchList()),
    toggleSearchModal: () => dispatch(toggleSearchModal()),
    selectHos: (selected) => dispatch(selectHos(selected)),
    hasReciept: (has) => dispatch(hasReciept(has))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(selectOption)

 