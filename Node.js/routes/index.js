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

router.get('/:id/coupons',(req, res)=>{
    return db.getCustomersCoupons(req,res)
})

router.put('/:id',(req, res)=>{
    return db.updateCustomer(req,res)
})

router.post('/login',(req, res)=>{
    return db.authUser(req,res)
})
export default router
