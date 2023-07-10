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

export const manageStorageTodo = async todoList => {
  try {
    const data = JSON.stringify(todoList);
    await AsyncStorage.setItem('todoList', data);
    return true;
  } catch (error) {
    return false;
  }
};

