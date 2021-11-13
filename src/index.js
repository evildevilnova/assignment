const  express = require('express');
const app = express();
const env = require("dotenv");
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin/uath');
const uathRoutes = require('./routes/uath');
const cors = require('cors');

// env
env.config();

// mongodb connection

mongoose.connect(
    `mongodb+srv://${process.env.MONGOUSER}:${process.env.PASSWORD}@cluster0.gp1be.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        }
        ).then(() => {
            console.log('database is connected')
        });

app.use(express.json());

//middle ware of api 
app.use(cors());
app.use('/api',adminRoutes);
app.use('/api',uathRoutes);


app.listen(process.env.PORT,() => {
    console.log(`connected and port no ${process.env.PORT}.`);
});