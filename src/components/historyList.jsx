import React from 'react'

export default function HistoryList(props) {
    return (
        <li>
            <p className="date">{`${(new Date(props.item.date)).getHours()}:${(new Date(props.item.date)).getMinutes()}`}</p>
            <p className="lb">{`${digitNumber(props.balance)} Ether`}</p>
            <p className="difference">{difference(props.lastBalance, props.balance)}</p>
        </li>
    )
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
    let d = newB - lastB;
    if (d < 0) {
        let str = "" + d;
        let result = digitNumber(str.slice(1));
        return ("- " + result);
    } else if (d > 0) {
        return `+ ${digitNumber(""+d)}`
    };
}
