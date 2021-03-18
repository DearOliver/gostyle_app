import React, {useState} from "react";
import {
    ImageBackground,
    View,
    StyleSheet,
    Text,
    TouchableOpacity, ScrollView, Dimensions,
} from "react-native";
import background from "../../assets/images/shopping.jpg"
import {HelperText, TextInput} from "react-native-paper";
import * as api from "../../functions/back/customer"
import * as store from "../../functions/front/store"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Screen = ({navigation}) => {
    const [state, setState] = useState({
        email: "",
        mdp: "",
        hasError: false,
        errorMessage: "",
    })
    const handleLogin = () => {
        console.log("login:", state.email, state.mdp)
        authUser().then(r=>{
            console.log("auth r =",r)
            if(r){
                store.save("customer",JSON.stringify(r))
            } else{
                setState({...state,hasError: true, errorMessage:"identifiants invalides"})
            }
        })
            .catch(e => console.log(e.errorMessage))

    }
    const authUser = async () => {
        return await api.authCustomer({login: state.email, password: state.mdp})
    }
    return (

        <ImageBackground source={background} style={styles.image} blurRadius={1}>
            <ScrollView>
                <View style={{height: windowHeight}}>

                    <View style={styles.pageSize}>
                        <View style={styles.sectionView}/>

                        <View style={{...styles.sectionView, flex: 2}}>
                            <Text style={{...styles.title, color: "#3c92f5"}}>Connexion</Text>

                            <View style={{...styles.sectionView, marginTop: 50}}>

                                <TextInput
                                    label="Email"
                                    value={state.email}
                                    mode="outlined"
                                    onChangeText={text => setState({...state, email: text})}
                                />
                                <TextInput
                                    label="Mot de passe"
                                    value={state.mdp}
                                    mode="outlined"
                                    onChangeText={text => setState({...state, mdp: text})}
                                />
                                <HelperText type="error" visible={state.hasError}>
                                    {state.errorMessage}
                                </HelperText>
                            </View>

                        </View>

                        <View style={{...styles.sectionView, flex: 2}}>
                            <View>
                                <TouchableOpacity style={styles.button} onPress={() => handleLogin()}
                                                  title="Login">
                                    <View>
                                        <Text>Se connecter</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.blueButton}
                                                  onPress={() => navigation.navigate('Register')}
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
        borderColor: "#cf00ff",
        borderStyle: 'solid',
        borderWidth: 1,
        width: "100%"
        // backgroundColor: "#eaeaea"

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
