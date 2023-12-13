

export const calculateTotalAmount = (cart) => {
    const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const productsWithDetails = cart.map(product => ({id:product.id,price:product.price,quantity:product.quantity, name: product.name, totalprice: product.price * product.quantity ,image: product.file}));
  
    return {
      totalAmount,
      productsWithDetails,
    };
  };
  