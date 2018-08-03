export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return searchAccount(state, action);
            break;
        case 'REMOVE_WALLET':
            return removeWallet(state, action.wallet);
            break;
        case 'FETCH_TOKENS_SUCCESS':
            return addTokens(state, action)
        default:
            return state;
    }
}

function searchAccount(state, action) {
    let pos = -1;
    state.forEach((item, i) => {
        if(item.account === action.item.account) {
            pos = i
        };
    });
    if(pos > -1) {
        return addWallet(state, action, pos);
    } else {
        return [].concat(state,action.item);
    }
};

function addWallet(state, action, pos) {

    if(state[pos].balance == action.item.balance) {
        let dataRefresh = Object.assign({}, state[pos], {
            history: [
                ...state[pos].history.map((item) => {
                    if(item.balance == action.item.balance) {
                        return Object.assign({}, item, {
                            date: Date.now()
                        })
                    } else return item
                })
            ]
        });
        console.log(dataRefresh)
        return state.map((item) => {
            if(item.account === dataRefresh.account) {
                return Object.assign({}, item, dataRefresh);
            } else return item
        })
    } else {
        let newObj = Object.assign({}, state[pos], {
            balance: action.item.balance,
            history: checkHistory(state[pos].history, action, pos)
        });

        return state.map((item) => {
            if(item.account === action.item.account) {
                return Object.assign({}, item, newObj);
            } else return item
        });
    }
}

function checkHistory(history, action, pos) {
    if(history.length <= 10) {
        return ([
            ...history,
            {
                balance: action.item.balance,
                date: action.item.history[0].date
            }
        ])
    } else {
        let arr = history.filter((item, i) => {
            return i > 0
        })

        return [].concat(arr, {
            balance: action.item.balance,
            date: action.item.history[0].date
        })
    }
}

function removeWallet(state, account) {
    let pos = 0;
    state.forEach((item,i) => {
        if(item.account == account) {
            pos = i;
        }
    });
    return [].concat(state.slice(0,pos), state.slice(pos+1))
}

function addTokens(state, action) {
    if(action.item.status == "0") return state;
    let pos;
    let resResult = action.item.result;
    let dataArr = [];
    state.forEach((item, i) => {
        if(item.account == action.item.address) {
            pos = i;
        }
    });
    resResult.forEach((item, i) => {
        dataArr.push({
            contractAddress: item.contractAddress,
            tokenName: item.tokenName,
            tokenSymbol: item.tokenSymbol,
            tokenDecimal: item.tokenDecimal,
            from: item.from,
            to: item.to,
            value: item.value,
            timeStamp: item.timeStamp,
            hash: item.hash
        })
    });

    return state.map((item, i) => {
        if(i === pos) {
            return Object.assign({}, item, {
                tokens: dataArr
            });
        } else return item;
    })
}
