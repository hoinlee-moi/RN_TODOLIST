import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {images} from '../constants/images';
import ImageButton from '../components/ui/ImageButton';
import List from '../components/list/List';
import { GlobalStyle } from '../constants/styles';

const DUMMY_LIST = [
  {
    id: '0',
    content: 'todo1',
    date: new Date('2022-3-12'),
    checked: false,
    tag: ['태그1'],
  },
  {
    id: '1',
    content: 'todo2',
    date: new Date('2023-2-21'),
    checked: true,
    tag: [],
  },
  {
    id: '2',
    content: 'todo3',
    date: new Date('2023-3-29'),
    checked: false,
    tag: ['태그1','태그2'],
  },
  {
    id: '3',
    content: 'todo4',
    date: new Date('2023-12-21'),
    checked: true,
    tag: ['태그1'],
  },
  {
    id: '4',
    content: 'todo5',
    date: new Date('2021-1-5'),
    checked: false,
    tag: ['태그1','태그2','태그3','태그4'],
  },
];

const TodoList = () => {
  const navigation = useNavigation();
  const cancelHandler = () => navigation.navigate('CreateEditTodo');

  return (
    <View style={styles.screen}>
      <List list={DUMMY_LIST} />
      <ImageButton
        name={images.add}
        style={styles.buttonContainer}
        onPress={cancelHandler}
      />
    </View>
  );
};
export default TodoList;

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: GlobalStyle.colors.primary400,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
});
