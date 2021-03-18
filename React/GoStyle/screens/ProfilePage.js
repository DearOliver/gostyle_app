import * as React from 'react';
import {StyleSheet} from 'react-native';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

import {Text, View, ScrollView} from '../components/Themed';
import {useState} from "react";
import * as APICustomer from '../functions/back/customer.js'
import * as API from '../functions/back/utils.js'


export default function ProfilePage() {
    const [isFetch, setIsFetch] = useState(false);
    const [customer, setCustomer] = useState({
        isOk:false,
        first_name:'Unknown'
    });

    const checkUser = () => {
        APICustomer.getCustomerById(API.ID_CUSTOMER)
            .then(async r => {
                console.log(r)
                if (r) {
                    await setCustomer({isOk: true, first_name: r.first_name})
                }
            })
    }
    if (customer.isOk === false){
        checkUser()
        console.log(customer)
    }
    console.log(customer)

    return (
        <ScrollView style={styles.scroll} lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
            <View style={styles.container}>
                <View lightColor={true} style={styles.container}>
                    <View style={styles.card}>
                        <Text>Profil</Text>
                        <Text>Nom</Text>
                        {customer.isOk ? (
                            <Text>{customer.first_name}</Text>
                        ) : (<Text>Not found</Text>)
                        }
                    </View>
                </View>
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
    card: {
        flex: 1,
        alignItems: 'flex-start',
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
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
});