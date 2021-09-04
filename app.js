const express = require('express');
const mongoose = require('mongoose');

const app = express();

//DB config
const db = require('./config/keys').MongoURI;

//Conect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('MongoDB Connected...');
        const PORT = process.env.PORT || 6500;
        app.listen(PORT, console.log(`Server started at port ${PORT}`));
    })
    .catch(err => console.log(err))
;

//EJS
app.set('view engine', 'ejs');

//Bodyparser
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

//Routes
app.use('/', require('./routes/indexRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));