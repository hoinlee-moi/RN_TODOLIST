import {useNavigation} from '@react-navigation/native';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {GlobalStyle} from '../../constants/styles';
import {getFormattedDate} from '../../util/date';

const ListItem = ({id, content, date, checked, tag}) => {
  const navigation = useNavigation();
  const itemPressHandler = () =>
    navigation.navigate('CreateEditTodo', {itemId: id});

  return (
    <Pressable
      onPress={itemPressHandler}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.todoItemContainer}>
        <View style={styles.checkBoxContainer}>
          <View></View>
        </View>
        <View style={styles.todoContentContainer}>
          <View style={styles.todoWrap}>
            <Text style={styles.todoContent}>{content}</Text>
          </View>
          {tag.length !== 0 && (
            <View>
              <Text>{tag}</Text>
            </View>
          )}
        </View>
        <View style={styles.dateContainer}>
          <Text>{getFormattedDate(date)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  todoItemContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    backgroundColor: GlobalStyle.colors.primary200,
    borderRadius: 5,
  },
  checkBoxContainer: {
    width: 26,
    height: 25,
    marginRight: 12,
    backgroundColor: GlobalStyle.colors.primary300,
  },
  todoContentContainer: {
    marginBottom: 10,
  },
  todoWrap: {
    flex: 1,
    paddingRight: 100,
  },
  todoContent: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
