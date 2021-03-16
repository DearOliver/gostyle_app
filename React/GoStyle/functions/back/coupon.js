import * as API from './utils'


/**
 * récupère la liste complète des coupons
 * renvoie un tableau
 */
export const getCoupons = () => {

    fetch(`${API.URL_COUPON}`)
        .then(r => r.json())
        .then(r => r)
        .catch(e => console.log(e))
}

/**
 * récupère un coupon d'après son id
 * renvoie un tableau avec 1 seul élément (le coupon)
 * @Param id
 */
export const getCouponById = (id) => {

    fetch(`${API.URL_COUPON}/${id}`)
        .then(r => r.json())
        .then(r => r)
        .catch(e => console.log(e))
}