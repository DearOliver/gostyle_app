import db from "../config/Postgres/db.js"

//Get
export const getAllCustomers = (request, response) => {
    db('SELECT * FROM customer ORDER BY id ASC', [],(error, results) => {
        if (error) {
            response.status(404).json({ error });
        }
        console.log(results.rows)
        return response.status(200).json(results.rows)
    })
}

export const getCustomerById = (request, response) => {
    const id = request.params.id;
    db('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(404).json({ error });
        }
        console.log(results.rows)
        return response.status(200).json(results.rows)
    })
}
export const getCustomersCoupons = (request, response) => {
    const id = request.params.id;
    db('SELECT * from coupon c join customer_coupon cc on c.id = cc.id_coupon WHERE cc.id_customer = $1', [id], (error, results) => {
        if (error) {
            response.status(404).json({ error });
        }
        console.log(results.rows)
        return response.status(200).json(results.rows)
    })
}

//Put
export const updateCustomer = (request, response) => {
    const id = request.params.id
    const {first_name, last_name, mail, password, birth_date} = request.query
    console.log(request.query)
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

//POST
export const authUser = (request, response) => {
    const {login,password} = request.body
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
    const {id} = request.params
    const {id_coupon} = request.body
    db('INSERT INTO customer_coupon (id_customer, id_coupon, used) values ($1,$2,0)', [id,id_coupon],(error, results) => {
        if (error) {
            return response.status(400).json({ error });
        }
        return response.status(200).send(`Coupon added`)
    })
}
//Delete
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
