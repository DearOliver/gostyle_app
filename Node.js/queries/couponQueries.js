//import
import db from "../config/Postgres/db.js"

// Recuperation d'un coupon
export const GetCouponById = (request, response) => {
    const id = request.params.id;
    db('SELECT * FROM  coupon  where id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        return response.status(200).json(results.rows)
    })
}

// Recuperation d' une liste de  coupon
export const GetlistCouponById = (request, response) => {
    const id = request.params.id;
    db('SELECT * FROM coupon ORDER BY id ASC', [] ,(error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
        return response.status(200).json(results.rows)
    })

}
