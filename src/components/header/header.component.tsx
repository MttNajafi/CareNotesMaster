import {useNavigation} from '@react-navigation/native';
import {FC} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Header as HeaderRNE, Icon} from '@rneui/themed';
import {setCurrentNote} from './../../store/slices/noteSlice';
import {useDispatch} from 'react-redux';
import {colors} from './../../styles/colors';

interface HeaderProps {
  title: string;
  isMainPage?: boolean;
}

export const Header: FC<HeaderProps> = ({
  title = 'CareNotesMaster',
  isMainPage = false,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <HeaderRNE
      leftComponent={
        !isMainPage ? (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back"
              type="ionicons"
              color="white"
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )
      }
      rightComponent={
        <View>
          {isMainPage ? (
            <TouchableOpacity
              onPress={() => {
                dispatch(setCurrentNote(null));
                navigation.navigate('NoteDetails' as never);
              }}>
              <Icon name="add" color="white" style={styles.headerIcon} />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      }
      centerComponent={{text: title, style: styles.heading}}
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcon: {
    backgroundColor: colors.sunset,
    borderRadius: 50,
    padding: 3,
  },
});
