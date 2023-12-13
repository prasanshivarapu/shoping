import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addToCart } from './reducer';

function Products(props) {
  const { happy, cart, addToCart } = props;
  const [suc, setsuc] = useState("");
  const [err, seterr] = useState("");
  const [quantity, setQuantity] = useState(0);
  const existingProductIndex = cart.findIndex(item => item.id === happy.id);
  const isInCart = existingProductIndex !== -1;

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

  const handleCartUpdate = (newQuantity) => {
    if (newQuantity >= 0) {
      let updatedCart;

      if (isInCart) {
        updatedCart = [...cart];
        updatedCart[existingProductIndex] = { ...updatedCart[existingProductIndex], quantity: newQuantity };
        // setsuc("Product quantity updated in cart");
      } else {
        updatedCart = [...cart, { ...happy, quantity: newQuantity }];
        // setsuc("Product added to cart");
      }

      addToCart(updatedCart);
      console.log("", updatedCart);

      setTimeout(() => {
        setsuc("");
        seterr("")
      }, 3000);
    }
  };

  return (
    <div key={happy.id} className='s-product'>
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

const mapStateToProps = (state) => ({
  cart: state,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (updatedCart) => dispatch(addToCart(updatedCart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);





// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { addToCart } from './reducer';

// function Products(props) {
//   const { happy, cart, addToCart } = props;
//   const [suc, setsuc] = useState("");

//   const existingProductIndex = cart.findIndex(item => item.id === happy.id);
//   const isInCart = existingProductIndex !== -1;

//   const cycle = () => {
//     let updatedCart;

//     if (isInCart) {
//       updatedCart = [...cart]; 
//       updatedCart[existingProductIndex] = { ...updatedCart[existingProductIndex], quantity: updatedCart[existingProductIndex].quantity + 1 };
//       setsuc("Product quantity updated in cart");
//     } else {
//       updatedCart = [...cart, { ...happy, quantity: 1 }];
//       setsuc("Product added to cart");
//     }

//     addToCart(updatedCart);
//     // console.log('Cart State:', updatedCart);

//     setTimeout(() => {
//       setsuc("");
//     }, 3000);
//   };

//   return (
//     <div key={happy.id} className='s-product'>
//       <img className='image' src={`data:image/jpeg;base64,${happy.file}`} alt={happy.name}  />
//       <h3>{happy.name}</h3>
//       <p className='price'>Price: {happy.price}</p>
//       <p>Description: {happy.description}</p>
//       <button onClick={cycle} className='btn btn-primary mb-2' >Buy now</button> <br/>
//       <span className="added mt-5">{suc}</span>
//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   cart: state,
// });

// const mapDispatchToProps = (dispatch) => ({
//   addToCart: (updatedCart) => dispatch(addToCart(updatedCart)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Products);




// // Products.js
// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { addToCart } from './reducer';

// function Products(props) {
//   const { happy, cart, addToCart } = props;
//   const [suc, setsuc] = useState("");

//   const isInCart = cart.find(item => item.id === happy.id);

//   const cycle = () => {
//     let updatedCart;

//     if (isInCart) {
//       updatedCart = cart.map(item =>
//         item.id === happy.id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       setsuc("Product quantity updated in cart");
//     } else {
//       updatedCart = [...cart, { ...happy, quantity: 1 }];
//       setsuc("Product added to cart");
//     }

//     addToCart(updatedCart);

//     // Log the cart state to the console
//     console.log('Cart State:', updatedCart);

//     setTimeout(() => {
//       setsuc("");
//     }, 3000);
//   };

//   return (
//     <div key={happy.id} className='s-product'>
//       <img className='image' src={`data:image/jpeg;base64,${happy.file}`} alt={happy.name}  />
//       <h3>{happy.name}</h3>
//       <p className='price'>Price: {happy.price}</p>
//       <p>Description: {happy.description}</p>
//       <button onClick={cycle} className='btn btn-primary mb-2'>Buy now</button> <br/>
//       <span className="added mt-5">{suc}</span>
//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   cart: state,
// });

// const mapDispatchToProps = (dispatch) => ({
//   addToCart: (updatedCart) => dispatch(addToCart(updatedCart)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Products);



















// import  {useState} from "react"
// import React from 'react';
// import './style.css'

// function Products(props) {
//     const  [suc, setsuc] = useState("")
 
//   const { happy } = props;
// const cycle = ()=>{

// setsuc("Product added to cart")

// setTimeout(() => {
//     setsuc("")
// }, 3000);

// }
//   return (

//     <div key={happy.id} className='s-product'>
//       <img className='image' src={`data:image/jpeg;base64,${happy.file}`} alt={happy.name}  />
//       <h3>{happy.name}</h3>
//       <p className='price'>Price: {happy.price}</p>
//       <p>Description: {happy.description}</p>
//       <button onClick={cycle} className='btn btn-primary mb-2'>Buy now</button> <br/>
//       <span className="added mt-5">{suc}</span>
    
//     </div>
//   );
// }

// export default Products;
