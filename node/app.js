const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { Pool } = require('pg');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reactdb',
  password: '123456',
  port: 5432,
});

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(fileUpload());

app.post('/storedata', (req, res) => {
  const { firstName, lastName, password } = req.body;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No file uploaded.');
  }

  const file = req.files.file;

  console.log('firstName:', firstName);
  console.log('lastName:', lastName);
  console.log('password:', password);
  console.log('file:', file);

  const insertQuery = 'INSERT INTO shopping (name, prize, file, description) VALUES ($1, $2, $3, $4)';
  const values = [firstName, lastName, file.data, password];

  pool.query(insertQuery, values, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.status(400).send('Bad Request: ' + error.message);
    } else {
      res.status(201).send('Data added to the database');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const { Pool } = require('pg');
// const cors = require('cors');
// const fileUpload = require('express-fileupload');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'reactdb',
//   password: '123456',
//   port: 5432,
// });

// app.use(express.json());
// app.use(cors({ origin: "*" }));

// // Use express-fileupload middleware
// app.use(fileUpload());

// app.post('/storedata', (req, res) => {
//   const { firstName, lastName, password } = req.body;

//   // Check if file data is present
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const file = req.files.file;

//   console.log('firstName:', firstName);
//   console.log('lastName:', lastName);
//   console.log('password:', password);
//   console.log('file:', file);

//   // In this example, we are storing the file in the 'file' column as a Buffer
//   pool.query(
//     'INSERT INTO shopping (name, prize, file, description) VALUES ($1, $2, $3, $4)',
//     [firstName, lastName, file.data, password],
//     (error, results) => {
//       if (error) {
//         console.error('Error:', error);
//         res.status(400).send('Bad Request: ' + error.message);
//       } else {
//         res.status(201).send('Data added to the database');
//       }
//     }
    
//   );
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


















// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const { Pool } = require('pg');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'reactdb',
//   password: '123456',
//   port: 5432,
// });

// app.use(express.json());
// app.use(cors({
//   origin: "*"
// }));

// // Define the folder to store uploaded images
// const uploadFolder = path.join(__dirname, 'uploads');

// // Create the folder if it doesn't exist
// if (!fs.existsSync(uploadFolder)) {
//   fs.mkdirSync(uploadFolder);
// }

// app.post('/storedata', async (req, res) => {
//   try {
//     const { firstName, lastName, file, password } = req.body;

//     // Check if the file is already a Buffer (e.g., when using FormData)
//     const buffer = Buffer.isBuffer(file) ? file : Buffer.from(file, 'base64');

//     // Create a unique filename for the image
//     const uniqueFilename = `${Date.now()}_${firstName}.png`;

//     // Save the image to the uploads folder
//     const filePath = path.join(uploadFolder, uniqueFilename);
//     fs.writeFileSync(filePath, buffer);

//     // Store the file path in the database
//     const query = 'INSERT INTO shopping (name, prize, file, description) VALUES ($1, $2, $3, $4)';
//     const values = [firstName, lastName, filePath, password];

//     await pool.query(query, values);

//     res.status(201).send('Data added to the database');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });







// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const { Pool } = require('pg');
// const cors = require('cors');
// const multer = require('multer');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'reactdb',
//   password: '123456',
//   port: 5432,
// });

// app.use(express.json());
// app.use(cors({ origin: "*" }));

// // Multer setup
// const storage = multer.memoryStorage(); // Use memory storage for simplicity
// const upload = multer({ storage: storage });

// app.post('/storedata', upload.single('file'), (req, res) => {
//   const { firstName, lastName, password } = req.body;
//   const file = req.file; // Access the file data

//   console.log('firstName:', firstName);
//   console.log('lastName:', lastName);
//   console.log('password:', password);
// console.log(file)
//   // Check if file data is present
//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   // In this example, we are storing the file in the 'file' column as a Buffer
//   pool.query(
//     'INSERT INTO shopping (name, prize, file, description) VALUES ($1, $2, $3, $4)',
//     [firstName, lastName, file.buffer, password],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.status(201).send('Data added to the database');
//     }
//   );
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




// const express = require('express');
// const app = express();
// const port = process.env.PORT || 5000;
// const { Pool } = require('pg');
// const cors = require('cors')


// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost', 
//   database: 'reactdb', 
//   password: '123456', 
//   port: 5432, 
// });

// app.use(express.json());
// app.use(cors({
//   origin:"*"
// }))
 
// app.post('/storedata', (req, res) => {
//   const { firstName, lastName, file ,password} = req.body;
// console.log(firstName)
// console.log(file)
//   pool.query(
//     'INSERT INTO shopping (name, prize, file,description) VALUES ($1, $2, $3,$4)',
//     [firstName, lastName, file,password],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       res.status(201).send('Data added to the database');
//     }
//   );
// });
// app.listen(port,  () => {
//     console.log(`Server is running on port ${port}`);
//   });