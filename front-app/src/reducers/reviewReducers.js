import {
    GET_HOS_REVIEW,
    GET_MY_REVIEW,
    GET_REVIEW_REPORT,
    GET_MY_REPORT,
    SET_SEARCH_KEYWORD, // selectOption 관련
    TOGGLE_SEARCH_MODAL,
    SET_HOS_INFO,
    SET_HOS_SCORE, // reviewForm 관련
    GET_TOTAL_GRADE,
    DO_DOJANG,
    UPLOAD_RECIEPT,
} from './types'

const scorelist = [0, 0, 0, 0, 0]
const scorelabel = ['청결', '친절함', '치료결과', '전문성', '적정한 치료']
const grade = scorelist.map((g, i) => ({ name: scorelabel[i], score: g }))


const initializer = {
    hosReview: [],
    myReview: [],
    reviewReport: [],
    userReport: [],
    hosSearchWord: null,
    toggleSearchModal: false,
    hosInfo: null,
    reciept: null,
    scorelist: scorelist,
    scorelabel: scorelabel,
    grade: grade,
    totalgrade: [{ name: '평균평점', score: 0 }],
    dojang: false,
}


export default (state = initializer, action) => {
    switch (action.type) {
        case GET_HOS_REVIEW:
            return { ...state, hosReview: [...action.list] }
        case GET_MY_REVIEW:
            return { ...state, myReview: [...action.list] }
        case GET_MY_REVIEW_LIST:
            return { ...state, mylist: action.list }
        case GET_REVIEW_REPORT:
            return { ...state, reviewReport: action.list }
        case GET_MY_REPORT:
            return { ...state, userReport: action.list }
        case SET_SEARCH_KEYWORD:
            return { ...state, hosSearchWord: action.keyword }
        case TOGGLE_SEARCH_MODAL:
            return { ...state, toggleSearchModal: !state.toggleSearchModal }
        case SET_HOS_INFO:
            return { ...state, hosInfo: { id: action.id, name: action.name, address: action.address } }
        case GET_TOTAL_GRADE:
            const totalscore = Math.round(((state.scorelist.reduce((a, b) => a + b, 0) / state.scorelist.length) + Number.EPSILON) * 100) / 100
            return { ...state, totalgrade: [{ name: state.totalgrade[0].name, score: totalscore }] }
        case SET_HOS_SCORE:
            return {
                ...state,
                scorelist: state.scorelist.map((s, i) => (
                    i === action.i ? action.score : s
                )),
                grade: state.grade.map(g => (
                    g.name === action.name ? { name: g.name, score: action.score } : g
                ))
            }
        case DO_DOJANG:
            return { ...state, dojang: action.dojang }
        case UPLOAD_RECIEPT:
            return { ...state, reciept: { bff: action.bff, dateIs: action.dateIs, hasHos: action.hasHos, items: action.items } }
        default:
            return state;
    }
}