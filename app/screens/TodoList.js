import {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {images} from '../constants/images';
import ImageButton from '../components/ui/ImageButton';
import List from '../components/list/List';
import {GlobalStyle} from '../constants/styles';
import TagList from '../components/list/TagList';
import {TodoContext} from '../provider/todoContext';

const TodoList = () => {
  const navigation = useNavigation();
  const todoCtx = useContext(TodoContext);
  const createPageNavigation = () => navigation.navigate('CreateEditTodo');

  //tag 개수 확인으로 띄울 list 구별
  const todoList =
    todoCtx.filteredTags.length === 0
      ? todoCtx.todoList
      : todoCtx.filteringTodoList;

  return (
    <View style={styles.screen}>
      <View style={styles.tagContainer}>
        <View style={styles.tagTitleBox}>
          <Text style={styles.tagTitle}>Tag :</Text>
        </View>
        <TagList
          tag={todoCtx.filteredTags}
          style={styles.tagNameContainer}
          onPress={todoCtx.manageTagList.bind(this, 'delete')}
        />
      </View>
      <List list={todoList} />
      <ImageButton
        name={images.add}
        style={styles.buttonContainer}
        onPress={createPageNavigation}
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
