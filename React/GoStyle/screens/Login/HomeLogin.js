import React from "react";
import {Button, Image, ImageBackground, View, StyleSheet, Text, TouchableOpacity} from "react-native";
import background from "../../assets/images/shopping.jpg"

const Screen = ({navigation}) => {
    return (
        <ImageBackground source={background} style={styles.image} blurRadius={1}>
            <View style={styles.pageSize}>
                <View style={styles.sectionView}/>
                <View style={{...styles.sectionView, ...styles.centerElement, flex:2}}>
                    <Text style={{...styles.title,color: "#3c92f5" }}>Go Style</Text>
                    <Text style={{color: "#ffffff", fontWeight: "bold"}}>Obtennez des coupons de réductions!</Text>
                </View>
                <View style={{...styles.sectionView, flex: 2}}>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}
                                          title="Login">
                            <View>
                                <Text>Se connecter</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.blueButton} onPress={() => navigation.navigate('Register')}
                                          title="Register">
                            <View>
                                <Text>S'enregistrer</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View/>
                </View>
            </View>
        </ImageBackground>)
}

const styles = StyleSheet.create({
    sectionView: {
        flex: 1,
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
    centerElement:{
        alignItems: "center",
        justifyContent: "center",
    },
    title:{
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
    }
});

export default Screen
