import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { addToCart } from './reducer';

function Products(props) {
  const { happy, cart, addToCart } = props;
  const [suc, setsuc] = useState("");
  const [err, seterr] = useState("");
  const [quantity, setQuantity] = useState(0);
//   const existingProductIndex = cart.findIndex(item => item.id === happy.id);
//   const isInCart = existingProductIndex !== -1;

  const increase = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    handleCartUpdate(quantity + 1);
    setsuc("Product quantity updated in cart");
  };

  const decrease = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
      handleCartUpdate(quantity - 1);
    }
    if(quantity>=1){
       seterr("Product quantity is decreased")
    }
   
  };

//   const handleCartUpdate = (newQuantity) => {
    const handleCartUpdate = () => {
        
    // if (newQuantity >= 0) {
    //   let updatedCart;

    //   if (isInCart) {
    //     updatedCart = [...cart];
    //     updatedCart[existingProductIndex] = { ...updatedCart[existingProductIndex], quantity: newQuantity };
    //     // setsuc("Product quantity updated in cart");
    //   } else {
    //     updatedCart = [...cart, { ...happy, quantity: newQuantity }];
    //     // setsuc("Product added to cart");
    //   }

    //   addToCart(updatedCart);
    //   console.log("", updatedCart);

      setTimeout(() => {
        setsuc("");
        seterr("")
      }, 3000);
    
  };

  return (
    <div key={happy.id} className='s-product'>
        <h1>happy</h1>
      <img className='image' src={`data:image/jpeg;base64,${happy.file}`} alt={happy.name} />
      <h3>{happy.name}</h3>
      <p className='price'>Price: {happy.price}</p>
      <p>Description: {happy.description}</p>
      <div className="quantity-controls">
        <button onClick={decrease} className='btn btn-secondary' variant="outline-secondary">-</button>
        <span className="quantity m-2">{quantity}</span>
        <button onClick={increase} className='btn btn-secondary' variant="outline-secondary">+</button>
      </div>
      <span className="added mt-5">{suc}</span>
      <span className="removed mt-5">{err}</span>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   cart: state,
// });

// const mapDispatchToProps = (dispatch) => ({
//   addToCart: (updatedCart) => dispatch(addToCart(updatedCart)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Products);
export default Products

