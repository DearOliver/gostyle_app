import * as db from "../queries/customerQueries.js";
import express from "express";

//Route /customer
/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - mail
 *         - password
 *         - birth_date
 *       properties:
 *         first_name:
 *           type: string
 *           description: The first name of the customer
 *         last_name:
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
 *          first_name: Barak
 *          last_name: Obama
 *          mail: barak@obama.com
 *          password: Barak&Michelle
 *          birth_date: 2021-01-01
 *     Login:
 *       type: object
 *       required:
 *         - login
 *         - password
 *       properties:
 *         login:
 *           type: string
 *           description: L'identifiant du customer = email
 *         password:
 *           type: string
 *           description: Le mot de passe du customer
 *       example:
 *          login: "barak@obama.com"
 *          lastname: Barak&Michelle
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
 * /customer/list:
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
router.get('/list', (req, res) => {
    return db.getAllCustomers(req, res)
})

/**
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
 * @swagger
 * /customer/{id}/coupons:
 *   get:
 *     summary: Récupère les coupons d'un customer
 *     tags: [Customers, Coupons]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of the customer
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Retourne une liste de coupons
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupons'
 *       400:
 *         description: Pas de coupons ou de customer trouvé
 */
router.get('/:id/coupons', (req, res) => {
    return db.getCustomersCoupons(req, res)
})

/**
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
 * @swagger
 * /customer/login:
 *   post:
 *     summary: Login a customer
 *     tags: [Login,Customers]
 *     requestBody:
 *       required: true
 *       description: Identifiants de connexion
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: The customer was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Some server error
 */
router.post('/login', (req, res) => {
    return db.authUser(req, res)
})

/**
 * @swagger
 * /customer/{:id}/coupons/add:
 *   post:
 *     summary: Ajoute un coupon au compte du customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              properties:
 *                  id_coupon:
 *                      type: string
 *                      description: Id du coupon à ajouter au compte du customer
 *           example:
 *              id_coupon: String
 *     responses:
 *       200:
 *         description: Le coupon a été ajouté
 *       500:
 *         description: Some server error
 */
router.post('/:id/coupons/add', (req, res) => {
    return db.addCoupon(req, res)
})

/**
 @swagger
 * /customer/add:
 *   post:
 *     summary: Crée un customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       description: Pet object that needs to be added to the store
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: L'utilisateur a été créé
 *       500:
 *         description: Some server error
 */
router.post('/add', (req, res) => {
    return db.addCustomer(req, res)
})

export default router
