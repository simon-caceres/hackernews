import React, {useEffect, useState} from 'react';
import { 
  Alert, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Services  from '../constants/functions';
import NewsDetailItem from '../components/NewsDetail';
import { HackerNews } from '../types';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([] as HackerNews[]);
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
    <SafeAreaView style={styles.container}>
      {
        refreshing ? (
          <ActivityIndicator 
            color={'#367edb'} 
            size="large" 
            style={styles.activityIndicator} 
          />
        ) : (
          <>
            <FlatList 
              refreshControl={
                <RefreshControl 
                  refreshing={refreshing} 
                  onRefresh={handleRefresh} 
                />
              }
              showsVerticalScrollIndicator={false}
              style={{width: '100%'}} 
              data={data} 
              renderItem={({ item }) => <NewsDetailItem navigation={navigation} onDelete={onDelete} item={item} />} 
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
    width: Dimensions.get('screen').width - 1,
    backgroundColor: '#eee',
  },
  activityIndicator: {
    marginTop: 300,
    alignSelf: 'center'
  }
});
