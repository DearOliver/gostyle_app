import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';





export default function Coupon_Card_User({coupon}) {

  let styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    card: {
      flex: 1,
      alignItems: 'flex-start',
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderBottomColor: coupon.color,
      width: '90%',
      height: 150,
      borderBottomWidth: 7,
      marginVertical: 15,
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
    description: {
      fontSize: 11,
      fontStyle: 'italic',
      marginVertical: 5,
    },
    date: {
      fontSize: 16,
      fontStyle: 'italic',
    },
  });

  return (
    <View lightColor={true} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.code}>{ coupon.code }</Text>
        <Text style={styles.label}>{ coupon.label }</Text>
        <Text style={styles.date}>Ends on { coupon.end_date }</Text>
        <Text style={styles.description}>Utilisable sur le magasin en ligne et dans tous les magasins participants</Text>
      </View>
    </View>
  );
}
