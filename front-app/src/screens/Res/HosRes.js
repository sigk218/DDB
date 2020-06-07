import React, { Component } from "react";
import { connect } from "react-redux";
import HosInfoCard from "../../components/HosInfoCard/HosInfoCard";
import { hos, status } from '../../actions'
// import InfiniteScroll from "react-infinite-scroller";

const widthLength = 100;

// 검색이 mainSearchBar 또는 main 페이지에서 발생했을 때
// 검색이 발생
// 검색이 완료되었을 때
// 해당하는 키워드에 맞는 검색결과를 렌더링


// 새로고침이 발생했을 때 또는 다른 페이지에서 다시 뒤로 돌아왔을 때
// 검색기록을 가지고
// 다시 검색
// 검색이 완료되었을 때
// 해당하는 키워드에 맞는 검색결과를 렌더링

class HosRes extends Component {
	constructor(props) {
		super(props);
		const { searchWord, lat, long, category, filter} = props.hos.mainSearch
		console.log(searchWord, lat, long, category, filter)
		if (props.hos[filter].length !== 0) {
			if (category === 'hosByLoc') {
				if (!props.hos[filter].find(s => (s.lat === lat) & (s.long === long))) {
					props.mainSearch(searchWord, lat, long, category, filter)
				}
			} else {
				if(!props.hos[filter].find(s => (s.keyword === searchWord))) {
					props.mainSearch(searchWord, lat, long, category, filter)
				}
			}
		} else {
			props.mainSearch(searchWord, lat, long, category, filter)
		}

	}

	render() {
		let result, hosCards;
		const { searchWord, lat, long, category, filter} = this.props.hos.mainSearch
		if (this.props.search === true) {
			if (category === 'hosByLoc') {
				result = this.props.hos[filter].find(s => (s.lat === lat) & (s.long === long)).list
				hosCards = result.map(
					h => <HosInfoCard hospitalData={h} widthLength={widthLength} key={h.hcode}/>
				)
			} else {
				result = this.props.hos[filter].find(s => (s.keyword === searchWord)).list
				hosCards = result.map(
					h => <HosInfoCard hospitalData={h} widthLength={widthLength} key={h.hcode}/>
				)
			}
		} else {
			hosCards = null
		}
		return (
			<div>
				{hosCards}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		hos: state.hos,
		search: state.status.search
	};
};

const mapDispatchToProps = dispatch => {
	return {
		mainSearch: (searchWord, lat, long, category, filter) => dispatch(hos.mainSearch(searchWord, lat, long, category, filter))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HosRes);


