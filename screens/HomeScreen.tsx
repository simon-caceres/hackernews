import React, {useEffect, useState} from 'react';
import { 
  Alert, 
  StyleSheet, 
  FlatList, 
  Dimensions, 
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  Animated,
} from 'react-native';


import Services  from '../constants/functions';
import NewsDetailItem from '../components/NewsDetail';
import Footer from '../components/Footer';
import { HackerNews } from '../types';

export default function HomeScreen({ navigation } : any) {
  const [data, setData] = useState([] as HackerNews[]);
  const [paginate, setPaginate] = useState(0);
  const [refreshing, setRefresing] = useState(false);
  const [loadingMoreNews, setLoadingMoreNews] = useState(false);

  const onDelete = (id: string) => {
    const filtered = data.filter(e => e.objectID !== id)
    setData(filtered);
  }

  const getData = async () => {
    try {
      setLoadingMoreNews(true);
      const res = await Services.getDataByDate(paginate)
      if (res.status === 200 || res.status === 201) {
        let dataNew =  [...data, ...res.data.hits];
        const onlyIds = dataNew.map(e => { return e.objectID})
    
        let result = onlyIds.filter((item,index) => {
          return onlyIds.indexOf(item) === index;
        })
        let filtered = dataNew
          .filter(e => result.includes(e.objectID))
          .sort( function (a: HackerNews, b: HackerNews) {
            return b.created_at - a.created_at;
          })
        setData(filtered)
        setLoadingMoreNews(false)
      } else {
        setLoadingMoreNews(false)
        return Alert.alert(
          'Error al traer la data', 
          'ocurrio un error al obtener la información por favor intente denuevo mas tarde'
          )
      }
    } catch (error: any) {
      console.warn(error)
      setLoadingMoreNews(false)
      return Alert.alert(
        'Error al traer la data', 
        'ocurrio un error al obtener la información por favor intente denuevo mas tarde'
        )
    }
  }

  const handleRefresh = async () => {
    setRefresing(true);
    setPaginate(0)
    setData([] as HackerNews[]);
    setRefresing(false);
  }

  useEffect(() => {
    if (paginate > 0 && paginate <= 50 ) {
      getData();
    }
  }, [paginate])

  const onScrollEnds = () => {
    setPaginate(paginate + 1);
  }

  useEffect(() => {
    if (data.length === 0) {
      getData();
    }
  }, [data]);

  const _renderFooter = () => {
    if (!loadingMoreNews) return null;

    return <Footer  />
  };

  const _renderItem = ({ item }: any) => <NewsDetailItem navigation={navigation} onDelete={onDelete} item={item} />


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
              refreshing={loadingMoreNews}
              onEndReached={onScrollEnds}
              onEndReachedThreshold={0.5}
              initialNumToRender={10}
              style={{width: '100%'}} 
              data={data} 
              renderItem={_renderItem} 
              ListFooterComponent={_renderFooter}
              keyExtractor={(item, index) => index.toString()} 
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
