import * as API from './utils'


/**
 * récupère la liste complète des coupons d'un customer
 * renvoie un tableau
 */
export const getCustomerCoupons = (id) => {

    return fetch(`${API.URL_CUSTOMER}/${id}/coupons`)
        .then(r => r.json())
        .then(r => {
            console.log(r)
            return r})
        .catch(e => console.log(e))
}

/**
 * récupère un customer d'après son id
 * renvoie un customer
 * @Param id
 */
export const getCustomerById = async(id) => {

    return fetch(`${API.URL_CUSTOMER}/${id}`)
        .then(r => r.json())
        .then(r => {
            console.log(r)
            return r[0]})
        .catch(e => console.log(e))
}

/**
 * check si le couple identifiant/mot de passe existe en bdd
 * necessite dans le body:
 * login,password
 * login = email pour l'instant
 * @Param log:{login,password}
 */
export const authCustomer = (log) => {

    return fetch(`${API.URL_CUSTOMER}/login`, {method: 'POST',headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(log)})
        .then(r => r.json())
        .then(r => r)
        .catch(e => console.log(e))
}

/**
 * ajoute un coupon au compte du customer
 * necessite dans le body:
 * id_coupon
 * @Param id,id_coupon
 */
export const addCoupon = (id, id_coupon) => {
    const body = {
        id_coupon: id_coupon
    }
    console.log('stringify',JSON.stringify(body))
    return fetch(`${API.URL_CUSTOMER}/${id}/coupons/add`, {method: 'POST',headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(body)})
        .then(r => r.json())
        .then(r => r)
        .catch(e => console.log(e))
}

/**
 * update un customer
 * necessite en paramètre:
 * first_name, last_name, mail, password, birth_date
 * @Param customer
 */
export const updateCustomer = (customer) => {

    return fetch(`${API.URL_CUSTOMER}/${customer.id}/coupons`, {method: 'PUT',headers: {
            "Content-Type": "application/json"
        }, body: JSON.stringify(customer)})
        .then(r => r.json())
        .then(r => r)
        .catch(e => console.log(e))
}
//todo createCustomer

