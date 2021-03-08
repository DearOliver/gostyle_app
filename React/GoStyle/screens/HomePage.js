
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import Coupon_Card from '../components/Coupon_Card'

import { Text, View, ScrollView } from '../components/Themed';

class coupon {
  constructor(id, label, code, start_date, end_date, id_type)
  {
      this.id = id;
      this.label = label;
      this.code = code;
      this.start_date = start_date;
      this.end_date = end_date;
      this.id_type = id_type;
  }
}

export default function HomePage() {

  let c1 = new coupon('1234', '-203€ sur toutes les culottes', 'CUL2021XM', '06/03/2021', '23/04/2021', 0);
  let c2 = new coupon('1265', '-50% sur votre commande', '50POURCOM', '08/06/2021', '12/08/2021', 1);
  let c3 = new coupon('6934', '42 voitures achetées 1 offerte', 'AFFVOIT42', '01/02/2020', '26/04/2023', 2);
  let c4 = new coupon('6634', '-10€ sur toutes les culottes', 'CUMP21XM', '06/03/2021', '23/04/2021', 0);
  let c5 = new coupon('1115', '-20% sur votre commande', '50LLLLCOM', '08/06/2021', '12/08/2021', 1);
  let c6 = new coupon('6664', '23 voitures achetées 2 offerte', 'ABHGBT42', '01/02/2020', '26/04/2023', 2);

  let tableau = [c1, c6, c4, c2, c3, c5];

  let current_coupons_views = tableau.map(x => {
    return (
      <Coupon_Card key={x.id} coupon={x}/>
    );
  });

  return (
    <ScrollView style={styles.scroll} lightColor={true} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
      <View style={styles.container}>
        { current_coupons_views }
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
});
