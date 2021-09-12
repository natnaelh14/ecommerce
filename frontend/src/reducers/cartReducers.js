import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

//'state' is the initial state
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      //if a cart item exists
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          //If cart doesn't exist, we will add current item to the array.
          ...state,
          cartItems: [ ...state.cartItems, item ],
        };
      }
    default:
      return state;
  }
};
