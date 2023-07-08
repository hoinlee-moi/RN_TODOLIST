import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {images} from '../constants/images';
import ImageButton from '../components/ui/ImageButton';

const TodoList = () => {
  const navigation = useNavigation();
  const cancelHandler = () => navigation.navigate('CreateEditTodo');

  return (
    <View style={styles.screen}>
      <Text>TodoList</Text>
      <ImageButton
        name={images.add}
        style={styles.buttonContainer}
        onPress={cancelHandler}
      />
    </View>
  );
};
export default TodoList;

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
});
