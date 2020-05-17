import React, { Component } from "react";
import styles from './mystyle.module.scss'; 
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
            <>
                <div className={styles.search__container}>
                    <input className={styles.search__input} type="text" placeholder="병원이름, 진료명, 지역, 동물 종류 등을 입력하세요 ㅎㅎ"></input>
                </div>
            </>
        );
    }
}



export default MainSearchBar;


