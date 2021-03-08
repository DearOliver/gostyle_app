  
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, View, ScrollView } from '../components/Themed';

class custommer {
  constructor(id, first_name, last_name, mail, password, birth_date, creation_date)
  {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.mail = mail;
    this.password = password;
    this.birth_date = birth_date;
    this.creation_date = creation_date;
  }
}

export default function ProfilePage() {
  console.log('Hello')

  let c = new custommer(1234, 'Romain', 'Loubeyre', 'romain.loubeyre@yahoo.fr', 'Romain1999', '23/11/1999', '08/03/2021');

  return (
    <ScrollView style={styles.scroll} lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
      <View style={styles.container}>
        <View lightColor={true} style={styles.container}>
          <View style={styles.card}>
            <Text >Profil</Text>
            <Text >Nom</Text>
            <Text >{ c.last_name }</Text>
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