import React, { Component } from "react";
import { getPetDetail } from "../../actions";
import styles from './mystyle.module.scss';
import { connect } from "react-redux";
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
class MyPetList extends Component {
    componentDidMount() {
        this.props.getPetDetail();
    }
    constructor(props) {
        super(props);

    }

    setList() {
        console.log('setlist')
        var a = this.props.pet_info.pet_info
        console.log(a)
        var dis = [];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                dis.push(
                    <div className={cx('column-box')}>
                        <div>
                            <div>
                                {a[i].a_type}
                            </div>
                            <div>
                                {a[i].a_species}
                            </div>
                            <div>
                                {a[i].a_kig} kg
                        </div>
                            <div>
                                {a[i].a_year} 살
                        </div>
                        </div>
                    </div>
                );
            }
        }
        return dis
    }
    render() {
        if (!this.props.pet_info) {
            this.props.getPetDetail();
            console.log(this.props.pet_info)

        }
        return (
            <div>
                <div>
                    {this.setList()}
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        pet_info: state.pet_info,
    };
};

export default connect(mapStateToProps, {
    getPetDetail,
})(MyPetList);
