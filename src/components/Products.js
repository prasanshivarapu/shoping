import React, { useEffect, useState } from 'react';
import Products from './ProductsList';


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 useEffect(() => {
  fetch('http://localhost:5000/getproducts')
    .then((response) => response.json())
    .then((data) => {
      console.log('Data from server:', data);
      setProducts(data);
      setLoading(false);
    })
    .catch((error) => {
      setError('Error fetching data: ' + error.message);
      setLoading(false);
    });
}, []);

  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {/* <h2>Product List</h2> */}
      
        <div className='block'>
{products.map((product) => (
         
          <Products happy={product} key={product.id} />
          ))}  
          
        </div>
    
    </div>
  );
}

export default ProductList;
