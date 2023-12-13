

import React from 'react';
import { useForm } from 'react-hook-form';

import './style.css'
function Admin3() {
 
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset({
      productname: '',
      prize: '',
      file: '',
      discription: '',
    });
  };
  return (
    <div className="container ">
      <h1>Add product details</h1>
      
       
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
            

           <div className='col-sm-12 '>
            
          <label className="form-group"  htmlFor="ProductName ">Product Name:</label> <br />
          <input
            type="text"
            id="ProductName "
            name="productname"
            
            className="form-control input"
            {...register('productname', {
              required: 'Product Name is required',
              minLength: {
                value: 3,
                message: 'Product Name  should contain a minimum of 3 characters',
              },
            })}
          />
          <p className="error">{errors.productname?.message}</p>
        </div> 

        <div className='col-12 '>
          <label className="form-group " htmlFor="prize">Product Prize:</label><br />
          <input
            type="number"
            id="prize"
            name="prize"
            className="form-control input"
            {...register('prize', {
              required: 'Product Prize is required',
            })}
          />
          <p className="error">{errors.prize?.message}</p>
        </div>
        <div className='col-12 '>
          <label className="form-group" htmlFor="file">Product File:</label><br />
          <input
            type="file"
            id="file"
            name="file"
            className="form-control input"
            {...register('file', {
              required: 'Product File is required ',
            })}
          />
          <p className="error">{errors.file?.message}</p>
        </div>
        <div className='col-12 '>
          <label className="form-group" htmlFor="discription">Product Discription:</label><br />
          <input
            type="text"
            id="discription"
            name="discription"
            className="form-control input"
            {...register('discription', {
              required: 'Product Discription is required',
            
            })}
          />
          <p className="error">{errors.discription?.message}</p>
        </div>
        
        <div className="button">
          <button className="but" type="submit">Submit</button>
        </div>  
        </div>
      </form>
      </div>
      
   
  );
}

export default Admin3