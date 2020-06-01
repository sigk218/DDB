import {
    GET_USER_INFO,
    GET_HOS_DATA,
    GET_REVIEW_DATA,
    UPLOAD_RECIEPT_INFO,
    SET_HOS_INFO,
    GET_HOS_SEARCH_LIST,
    TOGGLE_SEARCH_MODAL,
    SELECT_HOS,
    HAS_RECIEPT,
    GET_TOTAL_GRADE,
    SET_HOS_SCORE
  } from "./types";


  //=============DATA=========

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

const reviewData = {
  r_no: 0,
  u_id: 'aestas',
  r_nickname: '익명의 코끼리',
  r_photo: 'https://lh3.googleusercontent.com/proxy/QYikpOM5d8B4H0_YTn1sfYzEQcGYjKwUtseoQXBpXqhjh3bsn04ZdeNL533bsCyivn3OzERLxq2zBPl5l9rt_UU_B6PlMBkQHef624cQ8DI0TjJkozUb8Qyhs8kYkTGclUI-uGs83FjcgEo,http://www.busan.com/nas/wcms/wcms_data/photos/2020/02/12/2020021209194665170_l.jpg,https://modo-phinf.pstatic.net/20160629_37/1467141681611RHSrJ_JPEG/mosaazDVas.jpeg?type=w1100',
  r_content: '2010년부터 다니던 병원입니다. 고양이에게 중성화 수술은 꼭 필요한 것 같아요. 계속 힘들어해서 몇 차례 검진 받고 선생님과 상담후에 중성화 수술을 하게되었습니다. 선생님 정말 친절하시고요 여기 애견용 풀도 있는 것 같아서 상처 부위 치료되면 또 오려고요!',
  r_reciept: true,
  r_treatmentdata: '2020-05-10',
  r_date: '2020-05-10',
  tags: ['중성화수술', "고양이", "15kg",'정기적', "친절", "전용풀장", "감사"],
  r_overtreatement: 1,
  r_kindness: 4,
  r_result: 4,
  r_clean: 4,
  r_report: 0,
  r_deleted: false,
  Like: [{u_id:1}, {u_id:2}, {u_id:3}],
  careinfo: [
    {
      ci_no: 2,
      h_code: 1,
      ci_vet: '고양이',
      ci_price:25000,
      CareList: {
        c_code: 3,
        c_name: '중성화수술',
        c_category: '수술'
      },
      r_no: 0
    },
    {
      ci_no: 3,
      h_code: 1,
      ci_vet: '고양이',
      ci_price:30000,
      CareList: {
        c_code: 4,
        c_name: '붕대',
        c_category: '시술'
      },
      r_no: 0
    },
    {
      ci_no: 4,
      h_code: 1,
      ci_vet: '고양이',
      ci_price:50000,
      CareList: {
        c_code: 2,
        c_name: '마취약',
        c_category: '주사'
      },
      r_no: 0
    }
  ],
  h_code: 1
}


const hos_list = [
  {id: 1, name:"행복동물병원", address:"서울시 관악구 행복동 행복로 1길"}, 
  {id: 2, name:"행봄동물병원", address:"서울시 관악구 행봄동 행봄로 2길"},
  {id: 3, name:"행봉동물병원", address:"서울시 관악구 행봉동 행봉로 3길"},
  {id: 4, name:"행행동물병원", address:"서울시 관악구 행복동 행복로 4길"}, 
  {id: 5, name:"봉봉동물병원", address:"서울시 관악구 행봄동 행봄로 5길"},
  {id: 6, name:"봉행동물병원", address:"서울시 관악구 행봉동 행봉로 6길"},
]


//====================================================================

  export const getUserInfo = () => async dispatch => {
    const response = []
    await dispatch({ type: GET_USER_INFO, payload: response.data.data });
  };

  export const getHosData = () => async dispatch => {
    const response = hosData;
    console.log("======리덕스======")
    console.log(response)
    dispatch({ type: GET_HOS_DATA, payload: response });
  }

  export const getReviewData = () => async dispatch => {
    const response = reviewData;
    console.log("======리덕스======")
    console.log(response)
    dispatch({ type: GET_REVIEW_DATA, payload: response });
  }

  export const uploadReciept = (bff, dateIs, hasHos, items) => {
    console.log("upload reciept")
    return {
      type: UPLOAD_RECIEPT_INFO,
      bff, dateIs, hasHos, items
    }
  }

  export const getHosSearchList = () => {
    console.log('get hos search list')
    const res = hos_list
    return {
      type: GET_HOS_SEARCH_LIST,
      res
    }
  }

  export const setHosInfo = (id, name, address) => {
    console.log('set hos info')
    return {
      type: SET_HOS_INFO,
      id, name, address
    }
  }

  export const toggleSearchModal = () => {
    return {
      type: TOGGLE_SEARCH_MODAL
    }
  }

  export const selectHos = (hosSelected) => {
    return {
      type: SELECT_HOS,
      hosSelected
    }
  }

  export const hasReciept = (hasReciept) => {
    return {
      type: HAS_RECIEPT,
      hasReciept
    }
  }

  export const getTotalGrade = () => {
    return {
      type: GET_TOTAL_GRADE
    }
  }

  export const setHosScore = (name, score, i) => {
    return {
      type: SET_HOS_SCORE,
      name, score, i
    }
  }