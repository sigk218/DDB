import React, { Component } from "react";

import { connect } from "react-redux";

import InfiniteScroll from "react-infinite-scroller";
import HosInfoCard from "../../components/HosInfoCard/HosInfoCard"
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


const widthPer = 100;

const hosData = [
    {
        h_code: 1,
        h_name: "행복 동물 병원",
        h_location: "서울시 역삼동 123번지",
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
    },
    {
        h_code: 2,
        h_name: "역삼 동물 병원",
        h_location: "서울시 역삼동 123번지",
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
    }
]
class HosRes extends Component {
    componentDidMount() {
        this.state.cards = hosData;
    }

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            page: 1,
            limit: 5,
            stateFun: this.loader(),
            state: "loader"
        };
    }

    onChange = chips => {
        
    };

    onScrolled = async () => {
        
    };
    loader = () => (
        <div className="loader" key={0}>
            Loading ...
        </div>
    );
    end = () => (
        <div className="end" key={1}>
            {" "}
        </div>
    );

    render() {
        this.state.cards = hosData;
        console.log(hosData)
        console.log("======HosREs=====")
        console.log(this.state.cards)
        return (
            <>
            
                <div>
                    
                        {this.state.cards
                            ? this.state.cards.map(card => (
                                <HosInfoCard
                                    hospitalData={card}
                                    widthPer={widthPer}
                                    key={`newCard${card.h_code}`}
                                />
                            ))
                            : null}
                    
                </div>
            </>
        );
    }
}



export default HosRes