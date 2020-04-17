const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Rate = require("../models/rate")

// Get all currency rates from database
router.get("/", (req, res, next) => {
    Rate.find()
    .select("_id name fullName rate code")
    .exec()
    .then(docs => {
        console.log(docs)
        res.status(200).json(docs);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

// Add new currency rate
router.post("/", (req, res, next) => {
    const rate = new Rate({
        _id: mongoose.Types.ObjectId(),
        code: req.body.code,
        fullName: req.body.fullName,
        rate: req.body.rate
    });

    rate
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message : "Created new currency rate",
            createdRate: rate
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });

    
    });
});

// Get single currency rate
router.get("/:currencyId", (req, res, next) => {
    const id = req.params.currencyId;
    Rate.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if(doc){
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: "No valid rate found for provided ID"})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
});

// Update Currency rate
router.patch("/:currencyId", (req, res, next) => {
    const id = req.params.currencyId;
    // const updateOperations = {};
    // for (const ops of req.body){
    //     updateOperations[ops.propName] = ops.value;
    // }
    Rate.update({_id: id}, {$set : {rate: req.body.rate}}).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error : err});
    });
    
});

// Delete Currency Rate
router.delete("/:currencyId", (req, res, next) => {
    const id = req.params.currencyId;
    Rate.remove({_id: id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

module.exports = router;
