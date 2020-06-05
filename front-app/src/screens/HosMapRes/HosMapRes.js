/*global kakao*/
import React, { Component } from "react";
import styles from './mystyle.module.scss';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';
import Button from '@material-ui/core/Button';
import classNames from 'classnames/bind';
import BigMap from '../../components/BigMap/BigMap';
import HosInfoCard from '../../components/HosInfoCard/HosInfoCard'
import { connect } from "react-redux";
import HosGrades from '../../components/HosGrades/HosGrades';
import { hos } from '../../actions';
//썸내일은... 리사이징...


const cx = classNames.bind(styles)
class HosMapRes extends Component {
    componentDidMount() {
        hos.getNearHos(37.504909, 127.048463, 0)
        console.log('------------', this.props.hospital)
    }
    constructor(props) {
        super(props);
    }

    set_hosdata = async () => {
        return (
            <div className={cx('container')}>
                    <BigMap 
                        hospitalData={this.props.hospital}
                    />
            </div>
        )
    }
    render() {
        if(!this.props.hospital)  {
            hos.getNearHos(37.504909, 127.048463, 0)
        }
        return (
            <div >
                    <BigMap 
                        hospitalData={this.props.hospital}
                    />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      hospital: state.hos.nearHos,
    };
  };

  export default connect(mapStateToProps)(HosMapRes);
   

   


