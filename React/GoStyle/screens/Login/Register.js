import React, {useState} from "react";
import {
    ImageBackground,
    View,
    StyleSheet,
    Text,
    TouchableOpacity, ScrollView, Dimensions, KeyboardAvoidingView,
} from "react-native";
import background from "../../assets/images/shopping.jpg"
import {HelperText, TextInput} from "react-native-paper";
import * as api from "../../functions/back/customer"
import * as store from "../../functions/front/store"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Screen = ({navigation}) => {
    const [state, setState] = useState({
        hasError: false,
        errorMessage: "",
    })
    const [customer, setCustomer] = useState({
        first_name: "",
        last_name: "",
        mail: "",
        password: "",
        birth_date: "",
    })
    const handleRegister = () => {
        console.log("login:", state.email, state.mdp)
        if (!customer.first_name || !customer.last_name || !customer.mail || !customer.password || !customer.birth_date) {
            setState({...state, errorMessage: "Tous les champs doivent être remplis", hasError: true})
        }
        createCustomer().then(r => {
            console.log("auth r =", r)
            if (r) {
                store.save("customer", JSON.stringify(r))
            } else {
                setState({...state, hasError: true, errorMessage: "identifiants invalides"})
            }
        })
            .catch(e => console.log(e.errorMessage))

    }
    const createCustomer = async () => {
        return await api.createCustomer(customer)
    }
    return (

        <ImageBackground source={background} style={styles.image} blurRadius={1}>
            <ScrollView>
                <View style={{height: windowHeight, marginTop: 100}}>
                    <View style={styles.pageSize}>
                        <View>
                            <Text style={{...styles.title, color: "#3c92f5"}}>Créer un compte</Text>
                            <View style={{marginTop: 50}}>
                                <TextInput
                                    label="Nom"
                                    value={state.last_name}
                                    mode="outlined"
                                    onChangeText={text => setCustomer({...customer, last_name: text})}
                                />
                                <TextInput
                                    label="Prénom"
                                    value={state.first_name}
                                    mode="outlined"
                                    onChangeText={text => setCustomer({...customer, first_name: text})}
                                />
                                <TextInput
                                    label="Email"
                                    value={state.email}
                                    mode="outlined"
                                    onChangeText={text => setCustomer({...customer, email: text})}
                                />
                                <TextInput
                                    label="Mot de passe"
                                    value={state.password}
                                    mode="outlined"
                                    onChangeText={text => setCustomer({...customer, password: text})}
                                />
                                <TextInput
                                    label="Date de naissance"
                                    value={state.birth_date}
                                    mode="outlined"
                                    onChangeText={text => setCustomer({...customer, birth_date: text})}
                                />
                                <HelperText type="error" visible={state.hasError}>
                                    {state.errorMessage}
                                </HelperText>
                            </View>
                        </View>
                        <View>
                            <View>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => navigation.navigate('Login')}
                                                  title="Login">
                                    <View>
                                        <Text>Se connecter</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.blueButton}
                                                  onPress={() => handleRegister()}
                                                  title="Register">
                                    <View>
                                        <Text>S'enregistrer</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View/>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>)
}

const styles = StyleSheet.create({
    sectionView: {
        flex: 1,
        width: "100%",
        borderColor: "#cf00ff",
        borderStyle: 'solid',
        borderWidth: 1,

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'red',
        borderColor: "red",
        borderWidth: 1,
    },
    button: {
        borderColor: "#3c92f5",
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff"
    },
    blueButton: {
        borderColor: "#c9e0ff",
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3c92f5"
    },
    pageSize: {
        width: "100%",
        height: "100%",
        paddingVertical: 20,
        paddingHorizontal: 40
    },
    centerElement: {
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
    }
});

export default Screen
