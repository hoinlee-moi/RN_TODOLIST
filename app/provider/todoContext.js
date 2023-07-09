import {createContext, useEffect, useState} from 'react';
import {getRandom} from '../util/calculator';
import {getStorageTodoList, manageStorageTodo} from './storage';

const DUMMY_LIST = [
  {
    id: '0',
    content: 'todo1',
    date: new Date('2023-3-12'),
    check: false,
    tag: ['태그1'],
  },
  {
    id: '1',
    content: 'todo2',
    date: new Date('2023-2-21'),
    check: true,
    tag: [],
  },
  {
    id: '2',
    content: 'todo3',
    date: new Date('2023-3-29'),
    check: false,
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
    check: true,
    tag: ['태그1'],
  },
  {
    id: '4',
    content:
      'todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5todo5',
    date: new Date('2021-1-5'),
    check: false,
    tag: ['태그1', '태그2', '태그3', '태그4'],
  },
];

export const TodoContext = createContext({
  todoList: [],
  filterTagList: [],
  addTodo: ({content, date, tag}) => {},
  deleteTodo: id => {},
  updateTodo: (id, {content, date, tag}) => {},
  checkTodo: id => {},
  manageTagList: (tag, state) => {},
});

const TodoContextProvider = ({children}) => {
  const [todoList, setTodoList] = useState(DUMMY_LIST);
  const [filterTagList, setFilterTagList] = useState([]);

  // useEffect(() => {
  //   getTodoList();
  // }, []);

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
    const id = new Date().toString() + getRandom(1, 100).toString();
    const newTodo = {id: id, check: false, ...todoData};
    const newState = [newTodo, ...todoData];
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
        const deleteTag = filterTagList.filter(filterTag => filterTag !== tag);
        setFilterTagList(deleteTag);
        break;
      case 'add':
        if (filterTagList.includes(tag)) break;
        setFilterTagList(prevTagList => [...prevTagList, tag]);
        break;
      default:
        return;
    }
  };
  const value = {
    todoList: todoList,
    filterTagList: filterTagList,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    updateTodo: updateTodo,
    checkTodo: checkTodo,
    manageTagList: manageTagList,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
