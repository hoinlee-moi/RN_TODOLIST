import {createContext, useEffect, useState} from 'react';
import {getRandom} from '../util/calculator';
import {getStorageTodoList, manageStorageTodo} from './storage';

export const TodoContext = createContext({
  todoList: [],
  filteredTags: [],
  addTodo: ({content, date, tag}) => {},
  deleteTodo: id => {},
  updateTodo: (id, {content, date, tag}) => {},
  checkTodo: id => {},
  manageTagList: (tag, state) => {},
});

const TodoContextProvider = ({children}) => {
  const [todoList, setTodoList] = useState([]);
  const [filteringTodoList, setFilteringTodoList] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);

  useEffect(() => {
    getTodoList();
  }, []);



  const getTodoList = async () => {
    const response = await getStorageTodoList();
    setTodoList(prevTodoList => response ?? prevTodoList);
  };

  const manageStorageMiddleWare = async data => {
    const response = await manageStorageTodo(data);
    if (response) setTodoList(data);
    return response;
  };

  const sortTodoList = list => {
    const sortList = [...list];
    sortList.sort((a, b) => {
      return a.check ? 1 : -1;
    });
    return sortList;
  };

  const addTodo = async todoData => {
    const id = new Date().toString() + getRandom(1, 10000).toString();

    const newTodo = {id: id, ...todoData};
    const newState = [newTodo, ...todoList];
    const success = await manageStorageMiddleWare(newState);
    return success;
  };

  const updateTodo = async (id, todoData) => {
    const updateTodoList = todoList.map(todo => {
      return todo.id === id ? {...todo, ...todoData} : todo;
    });
    const sortedTodoList = sortTodoList(updateTodoList);
    const success = await manageStorageMiddleWare(sortedTodoList);
    return success;
  };

  const deleteTodo = async id => {
    const deleteTodoList = todoList.filter(todo => todo.id !== id);
    const success = await manageStorageMiddleWare(deleteTodoList);
    return success;
  };

  const checkTodo = async id => {
    const changeTodoList = todoList.map(todo => {
      return todo.id === id ? {...todo, ['check']: !todo.check} : todo;
    });
    const sortedList = sortTodoList(changeTodoList);
    const success = await manageStorageMiddleWare(sortedList);
    return success;
  };

  const manageTagList = (state, tag) => {
    switch (state) {
      case 'delete':
        const deleteTag = filteredTags.filter(filterTag => filterTag !== tag);
        setFilteredTags(deleteTag);
        break;
      case 'add':
        if (filteredTags.includes(tag)) break;
        setFilteredTags(prevTagList => [...prevTagList, tag]);
        break;
      default:
        return;
    }
  };
  const value = {
    todoList: todoList,
    filteredTags: filteredTags,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,
    checkTodo: checkTodo,
    manageTagList: manageTagList,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
