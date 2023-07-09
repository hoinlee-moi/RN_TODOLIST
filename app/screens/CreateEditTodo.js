import {useContext, useState, useLayoutEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import TodoForm from '../components/createEdit/TodoForm';
import {GlobalStyle} from '../constants/styles';
import {TodoContext} from '../provider/todoContext';

const CreateEditTodo = ({route, navigation}) => {
  const todoCtx = useContext(TodoContext);

  const editItemId = route?.params?.itemId;
  const isEditing = editItemId ? true : false;

  const selectTodoItem = todoCtx.todoList.find(
    todoItem => todoItem.id === editItemId,
  );

  return (
    <View style={styles.screen}>
      <TodoForm isEditing={isEditing} defalutValue={selectTodoItem} />
    </View>
  );
};
export default CreateEditTodo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
    backgroundColor: GlobalStyle.colors.primary400,
  },
});
