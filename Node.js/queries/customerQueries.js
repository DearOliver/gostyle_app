import db from "../config/Postgres/db.js"
import { v4 as uuidv4 } from 'uuid';

//region Get
export const getAllCustomers = (request, response) => {
    db('SELECT * FROM customer ORDER BY id ASC', [],(error, results) => {
        if(results.rowCount > 0){
            return response.status(200).json(results.rows)
        }
        if (error) {
            return response.status(404).json({ error });
        }
        return response.sendStatus(404)
    })
}

export const getCustomerById = (request, response) => {
    const id = request.params.id;
    db('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
        if(results.rowCount > 0){
            return response.status(200).json(results.rows)
        }
        if (error) {
            return response.status(404).json({ error });
        }
         return response.sendStatus(404)
    })
}
export const getCustomersCoupons = (request, response) => {
    const id = request.params.id;
    db('SELECT c.*, cc.used,t.color from coupon c join customer_coupon cc on c.id = cc.id_coupon join public.type t on c.id_type=t.id WHERE cc.id_customer = $1', [id], (error, results) => {
        if(results.rowCount > 0){
            return response.status(200).json(results.rows)
        }
        if (error) {
            return response.status(404).json({ error });
        }
        return response.sendStatus(404)
    })
}
//endregion

//region Put
export const updateCustomer = (request, response) => {
    const id = request.params.id
    const {first_name, last_name, mail, password, birth_date} = request.body
    db(
        'UPDATE customer SET first_name = $1,  last_name = $2, mail = $3, password = $4, birth_date = $5 WHERE id = $6',
        [first_name, last_name, mail, password, birth_date, id],
        (error, results) => {
            if (error) {
                response.status(404).json({ error });
            }
            return response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}
//endregion

//region POST
export const authUser = (request, response) => {
    const {login,password} = request.body
    console.log(request.body)
    db('SELECT * FROM customer WHERE mail = $1 AND password = $2', [login,password],(error, results) => {
        if (error) {
            return response.status(400).json( {error : error} );
        }
        // Si il y a bien un customer en bdd on le retourne
        if(!!results.rowCount === true){
            return response.status(200).json(results.rows)
        }

        // Sinon on renvoie false
        return response.status(200).json(!!results.rowCount)
    })
}
export const addCoupon = (request, response) => {
    console.log("body=",request.body)
    const {id} = request.params
    const {id_coupon} = request.body
    db('INSERT INTO customer_coupon (id_customer, id_coupon, used) values ($1,$2,0)', [id,id_coupon],(error, results) => {
        if (error) {
            return response.status(400).json({ error, "status":"400" });
        }
        return response.status(200).json({"message":"Coupon added","status":"200"})
    })
}
export const addCustomer = (request, response) => {
    const {first_name, last_name, mail, birth_date,password} = request.body
    const id = uuidv4();
    const creation_date = new Date();
    db('INSERT INTO customer (id, mail, password, first_name, last_name, birth_date, creation_date) values ($1,$2,$3,$4,$5,$6,$7)', [id,mail,password,first_name,last_name,birth_date,creation_date],(error, results) => {
        if (error) {
            return response.status(400).json({ error });
        }
        return response.status(200).send({message:`Customer created`})
    })
}
//endregion

//region Delete
export const deleteCustomer = (request, response) => {
    const id = request.params.id;
    db('DELETE FROM customer WHERE id = $1', [id], (error, results) => {
        if (error) {
            return response.status(400).json({ error });
        }
        console.log(results.rows)
        return response.status(200).json(results.rows)
    })
}
//endregion
