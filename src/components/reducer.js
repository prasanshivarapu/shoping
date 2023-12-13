// Reducer.js

// Action types
// reducer.js

// Action types
// export const ADD_TO_CART = 'ADD_TO_CART';
// export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// // Action creators
// export const addToCart = (product) => ({
//   type: ADD_TO_CART,
//   payload: product,
// });

// export const updateQuantity = (productId, quantity) => ({
//   type: UPDATE_QUANTITY,
//   payload: { productId, quantity },
// });

// // Reducer
// const cartReducer = (state = [], action) => {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return [...state, action.payload];
//     case UPDATE_QUANTITY:
//       return state.map(item =>
//         item.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
//       );
//     default:
//       return state;
//   }
// };

// export default cartReducer;

export const addToCart = (updatedCart) => ({
    type: 'ADD_TO_CART',
    payload: updatedCart,
  });
 
 // In your actions file (e.g., actions.js)



  
  const cartReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
     
        const filteredCart = action.payload.filter(product => product.quantity > 0);
        return filteredCart;

        case 'UPDATE_QUANTITY':
          const { productId, quantity } = action.payload;
          return state.map(product =>
            product.id === productId ? { ...product, quantity } : product
          );
      default:
        return state;
    }
  };

export default cartReducer;
