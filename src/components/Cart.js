import React from 'react';
import { connect } from 'react-redux';
import { calculateTotalAmount } from './caluculat';
import { useState } from 'react';
import { updateQuantity } from './action';


function Cart(props) {
  const { totalAmount, productsWithDetails,dispatch } = props;
console.log("hi",productsWithDetails)
const [suc,setsuc] = useState("")
const inc = (productId) => {
 
    dispatch(updateQuantity(productId, 1));
  };
  
  const dec = (productId) => {
   
    dispatch(updateQuantity(productId, -1));
  };
  
const place = async () => {
    try {
      const orderData = {
       
        products: productsWithDetails.map(product => ({
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          totalAmount:product.price*product.quantity,
          id:product.id
        })),
      };

      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setsuc('Order placed successfully!');
        
      } else {
        console.error('Error placing order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
}
  return (
    <div className='block'>
  <div className='s-product2 '>
  <h2>Cart Details</h2>
  
  {productsWithDetails.map((product, index) => (
    <div key={index} className="product-item">
      <img className='image2' src={`data:image/jpeg;base64,${product.image}`} alt={product.name}/>
      <div className="product-info">
        <p>{product.name}</p>
        <div className="quantity-controls">
        <button onClick={() => dec(product.id)} className='btn btn-secondary' variant="outline-secondary">-</button>
        <span className="quantity m-2">{product.quantity}</span>
        <button onClick={() => inc(product.id)}  className='btn btn-secondary' variant="outline-secondary">+</button>
      </div>
        <p>Price: {product.price}</p>
        <p>Total  price:{product.totalprice}</p>
      </div>
       <hr/>
    </div>
   
  ))}
  
  <h2>Total Amount: {totalAmount}</h2>
  {productsWithDetails.length > 0 && <button onClick={place} className='btn btn-info'>Place order</button>}
<p>{suc}</p>
</div>

  </div>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
  ...calculateTotalAmount(state),
});

export default connect(mapStateToProps)(Cart);















// import React from 'react';
// import { connect } from 'react-redux';
// import { calculateTotalAmount } from './caluculat';
// import { useState } from 'react';

// function Cart(props) {
//   const { totalAmount, productsWithDetails } = props;
// console.log("hi",productsWithDetails)
// const [suc,setsuc] = useState("")
// const place = async () => {
//     try {
//       const orderData = {
       
//         products: productsWithDetails.map(product => ({
//           name: product.name,
//           price: product.price,
//           quantity: product.quantity,
//           totalAmount:product.price*product.quantity,
//           id:product.id
//         })),
//       };

//       const response = await fetch('http://localhost:5000/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (response.ok) {
//         setsuc('Order placed successfully!');
        
//       } else {
//         console.error('Error placing order:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error placing order:', error.message);
//     }
// }
//   return (
//     <div className='block'>
//   <div className='s-product2 '>
//   <h2>Cart Details</h2>
  
//   {productsWithDetails.map((product, index) => (
//     <div key={index} className="product-item">
//       <img className='image2' src={`data:image/jpeg;base64,${product.image}`} alt={product.name}/>
//       <div className="product-info">
//         <p>{product.name}</p>
//         <div className="quantity-controls">
//         <button className='btn btn-secondary' variant="outline-secondary">-</button>
//         <span className="quantity m-2">{product.quantity}</span>
//         <button  className='btn btn-secondary' variant="outline-secondary">+</button>
//       </div>
//         <p>Price: {product.price}</p>
        
//       </div>
//        <hr/>
//     </div>
   
//   ))}
  
//   <h2>Total Amount: {totalAmount}</h2>
//   {productsWithDetails.length > 0 && <button onClick={place} className='btn btn-info'>Place order</button>}
// <p>{suc}</p>
// </div>

//   </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   cart: state,
//   ...calculateTotalAmount(state),
// });

// export default connect(mapStateToProps)(Cart);