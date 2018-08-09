import React from 'react'
import TimeAgo from 'timeago-react';

export default function HistoryList(props) {
    return (
        <li>
            <p className="date"><TimeAgo datetime={props.item.date} /></p>
            <p className="lb">{`${digitNumber(props.balance)} Ether`}</p>
            <p className="difference">{difference(`${props.lastBalance}`, `${props.balance}`)}</p>
        </li>
    )
}

function correctDate(milliseconds) {
    let date = new Date(milliseconds)

    let options = {
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    }

    return date.toLocaleString("en-US", options)
}

function digitNumber(balance) {
    let correctBalance = balance;
    let correctLength = 19;
    if(correctBalance == 0) {
        return 0;
    };
    if(correctBalance.length < correctLength) {
        let difference = correctLength - correctBalance.length;
        correctBalance = addZero(difference) + correctBalance;
    };
    correctBalance = correctBalance.split("").reverse();
    correctBalance = [].concat(correctBalance.slice(0, correctLength - 1), '.', correctBalance.slice(correctLength-1));
    correctBalance = ((correctBalance.reverse()).join('')).replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1,');
    return correctBalance;
}

function addZero(count) {
    let str = "";
    for(let start = 0; start < count; start++) {
        str += 0;
    }
    return str;
}

function difference(lastB,newB) {

    let mathDifferenceRes = mathDifference(lastB,newB);

    let digitNumberRes = digitNumber(mathDifferenceRes.result);

    if (mathDifferenceRes.negative) {
        return `- ${(digitNumberRes.replace(/0*$/,"")).replace(/\.$/,"")}`;
    } else {
        return `+ ${(digitNumberRes.replace(/0*$/,"")).replace(/\.$/,"")}`
    };
}


function mathDifference(fNum, sNum) {
    let min, max, len, result;
    let negative = false;

    if (+fNum > +sNum) {
        min = sNum.split('').reverse();
        max = fNum.split('').reverse();
        negative = true;
    } else {
        min = fNum.split('').reverse();
        max = sNum.split('').reverse();
    };

    len = max.length;
    result = [];

    for (let i = 0, b = 0, c = 0; i < len; i++) {
        b = max[i] - (min[i] || 0) + c;
        result[i] = b < 0 ? (c = -1, 10 + b) : (c = 0, b)
    }

    return {
        result: result.reverse().join('').replace(/^0+/, ''),
        negative: negative
    }
}
