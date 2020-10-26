const config = require('config');

// Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const users = require("./routes/users");
const auth = require("./routes/auth")
const app = express();


//midelware=auth ==>athentication
//auth=login
//user=register
// set bpsk=mySecretKey  befor

if (!config.get('jwtPrivateKey')) {
    console.error("FATAL Error:JWT private key not")
    process.exit(1)
}

app.use(express.json());
app.use(cors())
mongoURI = 'mongodb+srv://admin:3818200@cluster0.w1msn.mongodb.net/users?retryWrites=true&w=majority'


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connect to MongoDB.."))
    .catch((err) =>
        console.error("Could not connct to MongoDB....", err.message)
    );


app.use('/api/users', users);
app.use('/api/auth', auth);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));