import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function Coupon_Card({ coupon }) {
  return (
    <View lightColor={true} style={styles.container}>
      <Text style={styles.label}>{ coupon.label }</Text>
      <Text style={styles.date}>Starts on { coupon.start_date }</Text>
      <View style={styles.separator} lightColor="rgba(255,255,255,0.1)" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
});
