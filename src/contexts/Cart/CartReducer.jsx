const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.cart.find(item => item._id === action.payload._id);

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    case "CALCULATE_TOTAL":
      return {
        ...state,
        total: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      };

    default:
      return state;
  }
};

export default CartReducer;
