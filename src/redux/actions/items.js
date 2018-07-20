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

export function itemsFetchDataSuccess(item) {
    return { type: 'ITEMS_FETCH_DATA_SUCCESS', item };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        fetch(url, {
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
            let date = new Date()
            items.result.forEach((item) => {dispatch(itemsFetchDataSuccess({
                account: item.account,
                balance: item.balance,
                history: [
                    {
                        balance: item.balance,
                        date: `Update Time ${date.getHours()}:${date.getMinutes()}`
                    }
                ]
            }))})
        })
        .catch(() => dispatch(itemsHasErrored(true)));
    };
}