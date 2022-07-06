let mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected !')
}).catch((err) => console.log("Failed MongoDB Connect", err));