  
import * as React from 'react';
import { StyleSheet, Button, TouchableOpacity, Modal } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Coupon_Card from '../components/Coupon_Card';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from '../screens/ProfilePage';
import { Text, View, ScrollView } from '../components/Themed';
import {useState} from "react";

export default function HomePage({ navigation }) {
  
  let [isFetch, setIsFetch] = useState(false);
  let [tableau, setTableau] = useState([]);

  if (tableau.length <= 0) {
    fetch('http://172.16.18.23:5000/coupon')
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

  let current_coupons_views = tableau.map(x => {
    return (
      <Coupon_Card key={x.id} coupon={x}/>
    );
  });

  return (
    <ScrollView style={styles.scroll} lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfilePage')}>
        <Text style={{ fontSize: 20 }}>
          Mon Profil
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        { current_coupons_views }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    display: 'flex',
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    height: 60,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
        width: 1,
        height: 0
    },
    shadowOpacity: 0.2
  }
});

//TODO Add to list perso, Filter on libellé
