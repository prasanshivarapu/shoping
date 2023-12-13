export const updateQuantity = (productId, quantity) => ({
    type: 'UPDATE_QUANTITY',
    payload: { productId, quantity },
  });