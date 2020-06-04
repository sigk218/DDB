import React from "react";
import styles from './mystyle.module.scss';
import { connect } from "react-redux";
import classNames from 'classnames/bind';
import HosRes from '../../screens/HosRes/HosRes';
import ReviewRes from '../../screens/ReviewRes/ReviewRes';
const cx = classNames.bind(styles)




class ResTab extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: false,
        }

    }
    componentDidMount() {


    }
    handleOnclick(e) {
        if(e) {
            this.setState({
                data: true
            })
        }
        else {
            this.setState({
                data: false
            })
        }

    }

    display_click() {
        if (this.state.data) {
            return (
                <div>
                    <ReviewRes/>
                </div>
            );
        }
        return (
            <div>
                <HosRes/>
            </div>
        );
    }
    render() {
        return (
            <>
                <div className={cx('tab-container')}>
                    <button className={cx('tab-box')} onClick={() => this.handleOnclick(true)}>review</button>
                    <button className={cx('tab-box')} onClick={() => this.handleOnclick(false)}>hospital</button>

                </div>
                {this.display_click(this.state.data)}
            </>
        )

    }
}

const mapStateToProps = state => {
    return {
        review_data: state.review_info,
    };
};

export default connect(mapStateToProps, {

})(ResTab);


