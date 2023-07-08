import {View, Text, StyleSheet} from 'react-native';
const TodoList = () => {
  return (
    <View style={styles.screen}>
      <Text>TodoList</Text>
    </View>
  );
};
export default TodoList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});