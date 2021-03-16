import * as db from "../queries/customerQueries.js";
import express from "express";

//Route /customer

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})


/**
 * @openapi
 * /customers:
 *   get:
 *     summary: Returns all customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of all the customers in database
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
router.get('s/',(req, res)=>{
    return db.getAllCustomers(req,res)
})

/**
 * GET /customer/:id
 * récupère un customer d'après son id
 * renvoie un tableau avec 1 seul élément (le customer)
 */
router.get('/:id',(req, res)=>{
    return db.getCustomerById(req,res)
})

/**
 * GET /customer/:id/coupons
 * récupère la liste complète des coupons d'un uti
 * renvoie un tableau
 */
router.get('/:id/coupons',(req, res)=>{
    return db.getCustomersCoupons(req,res)
})

/**
 * PUT /customer/:id
 * update un customer
 * necessite en paramètre:
 * first_name, last_name, mail, password, birth_date
 */
router.put('/:id',(req, res)=>{
    return db.updateCustomer(req,res)
})

/**
 * POST /customer/login
 * check si le couple identifiant/mot de passe existe en bdd
 * necessite dans le body:
 * login,password
 * login = email pour l'instant
 */
router.post('/login',(req, res)=>{
    return db.authUser(req,res)
})

/**
 * POST /customer/coupons/add
 * ajoute un coupon au compte du customer
 * necessite dans le body:
 * id_coupon
 */
router.post('/:id/coupons/add',(req, res)=>{
    return db.addCoupon(req,res)
})
export default router
