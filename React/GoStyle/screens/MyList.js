import * as React from 'react';
import {StyleSheet} from 'react-native';

import {ScrollView, Text, View} from '../components/Themed';
import CouponCardPerime from "../components/CouponCardPerime";
import Coupon_Card_User from "../components/Coupon_Card_User";
import {useState} from "react";


export default function MyList() {

    let [isFetch, setIsFetch] = useState(false);
    let [tableau, setTableau] = useState([]);


    if (tableau.length <= 0) {

        fetch('http://192.168.1.42:5003/customer/B7B41975-8CA0-A33E-E21E-CB880E099BB0/coupons')
            .then(
                r => r.json()
            )
            .then(
                function (response) {
                    setIsFetch(true);
                    setTableau(response);
                    return;
                }
            );
    }
    console.log(tableau)


    return (
        <ScrollView lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Coupons</Text>
            </View>
            {isFetch ? (
                tableau.map(function (x) {
                    console.log('datenow: ',Date.now(),'| end_date: ',Date.parse(x.end_date))
                        if (Date.parse(x.end_date) <= Date.now()) {
                            return <Coupon_Card_User key={x.id} coupon={x}/>
                        }
                    }
                )) : (<Text> Aucun coupons </Text>)}
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Coupons précédents</Text>
            </View>
            {isFetch ? (
                tableau.map(function (x) {
                        if (Date.parse(x.end_date) > Date.now()) {
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
