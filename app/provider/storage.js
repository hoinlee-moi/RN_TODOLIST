import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageTodoList = async () => {
  try {
    const data = await AsyncStorage.getItem('todoList');
    const response = JSON.parse(data)
    return response;
  } catch (error) {
    return null;
  }
};
// setItem은 덮어 쓰는 것이여서 edit,create,delete,update 모두 동일 로직 처리
export const manageStorageTodo = async todoList => {
  try {
    const data = JSON.stringify(todoList);
    await AsyncStorage.setItem('todoList', data);
    return true;
  } catch (error) {
    return false;
  }
};

