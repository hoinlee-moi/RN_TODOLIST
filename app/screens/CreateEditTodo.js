import {View, Text, StyleSheet} from 'react-native';
const CreateEditTodo = ({route, navigation}) => {
  const editItemId = route?.params?.itemId;
  console.log(editItemId);
  return (
    <View style={styles.screen}>
      <Text>CreateEditTodo</Text>
    </View>
  );
};
export default CreateEditTodo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
