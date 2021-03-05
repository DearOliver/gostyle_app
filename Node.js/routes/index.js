// import express_server from "../config/express_server.js";
import * as db from "../queries/customerQueries.js";
import express from "express";
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/',(req, res)=>{
    return db.getAllCustomers(req,res)
})

router.get('/:id',(req, res)=>{
    return db.getCustomerById(req,res)
})
router.get('/:id/coupons',(req, res)=>{
    return db.getCustomersCoupons(req,res)
})

export default router
