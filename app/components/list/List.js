import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from './ListItem';

const renderTodoItem = itemData => <ListItem {...itemData.item} />;
const List = ({list}) => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={list}
        style={styles.list}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 15,
    paddingBottom: 130,
  },
  list: {
    paddingHorizontal: 15,
  },
});
