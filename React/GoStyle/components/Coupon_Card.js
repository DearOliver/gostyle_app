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

// let t1 = new type(0, 'Rabais', '#4355d4')
// let t2 = new type(1, 'Réduction', '#749eff')
// let t3 = new type(2, 'Pack', '#c6ceff')

// let types = [t1, t2, t3]

// function get_type(coupon){
//   return types.map(x => {
//     let is_type_found = false;
//     while (is_type_found == false){
//       if (x.id == coupon.id_type){
//         type_found = x;
//         is_type_found = true;
//       }
//       else{
//         type_found = null;
//       }
//     }
//     return type_found;
//   });
// }

export default function Coupon_Card({ coupon }) {
  // let type_coupon = get_type(coupon)
  // console.log(type_coupon.label)

  return (
    <View lightColor={true} style={styles.container}>
      <Text style={styles.label}>{ coupon.label }</Text>
      <Text style={styles.description}>Usable online and in participating stores</Text>
      <Text style={styles.description}>Ends on { coupon.start_date }</Text>
      <View style={styles.separator} lightColor="rgba(255,255,255,0.1)" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
