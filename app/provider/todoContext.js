import {createContext, useEffect, useState} from 'react';
import {getRandom} from '../util/calculator';
import {getStorageTodoList, manageStorageTodo} from './storage';

export const TodoContext = createContext({
  todoList: [],
  filteringTodoList: [],
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
  // storage저장시 중복 함수
  const manageStorageMiddleWare = async data => {
    const response = await manageStorageTodo(data);
    if (response) setTodoList(data);
    return response;
  };
  // 체크된것과 안된 것 정렬함수
  const sortTodoList = list => {
    const sortList = [...list];
    sortList.sort((a, b) => {
      return a.check ? 1 : -1;
    });
    return sortList;
  };
  //추가함수
  const addTodo = async todoData => {
    const id = new Date().toString() + getRandom(1, 10000).toString();

    const newTodo = {id: id, ...todoData};
    const newState = [newTodo, ...todoList];
    const success = await manageStorageMiddleWare(newState);
    return success;
  };
  //업데이트함수
  const updateTodo = async (id, todoData) => {
    const updateTodoList = todoList.map(todo => {
      return todo.id === id ? {...todo, ...todoData} : todo;
    });
    const sortedTodoList = sortTodoList(updateTodoList);
    const success = await manageStorageMiddleWare(sortedTodoList);
    return success;
  };
  //삭제 함수
  const deleteTodo = async id => {
    const deleteTodoList = todoList.filter(todo => todo.id !== id);
    const success = await manageStorageMiddleWare(deleteTodoList);
    return success;
  };
  //체크 업데이트 함수
  const checkTodo = async id => {
    const changeTodoList = todoList.map(todo => {
      return todo.id === id ? {...todo, ['check']: !todo.check} : todo;
    });
    const sortedList = sortTodoList(changeTodoList);
    const success = await manageStorageMiddleWare(sortedList);
    return success;
  };

  // 태그시 필터링 리스트
  const filteringAddListHandler = tag => {
    if (filteredTags.length === 0) {
      const filteringList = todoList.filter(todoItem =>
        todoItem.tag.includes(tag),
      );
      setFilteringTodoList(filteringList);
      return;
    }
    const filteringItemList = filteringTodoList.filter(todoItem =>
      todoItem.tag.includes(tag),
    );
    setFilteringTodoList(filteringItemList);
  };
  //태그 삭제시 필터링
  const filteringdeleteListHandler = tag => {
    if (filteredTags.length === 1) {
      setFilteringTodoList([]);
      return;
    }
    const tagArray = filteredTags.filter(tagName => tagName !== tag);

    let filteringList = [];
    for (let i = 0; i < tagArray.length; i++) {
      if (i == 0) {
        filteringList = todoList.filter(todoItem =>
          todoItem.tag.includes(tagArray[i]),
        );
        continue;
      }
      filteringList = filteringList.filter(todoItem =>
        todoItem.tag.includes(tagArray[i]),
      );
    }
    setFilteringTodoList(filteringList);
  };
  //list페이지 태그 추가제거
  const manageTagList = (state, tag) => {
    switch (state) {
      case 'delete':
        const deleteTag = filteredTags.filter(filterTag => filterTag !== tag);
        setFilteredTags(deleteTag);
        filteringdeleteListHandler(tag);
        break;
      case 'add':
        if (filteredTags.includes(tag)) break;
        setFilteredTags(prevTagList => [...prevTagList, tag]);
        filteringAddListHandler(tag);
        break;
      default:
        return;
    }
  };
  const value = {
    todoList: todoList,
    filteringTodoList: filteringTodoList,
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
