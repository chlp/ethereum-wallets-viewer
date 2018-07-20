export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return searchAccount(state, action);
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
                            date: action.item.history[0].date
                        })
                    } else return item
                })
            ]
        });
        return state.map((item) => {
            if(item.account === dataRefresh.account) {
                return Object.assign({}, item, dataRefresh);
            } else return item
        })
    } else {
        let newObj = Object.assign({}, state[pos], {
            balance: action.item.balance,
            history: [
                ...state[pos].history,
                {
                    balance: action.item.balance,
                    date: action.item.history[0].date
                }
            ]
        });
        console.log("hello");
        return state.map((item) => {
            if(item.account === action.item.account) {
                return Object.assign({}, item, newObj);
            } else return item
        });
    }
}
