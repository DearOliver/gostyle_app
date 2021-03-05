import db from "../config/Postgres/db.js"

//Get
export const getAllCustomers = (request, response) => {
    db('SELECT * FROM customer ORDER BY id ASC', [],(error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}
export const getCustomerById = (request, response) => {
    const id = request.params.id;
    db('SELECT * FROM customer WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows)
        response.status(200).json(results.rows)
    })
}

//Post
export const updateCustomer = (request, response) => {
    const id = request.params.id
    const {first_name, last_name, mail, password, birth_date} = request.body
    db(
        'UPDATE customer SET first_name = $1,  last_name = $2, mail = $3, password = $4, birth_date = $5 WHERE id = $6',
        [first_name, last_name, mail, password, birth_date, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}
