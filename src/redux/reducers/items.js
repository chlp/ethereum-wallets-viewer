export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}
export function itemsFirstLoading(state = true, action) {
    switch (action.type) {
        case 'ITEMS_FIRST_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}
