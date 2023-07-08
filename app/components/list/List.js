import {FlatList} from 'react-native';
import ListItem from './ListItem';

const renderTodoItem = itemData => <ListItem {...itemData.item} />;
const List = ({list}) => {
  return (
    <FlatList
      data={list}
      renderItem={renderTodoItem}
      keyExtractor={item => item.id}
    />
  );
};

export default List;
