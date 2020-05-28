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
import {getHosData} from '../../actions';
//썸내일은... 리사이징...

const widthLength = 100;
const hosData = [
    {
        h_code: 1,
        h_name: "행복 동물 병원",
        h_location: [33.450705, 126.570677],
        h_city: "서울시",
        h_gu: "강남구",
        h_station: "역삼역",
        h_tel: "02-123-1234",
        h_holidaytreatment: true,
        h_open: true,
        h_monday: "10:00 ~ 18:00",
        h_tuesday: "10:00 ~ 18:00",
        h_wednesday: "10:00 ~ 18:00",
        h_thursday: "10:00 ~ 18:00",
        h_friday: "10:00 ~ 18:00",
        h_saturday: "10:00 ~ 18:00",
        h_sunday: "10:00 ~ 18:00",
        h_website: "http://edu.ssafy.com",
        h_dong: "역삼동",
        h_address: "서울시 역삼동 123번지",
        h_image: "https://picsum.photos/id/1018/250/150/"
    },
    {
        h_code: 2,
        h_name: "카카오 동물 병원",
        h_location: [33.450936, 126.569477],
        h_city: "서울시",
        h_gu: "강남구",
        h_station: "깨깨오역",
        h_tel: "02-123-1234",
        h_holidaytreatment: true,
        h_open: true,
        h_monday: "10:00 ~ 18:00",
        h_tuesday: "10:00 ~ 18:00",
        h_wednesday: "10:00 ~ 18:00",
        h_thursday: "10:00 ~ 18:00",
        h_friday: "10:00 ~ 18:00",
        h_saturday: "10:00 ~ 18:00",
        h_sunday: "10:00 ~ 18:00",
        h_website: "http://edu.ssafy.com",
        h_dong: "역삼동",
        h_address: "서울시 역삼동 123번지",
        h_image: "https://picsum.photos/id/1018/250/150/"
    },

]


const cx = classNames.bind(styles)
class HosMapRes extends Component {
    componentDidMount() {
        this.set_hosdata();
        this.setState({
            h_data: this.props.hospital.info
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            h_data: [],
        };
    }

    set_hosdata = async () => {
        console.log("11111111111111111")
        await this.props.getHosData();
        this.setState({
            h_data: this.props.hospital.info
        })
        console.log(this.state.h_data)

        return (
            <div className={cx('container')}>
                    <BigMap 
                        hospitalData={this.state.h_data}
                    />
            </div>
        )
    }
    render() {
        this.state.h_data = hosData;
        if(!this.props.hospital.info)  {
            this.set_hosdata();
            console.log("aaaaaaaaaaa")
        }
        return (
            <div >
                    <BigMap 
                        hospitalData={this.state.h_data}
                    />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
      hospital: state.hos_info,
    };
  };

  export default connect(mapStateToProps, {
    getHosData,
   })(HosMapRes);
   

   


