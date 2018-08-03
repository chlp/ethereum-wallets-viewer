export function itemsFirstLoading(bool) {
    return {
        type: 'ITEMS_FIRST_LOADING',
        isLoading: bool
    };
}

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function removeWallet(wallet) {
    return {
        type: 'REMOVE_WALLET',
        wallet
    };
}

export function itemsFetchDataSuccess(item) {
    return { type: 'ITEMS_FETCH_DATA_SUCCESS', item };
}

export function fetchTokensSuccess(item) {
    return { type: 'FETCH_TOKENS_SUCCESS', item };
}

export function itemsFetchData(address) {
    return (dispatch) => {
        fetch(`https://api.etherscan.io/api?module=account&action=balancemulti&address=${address}&tag=latest`,
        {
            'method': 'GET',
            'Content-Type': 'text/plain'
        })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((items) => {
            dispatch(itemsHasErrored(false))
            let date = new Date()
            items.result.forEach((item) => {
                dispatch(itemsFetchDataSuccess({
                    account: item.account,
                    balance: item.balance,
                    history: [
                        {
                            balance: item.balance,
                            date: Date.now()
                        }
                    ],
                    tokens: []
                }))
                dispatch(fetchTokens(item.account))
            })
        })
        .catch(() => dispatch(itemsHasErrored(true)));
    };
}

export function fetchTokens(address) {
    return (dispatch) => {
        fetch(`http://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken`,
        {
            'method': 'GET',
            'Content-Type': 'text/plain',
            'timeout': 20
        })
        .then((response) => {
            if(!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
        .then((response) => response.json())
        .then((item) => {
            dispatch(fetchTokensSuccess(Object.assign({}, item, {
                address: address
            })))
        })
        .catch(() => dispatch(itemsHasErrored(true)));
    }
}
