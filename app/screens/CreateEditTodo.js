import {View, Text, StyleSheet} from 'react-native';
import SelectDate from '../components/createEdit/SelectDate';
import {GlobalStyle} from '../constants/styles';
const CreateEditTodo = ({route, navigation}) => {
  const editItemId = route?.params?.itemId;
  const isEditing = editItemId ? true : false;
  
  return (
    <View style={styles.screen}>
      <SelectDate />
    </View>
  );
};
export default CreateEditTodo;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: GlobalStyle.colors.primary400,
  },
});
