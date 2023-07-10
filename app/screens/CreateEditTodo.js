import {useContext, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';

import TodoForm from '../components/createEdit/TodoForm';
import ModalComponent from '../components/ui/ModalComponent';
import {GlobalStyle} from '../constants/styles';
import {TodoContext} from '../provider/todoContext';

const CreateEditTodo = ({route, navigation}) => {
  const todoCtx = useContext(TodoContext);
  const [deleteModalState, setDeleteModalState] = useState(false);

  // route.params를 통해 create,edit 분별하기
  const editItemId = route?.params?.itemId;
  const isEditing = editItemId ? true : false;

  // edit일시 해당 list 찾기 없을경우 undefined 그대로 전달
  const selectTodoItem = todoCtx.todoList.find(
    todoItem => todoItem.id === editItemId,
  );

  const deleteModalVisible = () => setDeleteModalState(prevState => !prevState);

  // 중복 alert 창 처리 로직
  const failAlertModal = () => {
    Alert.alert('Error!', 'Internal Server error', [
      {text: 'Sorry!', style: 'cancel'},
    ]);
  };

  //create&edit
  const onSubmitHandler = async todoData => {
    if (isEditing) {
      try {
        await todoCtx.updateTodo(editItemId, todoData);
        navigation.goBack();
        return;
      } catch (error) {
        failAlertModal();
      }
    } else {
      try {
        await todoCtx.addTodo(todoData);
        navigation.goBack();
      } catch (error) {
        failAlertModal();
      }
    }
  };
  //delete 모달 창 통해서 실행
  const onDeleteHandler = async () => {
    const success = await todoCtx.deleteTodo(editItemId);
    if (success) {
      navigation.goBack();
      return;
    }
    failAlertModal();
  };

  return (
    <View style={styles.screen}>
      <TodoForm
        isEditing={isEditing}
        defalutValue={selectTodoItem}
        onSubmit={onSubmitHandler}
        onDelete={deleteModalVisible}
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
