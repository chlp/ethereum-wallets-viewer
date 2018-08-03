import React from 'react'
import TimeAgo from 'timeago-react';

export default function TokensList(props) {
    return (
        <li>
            <p className="from">From: {props.item.from}</p>
            {inOut(props.account, props.item.to)}
            <p className="value">{digitNumber(props.item.value)} Ether</p>
            <p className="to">To: {props.item.to}</p>
            <p className="txHash">txHash: {props.item.hash}</p>
            <p className="date"><TimeAgo datetime={Date.now() - props.item.timeStamp}/></p>
        </li>
    )
}

function inOut(mAccount, tAccount) {
    if(mAccount == tAccount) {
        return (
            <p className="in">In</p>
        )
    } else {
        return (
            <p className="out">Out</p>
        )
    }
}

function digitNumber(balance) {
    if(balance == 0) {
        return balance;
    }

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

    return (correctBalance.replace(/0*$/,"")).replace(/\.$/,"");
}

function addZero(count) {
    let str = "";
    for(let start = 0; start < count; start++) {
        str += 0;
    }
    return str;
}
