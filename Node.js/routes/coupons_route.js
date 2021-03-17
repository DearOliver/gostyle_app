import * as db from "../queries/couponQueries.js";
import express from "express";

//Route /coupon

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       required:
 *         - id
 *         - label
 *         - code
 *         - start_date
 *         - end_date
 *       properties:
 *         id:
 *           type: string
 *           description: Coupon's uuid
 *         label:
 *           type: string
 *           description: Coupon's label
 *         start_date:
 *           type: datetime
 *           description: Coupon's start date
 *         end_date:
 *           type: string
 *           description: Coupon's end date
 *         id_type:
 *           $ref: '#/components/schemas/Coupon Type'
 *       example:
 *           id: AF9B0B0C-B374-C672-AE0B-5165B7F8249B
 *           label: Sed dictum. Proin eget odio. Aliquam
 *           code: GWG28JKI4MQ
 *           start_date: 1990-03-29 05:12:07.000000
 *           end_date: 2003-05-03 22:26:06.000000
 *           id_type: 2
 *     Coupon Type:
 *       type: object
 *       required:
 *         - id
 *         - label
 *         - color
 *       properties:
 *         id:
 *           type: int
 *           description: Type's id
 *         label:
 *           type: string
 *           description: Type's label
 *         color:
 *           type: string
 *           description: Type's color code
 *       example:
 *          id: 1
 *          label: Réduction
 *          color: #749eff
 *
 * tags:
 *    name: Coupons
 *    description: Coupon's Handling
 */

const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

/**
 * @swagger
 * /coupon:
 *   get:
 *     summary: All valid coupons
 *     tags: [Coupons]
 *     responses:
 *       200:
 *         description: Return a list of coupons
 *         content:
 *           application/json:
 *             schéma:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description:  No coupons or customer found
 */
router.get('/',(req, res)=> {
    return db.GetCoupon(req, res)
})

/**
 * @swagger
 * /coupon/{id}:
 *   get:
 *     summary: Get a coupon
 *     tags: [Coupons]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of the coupon
 *         required: true
 *     responses:
 *       200:
 *         description: Returns the selected coupon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       500:
 *         description: Some server error
 */
router.get('/:id',(req, res)=>{
    return db.GetCouponById(req,res)
})

export default router
