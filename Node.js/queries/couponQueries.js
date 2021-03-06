//import
import db from "../config/Postgres/db.js"

// Recuperation d'un coupon
export const GetCouponById = (request, response) => {
    const id = request.params.id;
    db('SELECT c.*,t.color FROM  coupon c join public.type t on c.id_type=t.id where c.id = $1', [id], (error, results) => {
        if(results.rowCount > 0){
            return response.status(200).json(results.rows)
        }
        if (error) {
            return response.status(404).json({ error });
        }
        return response.sendStatus(404)
    })
}

// Recuperation d'une liste de coupon
export const GetCoupon = (request, response) => {
    db('SELECT c.*,t.color FROM coupon c join public.type t on c.id_type=t.id WHERE end_date > now()', [], (error, results) => {
        if (error) {
            response.status(404).json({error});
        }
        console.log(results.rows)
        return response.status(200).json(results.rows)
    })
}

// Recuperation des types de coupon
export const GetTypes = (request, response) => {
    db('SELECT * FROM public.type', [], (error, results) => {
        if (error) {
            response.status(404).json({error});
        }
        console.log(results.rows);
        return response.status(200).json(results.rows);
    })
}
