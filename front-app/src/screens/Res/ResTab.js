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

	async changeNearFilter() {
		const { near } = this.state
		await this.setState({near: !near})
		const { filter } = this.prpos.hos.mainSearch
		this.changeFilter(filter)
	}

	async changeFilter(filter) {
		const {searchWord, lat, long, category} = this.props.hos.mainSearch
		if ( this.state.near === false ) {
			if ( filter === 'nearHosByStar' ) {
				filter = 'hosByStar'
			} else if (filter === 'nearHosByReview') {
				filter = 'hosByReview'
			}
		}
		await this.props.mainSearch(searchWord, lat, long, category, filter)
	}

	render() {
		const { curr, near } = this.state
		const { filter } = this.props.hos.mainSearch
		const resDisplay = curr === 'hos' ? <HosRes /> : <ReviewRes />
		return (
			<>
				<div className={cx('tab-container')}>
					<div className={curr === 'hos' ? 
						cx('cate-btn', 'passive-cate') : cx('cate-btn')}><p>REVIEW</p></div>
					<div className={cx('spacer')}></div>
					<div className={curr === 'hos' ?
						cx('cate-btn') : cx('cate-btn', 'passive-cate')}
						onClick={() => this.setState({curr:'hos'})}
						><p>HOSPITAL</p></div>
				</div>
				<div className={cx('tab-container')}>
					<div className={near === true ? 
						cx('tab-box', 'active-tab') : cx('tab-box')} 
						onClick={() => this.changeNearFilter()}><p>3km 이내</p></div>
					<div className={filter.includes('Star') ? 
						cx('tab-box', 'active-tab') : cx('tab-box')} 
						onClick={() => this.changeFilter('nearHosByStar')}><p>별점순</p></div>
					<div className={filter.includes('Review') ? 
						cx('tab-box', 'active-tab') : cx('tab-box')} 
						onClick={() => this.changeFilter('nearHosByReview')}><p>리뷰순</p></div>
				</div>
				<div className={cx('res-box')}>
					{resDisplay}
				</div>
				
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


