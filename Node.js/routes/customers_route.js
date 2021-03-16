import * as db from "../queries/customerQueries.js";
import express from "express";

//Route /customer
/**
 *
 * @type {Router}
 *
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - mail
 *         - password
 *         - birth_date
 *       properties:
 *         firstname:
 *           type: string
 *           description: The first name of the customer
 *         lastname:
 *           type: string
 *           description: The last name of the customer
 *         mail:
 *           type: string
 *           description: customers's email
 *         password:
 *           type: string
 *           description: customer's password
 *         birth_date:
 *           type: datetime
 *           description: customers's birthdate
 *       example:
 *          firstname: "Barak"
 *          lastname: "Obama"
 *          mail: "barak@obama.com"
 *          password: "Barak&Michelle"
 *          birth_date: 2021-01-01
 */

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now())
    next()
})


/**
 * @swagger
 * tags:
 *    name: Customers
 *    description: App's Customer
 *
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
 *                 $ref: '#/components/schemas/Customer'
 */
router.get('s/', (req, res) => {
    return db.getAllCustomers(req, res)
})

/**
 * GET /customer/:id
 * renvoie un tableau avec 1 seul élément (le customer)
 *
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: récupère un customer d'après son id
 *     tags: [Customers]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of the customer
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: returns customer with the selected id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       400:
 *         description: No customer found
*/

router.get('/:id', (req, res) => {
    return db.getCustomerById(req, res)
})

/**
 * GET /customer/:id/coupons
 * récupère la liste complète des coupons d'un uti
 * renvoie un tableau
 */
router.get('/:id/coupons', (req, res) => {
    return db.getCustomersCoupons(req, res)
})

/**
 * PUT /customer/:id
 * update un customer
 * necessite en paramètre:
 * first_name, last_name, mail, password, birth_date
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Update customer's data
 *     tags: [Customers]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of the customer
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: The customer was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 *
 */
router.put('/:id', (req, res) => {
    return db.updateCustomer(req, res)
})

/**
 * POST /customer/login
 * check si le couple identifiant/mot de passe existe en bdd
 * necessite dans le body:
 * login,password
 * login = email pour l'instant
 */
router.post('/login', (req, res) => {
    return db.authUser(req, res)
})

/**
 * POST /customer/coupons/add
 * ajoute un coupon au compte du customer
 * necessite dans le body:
 * id_coupon
 */
router.post('/:id/coupons/add', (req, res) => {
    return db.addCoupon(req, res)
})
export default router
