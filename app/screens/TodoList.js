import {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {images} from '../constants/images';
import ImageButton from '../components/ui/ImageButton';
import List from '../components/list/List';
import {GlobalStyle} from '../constants/styles';
import TagList from '../components/list/TagList';
import {TodoContext} from '../provider/todoContext';

const DUMMY_LIST = [
  {
    id: '0',
    content: 'todo1',
    date: new Date('2023-3-12'),
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
    tag: [
      '장보기',
      '오늘밥먹을것임아아아',
      '오늘밥먹을것임아아아2',
      '오늘밥먹을것임아아아3오늘밥먹을것임아아아3오늘밥먹을것임아아아3오늘밥먹을것임아아아3오늘밥먹을것임아아아3오늘밥먹을것임아아아3',
    ],
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
    content:
      'todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5',
    date: new Date('2021-1-5'),
    checked: false,
    tag: ['태그1', '태그2', '태그3', '태그4'],
  },
];

const TodoList = () => {
  const navigation = useNavigation();
  const todoCtx = useContext(TodoContext);
  const cancelHandler = () => navigation.navigate('CreateEditTodo');

  

  return (
    <View style={styles.screen}>
      <View style={styles.tagContainer}>
        <View style={styles.tagTitleBox}>
          <Text style={styles.tagTitle}>Tag :</Text>
        </View>
        <TagList
          tag={todoCtx.filterTagList}
          style={styles.tagNameContainer}
          onPress={todoCtx.manageTagList.bind(this, 'delete')}
        />
      </View>
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
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 30,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: GlobalStyle.colors.primary200,
  },
  tagTitleBox: {
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  tagTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagNameContainer: {
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
