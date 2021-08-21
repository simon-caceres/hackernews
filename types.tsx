import { NavigatorScreenParams } from '@react-navigation/native';
import { ReactNode } from 'react';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootTabParamList = {
  HomeScreen: ReactNode;
};

