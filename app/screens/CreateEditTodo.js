import {useContext, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import TodoForm from '../components/createEdit/TodoForm';
import ImageButton from '../components/ui/ImageButton';
import ModalComponent from '../components/ui/ModalComponent';
import {images} from '../constants/images';
import {GlobalStyle} from '../constants/styles';
import {TodoContext} from '../provider/todoContext';

const CreateEditTodo = ({route, navigation}) => {
  const todoCtx = useContext(TodoContext);
  const [deleteModalState, setDeleteModalState] = useState(false);

  const editItemId = route?.params?.itemId;
  const isEditing = editItemId ? true : false;

  const selectTodoItem = todoCtx.todoList.find(
    todoItem => todoItem.id === editItemId,
  );

  const deleteModalVisible = () => setDeleteModalState(prevState => !prevState);

  const onSubmitHandler = async todoData => {
    if (isEditing) {
      const success = todoCtx.updateTodo(editItemId, todoData);
      if (success) {
        navigation.goBack();
        return;
      }
    } else {
      const success = await todoCtx.addTodo(todoData);
      if (success) {
        navigation.goBack();
        return;
      }
    }
    Alert.alert('Error!', 'Internal Server error', [
      {text: 'Sorry!', style: 'cancel'},
    ]);
  };

  const onDeleteHandler = async () => {
    const success = await todoCtx.deleteTodo(editItemId);
    if (success) navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <TodoForm
        isEditing={isEditing}
        defalutValue={selectTodoItem}
        onSubmit={onSubmitHandler}
      />
      <ModalComponent
        isVisible={deleteModalState}
        closeModal={deleteModalVisible}
        modalType="alert"
        modalText="정말 삭제하시겠습니까?"
        handleConfirm={onDeleteHandler}
      />
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
