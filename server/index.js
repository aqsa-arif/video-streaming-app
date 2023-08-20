const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const videoRoutes = require('./routes/videos');
const commentsRoutes = require('./routes/comments');

require('dotenv').config();
const app = express();

/// Allow headers from server to client side 
const corsOptions = {
  exposedHeaders: ['Content-Type', 'auth-token', 'Authorization'],
  origin:  '*',
}

app.use(cors(corsOptions));
app.use(express.json()); 

mongoose.connect(process.env.DBSTRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoAtlas ");
  })
  .catch(error => { 
    throw error 
}); 


// Routes 
app.use('/api/auth', authRoutes );
app.use('/api/users', usersRoutes );  //Users => channelsr
app.use('/api/videos', videoRoutes );
app.use('/api/comments', commentsRoutes );

app.get('*', (req, res) => {
   res.status(404).send('Route not Found');
})


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})