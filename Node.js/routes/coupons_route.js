import * as db from "../queries/couponQueries.js";
import express from "express";

//Route /coupon

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

/**
 * GET /coupon
 * récupère la liste complète des coupons
 * renvoie un tableau
 */
router.get('/',(req, res)=> {
    return db.GetCoupon(req, res)
})

/**
 * GET /coupon/:id
 * récupère un coupon d'après son id
 * renvoie un tableau avec 1 seul élément (le coupon)
 */
router.get('/:id',(req, res)=>{
    return db.GetCouponById(req,res)
})

export default router
