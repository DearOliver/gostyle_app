import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {StatusBar} from 'expo-status-bar'
import NotFoundScreen from '../screens/NotFoundScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import ProfilePage from "../screens/ProfilePage";
import {useState} from "react";
import * as SplashScreen from "expo-splash-screen";
import * as store from "../functions/front/store"
import HomeLogin from "../screens/Login/HomeLogin";
import Login from "../screens/Login/Login";
import Register from "../screens/Login/Register";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({colorScheme}) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            // theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <StatusBar style="dark"/>
            <RootNavigator/>
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
    SplashScreen.preventAutoHideAsync().then(r => r);
    const [state, setState] = useState({
        isLoading: true,
        isSignedIn: false
    })
    //console.log("app sign state",state.isSignedIn)
    store.isSignedIn().then(r => {
        setState({
            isSignedIn: r,
            isLoading: false
        })
        SplashScreen.hideAsync().then(r => r)
    })

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {!state.isSignedIn ?
                (<>
                    <Stack.Screen name="LoginHome"
                                  component={HomeLogin}
                                  options={{
                                      headerShown: false,
                                  }}/>
                    <Stack.Screen name="Login"
                                  component={Login}
                                  options={{
                                      headerTransparent: true,
                                      headerTitle: false,
                                      headerTintColor: "#fff"
                                  }}/>
                    <Stack.Screen name="Register"
                                  component={Register}
                                  options={{
                                      headerTransparent: true,
                                      headerTitle: false,
                                      headerTintColor: "#fff"
                                  }}/>
                </>) :
                (<>
                    <Stack.Screen name="Root" component={BottomTabNavigator}/>
                    <Stack.Screen
                        name="ProfilePage"
                        component={ProfilePage}
                        options={{headerTitle: 'Mon Profil'}}
                    />
                    <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
                </>)}

        </Stack.Navigator>
    );
}
