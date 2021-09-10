import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

//State for product list, which we will see in the homepage
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    //When we make the fetch request
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    //If we get a successful response with the data.
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    //If it fails, we will send error through the state.
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    //we are returning the initial state
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    //When we make the fetch request
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    //If we get a successful response with the data.
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    //If it fails, we will send error through the state.
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    //we are returning the initial state
    default:
      return state;
  }
};