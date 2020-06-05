import {
  USER_UPDATED,
  PET_REGISTERED,
  PET_UPDATED,
  PET_DELETED,
  HOS_LIKED,
  HOS_DISLIKED,
  REVIEW_GOOD,
  REVIEW_BAD,
  REVIEW_POSTED,
  REVIEW_UPDATED,
  REVIEW_DELETED,
  REVIEW_REPORTED, // report 관련
  REPORT_CANCELED,
  SET_NEAR_HOS_STATUS,
  SET_NEAR_HOS_BY_STAR_STATUS,
  SET_NEAR_HOS_BY_REVIEW_STATUS,
  SET_HOS_BY_WORD_STATUS,
  SET_HOS_BY_STAR_STATUS,
  SET_HOS_BY_REVIEW_STATUS,

} from '../actions/types'

const initializer = {
  userUpdated: null,
  petRegistered: null,
  petUpdated: null,
  petDeleted: null,
  hosLiked: null,
  hosDisLiked: null,
  reviewGood: null,
  reviewBad: null,
  reviewPosted: null,
  reviewUpdated: null,
  reviewDeleted: null,
  reviewReported: null,
  reportCanceled: null,
  nearHos: [],
  nearHosByStar: [],
  nearHosByReview: [],
  hosByWord: [],
  hosByReview: [],
  hosByStar: [],
}



export default (state = initializer, action) => {
  switch (action.type) {
    case USER_UPDATED:
      return { ...state, userUpdated: action.code }
    case PET_REGISTERED:
      return { ...state, petRegistered: action.code }
    case PET_UPDATED:
      return { ...state, petUpdated: action.code }
    case PET_DELETED:
      return { ...state, petDeleted: action.code }
    case HOS_LIKED:
      return { ...state, hosLiked: action.code }
    case HOS_DISLIKED:
      return { ...state, hosDisliked: action.code }
    case REVIEW_GOOD:
      return { ...state, reviewGood: action.code }
    case REVIEW_BAD:
      return { ...state, reviewBad: action.code }
    case REVIEW_POSTED:
      return { ...state, reviewPosted: action.code }
    case REVIEW_UPDATED:
      return { ...state, reviewUpdated: action.code }
    case REVIEW_DELETED:
      return { ...state, reviewDeleted: action.code }
    case REVIEW_REPORTED:
      return { ...state, reviewReported: action.code }
    case REPORT_CANCELED:
      return { ...state, reportCanceled: action.code }
    case SET_NEAR_HOS_STATUS:
      return { ...state, nearHos: state.nearHos.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, page: action.page, next: action.next }
        } else { return p }
      }) }
    case SET_NEAR_HOS_BY_STAR_STATUS:
      return { ...state, nearHosByStar: state.nearHosByStar.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, page: action.page, next: action.next }
        } else { return p }
      })  }
    case SET_NEAR_HOS_BY_REVIEW_STATUS:
      return { ...state, nearHosByReview: state.nearHosByReview.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, page: action.page, next: action.next }
        } else { return p }
      })   }
    case SET_HOS_BY_WORD_STATUS:
      return { ...state, hosByWord: state.hosByWord.map(p => {
        if (p.keyword === action.keyword) {
          return { ...p, page: action.page, next: action.next }
        } else { return p }
      }) }
    case SET_HOS_BY_REVIEW_STATUS:
      return { ...state, hosByReview: state.hosByReview.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, page: action.page, next: action.next }
        } else { return p }
      })    }
    case SET_HOS_BY_STAR_STATUS:
      return { ...state, hosByStar: state.hosByStar.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, page: action.page, next: action.next }
        } else { return p }
      })     }
    default:
      return state;
  }
}

// 상태는 요청한 다음 필요없어지면 다시 null 설정하기