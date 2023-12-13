import React, { useState } from 'react';

function Admin() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile);
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!file || !name || !price || !description) {
      setError('Please fill in all fields and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:5000/storedata', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(result.success);
        setTimeout(() => {
          setSuccess('');
        }, 3000);

        // Reset form fields after successful upload
        setFile(null);
        setName('');
        setPrice('');
        setDescription('');
      } else {
        setError(result.error);
        console.error('Failed to add data to the database:', result.error);
      }
    } catch (error) {
      setError('Error: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h2>Adding product</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={submit}>
            <div className="form-group mb-3">
              <label htmlFor="file">Product File:</label>
              <input
                required
                type="file"
                className="form-control"
                id="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="name">Name:</label>
              <input
                required
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="price">Price:</label>
              <input
                required
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description:</label>
              <textarea
                required
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
            <p>{success}</p>
            <p style={{ color: 'red' }}>{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
