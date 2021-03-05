import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Text, View} from './Themed';

export default function CouponCardPerime({coupon}) {
    return (
        <View lightColor={true} style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.code}>{coupon.code}</Text>
                <Text style={styles.label}>{coupon.label}</Text>
                <Text style={styles.date}>Perimée depuis le {coupon.end_date}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: '90%',
        height: 150,
        borderBottomColor: "#B9B9B9",
        borderBottomWidth: 5,
        marginVertical: 20,
        paddingLeft: 20,
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 0
        },
        shadowOpacity: 0.2
    },
    code: {
        fontSize: 20,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        marginVertical: 10,
    },
    date: {
        fontSize: 16,
    },
    separator: {
        marginVertical: 20,
        height: 5,
        width: '80%',
    },
});
