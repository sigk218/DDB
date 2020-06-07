import React from "react";

import { connect } from "react-redux";
import { hos } from '../../actions'

import HosRes from './HosRes';
import ReviewRes from './ReviewRes';

import styles from './mystyle.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)


// 1. 병원 검색 결과를 보여주기
	// 1.1. 선택된 모드로 이미 요청해 받은 검색 결과를 확인해
	// 1.2. 보여주고
	// 1.3. 다른 필터를 누를 경우에
	// 1.4. 재 요청하고 1.1.과 1.2.를 반복한다

// 2. 리뷰 검색 결과를 보여주기
	// 2.1. 로그인 된 사용자일 경우에
	// 2.2. 리뷰 탭을 누를 경우에만
	// 2.3. 선택된 필터에 맞는 리뷰를 가져와 보여주기

class ResTab extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			curr: 'hos',
			near: true,
		}
	}

	async handleOnclick(category, filter) {
		const {searchWord, lat, long} = this.props.hos.mainSearch
		if ( this.state.near === false ) {
			if ( filter === 'nearHosByStar' ) {
				filter = 'hosByStar'
			} else if (filter === 'nearHosByReview') {
				filter = 'hosByReview'
			}
		}
		await this.setState({curr:category})
		this.props.mainSearch(searchWord, lat, long, category, filter)
	}

	render() {
		const resDisplay = this.state.curr === 'hos' ? <HosRes /> : <ReviewRes />
		return (
			<>
				<div className={cx('tab-container')}>
					<button className={cx('tab-box')}>review</button>
					<button className={cx('tab-box')} 
						onClick={() => this.handleOnclick('hos','nearHos')}>hospital</button>
				</div>
				<div className={cx('tab-container')}>
					<button className={cx('tab-box')} 
						onClick={() => this.setState({near: !this.state.near})}>3km 이내</button>
					<button className={cx('tab-box')} 
						onClick={() => this.handleOnclick('hos','nearHosByStar')}>리뷰순</button>
					<button className={cx('tab-box')} 
						onClick={() => this.handleOnclick('hos','nearHosByReview')}>별점순</button>
				</div>
				{resDisplay}
			</>
		)

	}
}

const mapStateToProps = state => {
	return {
		hos : state.hos
	};
};

const mapDispatchToProps = dispatch => {
	return {
		mainSearch: (searchWord, lat, long, category, filter) => dispatch(hos.mainSearch(searchWord, lat, long, category, filter))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResTab);


