import React, {useEffect} from 'react';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ModalScreen({route, navigation}: any) {
  const {url} = route.params;

  useEffect(() => {
    if (url === undefined) {
      Alert.alert(
        'Lo sentimos', 
        'no pudimos renderizar nada url no es correcta', 
        [
          {
            text: 'ok',
            onPress: () => navigation.goBack()
          }
        ]
      )
    }
  }, [])

  return <WebView source={{ uri: url }} />;
};
