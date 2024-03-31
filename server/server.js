// server.js
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require("./router/auth-router");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MERN-admin', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Middleware
app.use(express.json());

// Routes

app.use("/api/auth", authRouter);


// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
