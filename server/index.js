const express = require('express');
const app= express();
const router=require("./router/auth-router")
require('dotenv').config(); // Load environment variables
const cors = require('cors');

const mongoose = require('mongoose');
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
    origin: 'https://todo-mernstack-ten.vercel.app/', // Specifies the allowed origin
    methods: ["POST", "GET"], // Should be `methods` (plural) not `method`
    credentials: true // Allows credentials like cookies, headers, or TLS certificates to be sent in requests
}));
app.get('/',(req,res)=>{
    res.send("Working");
})
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
