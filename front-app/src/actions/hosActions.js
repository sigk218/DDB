import {
  MAIN_SEARCH,
  GET_HOS_BY_LOC,
  GET_HOS_BY_WORD,
  HOS_LIKED,
  HOS_DISLIKED,
  GET_MY_LIKE_HOS
} from './types'
import apis from '../apis/apis';

// ---------- main.js ---------------------
export const mainSearch = (searchWord, lat, long, category, filter) => {
  console.log('mainSearch')
  return dispatch => {
    console.log(searchWord, lat, long, category, filter)
    dispatch(setMainSearch(searchWord, lat, long, category, filter))
    if (filter === 'nearHos') {
      return dispatch(getNearHos(lat, long, 0, null, category, filter))
    } else {
      return dispatch(getHosByWord(searchWord, 0, category, filter))
    }
  }
}

export const setMainSearch = (searchWord, lat, long, category, filter) => {
  console.log('setMainSearch')
  const item = {searchWord: searchWord,lat: lat,long: long,category: category,filter: filter}
  window.localStorage.setItem('mainSearch', JSON.stringify(item))
  return {
    type: MAIN_SEARCH,
    searchWord, lat, long, category, filter
  }
}

// ------------- hospital 관련 action --------
// 1. 현재 내 위치에서 3km 이내의 병원 조회 with 필터
export const getNearHos = (lat, long, page, mode, category, filter) => {
  console.log('getNearHospitals')
  const url = 'hospital/location/'+page+ '?latitude=' + lat + '&longtitude=' + long
  const reqURL = mode === null ? url : url + '&mode=' + mode
  return dispatch => {
    return apis.post(reqURL)
      .then(res => {
        dispatch(recieveHosByLoc(lat, long, page, res.data.next, res.data.hospital, category, filter))
      })
  }
}

// 3. 전체 지역 병원 검색 리뷰순 요청하기
export const getHosByReview = (lat, long, page, category, filter) => {
  console.log('getHosByReview')
  return dispatch => {
    return apis.post('hospital/reviewcnt/'+page+ '?latitude=' + lat + '&longtitude=' + long)
      .then(res => {
        dispatch(recieveHosByLoc(lat, long, page, res.data.next, res.data.hospital, category, filter))
      })
  }
}

// 4. 전체 지역 병원 검색 별점순 요청하기
export const getHosByStar = (lat, long, page, category, filter) => {
  console.log('getHosByStar')
  return dispatch => {
    return apis.post('hospital/starrating/'+page+ '?latitude=' + lat + '&longtitude=' + long)
      .then(res => {
        dispatch(recieveHosByLoc(lat, long, page, res.data.next, res.data.hospital, category, filter))
      })
  }
}

// 1.2 getNearHospitals로 받은 병원 리스트를 hos_info 에 저장하기
export const recieveHosByLoc = (lat, long, page, next, list, category, filter) => {
  console.log('recieveHos')
  return {
    type: GET_HOS_BY_LOC,
    lat, long, page, next, list, category, filter
  }
}


// 2. 병원 키워드로 검색하기
export const getHosByWord = (keyword, page, category, filter) => {
  console.log('getHosByword')
  return dispatch => {
    return apis.post('hospital/name/'+page+'?keyword='+keyword)
      .then(res => {
        dispatch(recieveHosByWord(keyword, page, res.data.next, res.data.hospital, category, filter))
      })
  }
}

// 2.1. 키워드 검색 결과 hos_info에 저장하기
export const recieveHosByWord = (keyword, page, next, list, category, filter) => {
  console.log('recieveHosByWord')
  return {
    type: GET_HOS_BY_WORD,
    keyword, page, next, list, category, filter
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
  const body = {
    u_id: u_id
  }
  return dispatch => {
    return apis.post('favoriteHospital/findById', body)
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