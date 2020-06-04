import React, { Component } from "react";
import styles from './mystyle.module.scss';
import classNames from 'classnames/bind'
import SearchIcon from '@material-ui/icons/Search'
const cx = classNames.bind(styles)

class MainSearchBar extends Component {
    componentDidMount() {

    }
    constructor(props) {
        super(props);

    }

    handleChange() {

    }
    render() {
        return (
            <div className={cx('search-box', 'main-search')}>
                <input type="text" placeholder="병원이름, 진료명, 지역, 동물 종류 등"></input>
                <div className={cx('search-btn')}>
                    <SearchIcon style={{ fontSize: 23 }} />
                </div>
            </div>
        );
    }
}



export default MainSearchBar;


