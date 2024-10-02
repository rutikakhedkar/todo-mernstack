const express = require('express');
const app= express();
const router=require("./router/auth-router")
require('dotenv').config(); // Load environment variables
const cors = require('cors');

const mongoose = require('mongoose');
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
  }));
app.use("/api/auth",router)


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
