import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const TodoList = () => {
  const navigation = useNavigation();
  const move = () => {
    navigation.navigate('CreateEditTodo');
  };
  return (
    <View style={styles.screen}>
      <Text>TodoList</Text>
      <Pressable onPress={move}>
        <View>
          <Text>만들러가기</Text>
        </View>
      </Pressable>
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
