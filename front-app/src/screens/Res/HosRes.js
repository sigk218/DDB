import React, { Component } from "react";
import { connect } from "react-redux";
import HosInfoCard from "../../components/HosInfoCard/HosInfoCard";
// import InfiniteScroll from "react-infinite-scroller";

const widthLength = 100;

class HosRes extends Component {
	componentDidMount() {
	}


	render() {
		const {filter, lat, long} = this.props.hos.mainSearch
		const result = this.props.hos[filter].find(s => (s.lat === lat) & (s.long === long)).list		
		const hosCards = result.map(
			h => <HosInfoCard hospitalData={h} widthLength={widthLength} key={`newCard${h.hcode}`}/>
		)
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HosRes);
