import React, {useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';

import Services  from '../constants/functions';
import { Text, View } from '../components/Themed';

export default function HomeScreen() {
  const [data, setData] = useState([] as any);

  const getData = async () => {
    try {
      const res = await Services.getDataByDate()
      console.log(res.data.hits)
    } catch (error: any) {
      console.warn(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
