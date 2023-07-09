import {useNavigation} from '@react-navigation/native';
import {Pressable, View, Text, StyleSheet} from 'react-native';

import {GlobalStyle} from '../../constants/styles';
import CheckBox from '../ui/CheckBox';
import ItemDate from './ItemDate';
import TagList from './TagList';

const ListItem = ({id, content, date, checked, tag}) => {
  const navigation = useNavigation();
  const itemPressHandler = () =>
    navigation.navigate('CreateEditTodo', {itemId: id});

  return (
    <Pressable
      onPress={itemPressHandler}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.todoItemContainer}>
        <CheckBox checked={checked} style={styles.checkBoxContainer} />
        <View style={styles.todoContentContainer}>
          <View style={styles.todoWrap}>
            <Text style={styles.todoContent}>{content}</Text>
          </View>
          {tag.length !== 0 && (
            <TagList tag={tag} style={styles.tagContainer} />
          )}
        </View>
        <ItemDate date={date} />
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
    flex: 1,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  tagContainer: {
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 100,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
