import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomePage from '../screens/HomePage';
import ScanPage from '../screens/ScanPage';
import MyList from '../screens/MyList';
import ProfilePage from "../screens/ProfilePage";


const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Actus"
      tabBarOptions={{ activeTintColor: Colors["light"].tint }}>
      <BottomTab.Screen
        name="Actus"
        component={HomePageNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="pricetag-outline" color={color} />,
          tabBarLabel:() => {return null},
        }}
      />
      <BottomTab.Screen
        name="Scan"
        component={ScanPageNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="scan" color={color} />,
          tabBarLabel:() => {return null},
        }}
      />
      <BottomTab.Screen
        name="Mes coupons"
        component={MyListNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          tabBarLabel:() => {return null},
        }}
      />

    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ScanPageStack = createStackNavigator();

function ScanPageNavigator() {
  return (
    <ScanPageStack.Navigator>
      <ScanPageStack.Screen
        name="ScanPage"
        component={ScanPage}
        options={{ headerTitle: 'GoStyle' }}
      />
    </ScanPageStack.Navigator>
  );
}

const MyListStack = createStackNavigator();

function MyListNavigator() {
  return (
    <MyListStack.Navigator>
      <MyListStack.Screen
        name="MyList"
        component={MyList}
        options={{ headerTitle: 'GoStyle' }}
      />
    </MyListStack.Navigator>
  );
}

const HomePageStack = createStackNavigator();

function HomePageNavigator() {
  return (
    <HomePageStack.Navigator>
      <HomePageStack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerTitle: 'GoStyle' }}
      />
    </HomePageStack.Navigator>
  );
}
