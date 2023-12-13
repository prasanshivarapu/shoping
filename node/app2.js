const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reactdb',
  password: '123456',
  port: 5432,
});

app.use(cors({ origin: '*' }));


const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post('/storedata', upload.single('file'), async (req, res) => {
  try {
   
    const image = req.file;
    const { name, price, description } = req.body;

    if (!image || !name || !price || !description) {
      return res.status(400).json({ error: 'Please fill in all fields and select a file.' });
    }

    
    const imageBase64 = image.buffer.toString('base64');

   
    await pool.query('INSERT INTO shopping (file, name, prize, description) VALUES ($1, $2, $3, $4)', [
      imageBase64,
      name,
      price,
      description,
    ]);

    res.json({ success: 'Data added to the database successfully.' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to add data to the database.' });
  }
});




app.get('/getproducts', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM shopping');
      const products = result.rows.map((row) => ({
        id: row.id,
        file: row.file,
        name: row.name,
        price: row.prize,
        description: row.description,
      }));
      res.json(products);
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to fetch products from the database.', details: error.message });
    }
  });
 
  app.use(bodyParser.json());
  app.post('/cart', async  (req, res) => {
    const orderData = req.body;
    for (const product of orderData.products) {
      const { name, price, quantity, totalAmount ,id} = product;
    await pool.query('INSERT INTO cart (name,  price, quantity,totalamount,product_id) VALUES ($1, $2, $3, $4 ,$5)', [
      name,
      
      price,
      quantity,
      totalAmount,
      id
    ]);
    }
    console.log('Received order:', orderData);
  
    res.status(200).json({ message: 'Order received successfully' });
  });






app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});









// const express = require('express');
// const multer = require('multer');
// const { Pool } = require('pg');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 5000;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'reactdb',
//   password: '123456',
//   port: 5432,
// });

// app.use(cors({ origin: '*' }));

// // Multer middleware for handling file uploads
// const storage = multer.memoryStorage();  // Store file data in memory
// const upload = multer({ storage: storage });

// app.post('/storedata', upload.single('file'), async (req, res) => {
//   try {
//     // Get the uploaded file
//     const image = req.file;

//     if (!image) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     // Convert binary data to Base64
//     const imageBase64 = image.buffer.toString('base64');

//     // Store the Base64-encoded data in the database
//     await pool.query('INSERT INTO shopping (file) VALUES ($1)', [imageBase64]);

//     res.json({ success: 'File uploaded successfully.' });
//   } catch (error) {
//     console.error('Database error:', error);
//     res.status(500).json({ error: 'Failed to add data to the database.' });
//   }
// });

// app.listen(port, () => {
//   console.log(`App listening on port ${port}`);
// });
