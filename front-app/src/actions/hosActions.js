import {
  GET_NEAR_HOS,
  GET_NEAR_HOS_BY_STAR,
  GET_NEAR_HOS_BY_REVIEW,
  GET_HOS_BY_WORD,
  GET_HOS_BY_STAR,
  GET_HOS_BY_REVIEW,
  SET_NEAR_HOS_STATUS,
  SET_NEAR_HOS_BY_STAR_STATUS,
  SET_NEAR_HOS_BY_REVIEW_STATUS,
  SET_HOS_BY_WORD_STATUS,
  SET_HOS_BY_STAR_STATUS,
  SET_HOS_BY_REVIEW_STATUS,
  HOS_LIKED,
  HOS_DISLIKED,
  GET_MY_LIKE_HOS
} from './types'
import apis from '../apis/apis';

// ------------- hospital 관련 action --------
// 1. 현재 내 위치에서 3km 이내의 병원 조회 with 필터
export const getNearHos = (lat, long, page, mode) => {
  console.log('getNearHospitals')
  const url = 'hospital/location/'+page+ '?latitude=' + lat + '&longtitude=' + long
  const reqURL = mode === '' ? url : url + '&mode=' + mode
  return dispatch => {
    return apis.post(reqURL)
      .then(res => {
        dispatch(recieveNearHos(mode, lat, long, res.data.hospital))
        dispatch(setNearHosStatus(mode, lat, long, page, res.data.next))
      })
  }
}

// 1.1 현재 검색 중인 위치와 받았던 페이지와 next여부 status에 저장하기
export const setNearHosStatus = (mode, lat, long, page, next) => {
  if (mode === '') {
    return {
      type: SET_NEAR_HOS_STATUS,
      mode, lat, long, page, next
    }
  } else if (mode === 'starrating') {
    return {
      type: SET_NEAR_HOS_BY_STAR_STATUS,
      mode, lat, long, page, next
    }
  } else {
    return {
      type: SET_NEAR_HOS_BY_REVIEW_STATUS,
      mode, lat, long, page, next
    }
  }
}

// 1.2 getNearHospitals로 받은 병원 리스트를 hos_info 에 저장하기
export const recieveNearHos = (mode, lat, long, list) => {
  if (mode === '') {
    return {
      type: GET_NEAR_HOS,
      lat, long, list
    }
  } else if (mode === 'starrating') {
    return {
      type: GET_NEAR_HOS_BY_STAR,
      lat, long, list
    }
  } else {
    return {
      type: GET_NEAR_HOS_BY_REVIEW,
      lat, long, list
    }
  }
}


// 2. 병원 키워드로 검색하기
export const getHosByword = (keyword, page) => {
  console.log('getHosByword')
  return dispatch => {
    return apis.post('hospital/name/'+page+'?keyword='+keyword)
      .then(res => {
        dispatch(recieveHosByWord(res.data))
        dispatch(setHosByWordStatus(keyword, page, res.data.next))
      })
  }
}

// 2.1. 키워드 검색 결과 hos_info에 저장하기
export const recieveHosByWord = (keyword, list) => {
  console.log('recieveHosByWord')
  return {
    type: GET_HOS_BY_WORD,
    keyword, list
  }
}


// 2.2. 키워드 검색 관련 인자들 status에 저장하기
export const setHosByWordStatus = (keyword, page, next) => {
  return {
    type: SET_HOS_BY_WORD_STATUS,
    keyword, page, next
  }
}


// 3. 전체 지역 병원 검색 리뷰순 요청하기
export const getHosByReview = (lat, long, page) => {
  console.log('getHosByReview')
  return dispatch => {
    return apis.post('hospital/starrating/'+page+ '?latitude=' + lat + '&longtitude=' + long)
      .then(res => {
        dispatch(recieveHosByReview(lat, long, res.data.hospital))
        dispatch(setHosByReviewStatus(lat, long, page, res.data.next))
      })
  }
}


// 3.1. 전체 지역 병원 검색 리뷰순 hos_info에 저장하기
export const recieveHosByReview = (lat, long, list) => {
  console.log('recieveHosByReview')
  return {
    type: GET_HOS_BY_REVIEW,
    lat, long, list
  }
}


// 3.2. 전체 지역 병원 검색 리뷰순 관련 인자들 status에 저장하기
export const setHosByReviewStatus = (lat, long, page, next) => {
  return {
    type: SET_HOS_BY_REVIEW_STATUS,
    lat, long, page, next
  }
}


// 4. 전체 지역 병원 검색 별점순 요청하기
export const getHosByStar = (lat, long, page) => {
  console.log('getHosByStar')
  return dispatch => {
    return apis.post('hospital/starrating/'+page+ '?latitude=' + lat + '&longtitude=' + long)
      .then(res => {
        dispatch(recieveHosByStar(lat, long, res.data.hospital))
        dispatch(setHosByStarStatus(lat, long, page, res.data.next))
      })
  }
}

// 4.1. 전체 지역 병원 검색 별점순 hos_info에 저장하기
export const recieveHosByStar = (list) => {
  console.log('recieveHosByStar')
  return {
    type: GET_HOS_BY_STAR,
    lat, long, list
  }
}

// 4.2. 전체 지역 병원 검색 별점순 관련 인자들 status에 저장하기
export const setHosByStarStatus = (lat, long, page, next) => {
  return {
    type: SET_HOS_BY_STAR_STATUS,
    lat, long, page, next
  }
}

// ------------- 병원 즐겨찾기 기능 관련 action --------------
// 1. 즐겨찾기 추가 요청
export const likeHos = (hcode, ucode) => {
  console.log('likeHos')
  const favoriteHospital = {
    hospital: {hcode: hcode},
    user: {ucode: ucode}
  }
  return dispatch => {
    dispatch(hosLiked(false))
    return apis.post('favoriteHospital/insert', favoriteHospital)
      .then(() => dispatch(hosLiked(true)))
  }
}


// 2. 즐겨찾기 취소 요청
export const dislikeHos = (hcode, ucode) => {
  console.log('dislikeHos')
  const favoriteHospital = {
    hospital: {hcode: hcode},
    user: {ucode: ucode}
  }
  return dispatch => {
    dispatch(hosDisliked(false))
    return apis.post('favoriteHospital/delete', favoriteHospital)
      .then(() => dispatch(hosDisliked(true)))
  }
}

// 1.1. 즐겨찾기 추가 결과 status에 저장
export const hosLiked = (code) => {
  console.log('hosLiked')
  return {
    type: HOS_LIKED,
    code
  }
}

// 2.1. 즐겨찾기 삭제 결과 status에 저장
export const hosDisliked = (code) => {
  console.log('hosDisliked')
  return {
    type: HOS_DISLIKED,
    code
  }
}



// 3. 유저의 병원 즐겨찾기 조회 요청
export const getMyLikeHos = (u_id) => {
  console.log('getMyLikeHos')
  const u_id = {
    u_id: u_id
  }
  return dispatch => {
    return apis.post('favoriteHospital/findById', u_id)
      .then(res => dispatch(recieveMyLikeHos(res.data)))
  }
}

// 3.1. 즐겨찾기 결과 user에 저장
export const recieveMyLikeHos = (likeHos) => {
  console.log('recieveMyLikeHos')
  return {
    type: GET_MY_LIKE_HOS,
    likeHos
  }
}