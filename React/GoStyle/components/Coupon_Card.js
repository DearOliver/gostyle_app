import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';

import {useState} from "react";
import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import CouponCardPerime from './CouponCardPerime';

const axios = require('axios');

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
  let [modalVisible, setModalVisible] = useState(false);

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
      borderBottomColor: coupon_type.color,
      width: '90%',
      height: 150,
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
    axios
    .post('http://172.16.18.23:5000/customer/B7B41975-8CA0-A33E-E21E-CB880E099BB0/coupons/add', coupon.id)
    .then(res => {
      console.log(`Coupon added : `, coupon.id)
    })
    .catch(error => {
      console.error(error)
    })

    setModalVisible(!modalVisible)
  }

  return (
    <View lightColor={true} style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <Text style={styles.label}>{ coupon.label }</Text>
        <Text style={styles.date}>Ends on { coupon.start_date }</Text>
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
