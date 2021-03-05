import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

class type {

  id
  label
  color

  constructor(id, label,color)
  {
      this.id = id;
      this.label = label;
      this.color = color;
  }
}

let t1 = new type(0, 'Rabais', '#4355d4')
let t2 = new type(1, 'Réduction', '#749eff')
let t3 = new type(2, 'Pack', '#c6ceff')

let types = [t1, t2, t3]

function get_type(coupon){
  let type_found = null;
  types.forEach(t => {
    if(coupon.id_type == t.id){
      type_found = t;
    }
  });
  return type_found;
}

export default function Coupon_Card({ coupon }) {
  let coupon_type = get_type(coupon);
  return (
    <View lightColor={true} style={styles.container}>
      <Text style={styles.label}>{ coupon.label }</Text>
      <Text style={styles.date}>Ends on { coupon.start_date }</Text>
      <Text style={styles.description}>Utilisable sur le magasin en ligne et dans tous les magasins participants</Text>
      <View style={{ height: 6, width: '100%', backgroundColor: coupon_type.color, margin: 10}}></View>
      <View style={styles.separator} lightColor="rgba(255,255,255,0.1)" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%'
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
    marginVertical: 5,
    textAlign: 'center',
  },
  date: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%',
  },
});
