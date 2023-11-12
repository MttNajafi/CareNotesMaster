import {FlatList, Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './../../store/store';
import NoteListItem from './noteListItem.component';
export const NoteList = () => {
  const notes = useSelector((state: RootState) => state.notes);

  // If no notes available, show message
  if (notes.notes.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No notes available.</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={notes.notes}
        keyExtractor={item => item.noteID.toString()}
        renderItem={({item}) => (
          <View style={styles.container}>
            <NoteListItem note={item} />
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    padding: '3%',
  },
});
