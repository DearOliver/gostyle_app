import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          ScanPage: {
            screens: {
              ScanPageScreen: 'scan',
            },
          },
          MyList: {
            screens: {
              MyListScreen: 'MyList',
            },
          },
          HomePage: {
            screens: {
              HomePageScreen: 'home',
            }
          },
          ProfilePage: {
            screens: {
              ScanPageScreen: 'profile',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
