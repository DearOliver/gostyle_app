import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, Modal, Alert} from 'react-native';

import {useState} from "react";
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import * as Store from "../functions/front/store";
import * as APICustomer from "../functions/back/customer"
import CouponCardPerime from './CouponCardPerime';
import * as Utils from "../functions/utils"







export default function Coupon_Card({ coupon }) {
  let [modalVisible, setModalVisible] = useState(false);
  const [customer, setCustomer] = useState({isOk: false, customer: null});
  const [customerCoupons, setCustomerCoupons] = useState({isOk: false, customerCoupons: []});

  if (customer.isOk === false) {
    Store.getValueFor('customer').then(r => {
        setCustomer({isOk: true, customer: JSON.parse(r)});
    })
  }

  if (customerCoupons.isOk === false && customer.isOk === true) {
    APICustomer.getCustomerCoupons(customer.customer.id)
        .then(async r => {
            if (r) {
                setCustomerCoupons({isOk: true, customerCoupons: r})
            }
        })
  }

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
      // height: 150,
      borderBottomWidth: 7,
      marginVertical: 15,
      shadowColor: '#000000',
      shadowOffset: {
          width: 1,
          height: 0
      },
      shadowOpacity: 0.2
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
    },
    date: {
      fontSize: 16,
      fontStyle: 'italic',
    },
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '50%',
      height: 200,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalCouponText: {
      fontSize: 15,
      fontStyle: 'italic',
      marginBottom: 15,
      textAlign: "center"
    },
    modalText: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: "center"
    },
    porteButton: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });

  function add_to_customer(coupon){

    let is_found = false;

    customerCoupons.customerCoupons.map(function(x) {

      if (x.id == coupon.id){
        is_found = true;
      }

    })

    if (is_found == true){
      setModalVisible(!modalVisible);
      Alert.alert("Vous avez déjà ce coupon !");
    }

    else{
      APICustomer.addCoupon(customer.customer.id, coupon.id);
      setModalVisible(!modalVisible);
      Alert.alert("Coupon ajouté !");
    }

  }

  return (
    <View lightColor={true} style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <Text style={styles.label}>{ coupon.label }</Text>
        <Text style={styles.date}>Ends on {Utils.USER_DATE(coupon.start_date) }</Text>
        <Text style={styles.description}>Utilisable sur le magasin en ligne et dans tous les magasins participants</Text>
        <Modal style={{backgroundColor: '#191919'}}
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalCouponText}>{coupon.label}</Text>
            <Text style={styles.modalText}>Ajouter à mes coupons</Text>
            <View style={styles.porteButton}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => add_to_customer(coupon)}
              >
                <Text style={styles.textStyle}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </TouchableOpacity>
    </View>
  );
}
