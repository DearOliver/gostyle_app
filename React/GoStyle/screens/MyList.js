import * as React from 'react';
import {StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import {ScrollView, Text, View} from '../components/Themed';
import Coupon_Card from "../components/Coupon_Card";
import CouponCardPerime from "../components/CouponCardPerime";

class coupon {
    constructor(id, label, code, start_date, end_date) {
        this.id = id;
        this.label = label;
        this.code = code;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

export default function MyList() {

    let c1 = new coupon('1234', '-203€ sur toutes les culottes', 'CUL2021XM', '06/03/2021', '23/04/2021');
    let c2 = new coupon('1265', '-50% sur votre commande', '50POURCOM', '08/06/2021', '12/08/2021');
    let c3 = new coupon('6934', '42 voitures achetées 1 offerte', 'AFFVOIT42', '01/02/2020', '26/04/2023');
    let c4 = new coupon('6634', '-10€ sur toutes les culottes', 'CUMP21XM', '06/03/2021', '23/04/2021');
    let c5 = new coupon('1115', '-20% sur votre commande', '50LLLLCOM', '08/06/2021', '12/08/2021');
    let c6 = new coupon('6664', '23 voitures achetées 2 offerte', 'ABHGBT42', '01/02/2020', '26/04/2023');

    let tableau = [c1, c2, c3, c4, c5, c6];
    let tableau2 = [c1, c2, c3, c4, c5, c6];

    let current_coupons_views = tableau.map(x => {
        return (
            <Coupon_Card coupon={x}/>
        );
    });
    let current_coupons_views2 = tableau2.map(x => {
        return (
            <CouponCardPerime coupon={x}/>
        );
    });

    return (
        <ScrollView lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Coupons</Text>
            </View>
            {current_coupons_views}
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Coupons précédents</Text>
            </View>
            {current_coupons_views2}
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        margin: 30
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 2,
        width: '100%',
    },
});
