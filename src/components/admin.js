import React, { useState } from 'react';

function Admin() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
 
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };
  
  


  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
 
  
  
  const submit = async (e) => {
    e.preventDefault();

    if (firstName && lastName  && password && file) {
      console.log('firstName:', firstName);
      console.log('lastName:', lastName);
      console.log('file:', file);
      console.log('password:', password);
      
      // const formData ={
      //     firstName,lastName,file,password
      //    }
      
      // console.log(formData);
      setFirstName('');
            setLastName('');
            
            setPassword('');
            setFile(null);
      try {
        const response = await fetch('http://localhost:5000/storedata', {
          method: 'POST',
         
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: JSON.stringify(file),
        });
        
        const result = await response.json();
        if (response.ok) {
          setSuccess('Data added to the database');
          setTimeout(() => {
            setSuccess('');
          }, 3000);

          setFirstName('');
          setLastName('');
          
          setPassword('');
          setFile(null);
        } else {
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const result = await response.json();
           
            console.error('Failed to add data to the database:', result);
          } else {
            const result = await response.text();
          
            console.error('Failed to add data to the database:', result);
          }
        }
        
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Please fill out all fields');
      }
  };

  return (
    <div className="container">
      <h2>Adding product</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={submit}>
            <div className="form-group mb-3">
              <label htmlFor="firstName"> Product Name:</label>
              <input
              required
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={handleChangeFirstName}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="lastName">Product Prize:</label>
              <input
              required
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={handleChangeLastName}
              />
            </div>
           
            <div className="form-group mb-3">
              <label htmlFor="file">Product File:</label>
              <input
              required
                type="file"
                className="form-control"
                id="file"
                onChange={handleFileChange}
              />
              {/* {file && (
                <div>
                  <p>Selected File: {file.name}</p>
                  <p>File Size: {file.size} bytes</p>
                </div>
              )} */}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="pass">Product Description:</label>
              <input
              required
                type="text"
                className="form-control"
                id="pass"
                value={password}
                onChange={handleChangePassword}
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
            <p>{success}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;

























// import React from 'react';
// import { useForm } from 'react-hook-form';

// import './style.css'
// function Admin() {
 
//   const { register, handleSubmit,reset, formState: { errors } } = useForm();
//   const onSubmit = (data) => {
//     console.log(data);
//     reset({
//       productname: '',
//       prize: '',
//       file: '',
//       discription: '',
//     });
//   };
//   return (
//     <div className="container ">
//       <h1>Add product details</h1>
      
       
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className='row'>
            

//            <div className='col-sm-12 '>
            
//           <label className="form-group"  htmlFor="ProductName ">Product Name:</label> <br />
//           <input
//             type="text"
//             id="ProductName "
//             name="productname"
            
//             className="form-control input"
//             {...register('productname', {
//               required: 'Product Name is required',
//               minLength: {
//                 value: 3,
//                 message: 'Product Name  should contain a minimum of 3 characters',
//               },
//             })}
//           />
//           <p className="error">{errors.productname?.message}</p>
//         </div> 

//         <div className='col-12 '>
//           <label className="form-group " htmlFor="prize">Product Prize:</label><br />
//           <input
//             type="number"
//             id="prize"
//             name="prize"
//             className="form-control input"
//             {...register('prize', {
//               required: 'Product Prize is required',
//             })}
//           />
//           <p className="error">{errors.prize?.message}</p>
//         </div>
//         <div className='col-12 '>
//           <label className="form-group" htmlFor="file">Product File:</label><br />
//           <input
//             type="file"
//             id="file"
//             name="file"
//             className="form-control input"
//             {...register('file', {
//               required: 'Product File is required ',
//             })}
//           />
//           <p className="error">{errors.file?.message}</p>
//         </div>
//         <div className='col-12 '>
//           <label className="form-group" htmlFor="discription">Product Discription:</label><br />
//           <input
//             type="text"
//             id="discription"
//             name="discription"
//             className="form-control input"
//             {...register('discription', {
//               required: 'Product Discription is required',
            
//             })}
//           />
//           <p className="error">{errors.discription?.message}</p>
//         </div>
        
//         <div className="button">
//           <button className="but" type="submit">Submit</button>
//         </div>  
//         </div>
//       </form>
//       </div>
      
   
//   );
// }

// export default Admin


// import React from 'react';
// import { useForm } from 'react-hook-form';

// import './style.css'
// function App1() {
 
//   const { register, handleSubmit,reset, formState: { errors } } = useForm();
//   const onSubmit = (data) => {
//     console.log(data);
//     reset()
//   };
//   return (
//     <div className="container ">
//       <h1>Add product details</h1>
      
       
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className='row'>
            

//            <div className='col-sm-12 '>
            
//           <label className="form-group"  htmlFor="ProductName ">Product Name:</label> <br />
//           <input
//             type="text"
//             id="ProductName "
//             name="productname"
            
//             className="form-control input"
//             {...register('productname', {
//               required: 'Product Name is required',
//               minLength: {
//                 value: 3,
//                 message: 'Product Name  should contain a minimum of 3 characters',
//               },
//             })}
//           />
//           <p className="error">{errors.productname?.message}</p>
//         </div> 

//         <div className='col-12 '>
//           <label className="form-group " htmlFor="prize">Product Prize:</label><br />
//           <input
//             type="number"
//             id="prize"
//             name="prize"
//             className="form-control input"
//             {...register('prize', {
//               required: 'Product Prize is required',
//             })}
//           />
//           <p className="error">{errors.prize?.message}</p>
//         </div>
//         <div className='col-12 '>
//           <label className="form-group" htmlFor="file">Product File:</label><br />
//           <input
//   type="file"
//   id="file"
//   name="file"
//   className="form-control input"
//   {...register('file', {
//     required: 'Product File is required',
//     onChange: (e) => {
//       // Access the file input value here and update the form data
//       return e.target.files;
//     },
//   })}
// />

//           <p className="error">{errors.file?.message}</p>
//         </div>
//         <div className='col-12 '>
//           <label className="form-group" htmlFor="discription">Product Discription:</label><br />
//           <input
//             type="text"
//             id="discription"
//             name="discription"
//             className="form-control input"
//             {...register('discription', {
//               required: 'Product Discription is required',
            
//             })}
//           />
//           <p className="error">{errors.discription?.message}</p>
//         </div>
        
//         <div className="button">
//           <button className="but" type="submit">Submit</button>
//         </div>  
//         </div>
//       </form>
//       </div>
      
   
//   );
// }

// export default App1;
