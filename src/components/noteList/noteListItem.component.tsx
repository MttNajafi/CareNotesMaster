import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteNote, setCurrentNote} from '../../store/slices/noteSlice';
import {useNavigation} from '@react-navigation/native';
import {Button, Icon, ListItem} from '@rneui/themed';
import {RootState} from 'store/store';
import {colors} from './../../styles/colors';
import {Note} from 'types/common';

const NoteListItem: React.FC<{note: Note}> = ({note}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const clients = useSelector((state: RootState) => state.clients);

  /**
   * Navigate to note details screen
   * Set current note in store
   * @returns void
   * */
  const onDetailsPress = () => {
    dispatch(setCurrentNote(note));
    navigation.navigate('NoteDetails' as never);
  };

  /**
   * Delete note
   * @returns void
   * */
  const onDeleteBtnPress = () => {
    note && dispatch(deleteNote(note.noteID));
  };
  return (
    <ListItem.Swipeable
      onPress={onDetailsPress}
      leftWidth={80}
      rightWidth={90}
      rightContent={() => (
        <Button
          containerStyle={styles.container}
          type="clear"
          icon={{name: 'delete-outline', color: colors.sunset}}
          onPress={onDeleteBtnPress}
          testID="delete-button"
        />
      )}>
      <Icon name="label-important-outline" type="material" />
      <ListItem.Content>
        <ListItem.Title>
          {clients.find(item => item.clientID == note.clientId)?.firstName}{' '}
          {clients.find(item => item.clientID == note.clientId)?.lastName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>{note.text}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderColor: colors.white,
  },
});

export default NoteListItem;
