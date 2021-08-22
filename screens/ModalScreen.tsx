import React from 'react';
import { WebView } from 'react-native-webview';

export default function ModalScreen({route}: any) {
  const {url} = route.params;
  return <WebView source={{ uri: url }} />;
};
