export const initialState = {
    basket: [],
    user: null
}

export const ACTIONS = {
    ADD_TO_BASKET: 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET: 'REMOVE_FROM_BASKET',
    SET_USER: 'SET_USER',
    EMPTY_BASKET: 'EMPTY_BASKET'
}

export const sumBasket = (basket) => {
    return basket.reduce((acc, curr) => {
        return acc += curr.price;
    }, 0)
}

const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.ADD_TO_BASKET:
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
        case ACTIONS.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case ACTIONS.REMOVE_FROM_BASKET:
            const index = state.basket.findIndex(
                (findIndex) => findIndex.id === action.id
            )
            const newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove item id ${action.id} since it's not in the basket!`)
            }
            return {
                ...state,
                basket: newBasket
            }
        case ACTIONS.EMPTY_BASKET:
            return {
                ...state,
                basket: []
            }
        default:
            return state;
    }
}

export default reducer
