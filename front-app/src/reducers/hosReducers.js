import {
  GET_NEAR_HOS,
  GET_NEAR_HOS_BY_STAR,
  GET_NEAR_HOS_BY_REVIEW,
  GET_HOS_BY_WORD,
  GET_HOS_BY_STAR,
  GET_HOS_BY_REVIEW,
} from '../actions/types'

const initializer = {
  nearHos: [],
  nearHosByStar: [],
  nearHosByReview: [],
  hosByWord: [],
  hosByReview: [],
  hosByStar: [],
}

export default (state = initializer, action) => {
  switch (action.type) {
    case GET_NEAR_HOS:
      const updated = state.nearHos.map(p => {
        (p.lat === action.lat) & (p.long === action.long)
          ? { ...p, list: action.list } : p
      })
      return { ...state, nearHos: [...updated] };
    case GET_NEAR_HOS_BY_STAR:
      const updated = state.nearHosByStar.map(p => {
        (p.lat === action.lat) & (p.long === action.long)
          ? { ...p, list: action.list } : p
      })
      return { ...state, nearHosByStar: [...updated] };
    case GET_NEAR_HOS_BY_REVIEW:
      const updated = state.nearHosByReview.map(p => {
        (p.lat === action.lat) & (p.long === action.long)
          ? { ...p, list: action.list } : p
      })
      return { ...state, nearHosByReview: [...updated] };
    case GET_HOS_BY_WORD:
      const updated = state.nearHosByReview.map(p => {
        p.keyword === action.keyword ? { ...p, list: action.list } : p
      })
      return { ...state, hosByWord: [...updated] };
    case GET_HOS_BY_STAR:
      const updated = state.hosByStar.map(p => {
        (p.lat === action.lat) & (p.long === action.long)
          ? { ...p, list: action.list } : p
      })
      return { ...state, hosByStar: [...updated] };
    case GET_HOS_BY_REVIEW:
      const updated = state.hosByStar.map(p => {
        (p.lat === action.lat) & (p.long === action.long)
          ? { ...p, list: action.list } : p
      })
    default:
      return state;
  }
}