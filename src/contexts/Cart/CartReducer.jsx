const CartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
  
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
  
      case "CALCULATE_TOTAL":
        return {
          ...state,
          total: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default CartReducer;
  