import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('Welcome to Book Catalog');
});

app.use('/books', booksRoute);

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Testament:Testament@cluster0.xwyvhh9.mongodb.net/?retryWrites=true";
const PORT = 5555;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err.message);
    process.exit(1);
  });

// await mongoose
//   .connect("")
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
