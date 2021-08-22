import React, {useEffect, useState} from 'react';
import { 
  Alert, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  SafeAreaView, 
  StatusBar, 
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Services  from '../constants/functions';
import { Text } from '../components/Themed';
import NewsDetailItem from '../components/NewsDetail';

export default function HomeScreen() {
  const [data, setData] = useState([] as any);
  const [refreshing, setRefresing] = useState(false);

  const onDelete = (id: string) => {
    const filtered = data.filter(e => e.objectID !== id)
    setData(filtered);
  }

  const getData = async () => {
    try {
      const res = await Services.getDataByDate()
      if (res.status === 200 || res.status === 201) {
        setData(res.data.hits)
      } else {
        return Alert.alert(
          'Error al traer la data', 
          'ocurrio un error al obtener la información por favor intente denuevo mas tarde'
          )
      }
    } catch (error: any) {
      console.warn(error)
      return Alert.alert(
        'Error al traer la data', 
        'ocurrio un error al obtener la información por favor intente denuevo mas tarde'
        )
    }
  }

  const handleRefresh = async () => {
    setRefresing(true);
    await getData()
    setRefresing(false);
  }

  useEffect(() => {
    setData([]);
    getData();
  }, [])

  return (
    <SafeAreaView  style={styles.container}>
      {
        refreshing ? (
          <ActivityIndicator color={'#e3e3e3'} size="large" style={{marginTop: 50}} />
        ) : (
          <>
            <Text style={styles.title}>Hacker News list:</Text>
            <FlatList 
              refreshControl={
                <RefreshControl 
                  refreshing={refreshing} 
                  onRefresh={handleRefresh} 
                />
              }
              style={{width: '100%'}} 
              data={data} 
              renderItem={({ item }) => <NewsDetailItem onDelete={onDelete} item={item} />} 
              keyExtractor={item => String(item.objectID) } 
            />
          </>
        )
      }
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
    marginTop: StatusBar.currentHeight || 0,
    width: Dimensions.get('screen').width - 1,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
