import React from 'react';
import {View} from 'react-native';
import {NoteList} from '../components/noteList/noteList.component';

export const HomeScreen = () => {
  return (
    <View>
      <NoteList />
    </View>
  );
};
