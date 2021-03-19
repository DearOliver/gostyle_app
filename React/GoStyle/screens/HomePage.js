  
import * as React from 'react';
import { StyleSheet, Button, TouchableOpacity, RefreshControl } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Coupon_Card from '../components/Coupon_Card';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from '../screens/ProfilePage';
import { Text, View, ScrollView } from '../components/Themed';
import {useState} from "react";
import * as Store from "../functions/front/store";
import * as APICoupon from "../functions/back/coupon"

const wait = timeout => {
  return new Promise(resolve => {
      setTimeout(resolve, timeout);
  });
};

export default function HomePage({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setCoupons({isOk: false, coupons: []})
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const [coupons, setCoupons] = useState({isOk: false, coupons: []});
    const [customer, setCustomer] = useState({isOk: false, customer: null});
    const [search, setSearch] = useState({search: ''});

    updateSearch = (text) => {
      console.log('Search Avant : ', search.search);
      setSearch({ search: text });
      console.log('Search Après : ', search.search);
    };

    if (customer.isOk === false) {
        Store.getValueFor('customer').then(r => {
            setCustomer({isOk: true, customer: JSON.parse(r)})
        })
    }

    if (coupons.isOk === false && customer.isOk === true) {
        APICoupon.getCoupons()
            .then(async r => {
                if (r) {
                    setCoupons({isOk: true, coupons: r})
                }
            })
    }

  return (
    <ScrollView style={styles.scroll} lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfilePage')}>
        <Text style={{ fontSize: 20 }}>
          Mon Profil
        </Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Searchbar style={{width: '90%', marginTop: 10 }}
          placeholder="Rechercher ..."
          onChangeText={(text) => updateSearch(text)}
          onClear={(text) => updateSearch('')}
          value={search.search}
        />
        {coupons.isOk ? (
            coupons.coupons.map(function (x) {
              return (
                <Coupon_Card key={x.id} coupon={x}/>
              );
          }
       )
            ) : (<Text> Aucun coupons </Text>)}
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
