const express = require("express");
const app = express();
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const rateRoutes = require("./api/routes/rates");

mongoose.connect("mongodb+srv://Kaur:currency-project1@currencycluster-7qwu9.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser : true, 
    useUnifiedTopology : true
});

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS"){
        res.header("Access-Control-Methods", 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use("/rates", rateRoutes);  

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
})

app.use((error ,req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;