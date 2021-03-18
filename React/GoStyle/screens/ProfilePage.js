import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

import {Text, View, ScrollView} from '../components/Themed';
import {useState} from "react";
import * as APICustomer from '../functions/back/customer.js'
import * as API from '../functions/back/utils.js'


export default function ProfilePage() {
    const [isFetch, setIsFetch] = useState(false);
    const [customer, setCustomer] = useState({
        isOk: false,
        customer: 'Unknown'
    });

    const checkUser = () => {
        APICustomer.getCustomerById(API.ID_CUSTOMER)
            .then(async r => {
                console.log(r)
                if (r) {
                    await setCustomer({isOk: true, customer: r})
                }
            })
    }
    if (customer.isOk === false) {
        checkUser()
        console.log(customer)
    }
    console.log(customer)

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scroll} lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
                <View style={styles.container}>
                    <View lightColor={true} style={styles.container}>
                        <Text>Profil</Text>
                        {customer.isOk ? (
                        <View style={styles.card}>
                        <Text>Nom: {customer.customer.last_name}</Text>
                        <Text>Prenom: {customer.customer.first_name}</Text>
                        </View>
                        ) : (<Text>Not found</Text>)
                        }
                        {customer.isOk ? (
                            <View style={styles.card}>
                                <Text>Date de naissance: {customer.customer.birth_date}</Text>
                                <Text>Date d'inscription: {customer.customer.creation_date}</Text>
                            </View>
                        ):null}
                        {customer.isOk ? (
                            <View style={styles.card}>
                                {/*todo cacher le password*/}
                                <Text>mail: {customer.customer.mail}</Text>
                                <Text>mots de passe: {customer.customer.password}</Text>
                            </View>
                        ):null}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        marginTop:10
    },
    card: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        width: '90%',
        height: 100,
        borderBottomWidth: 7,
        borderBottomColor: "#4355d4",
        marginVertical: 15,
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 0
        },
        shadowOpacity: 0.2
    },
});