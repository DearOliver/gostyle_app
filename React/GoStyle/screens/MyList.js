import * as React from 'react';
import {StyleSheet, RefreshControl} from 'react-native';

import {ScrollView, Text, View} from '../components/Themed';
import CouponCardPerime from "../components/CouponCardPerime";
import Coupon_Card_User from "../components/Coupon_Card_User";
import {useState} from "react";
import * as APICustomer from "../functions/back/customer"
import * as Store from "../functions/front/store";

const wait = timeout => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function MyList({navigation}) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setCoupons({isOk: false, coupons: []})
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [coupons, setCoupons] = useState({isOk: false, coupons: []});
    const [customer, setCustomer] = useState({isOk: false, customer: null});

    if (customer.isOk === false) {
        Store.getValueFor('customer').then(r => {
            setCustomer({isOk: true, customer: JSON.parse(r)});
        })
    }


    if (coupons.isOk === false && customer.isOk === true) {
        APICustomer.getCustomerCoupons(customer.customer.id)
            .then(async r => {
                if (r) {
                    setCoupons({isOk: true, coupons: r})
                }
            })
    }

    return (

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                        lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Coupons</Text>
                </View>
                {coupons.isOk ? (
                    coupons.coupons.map(function (x) {
                            console.log(x.used)
                            if (Date.parse(x.end_date) >= Date.now() && x.used === 0) {
                                return <Coupon_Card_User key={x.id} coupon={x}/>
                            }
                        }
                    )) : (<Text> Aucun coupons </Text>)}
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Coupons précédents</Text>
                </View>
                {coupons.isOk ? (
                    coupons.coupons.map(function (x) {
                            if (Date.parse(x.end_date) < Date.now() || x.used === 1) {
                                return <CouponCardPerime key={x.id} coupon={x}/>
                            }
                        }
                    )) : (<Text> Aucun coupons </Text>)}
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            </ScrollView>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
        ,
        titleContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 50,
            margin: 30
        }
        ,
        title: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            fontWeight: 'bold',
        }
        ,
        separator: {
            marginVertical: 30,
            height: 2,
            width: '100%',
        }
        ,
    }
    )
;
