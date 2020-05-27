const fs = require('fs')

const res = fs.readFileSync('test.json', {encoding:'utf-8', flag:'r'})
const resJson = JSON.parse(res)

function sum(array) {
    return array.reduce((acc, curr) => acc + curr)
}

function getParts(r) {
    const temp = new Object()
    const tempPoly = r.boundingPoly.vertices.sort((a,b) => (b.y - a.y)||(b.x - a.x))
    temp[r.description] = tempPoly
    return temp
}

function findSumKeywords(key) {
    return sumKeywords.includes(Object.keys(key)[0])
}

function getHyperParams() {
    const i = getStandard()
    const tempPoly = Object.values(sortedParts[i])[0]
    const v = [tempPoly[0].x, tempPoly[1].x, tempPoly[0].y, tempPoly[1].y] // x1, x2, y1, y2
    const m = (v[2] - v[3]) / (v[0] - v[1])
    const c = - (m * v[0]) + v[2]
    const thres = Math.abs(v[2] - tempPoly[2].y)/2
    return [m, c, thres, i]
}

function getStandard() {
    if (sum(checkBox) === 0) {
        const ski = sortedParts.findIndex(findSumKeywords)
        if (ski !== -1) {
            return ski
        }
    }
    const i = checkBox.findIndex(p => p === 0)
    return i
}

function reorder(parts) {
    parts.sort((a, b) => (Object.values(sortedParts[a])[0][0].x - Object.values(sortedParts[b])[0][0].x))
    return parts
} 


function checkOutliers() {
    const i = checkBox.findIndex(b => b===1)
    for (let j=0; j<i; j++) {
        if (checkBox[j] === 0) {
            checkBox[j] = 1
        }
    }
}


function isRow(p, m, c, thres) {
    const underCenter = [(Object.values(p)[0][0].x + Object.values(p)[0][1].x)/2, (Object.values(p)[0][0].y + Object.values(p)[0][1].y)/2]
    const dist = Math.abs(m*underCenter[0] - underCenter[1] + c) / Math.sqrt(m*m + 1)
    if (dist < thres) {
        return true
    } else {
        return false
    }
}

function calcSpace(words) {
    const allwords = sortedParts.map(p => Object.keys(p)[0])
    const totalwidth = sortedParts.map(p => (Object.values(p)[0][0].x - Object.values(p)[0][1].x))
    return Math.ceil(sum(totalwidth)/allwords.join('').length)*2
}

function divideRow(row) {
    let words = row.map(r => Object.keys(sortedParts[r])[0])
    let tr = words[words.length-1]
    for (let i=row.length-1; i>0; i--) {
        const r_dist = Object.values(sortedParts[row[i]])[0][1].x - Object.values(sortedParts[row[i-1]])[0][0].x
        if (r_dist < whitespace ) {
            tr = Object.keys(sortedParts[row[i-1]])[0] + tr
        } else {
            tr = Object.keys(sortedParts[row[i-1]])[0] + ' | ' + tr
        }
    }
    return tr
}

const parts = resJson.textAnnotations.map(getParts)
const full = parts.shift()
const sortedParts = parts.sort((a, b) => (Object.values(b)[0][0].y - Object.values(a)[0][0].y)||(Object.values(b)[0].x - Object.values(a)[0].x))
const sumKeywords = ['총금액', '총액', '합계']
const dateKeywords = ['발행일', '거래일자']
const hosName = '스토리동물병원'

const pLen = sortedParts.length
const rows = []
const checkBox = new Array(pLen).fill(0)
let m, c, thres, flag;

do {
    [m, c, thres, j] = getHyperParams()
    const row = []
    for (let i=0; i < pLen; i++) {
        if (checkBox[i] !== 1) {
            if (isRow(sortedParts[i], m, c, thres)) {  
                checkBox[i] = 1
                row.push(i)
            }
        }
    }
    const orderedRow = reorder(row)
    const text = orderedRow.map(r => Object.keys(sortedParts[r])[0])
    console.log(text.join(''))
    rows.push(orderedRow)
    checkOutliers()
    flag = (j !== (pLen-1))
} while (flag & sum(checkBox)<(pLen-1))

// 여기서 2줄짜리 처리

// 처리하고나서 항목 수량 가격 처리

const whitespace = calcSpace()
const table = rows.map(row => divideRow(row))
console.log(table)

// 병원명, 시간정보, 합계 등의 정보 걸러 내고 항목별 가격만 남기기
const priceTable = trimTable()
const dateInfo = getDateInfo()
const isHosName = checkHosName()
console.log(dateInfo)
console.log(isHosName)
