import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Modal, Alert, TouchableHighlight} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as APICoupon from "../functions/back/coupon"
import * as APICustomer from "../functions/back/customer"
import * as Store from "../functions/front/store"

export default function ScanPage() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [added, setAdded] = useState({isOk: false, text: ""});
    const [coupon, setCoupon] = useState({
        isOK: false,
        coupon: {id: "", label: "", code: "", start_date: "", end_date: "", id_type: ""}
    });
    const [customer, setCustomer] = useState({isOK: false, customer: null});
    const [modalVisible, setModalVisible] = useState({Visible: false, data: null});

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const checkCoupon = (id) => {
        console.log(coupon.isOK)
        APICoupon.getCouponById(id)
            .then(async r => {
                console.log(r)
                if (r) {
                    console.log('request: ', r)
                    await setCoupon({
                        isOk: true,
                        coupon: {
                            id: r[0].id,
                            label: r[0].label,
                            code: r[0].code,
                            start_date: r[0].start_date,
                            end_date: r[0].end_date,
                            id_type: r[0].id_type
                        }
                    })
                }
            })
    }

    const addCoupon = () => {
        APICustomer.addCoupon(customer.customer.id, coupon.coupon.id)
            .then(async r => {
                console.log('customer: ', customer)
                if (r) {
                    setCoupon({
                        isOK: false,
                        coupon: {id: " ", label: " ", code: " ", start_date: " ", end_date: " ", id_type: " "}
                    })
                    if (r.status === "200") {
                        setAdded({isOk: true, text: "Coupon added"})
                    } else {
                        setAdded({isOk: true, text: "This coupon are on your list"})
                    }
                }
            })
    }

    if (customer.isOK === false){
        Store.getValueFor('customer').then(r => {
            setCustomer({ isOK:true, customer: JSON.parse(r)});
        })
    }

    if (modalVisible.Visible === true && coupon.isOK === false) {
        checkCoupon(modalVisible.data)
    }

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        setModalVisible({Visible: true, data: data});
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible.Visible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.label}>{coupon.coupon.label}</Text>
                            <Text style={styles.date}>Ends on {coupon.coupon.end_date}</Text>
                            <Text style={styles.description}>Utilisable sur le magasin en ligne et dans tous les
                                magasins participants</Text>
                            <View style={{flex: 1, flexDirection: 'row', height: 250}}>
                                <TouchableHighlight
                                    style={{...styles.openButton, height: 40, backgroundColor: '#2196F3'}}
                                    onPress={() => {
                                        setModalVisible({Visible: false, data: null});
                                        addCoupon();

                                    }}>
                                    <Text style={styles.textStyle}>Add</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    style={{...styles.openButton, height: 40, backgroundColor: '#2196F3'}}
                                    onPress={() => {
                                        setModalVisible({Visible: false, data: null});
                                        setCoupon({
                                            isOK: false,
                                            coupon: {
                                                id: "",
                                                label: "",
                                                code: "",
                                                start_date: "",
                                                end_date: "",
                                                id_type: ""
                                            }
                                        })
                                    }}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={added.isOk}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalViewAdded}>
                            <Text style={styles.label}>{added.text}</Text>
                            <TouchableHighlight
                                style={{...styles.openButton, backgroundColor: '#2196F3'}}
                                onPress={() => {
                                    setAdded({isOk: false, text: ""})
                                }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        height: 200,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalViewAdded: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        height: 20
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
});