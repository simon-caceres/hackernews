import { NavigatorScreenParams } from '@react-navigation/native';
import { ReactNode } from 'react';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
};

export type RootTabParamList = {
  HomeScreen: ReactNode;
};

export type HackerNews = {
  title: string | null;
  author: string | null;
  url: string | null;
  created_at: any;
  _highlightResult: any;
  story_title: string | null;
  objectID: string;
  story_url: string | null;
}

export type ItemNewsProps = {
  onDelete: any;
  navigation: any;
  item: HackerNews;
}