import {useNavigation} from '@react-navigation/native';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import {GlobalStyle} from '../../constants/styles';
import {getFormattedDate} from '../../util/date';

const ListItem = ({id, content, date, checked, tag}) => {
  const navigation = useNavigation();
  const itemPressHandler = () =>
    navigation.navigate('CreateEditTodo', {itemId: id});

  return (
    <Pressable onPress={itemPressHandler} style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.todoItem}>
        <View>{/* 체크박스 UI컴포넌트 */}</View>
        <View>
          <View>
            <Text style={styles.todoContent}>{content}</Text>
          </View>
          <View>
            <Text>{getFormattedDate(date)}</Text>
          </View>
          <View>{/* 태그 아이템 리스트 */}</View>
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
  todoItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyle.colors.primary300,
  },
  todoContent: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
