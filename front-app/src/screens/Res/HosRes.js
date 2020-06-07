import React, { Component } from "react";
import { connect } from "react-redux";
import HosInfoCard from "../../components/HosInfoCard/HosInfoCard";
import { hos } from '../../actions'
// import InfiniteScroll from "react-infinite-scroller";

const widthLength = 100;

class HosRes extends Component {
	constructor(props) {
		super(props);
		const { searchWord, lat, long, category, filter} = props.hos.mainSearch
		console.log(searchWord, lat, long, category, filter)
		console.log(props.hos)
		if (props.hos[filter].length !== 0) {
			if (filter === 'hosByLoc') {
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
		console.log(this.props.hos)
		const { searchWord, lat, long, filter} = this.props.hos.mainSearch
		if (this.props.hos[filter].length !== 0) {
			if (filter === 'hosByLoc') {
				result = this.props.hos[filter].find(s => (s.lat === lat) & (s.long === long)).list
				hosCards = result.map(
					h => <HosInfoCard hospitalData={h} widthLength={widthLength} key={h.hcode}/>
				)
			} else {
				if (this.props.hos[filter].find(s => (s.keyword === searchWord))) {
					result = this.props.hos[filter].find(s => (s.keyword === searchWord)).list
					hosCards = result.map(
						h => <HosInfoCard hospitalData={h} widthLength={widthLength} key={h.hcode}/>
					)
				} else {
					hosCards = null
				}
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
		hos: state.hos
	};
};

const mapDispatchToProps = dispatch => {
	return {
		mainSearch: (searchWord, lat, long, category, filter) => dispatch(hos.mainSearch(searchWord, lat, long, category, filter))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HosRes);
