import * as db from "../queries/couponQueries.js";
import express from "express";

//Route /coupon

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// ID coupon
router.get('/:coupon/id',(req, res)=>{
    return db.GetCouponById(req,res)
})

// list de coupon
router.get('/:id/coupon/list',(req, res)=> {
    return db.GetCouponById(req, res)
})
