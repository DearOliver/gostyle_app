// export const URL_CUSTOMER = 'http://172.16.18.23:5000/customer';
// export const URL_COUPON = 'http://172.16.18.23:5000/coupon';


import moment from "moment";

export const URL_CUSTOMER = 'http://192.168.1.43:5000/customer';
export const URL_COUPON = 'http://192.168.1.43:5000/coupon';

export const ID_CUSTOMER = '407CE224-641F-152A-6784-86513E00740F';

export const SQL_DATE_FORMAT = 'YYYY-MM-DD';
export const USER_DATE_FORMAT = 'DD MMM YYYY';
export const SQL_DATE = (date)=>moment(date).format(SQL_DATE_FORMAT)
export const USER_DATE = (date = moment())=>moment(date).format(USER_DATE_FORMAT)
