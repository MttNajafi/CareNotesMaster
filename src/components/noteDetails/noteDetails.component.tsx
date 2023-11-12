import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote} from '../../store/slices/noteSlice';
import {Note} from '../../types/common';
import {RootState} from 'store/store';
import {Picker} from '@react-native-picker/picker';
import {deleteNote} from './../../store/slices/noteSlice';
import {useNavigation} from '@react-navigation/native';
import {Button, Dialog, Text} from '@rneui/themed';
import {colors} from './../../styles/colors';

export const NoteDetails = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state: RootState) => state.clients);
  const categories = useSelector((state: RootState) => state.categories);
  const note = useSelector((state: RootState) => state.notes.currentNote);
  const navigation = useNavigation();
  const [alertModalStatus, SetAlertModalStatus] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | -1>(
    note?.clientId || -1,
  );
  const [selectedCategory, setSelectedCategory] = useState<number | -1>(
    note?.categoryId || -1,
  );
  const [noteText, setNoteText] = useState(note?.text || '');

  /**
   * Toggle alert modal
   * @returns void
   * */
  const toggleAlertModal = () => {
    SetAlertModalStatus(!alertModalStatus);
  };

  /**
   * Delete note
   * @returns void
   * */
  const onDeleteBtnPress = () => {
    note && dispatch(deleteNote(note.noteID));
    navigation.goBack();
  };

  /**
   * Add note
   * @returns void
   * */
  const handleAddNote = () => {
    // Validate data
    const isDataValid =
      selectedClient != -1 && selectedCategory != -1 && noteText;
    if (isDataValid) {
      const newNote: Note = {
        // If note exists, use its ID, otherwise use current timestamp as ID
        noteID: note?.noteID ? note.noteID : Date.now(),
        text: noteText,
        categoryId: selectedCategory,
        clientId: selectedClient,
      };
      dispatch(addNote(newNote));
      setSelectedClient(-1);
      setSelectedCategory(-1);
      setNoteText('');
      navigation.goBack();
    } else {
      // Show alert modal if data is invalid
      toggleAlertModal();
    }
  };

  useEffect(() => {
    // Update state when the note changes
    setSelectedClient(note?.clientId || -1);
    setSelectedCategory(note?.categoryId || -1);
    setNoteText(note?.text || '');
  }, [note]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client:</Text>
      <Picker
        selectedValue={selectedClient}
        onValueChange={itemValue => setSelectedClient(itemValue)}>
        <Picker.Item label="Select Client" value={-1} />
        {clients.map(client => (
          <Picker.Item
            key={client.clientID}
            label={`${client.firstName} ${client.lastName}`}
            value={client.clientID}
          />
        ))}
      </Picker>

      <Text style={styles.title}>Category:</Text>
      <Picker
        selectedValue={selectedCategory}
        onValueChange={itemValue => setSelectedCategory(itemValue)}>
        <Picker.Item label="Select Category" value={-1} />
        {categories.map(category => (
          <Picker.Item
            key={category.catID}
            label={`${category.catName}`}
            value={category.catID}
          />
        ))}
      </Picker>

      <Text style={styles.title}>Note:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your note here"
        value={noteText}
        onChangeText={text => setNoteText(text)}
        multiline
        maxLength={500}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleAddNote} />
        {note && (
          <Button title="Delete" type={'outline'} onPress={onDeleteBtnPress} />
        )}
      </View>
      <Dialog isVisible={alertModalStatus} onBackdropPress={toggleAlertModal}>
        <Dialog.Title title="Missing Information" />
        <Text>Please select client and category and insert a note.</Text>
      </Dialog>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderColor: colors.grey,
    borderWidth: 10,
    height: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    height: 200,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    bottom: 4,
    width: '100%',
    marginVertical: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 100,
  },
  title: {
    fontWeight: 'bold',
  },
});
