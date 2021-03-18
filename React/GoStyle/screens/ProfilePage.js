import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text, View, ScrollView} from '../components/Themed';
import {useState} from "react";
import * as Store from "../functions/front/store"
import {Button} from "react-native-paper";


export default function ProfilePage() {
    const [customer, setCustomer] = useState({
        isOk: false,
        customer: null
    });

    if (customer.isOk === false){
        Store.getValueFor('customer').then(r => {
            setCustomer({ isOk:true, customer: JSON.parse(r)});
        })
    }

    const handleLogout = ()=>{
        Store.removeItem("customer")
    }

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
                        ) : (<Text>{customer.isOk}</Text>)
                        }
                        {customer.isOk ? (
                            <>
                                <View style={styles.card}>
                                    <Text>Date de naissance: {customer.customer.birth_date}</Text>
                                    <Text>Date d'inscription: {customer.customer.creation_date}</Text>
                                </View>
                                <View style={styles.card}>
                                    {/*todo cacher le password*/}
                                    <Text>mail: {customer.customer.mail}</Text>
                                    <Text>mots de passe: {customer.customer.password}</Text>
                                </View>
                            </>
                        ) : null}
                    </View>
                </View>
                <Button icon="logout-variant" mode="outlined" color="#000" onPress={() => handleLogout()}
                        title="Déconnexion">
                    Déconnexion
                </Button>
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
        marginTop: 10
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
