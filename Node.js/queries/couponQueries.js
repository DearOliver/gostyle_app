//import
import db from "../config/Postgres/db.js"

// Recuperation d'un coupon
export const GetCouponById = (request, response) => {
    const id = request.params.id;
    db('SELECT * FROM  coupon  where id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).json({ error });
        }
        console.log(results.rows)
        return response.status(200).json(results.rows)
    })
}

// Recuperation d'une liste de coupon
export const GetCoupon = (request, response) => {
    db('SELECT * FROM coupon WHERE end_date > now()', [] ,(error, results) => {
        if (error) {
            response.status(404).json({ error });
        }
        console.log(results.rows)
        return response.status(200).json(results.rows)
    })
}
