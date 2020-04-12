const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        "message" : "Handling GET request to /rates"
    });
});

router.post("/", (req, res, next) => {
    res.status(200).json({
        "message" : "Handling post request to /rates"
    });
});

router.get("/:currencyName", (req, res, next) => {
    const currencyName = req.params.currencyName;
    res.status(200).json({
        message : "Selected currency: " + currencyName
    });
});

router.post("/:currencyName", (req, res, next) => {
    const currency = {
        name: req.body.name,
        fullName: req.body.fullName,
        rate: req.body.rate
    }
    const currencyName = req.params.currencyName;
    res.status(200).json({
        message : "Created currency: " + currencyName,
        createdCurrency: currency
    });
});

router.patch("/:currencyName", (req, res, next) => {
    res.status(200).json({
        "message" : "Updated currency"
    });
});

router.delete("/:currencyName", (req, res, next) => {
    res.status(200).json({
        "message" : "Deleted currency"
    });
});

module.exports = router;
