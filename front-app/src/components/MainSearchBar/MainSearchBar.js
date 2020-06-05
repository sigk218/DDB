import React, { Component } from "react";
import { connect } from "react-redux";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import SearchIcon from '@material-ui/icons/Search'
import history from "../../history";
import { hos } from '../../actions'
import { useLocation } from 'react-router-dom'
const cx = classNames.bind(styles)

class MainSearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			word: ''
		}
	}
	async handleEnter(e) {
    if (e.key === 'Enter') {
      this.getSearchResult()
    }
	}
	
	async getSearchResult() {
		this.props.mainSearch(this.state.word, null, null, 'hosByWord')
    history.push('/ResTab')
	}

	render() {
		return (
			
			<div 
				className={
					this.props.location === ('Main') ? 
					cx('search-box', 'main-search', 'main-page')
					: cx('search-box', 'main-search')}>
				<input 
					type="text"
					placeholder="병원이름, 진료명, 지역, 동물 종류 등"
					onChange={(e) => this.setState({word:e.target.value})}
					onKeyPress={this.handleEnter.bind(this)}
				>
				</input>
				<div 
					className={cx('search-btn')}
					onClick={this.getSearchResult.bind(this)}
				>
					<SearchIcon style={{ fontSize: 23 }} />
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
  return {
    mainSearch: (word, lat, long, cateogry) => dispatch(hos.mainSearch(word, lat, long, cateogry)),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(MainSearchBar)