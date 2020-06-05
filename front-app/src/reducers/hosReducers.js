import {
  MAIN_SEARCH,
  GET_NEAR_HOS,
  GET_NEAR_HOS_BY_STAR,
  GET_NEAR_HOS_BY_REVIEW,
  GET_HOS_BY_WORD,
  GET_HOS_BY_STAR,
  GET_HOS_BY_REVIEW,
} from '../actions/types'

const initializer = {
  mainSearch: {
    searchWord: '',
    lat: 37.504909,
    long: 127.048463,
    category: null,
  },
  nearHos: [],
  nearHosByStar: [],
  nearHosByReview: [],
  hosByWord: [],
  hosByReview: [],
  hosByStar: [],
}

let updated;

export default (state = initializer, action) => {
  switch (action.type) {
    case MAIN_SEARCH:
      return {
        ...state, 
        mainSearch: {
          searchWord:action,
          lat: action.lat === null ? state.mainSearch.lat : action.lat,
          long: action.long === null ? state.mainSearch.long : action.long,
          category:action.category
        }
      }
    case GET_NEAR_HOS:
      updated = state.nearHos.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, list: action.list }
        } 
      })
      return { ...state, nearHos: [...updated] };
    case GET_NEAR_HOS_BY_STAR:
      updated = state.nearHosByStar.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, list: action.list }
        } else { return p }
      })
      return { ...state, nearHosByStar: [...updated] };
    case GET_NEAR_HOS_BY_REVIEW:
      updated = state.nearHosByReview.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, list: action.list }
        } else { return p}
      })
      return { ...state, nearHosByReview: [...updated] };
    case GET_HOS_BY_WORD:
      updated = state.nearHosByReview.map(p => {
        if (p.keyword === action.keyword) {
          return { ...p, list: action.list } 
        } else { return p }
      })
      return { ...state, hosByWord: [...updated] };
    case GET_HOS_BY_STAR:
      updated = state.hosByStar.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, list: action.list }
        } else { return p }
      })
      return { ...state, hosByStar: [...updated] };
    case GET_HOS_BY_REVIEW:
      updated = state.hosByStar.map(p => {
        if ((p.lat === action.lat) & (p.long === action.long)) {
          return { ...p, list: action.list }
        } else { return p }
      })
      return { ...state, hosByReview: [...updated] };
    default:
      return state;
  }
}